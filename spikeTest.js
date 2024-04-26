import http from 'k6/http';
import { sleep } from 'k6';


// Ramp VUs up and down in stages

export const options = {
  stages: [

    {duration : '1m', target: 1000},
    {duration : '30s',target: 0}
  
  ]

};


export default function() {
  http.get('https://test.k6.io');
  sleep(1);
}
