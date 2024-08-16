//Booking - GetBookingIds
import http from 'k6/http';
import { check, sleep } from 'k6';
// Define the base URL for the API
const baseUrl = 'https://restful-booker.herokuapp.com/booking';
export default function () {
    // Example 1: Get All Booking IDs
    const allBookingsResponse = http.get(baseUrl);
    
    // Log the response for all booking IDs
    console.log(`All Bookings Response: ${allBookingsResponse.body}`);
    
    check(allBookingsResponse, {
        'fetched all booking IDs successfully': (r) => r.status === 200,
    });

    // Example 2: Filter by Firstname and Lastname
    const firstname = 'John'; // Replace with desired firstname
    const lastname = 'Doe'; // Replace with desired lastname
    const nameFilterUrl = `${baseUrl}?firstname=${firstname}&lastname=${lastname}`;
    
    const nameFilterResponse = http.get(nameFilterUrl);
    
    // Log the response for filtered bookings by name
    console.log(`Filtered by Name Response: ${nameFilterResponse.body}`);
    
    check(nameFilterResponse, {
        'fetched bookings by name successfully': (r) => r.status === 200,
    });

    // Example 3: Filter by Checkin/Checkout Dates
    const checkin = '2024-08-16'; // Replace with desired checkin date
    const checkout = '2024-08-17'; // Replace with desired checkout date
    const dateFilterUrl = `${baseUrl}?checkin=${checkin}&checkout=${checkout}`;
    
    const dateFilterResponse = http.get(dateFilterUrl);
    
    // Log the response for filtered bookings by date
    console.log(`Filtered by Date Response: ${dateFilterResponse.body}`);
    
    check(dateFilterResponse, {
        'fetched bookings by date successfully': (r) => r.status === 200,
    });

    // Pause between iterations
    sleep(1);
}

