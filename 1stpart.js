//AUTH
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import exec from 'k6/execution';
// Load user credentials from a JSON file
const users = new SharedArray('users', () => JSON.parse(open('data1.json')));
export default function () {
    // 1. Create Token
    const user = users[0];
    const authUrl = 'https://restful-booker.herokuapp.com/auth';
    const authPayload = JSON.stringify({
        username: user.username, 
        password: user.password,
    });
    
    const authParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const authRes = http.post(authUrl, authPayload, authParams);
    
    check(authRes, {
        'auth token created': (r) => r.status === 200,
    });
    const authToken = authRes.json('token');
    // Log the created token for verification
    console.log(`Created Token: ${authToken}`);
    // Pause between iterations
    sleep(1);
}
