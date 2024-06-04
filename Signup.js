function handleCredentialResponse(response) {
  const userToken = response.credential;
  
  // Send this token to your backend to validate and create the new user account
  fetch('http://localhost:8000/auth/google/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: userToken })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Handle successful sign-up (e.g., redirect to complete profile)
          window.location.href = '/complete-profile';
      } else if (data.error === 'User exists') {
          // Handle case where user already exists
          alert('An account with this email already exists. Please sign in.');
      } else {
          // Handle other errors
          alert('Sign-up failed: ' + data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

window.onload = function () {
  google.accounts.id.initialize({
      client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com",
      callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
      document.querySelector('.g_id_signin'), 
      { 
          theme: "outline", 
          size: "large", 
          text: "sign_up_with", 
          shape: "rectangular", 
          logo_alignment: "left",
          height: "40"
      }
  );
}


// form

// Get the modal
var modal = document.getElementById("createAccountModal");

// Get the link that opens the modal
var createAccountLink = document.querySelector(".createAccount");

// Get the <span> element that closes the modal
var closeBtn = modal.querySelector(".close");

// When the user clicks the link, open the modal
createAccountLink.addEventListener("click", function() {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// login modal
// Get the login modal
var loginModal = document.getElementById("loginModal");

// Get the link that opens the login modal
var loginBtn = document.querySelector(".login-btn");

// Get the <span> element that closes the login modal
var loginCloseBtn = loginModal.querySelector(".close");

// When the user clicks the login link, open the login modal
loginBtn.addEventListener("click", function() {
    loginModal.style.display = "block";
});

// When the user clicks on <span> (x), close the login modal
loginCloseBtn.addEventListener("click", function() {
    loginModal.style.display = "none";
});

// When the user clicks anywhere outside of the login modal, close it
window.addEventListener("click", function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
});

// Optionally, you can add form submission handling for the login form
var loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Perform your login logic here, e.g., fetch request to your backend
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Example fetch request (replace with actual endpoint and data)
    fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Handle successful login (e.g., redirect to dashboard)
            window.location.href = '/dashboard';
        } else {
            // Handle login failure (show error message, etc.)
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


// into message
function closeMessage() {
    var messageWindow = document.getElementById('messageWindow');
    messageWindow.style.display = 'none';
}
