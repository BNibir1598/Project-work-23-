//Booking - PartialUpdateBooking
import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'https://restful-booker.herokuapp.com';
const BOOKING_ID = '9'; // Replace with the actual booking ID
const AUTH_TOKEN = 'd2b3dda62530cd0'; // Replace with the actual token

// Define the data to update the booking
const updateData = JSON.stringify({
    firstname: "James",
    lastname: "Brown"
});

export default function () {
    // Perform the PATCH request
    let response = http.patch(`${BASE_URL}/booking/${BOOKING_ID}`, updateData, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${AUTH_TOKEN}`
        }
    });

    // Print the response
    console.log('PATCH Response Status:', response.status);
    console.log('PATCH Response Body:', response.body);

    // Check if the request was successful
    check(response, {
        'status is 200': (r) => r.status === 200
    });

    // Optionally, you can add additional checks or logic here
}
// given token is not static.
// note it will run sucessfully until the token is valid after that it will show forbidden and status is not 200.