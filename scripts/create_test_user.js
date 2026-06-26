(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test.dev@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        userType: 'professional',
        name: 'Test Dev'
      })
    });
    const text = await res.text();
    console.log('STATUS', res.status);
    console.log(text);
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
})();
