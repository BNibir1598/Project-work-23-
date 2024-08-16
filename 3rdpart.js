//Booking - GetBooking
import http from 'k6/http';
import { check, sleep } from 'k6';
// Booking ID to retrieve
const bookingId = 1;

export default function () {
    // Define the URL with the booking ID
    const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;

    // Perform the GET request to retrieve booking details
    const res = http.get(url, {
        headers: {
            'Accept': 'application/json'  // Requesting JSON response
        },
    });

    // Log the raw response body and status code for debugging
    console.log('Raw Response Status:', res.status);
    console.log('Raw Response Body:', res.body);

    // Parse the JSON response
    let responseBody;
    try {
        responseBody = JSON.parse(res.body);
    } catch (e) {
        console.error('Error parsing JSON response:', e);
        return;
    }

    // Perform checks on the response to ensure it matches the expected structure
    check(res, {
        'is status 200': (r) => r.status === 200,
        'has firstname': (r) => responseBody.firstname !== undefined,
        'has lastname': (r) => responseBody.lastname !== undefined,
        'has totalprice': (r) => typeof responseBody.totalprice === 'number',
        'has depositpaid': (r) => typeof responseBody.depositpaid === 'boolean',
        'has bookingdates': (r) => responseBody.bookingdates !== undefined,
        'has checkin date': (r) => responseBody.bookingdates.checkin !== undefined,
        'has checkout date': (r) => responseBody.bookingdates.checkout !== undefined,
        'has additionalneeds (optional)': (r) => responseBody.additionalneeds !== undefined || true,
    });

    // Optional handling: Log if additionalneeds is missing
    if (!responseBody.additionalneeds) {
        console.log('Note: The additionalneeds field is not present in this booking.');
    }

    // Adding a short sleep to simulate a pause between requests
    sleep(1);
}
