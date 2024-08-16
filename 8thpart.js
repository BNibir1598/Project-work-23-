
//A simple health check endpoint to confirm whether the API is up and running.
import http from 'k6/http';
import { check } from 'k6';
export default function () {
    // Send a GET request to the ping endpoint
    const res = http.get('https://restful-booker.herokuapp.com/ping');

    // Check if the response status is 201
    check(res, {
        'response status is 201': (r) => r.status === 201,
    });

    // Log the response body
    console.log('Response body:', res.body);
}
