document.getElementById('visitorCount').innerText = Math.floor(Math.random() * 1000) + 1;

function updateTicker() {
    let date = new Date();
    document.getElementById('ticker').innerText = `Current Date & Time: ${date.toDateString()} ${date.toLocaleTimeString()}`;
}
setInterval(updateTicker, 1000);

 // Function to check if an element is in the viewport
 function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add 'visible' class to elements in the viewport
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach(function(el) {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Run the function initially in case elements are already visible without scrolling
document.addEventListener('DOMContentLoaded', handleScroll);


// Check if user is already signed up and hide the auth options if true


// window.onload = function() {
//     const storedEmail = localStorage.getItem('userEmail');
//     if (storedEmail) {
//         document.getElementById('authButtons').style.display = 'none';
//         document.getElementById("welcomeMessage").innerText = `Welcome back`;
//     }
// };

document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("signupName").value;
    var email = document.getElementById("signupEmail").value;
    var contact = document.getElementById("signupContact").value;
    var pass = document.getElementById("signupPassword").value;
    var c_pass = document.getElementById("signupC-pass").value;

    var nameRegex = /^[A-Za-z\s]+$/;
    var phoneRegex = /^\d+$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Validation checks
    if (!nameRegex.test(name)) {
       document.getElementById("wrongname").innerHTML=`
     Only Alphabets are Allowed in Name`;
        return;
    }

    if (!emailRegex.test(email)) {
        document.getElementById("wrongemail").innerHTML=`Invalid Email`;
        return;
    }

    if (!phoneRegex.test(contact)) {
        document.getElementById("wrongcontact").innerHTML=`Invalid Phone Number`;
        return;
    }

    if (!passwordRegex.test(pass)) {
        document.getElementById("wrongpass").innerHTML=``
        return;
    }

    if (pass !== c_pass) {
       document.getElementById("wrongc-pass").innerHTML=`Passwords do not match`;
        return;
    }

    // Save user details in local storage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', pass);

    alert('Your account has been created successfully!');
    
    // Get the signup modal instance and hide it
    const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));

    if (signupModal) {
        signupModal.hide(); 
        signupModal.dispose();
    }

    // Remove modal backdrop
    document.querySelector('.modal-backdrop')?.remove();

    // Enable body scrolling
    document.body.style.overflow = ''; // Reset overflow to allow scrolling

    // Hide auth buttons after successful signup
    document.getElementById('authButtons').style.display = 'none';
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve user details from local storage
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        alert('Login successful!');
        
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        if (loginModal) {
            loginModal.hide(); // Hide the modal
            loginModal.dispose(); // Clean up modal instance after hiding
        }
        
        // Manually remove the backdrop (if it persists)
        document.querySelector('.modal-backdrop')?.remove();
        
        // Enable body scrolling
        document.body.style.overflow = ''; // Reset overflow to allow scrolling
        
        // Hide auth buttons after successful login
        document.getElementById('authButtons').style.display = 'none';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});
