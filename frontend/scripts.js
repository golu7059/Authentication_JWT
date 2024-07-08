function toggleForm(form) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');

    if (form === 'login') {
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
        loginToggle.style.background = '#fff';
        signupToggle.style.background = '#f0f0f0';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        loginToggle.style.background = '#f0f0f0';
        signupToggle.style.background = '#fff';
    }
}

async function signupSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };
    console.log(data);

    try {
        const response = await axios.post("http://localhost:5006/api/auth/signup", data);
        console.log(response.data);

        alert("Signup successfully, now you can log in");
        toggleForm('login');
    } catch (error) {
        console.error('Error in signup:', error);
    }
}

async function loginSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    console.log(data);
    try {
        const response = await axios.post("http://localhost:5006/api/auth/signin", data);
        if (response.data.success) {
            const { token, data: userData } = response.data;
            const { name, email ,_id} = userData;
            console.log(_id);
            
            document.cookie = `token=${token}; path=/; max-age=3600`;

            // Store user details in localStorage
            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);
            // Redirect to profile page
            window.location.href = 'profile.html';
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            console.error("Error response data:", error.response.data);
            alert(error.response.data.message);
        }
    }
}

function getUserDetails() {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    console.log(userName, userEmail);
    if (userName && userEmail) {
        document.getElementById("user-name").textContent = userName;
        document.getElementById("user-email").textContent = userEmail;
    } else {
        // Redirect to login page if user data is not available
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes('profile.html')) {
        getUserDetails();
    }
});

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    document.cookie = "token=; path=/; max-age=0"; // Clear the token cookie
    window.location.href = 'index.html';
}
