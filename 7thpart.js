//Booking - DeleteBooking
import http from 'k6/http';
import { check } from 'k6';
export default function () {
    // Step 1: Retrieve all booking IDs
    const getAllBookingsRes = http.get('https://restful-booker.herokuapp.com/booking');

    // Check if the retrieval was successful
    const isRetrieved = check(getAllBookingsRes, {
        'Retrieved all booking IDs successfully': (r) => r.status === 200,
    });

    // Log the booking IDs if retrieval was successful
    if (isRetrieved) {
        console.log('Booking IDs:', getAllBookingsRes.body);
    } else {
        console.error('Failed to retrieve booking IDs.');
        return;  // Exit the function if retrieval fails
    }
    // Step 2: Delete booking using Cookie authorization
    const bookingIdToDelete1 = 4;  // Booking ID for deletion
    const deleteResCookie = http.del(`https://restful-booker.herokuapp.com/booking/${bookingIdToDelete1}`, null, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'token=d7c3f6f0cf2e26f' // Replace with your actual token
        }
    });

    // Check if the deletion was successful using Cookie
    const isDeletedWithCookie = check(deleteResCookie, {
        'Booking deleted successfully using Cookie': (r) => r.status === 201 || r.status === 200 || r.status === 204,
    });

    if (isDeletedWithCookie) {
        console.log(`Booking ID ${bookingIdToDelete1} deleted successfully using Cookie.`);
    } else {
        console.error(`Failed to delete Booking ID ${bookingIdToDelete1} using Cookie. Status: ${deleteResCookie.status}`);
    }
}
//given token is not static.
// note it will run sucessfully until the token is valid after that it will show forbidden and status is not 200.
