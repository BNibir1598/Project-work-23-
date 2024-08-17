//Booking - UpdateBooking
import http from 'k6/http';
import { check } from 'k6';
// Variables for booking ID and authorization token
const bookingId = '9'; // Replace with the actual booking ID you want to use
let token = '4e5673d682d9f62'; // Replace with the actual authorization token

// Define the base URL
const baseUrl = `https://restful-booker.herokuapp.com/booking/${bookingId}`;

// Define the request body for the PUT operation
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
  // Step 1: Perform a GET operation to retrieve booking details
  const getResponse = http.get(baseUrl, params);
  
  // Check the response status of the GET request
  const isGetSuccessful = check(getResponse, {
    'GET request was successful': (r) => r.status === 200,
  });

  if (isGetSuccessful) {
    console.log(`GET response body: ${getResponse.body}`);

    // Step 2: Perform the PUT operation only if GET was successful
    const putResponse = http.put(baseUrl, payload, params);

    // Check the response status of the PUT request
    const isPutSuccessful = check(putResponse, {
      'PUT request was successful': (r) => r.status === 200,
    });

    if (isPutSuccessful) {
      console.log(`PUT response body: ${putResponse.body}`);
    } else {
      console.error(`PUT request failed. Status: ${putResponse.status}`);
    }
  } else {
    console.error(`GET request failed. Status: ${getResponse.status}`);
  }
}
//given token is not static.
// note it will run sucessfully until the token is valid after that it will show forbidden and status is not 200.
