//Booking - UpdateBooking
import http from 'k6/http';
import { check } from 'k6';
// Variables for booking ID and authorization token
const bookingId = '9'; // Replace with the actual booking ID you want to use
const token = ' d390f407bad21f3'; // Replace with the actual authorization token
// Define the URL and request body
const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;
const payload = JSON.stringify({
  "firstname": "Jim",
  "lastname": "Brown",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2018-01-01",
    "checkout": "2019-01-01"
  },
  "additionalneeds": "Breakfast"
});

// Define the request headers
const params = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cookie': `token=${token}`,
  },
};

// Define the K6 test scenario
export default function () {
  const response = http.put(url, payload, params);
  // Check the response status
  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  // Optionally log the response
  console.log(`Response body: ${response.body}`);
}
//given token is not static.
// note it will run sucessfully until the token is valid after that it will show forbidden and status is not 200.
