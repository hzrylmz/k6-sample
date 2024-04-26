import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        http_errors: ['count==0'],
    }
}

let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get('https://run.mocky.io/v3/cef9ccd3-7768-45f4-ab95-d2edd7f90db6');

    if (res.error) {
        httpErrors.add(1);
    }

    check(res, {
        'status is 200': (r) => r.status === 200
    });

    // Submit order
    res = http.get('https://run.mocky.io/v3/92e5fe0a-4cf5-4f1d-9356-65410053a22e?mocky-delay=2000ms');

    if (res.error) {
        httpErrors.add(1, { page: 'order' });
    }

    check(res, {
      'status is 201': (r) => r.status === 201
    });

    sleep(1);
}
