import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'https://restful-booker.herokuapp.com';
const BOOKING_ID = '9'; // Replace with the actual booking ID
let AUTH_TOKEN = '6a1dadada334207 '; // Replace with the actual token

// Define the data to update the booking
const updateData = JSON.stringify({
    firstname: "James",
    lastname: "Brown"
});

// Define headers for the requests
const params = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${AUTH_TOKEN}`
    }
};

export default function () {
    // Step 1: Perform a GET operation to check the current booking details
    let getResponse = http.get(`${BASE_URL}/booking/${BOOKING_ID}`, params);

    // Check if the GET request was successful
    let isGetSuccessful = check(getResponse, {
        'GET request was successful': (r) => r.status === 200
    });

    if (isGetSuccessful) {
        console.log('GET Response Body:', getResponse.body);

        // Step 2: Perform the PATCH operation to update the booking details
        let patchResponse = http.patch(`${BASE_URL}/booking/${BOOKING_ID}`, updateData, params);

        // Print the PATCH response
        console.log('PATCH Response Status:', patchResponse.status);
        console.log('PATCH Response Body:', patchResponse.body);

        // Check if the PATCH request was successful
        check(patchResponse, {
            'PATCH request was successful': (r) => r.status === 200
        });
    } else {
        console.error(`GET request failed with status: ${getResponse.status}. Skipping PATCH request.`);
    }
}
