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
            'Cookie': 'token=43191766d082335' // Replace with your actual token
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

    // Step 3: Delete booking using Basic Auth authorization
    const bookingIdToDelete2 = 4;  // Another booking ID for deletion
    const deleteResBasicAuth = http.del(`https://restful-booker.herokuapp.com/booking/${bookingIdToDelete2}`, null, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=' // Replace with your actual Base64 encoded credentials
        }
    });

    // Check if the deletion was successful using Basic Auth
    const isDeletedWithBasicAuth = check(deleteResBasicAuth, {
        'Booking deleted successfully using Basic Auth': (r) => r.status === 201 || r.status === 200 || r.status === 204,
    });

    if (isDeletedWithBasicAuth) {
        console.log(`Booking ID ${bookingIdToDelete2} deleted successfully using Basic Auth.`);
    } else {
        console.error(`Failed to delete Booking ID ${bookingIdToDelete2} using Basic Auth. Status: ${deleteResBasicAuth.status}`);
    }
}
