const axios = require('axios');

const API_URL = 'http://localhost:3000/api';
const EMAIL = 'test_sync@example.com';
const PASSWORD = 'password123';

async function runTest() {
    try {
        console.log('--- Starting Sync Scenario Test ---');

        // 1. Register/Login
        let token;
        try {
            console.log(`1. Attempting Register for ${EMAIL}...`);
            const regRes = await axios.post(`${API_URL}/auth/register`, {
                username: 'SyncTester',
                email: EMAIL,
                password: PASSWORD
            });
            token = regRes.data.token;
            console.log('   Registered successfully.');
        } catch (e) {
            if (e.response && e.response.status === 400) {
                console.log('   User exists, logging in...');
                const loginRes = await axios.post(`${API_URL}/auth/login`, {
                    email: EMAIL,
                    password: PASSWORD
                });
                token = loginRes.data.token;
                console.log('   Logged in successfully.');
            } else {
                throw e;
            }
        }

        // 2. Simulate Device A Pushing Data
        console.log('\n2. Simulating Device A: Pushing 3 days of Prayer Logs...');
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const dayBefore = new Date(Date.now() - 172800000).toISOString().split('T')[0];

        const logs = [
            { date: dayBefore, fajr_status: 'PRAYED', dhuhr_status: 'MISSED', asr_status: 'PRAYED', maghrib_status: 'PRAYED', isha_status: 'PRAYED' },
            { date: yesterday, fajr_status: 'MISSED', dhuhr_status: 'PRAYED', asr_status: 'PRAYED', maghrib_status: 'MISSED', isha_status: 'PRAYED' },
            { date: today, fajr_status: 'PRAYED', dhuhr_status: 'PRAYED', asr_status: 'NONE', maghrib_status: 'NONE', isha_status: 'NONE' }
        ];

        await axios.post(`${API_URL}/sync`, { logs }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('   Data pushed to server.');

        // 3. Verify Server Has Data
        console.log('\n3. Verifying Server Data...');
        const fetchRes = await axios.get(`${API_URL}/logs`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const serverLogs = fetchRes.data.logs;
        console.log(`   Server has ${serverLogs.length} logs.`);

        if (serverLogs.length >= 3) {
            console.log('   SUCCESS: Server has received data from "Device A".');
            console.log('   Now use the Browser Agent to login as this user and verify "Device B" pulls this data.');
        } else {
            console.error('   FAILURE: Server missing data.');
        }

    } catch (error) {
        console.error('TEST FAILED:', error.response ? error.response.data : error.message);
    }
}

runTest();
