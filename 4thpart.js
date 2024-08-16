//Booking - CreateBooking
import http from 'k6/http';
import { check } from 'k6';
// Define the JSON payload for creating a booking
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

export default function () {
    // Perform the POST request to create a new booking
    const url = 'https://restful-booker.herokuapp.com/booking';
    const res = http.post(url, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    // Extract booking ID from the response
    const responseBody = res.json();
    const bookingId = responseBody.bookingid;

    // Log the actual response body and booking ID for debugging
    console.log('Response body:', JSON.stringify(responseBody));
    console.log('Booking ID in response:', bookingId);

    // Perform checks on the response
    check(res, {
        'is status 200': (r) => r.status === 200,
        'has bookingid': (r) => bookingId !== undefined,
        'has correct booking details': (r) => {
            const booking = r.json('booking');
            return booking.firstname === 'Jim' &&
                booking.lastname === 'Brown' &&
                booking.totalprice === 111 &&
                booking.depositpaid === true &&
                booking.bookingdates.checkin === '2018-01-01' &&
                booking.bookingdates.checkout === '2019-01-01' &&
                booking.additionalneeds === 'Breakfast';
        }
    });
}
