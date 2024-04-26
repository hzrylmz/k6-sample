import http from 'k6/http'
import {check,sleep} from 'k6'
import exec from 'k6'


export const options = {
    vus : 10,
    duration : '10s',
    thresholds : {

        http_req_duration : ['p(95)<150'], // yani requestlerin yüzde 95 'i 150 ms in altında.
        http_req_failed: ['rate < 0.01'],
        // http_req_failed: ['count < 5'] //reason: unsupported aggregation method count on metric of type rate. supported aggregation methods for this metric are: rate 
        http_reqs : ['count > 20'],
        // http_reqs : ['rate > 2']
        vus : ['value > 9']
        
    }

}



export default function () {
    const res = http.get('https://test.k6.io')
    

    check(res,{
        'status is 200' : (r) => r.status === 200,
        'Startpage include the text' : (r) =>r.body.includes('Collection of simple web-pages suitable for load testing.') === true
    }) 
    sleep(2)

}