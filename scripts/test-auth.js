const axios = require('axios');

const API_URL = 'http://localhost:3000/api/auth';
const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    password: 'password123'
};

async function testAuth() {
    console.log('--- Testing Auth Endpoints ---');

    try {
        // 1. Register
        console.log(`\n> Attempting Register with ${testUser.email}...`);
        const registerRes = await axios.post(`${API_URL}/register`, testUser);
        console.log('✅ Register Success:', registerRes.data);
        const token = registerRes.data.token;

        // 2. Login
        console.log(`\n> Attempting Login with ${testUser.email}...`);
        const loginRes = await axios.post(`${API_URL}/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✅ Login Success:', loginRes.data);

        // 3. Get Me
        console.log('\n> Attempting to fetch user profile (Get Me)...');
        const meRes = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Get Profile Success:', meRes.data);

        // 4. Change Password
        console.log('\n> Attempting to change password...');
        const changePassRes = await axios.post(`${API_URL}/change-password`, {
            currentPassword: testUser.password,
            newPassword: 'newpassword123'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Change Password Success:', changePassRes.data);

        // 5. Login with new password
        console.log('\n> Verifying login with new password...');
        const newLoginRes = await axios.post(`${API_URL}/login`, {
            email: testUser.email,
            password: 'newpassword123'
        });
        console.log('✅ Re-login Success:', newLoginRes.data);

        // 6. Forgot Password
        console.log('\n> Attempting Forgot Password...');
        const forgotRes = await axios.post(`${API_URL}/forgot-password`, {
            email: testUser.email
        });
        console.log('✅ Forgot Password Success:', forgotRes.data);

    } catch (error) {
        console.error('\n❌ Auth Test Failed:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

testAuth();
