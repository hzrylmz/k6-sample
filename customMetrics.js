import http from 'k6/http'
import {check,sleep} from 'k6'
import { Counter, Trend} from 'k6/metrics'


export const options = {
    vus : 10,
    duration : '10s',
    thresholds : {

        http_req_duration : ['p(95)<250'], // yani requestlerin yüzde 95 'i 250 ms in altında.
        my_counter : ['count < 40'],
        response_time_news_page : ['p(95)<250']
        
    }

}

let myCounter = new Counter('my_counter')
let newPageResponseTrend = new Trend('response_time_news_page')

export default function () {
    let res = http.get('https://test.k6.io')
    myCounter.add(1)
    sleep(2)

    res = http.get('https://test.k6.io/news.php')

    newPageResponseTrend.add(res.timings.duration)
    sleep(1)


}