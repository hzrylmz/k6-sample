import http from 'k6/http';
import { sleep } from 'k6';


// Ramp VUs up and down in stages

export const options = {
  stages: [

    {duration : '10s', target: 1000},
    {duration : '30s',target: 1100},
    {duration : '10s',target: 0}

  ]

};


export default function() {
  http.get('https://test.k6.io');
  sleep(1);
  http.get('https://test.k6.io/contacts.php')
  sleep(2)
  http.get('https://test.k6.io/news.php')
  sleep(2)
}
