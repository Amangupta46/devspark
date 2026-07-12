const urlReg = 'http://127.0.0.1:8000/api/v1/users/register/';
const urlLogin = 'http://127.0.0.1:8000/api/v1/users/login/';
const email = 'test_final' + Date.now() + '@example.com';
const password = 'Password123!';

async function test() {
  const regResp = await fetch(urlReg, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: 'Test',
      last_name: 'User',
      email: email,
      password: password,
      company_name: 'Acme Corp'
    })
  });
  console.log('Register Status:', regResp.status);
  
  const { execSync } = require('child_process');
  execSync('.venv\\Scripts\\python manage.py shell -c "from features.users.models import CustomUser; user = CustomUser.objects.get(email=\'' + email + '\'); user.email_verified = True; user.save()"', { cwd: 'c:\\Users\\Dell\\Desktop\\devspark\\apps\\backend' });
  
  const loginResp = await fetch(urlLogin, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
  console.log('Login Status:', loginResp.status);
}
test().catch(console.error);
