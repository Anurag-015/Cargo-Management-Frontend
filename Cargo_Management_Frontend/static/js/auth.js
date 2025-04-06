// // 🚀 Login Validation
// function validateLogin() {
//     let username = document.getElementById("login-username").value.trim();
//     let password = document.getElementById("login-password").value.trim();
//     let errorElement = document.getElementById("login-error");
//     let loginBtn = document.getElementById("login-btn"); 
//     let loginText = document.getElementById("login-text");
//     let spinner = document.getElementById("login-spinner");

//     errorElement.innerText = ""; // Clear previous errors

//     if (username === "" || password === "") {
//         errorElement.innerText = "⚠️ Please fill in all fields.";
//         return false;
//     }

//     // Disable button & show loading animation
//     loginBtn.disabled = true;
//     loginText.innerText = "Logging in...";
//     spinner.classList.remove("hidden");

//     setTimeout(() => {
//         // Simulated valid credentials (Replace with actual authentication)
//         if (username === "admin" && password === "1234567") {
//             window.location.href = "index.html"; // Redirect to the main page
//         } else {
//             errorElement.innerText = "❌ Invalid username or password.";
//         }

//         // Reset button state after 2 seconds
//         loginBtn.disabled = false;
//         loginText.innerText = "Login";
//         spinner.classList.add("hidden");

//     }, 2000); // Adjust timing if needed

//     return false; // Prevent default form submission
// }


// // 🚀 Signup Validation
// function validateSignup() {
//     let username = document.getElementById("signup-username").value.trim();
//     let email = document.getElementById("signup-email").value.trim();
//     let password = document.getElementById("signup-password").value;
//     let confirmPassword = document.getElementById("signup-confirm-password").value;
//     let errorElement = document.getElementById("signup-error");

//     // Clear previous message
//     errorElement.innerText = "";
//     errorElement.classList.remove("text-green-400", "text-red-400");

//     if (username === "" || email === "" || password === "" || confirmPassword === "") {
//         errorElement.innerText = "⚠️ Please fill in all fields.";
//         errorElement.classList.add("text-red-400");
//         return false;
//     }

//     if (!email.includes("@") || !email.includes(".")) {
//         errorElement.innerText = "⚠️ Enter a valid email.";
//         errorElement.classList.add("text-red-400");
//         return false;
//     }

//     if (password.length < 6) {
//         errorElement.innerText = "⚠️ Password must be at least 6 characters.";
//         errorElement.classList.add("text-red-400");
//         return false;
//     }

//     if (password !== confirmPassword) {
//         errorElement.innerText = "⚠️ Passwords do not match.";
//         errorElement.classList.add("text-red-400");
//         return false;
//     }

//     errorElement.innerText = "✅ Sign-up successful!";
//     errorElement.classList.add("text-green-400");
//     return true;
// }


// // 🚀 Forgot Password Validation
// function validateForgotPassword() {
//     let email = document.getElementById("forgot-email").value.trim();
//     let errorElement = document.getElementById("forgot-error");

//     // Clear any previous messages
//     errorElement.innerText = "";

//     if (email === "") {
//         errorElement.innerText = "⚠️ Please enter your email.";
//         return false;
//     }

//     if (!email.includes("@") || !email.includes(".")) {
//         errorElement.innerText = "⚠️ Enter a valid email.";
//         return false;
//     }

//     errorElement.innerText = "📧 A password reset link has been sent to your email.";
//     return true;
// }


// // 🚀 Switch Forms
// function showLogin() {
//     document.getElementById("login-box").classList.remove("hidden");
//     document.getElementById("signup-box").classList.add("hidden");
//     document.getElementById("forgot-password-box").classList.add("hidden");
// }

// function showSignup() {
//     document.getElementById("signup-box").classList.remove("hidden");
//     document.getElementById("login-box").classList.add("hidden");
//     document.getElementById("forgot-password-box").classList.add("hidden");
// }

// function showForgotPassword() {
//     document.getElementById("forgot-password-box").classList.remove("hidden");
//     document.getElementById("login-box").classList.add("hidden");
//     document.getElementById("signup-box").classList.add("hidden");
// }

// //cursor
// const cursor = document.getElementById("custom-cursor");

// document.addEventListener("mousemove", (e) => {
//     cursor.style.left = `${e.clientX}px`;
//     cursor.style.top = `${e.clientY}px`;
// });


// Reusable function to handle API requests
async function handleAuth(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
}

// Login Validation
async function validateLogin(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const errorElement = document.getElementById("login-error");
    const loginBtn = document.getElementById("login-btn");
    const loginText = document.getElementById("login-text");
    const spinner = document.getElementById("login-spinner");

    // Reset error message
    errorElement.textContent = "";

    // Disable button and show loading spinner
    loginBtn.disabled = true;
    loginText.textContent = "Logging in...";
    spinner.classList.remove("hidden");

    // Send data to the backend
    const result = await handleAuth('/login', { username, password });

    if (result.success) {
        window.location.href = result.redirect;
    } else {
        errorElement.textContent = result.message || "Invalid credentials.";
        loginBtn.disabled = false;
        loginText.textContent = "Login";
        spinner.classList.add("hidden");
    }
}

// Signup Validation
async function validateSignup(event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();
    const errorElement = document.getElementById("signup-error");
    const signupBtn = document.getElementById("signup-btn");
    const signupText = document.getElementById("signup-text");
    const spinner = document.getElementById("signup-spinner");

    // Reset error message
    errorElement.textContent = "";

    // Disable button and show loading spinner
    signupBtn.disabled = true;
    signupText.textContent = "Signing up...";
    spinner.classList.remove("hidden");

    // Check if passwords match
    if (password !== confirmPassword) {
        errorElement.textContent = "Passwords do not match!";
        signupBtn.disabled = false;
        signupText.textContent = "Sign Up";
        spinner.classList.add("hidden");
        return;
    }

    // Send data to the backend
    const result = await handleAuth('/signup', { username, email, password });

    if (result.success) {
        alert(result.message || "Signup successful! Please login.");
        showLogin(); // Switch to login form
    } else {
        errorElement.textContent = result.message || "An error occurred during signup.";
        signupBtn.disabled = false;
        signupText.textContent = "Sign Up";
        spinner.classList.add("hidden");
    }
}

// Forgot Password Validation
async function validateForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById("forgot-email").value.trim();
    const errorElement = document.getElementById("forgot-error");
    const forgotBtn = document.getElementById("forgot-btn");
    const forgotText = document.getElementById("forgot-text");
    const spinner = document.getElementById("forgot-spinner");

    // Reset error message
    errorElement.textContent = "";

    // Disable button and show loading spinner
    forgotBtn.disabled = true;
    forgotText.textContent = "Sending reset link...";
    spinner.classList.remove("hidden");

    // Send data to the backend
    const result = await handleAuth('/forgot-password', { email });

    if (result.success) {
        alert(result.message || "A password reset link has been sent to your email.");
        showLogin(); // Switch back to login form
    } else {
        errorElement.textContent =
            result.message || "Failed to send reset link. Please try again.";
        forgotBtn.disabled = false;
        forgotText.textContent = "Reset Password";
        spinner.classList.add("hidden");
    }
}

// Switch between Login, Signup, and Forgot Password forms
function showLogin() {
    document.getElementById("login-box").classList.remove("hidden");
    document.getElementById("signup-box").classList.add("hidden");
    document.getElementById("forgot-password-box").classList.add("hidden");
}

function showSignup() {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("signup-box").classList.remove("hidden");
    document.getElementById("forgot-password-box").classList.add("hidden");
}

function showForgotPassword() {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("signup-box").classList.add("hidden");
    document.getElementById("forgot-password-box").classList.remove("hidden");
}
// Reusable function to handle API requests
async function handleAuth(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
}

// Login Validation
async function validateLogin(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const errorElement = document.getElementById("login-error");
    const loginBtn = document.getElementById("login-btn");
    const loginText = document.getElementById("login-text");
    const spinner = document.getElementById("login-spinner");

    // Reset error message
    errorElement.textContent = "";

    // Disable button and show loading spinner
    loginBtn.disabled = true;
    loginText.textContent = "Logging in...";
    spinner.classList.remove("hidden");

    // Send data to the backend
    const result = await handleAuth('/login', { username, password });

    if (result.success) {
        window.location.href = result.redirect;
    } else {
        errorElement.textContent = result.message || "Invalid credentials.";
        loginBtn.disabled = false;
        loginText.textContent = "Login";
        spinner.classList.add("hidden");
    }
}

// Signup Validation
async function validateSignup(event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();
    const errorElement = document.getElementById("signup-error");
    const signupBtn = document.getElementById("signup-btn");
    const signupText = document.getElementById("signup-text");
    const spinner = document.getElementById("signup-spinner");

    // Reset error message
    errorElement.textContent = "";

    // Disable button and show loading spinner
    signupBtn.disabled = true;
    signupText.textContent = "Signing up...";
    spinner.classList.remove("hidden");

    // Check if passwords match
    if (password !== confirmPassword) {
        errorElement.textContent = "Passwords do not match!";
        signupBtn.disabled = false;
        signupText.textContent = "Sign Up";
        spinner.classList.add("hidden");
        return;
    }

    // Send data to the backend
    const result = await handleAuth('/signup', { username, email, password });

    if (result.success) {
        alert(result.message || "Signup successful! Please login.");
        showLogin(); // Switch to login form
    } else {
        errorElement.textContent = result.message || "An error occurred during signup.";
        signupBtn.disabled = false;
        signupText.textContent = "Sign Up";
        spinner.classList.add("hidden");
    }
}

// Forgot Password Validation
async function validateForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById("forgot-email").value.trim();
    const errorElement = document.getElementById("forgot-error");
    const forgotBtn = document.getElementById("forgot-btn");
    const forgotText = document.getElementById("forgot-text");
    const spinner = document.getElementById("forgot-spinner");

    // Reset error message
    errorElement.textContent = "";

    // Disable button and show loading spinner
    forgotBtn.disabled = true;
    forgotText.textContent = "Sending reset link...";
    spinner.classList.remove("hidden");

    // Send data to the backend
    const result = await handleAuth('/forgot-password', { email });

    if (result.success) {
        alert(result.message || "A password reset link has been sent to your email.");
        showLogin(); // Switch back to login form
    } else {
        errorElement.textContent =
            result.message || "Failed to send reset link. Please try again.";
        forgotBtn.disabled = false;
        forgotText.textContent = "Reset Password";
        spinner.classList.add("hidden");
    }
}

// Switch between Login, Signup, and Forgot Password forms
function showLogin() {
    document.getElementById("login-box").classList.remove("hidden");
    document.getElementById("signup-box").classList.add("hidden");
    document.getElementById("forgot-password-box").classList.add("hidden");
}

function showSignup() {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("signup-box").classList.remove("hidden");
    document.getElementById("forgot-password-box").classList.add("hidden");
}

function showForgotPassword() {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("signup-box").classList.add("hidden");
    document.getElementById("forgot-password-box").classList.remove("hidden");
}
