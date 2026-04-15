// ─── AUTH ───────────────────────────────────────────

function loginUser(e) {
  if (e) e.preventDefault();
  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  if (!username || !password) {
    alert('Please enter both username and password.');
    return false;
  }
  const stored = JSON.parse(localStorage.getItem('users') || '[]');
  const user = stored.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password. Please try again.');
  }
  return false;
}

function registerUser(e) {
  if (e) e.preventDefault();
  const username = document.getElementById('username')?.value.trim();
  const email    = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  const confirm  = document.getElementById('confirmPassword')?.value.trim();
  if (!username || !email || !password || !confirm) {
    alert('Please fill in all fields.');
    return false;
  }
  if (password !== confirm) {
    alert('Passwords do not match.');
    return false;
  }
  if (password.length < 6) {
    alert('Password must be at least 6 characters.');
    return false;
  }
  const stored = JSON.parse(localStorage.getItem('users') || '[]');
  if (stored.find(u => u.username === username)) {
    alert('Username already taken. Please choose another.');
    return false;
  }
  stored.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(stored));
  alert('Account created successfully! You can now log in.');
  window.location.href = 'login.html';
  return false;
}

function logoutUser() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

// Google Sign-In handler
function handleCredentialResponse(response) {
  console.log('Google credential received:', response.credential);
  const user = { username: 'google_user', email: '', password: '' };
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'index.html';
}

function googleSignIn() {
  alert('Google Sign-In requires a valid Client ID to be configured.');
}

// ─── WELCOME ─────────────────────────────────────────

function welcomeMessage() {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const name = user.username || 'Visitor';
  alert(`👋 Welcome, ${name}! Thanks for visiting Emer Son Santiago's portfolio.`);
}

// ─── CONTACT FORM ────────────────────────────────────

function validateForm() {
  const name    = document.getElementById('name')?.value.trim();
  const email   = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();
  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  alert(`✅ Message sent! Thank you, ${name}. I'll get back to you soon.`);
  return false;
}
function showMessage() {
    alert("Hello! Your portfolio is working!");
}
// ─── ACTIVE NAV ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.topbar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });
});
