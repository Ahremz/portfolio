
document.addEventListener("DOMContentLoaded", function () {
  // Toggle Email Visibility
  function showEmail() {
    const email = document.getElementById("email");
    email.style.display = (email.style.display === "none" || email.style.display === "") ? "block" : "none";
  }

  // Toggle Contact Number Visibility
  function showContact() {
    const contact = document.getElementById("contact-number");
    contact.style.display = (contact.style.display === "none" || contact.style.display === "") ? "block" : "none";
  }

  // Toggle Section Visibility
  function toggleSection(id) {
    const content = document.getElementById(id);
    content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
  }

  // Make functions globally available
  window.showEmail = showEmail;
  window.showContact = showContact;
  window.toggleSection = toggleSection;

  // Double-click to zoom images
  const images = document.querySelectorAll(".image-container img");
  images.forEach((img) => {
    img.addEventListener("dblclick", function () {
      img.classList.toggle("zoomed");
    });
  });

  // Authentication system - predefined credentials
  const validUser = { username: 'demy30', password: '2007' };
  let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [validUser];
  let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

  function validateUsername(username) {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  }

  function validatePassword(password) {
    return password.length >= 4;
  }

  function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const messageEl = document.getElementById('login-message');

    // Clear previous errors
    messageEl.style.display = 'none';
    document.getElementById('login-username').classList.remove('validation-error');
    document.getElementById('login-password').classList.remove('validation-error');

    // Validate inputs
    if (!validateUsername(username)) {
      messageEl.textContent = 'Username must be at least 3 characters and contain only letters, numbers, and underscores.';
      messageEl.style.display = 'block';
      document.getElementById('login-username').classList.add('validation-error');
      return false;
    }

    if (!validatePassword(password)) {
      messageEl.textContent = 'Password must be at least 4 characters long.';
      messageEl.style.display = 'block';
      document.getElementById('login-password').classList.add('validation-error');
      return false;
    }

    // Check if user exists and password matches
    const user = registeredUsers.find(u => u.username === username && u.password === password);
    if (user) {
      currentUser = { username: user.username };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateAuthState();
      clearForm('login');
    } else {
      messageEl.textContent = 'Invalid username or password.';
      messageEl.style.display = 'block';
    }

    return false;
  }

  function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const messageEl = document.getElementById('register-message');
    const successEl = document.getElementById('register-success');

    // Clear previous messages
    messageEl.style.display = 'none';
    successEl.style.display = 'none';
    document.getElementById('register-username').classList.remove('validation-error');
    document.getElementById('register-password').classList.remove('validation-error');
    document.getElementById('register-confirm-password').classList.remove('validation-error');

    // Validate inputs
    if (!validateUsername(username)) {
      messageEl.textContent = 'Username must be at least 3 characters and contain only letters, numbers, and underscores.';
      messageEl.style.display = 'block';
      document.getElementById('register-username').classList.add('validation-error');
      return false;
    }

    if (!validatePassword(password)) {
      messageEl.textContent = 'Password must be at least 4 characters long.';
      messageEl.style.display = 'block';
      document.getElementById('register-password').classList.add('validation-error');
      return false;
    }

    if (password !== confirmPassword) {
      messageEl.textContent = 'Passwords do not match.';
      messageEl.style.display = 'block';
      document.getElementById('register-confirm-password').classList.add('validation-error');
      return false;
    }

    // Check if user already exists
    if (registeredUsers.some(u => u.username === username)) {
      messageEl.textContent = 'An account with this username already exists.';
      messageEl.style.display = 'block';
      return false;
    }

    // Register user
    registeredUsers.push({ username, password });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    successEl.textContent = 'Registration successful! Please login with your credentials.';
    successEl.style.display = 'block';
    clearForm('register');
    
    // Auto switch to login form after 2 seconds
    setTimeout(() => {
      showLoginForm();
    }, 2000);

    return false;
  }

  function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthState();
  }

  function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    clearMessages();
  }

  function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    clearMessages();
  }

  function clearMessages() {
    document.getElementById('login-message').style.display = 'none';
    document.getElementById('register-message').style.display = 'none';
    document.getElementById('register-success').style.display = 'none';
  }

  function clearForm(type) {
    if (type === 'login') {
      document.getElementById('login-username').value = '';
      document.getElementById('login-password').value = '';
    } else if (type === 'register') {
      document.getElementById('register-username').value = '';
      document.getElementById('register-password').value = '';
      document.getElementById('register-confirm-password').value = '';
    }
  }

  function updateAuthState() {
    if (currentUser) {
      document.getElementById('auth-section').style.display = 'none';
      document.getElementById('portfolio-content').style.display = 'block';
      document.getElementById('logout-section').style.display = 'block';
    } else {
      document.getElementById('auth-section').style.display = 'block';
      document.getElementById('portfolio-content').style.display = 'none';
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('register-form').style.display = 'none';
      document.getElementById('logout-section').style.display = 'none';
    }
  }

  // Make auth functions globally available
  window.handleLogin = handleLogin;
  window.handleRegister = handleRegister;
  window.handleLogout = handleLogout;
  window.showLoginForm = showLoginForm;
  window.showRegisterForm = showRegisterForm;

  // Initialize auth state on page load
  updateAuthState();
});
