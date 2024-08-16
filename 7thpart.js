//Booking - DeleteBooking
import http from 'k6/http';
import { check, sleep } from 'k6';
export default function () {
  // Define the URL to get all booking IDs
  const url = 'https://restful-booker.herokuapp.com/booking';
  // Make the GET request to retrieve booking IDs
  const response = http.get(url);
  
  // Check if the request was successful
  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  // Parse and log the booking IDs
  const bookingIds = JSON.parse(response.body);
  console.log('Booking IDs:', bookingIds);

  // Optional: Perform further operations with the retrieved booking IDs
  // For example, delete each booking
  bookingIds.forEach((id) => {
    const deleteUrl = `${url}/${id}`;
    const deleteResponse = http.del(deleteUrl, null, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=67249712fffb951 `, // Replace with your actual token
      },
    });
    check(deleteResponse, {
      [`DELETE booking ID ${id} status is 200`]: (r) => r.status === 200,
    });
    console.log(`Deleted booking ID ${id}: ${deleteResponse.status}`);
    sleep(1);
  });
}
// given token is not static.