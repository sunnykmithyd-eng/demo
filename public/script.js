// DOM Elements
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const toast = document.getElementById('toast');

// Switch between sign up and sign in
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Toggle password visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = passwordInput.nextElementSibling.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Show toast notification
function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.backgroundColor = isError ? '#e74c3c' : '#2ecc71';
    toast.className = 'toast show';
    
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// Handle registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('Registration successful! You can now login.');
            registerForm.reset();
            container.classList.remove('right-panel-active');
        } else {
            showToast(data.error || data.errors[0].msg, true);
        }
    } catch (error) {
        showToast('Network error. Please try again.', true);
    }
});

// Handle login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('Login successful!');
            loginForm.reset();
            // Store token (in a real app, you'd use this for authenticated requests)
            localStorage.setItem('token', data.token);
            // Redirect to dashboard or home page
            setTimeout(() => {
                window.location.href = '/dashboard.html'; // You would create this page
            }, 1000);
        } else {
            showToast(data.error || data.errors[0].msg, true);
        }
    } catch (error) {
        showToast('Network error. Please try again.', true);
    }
});