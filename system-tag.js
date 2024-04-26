import http from 'k6/http'

export const options = {
    thresholds:{
        http_req_duration : ['p(95) < 1000']
    }
}

export default function (){
    http.get('https://run.mocky.io/v3/1ffe3eb8-f583-4941-8197-97ece45c8b06')
    http.get('https://run.mocky.io/v3/6d10e02d-cd99-4f64-9981-ab4264791615?mocky-delay=2000ms')

}