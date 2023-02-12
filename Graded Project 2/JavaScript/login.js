// Valid user data
const validUserData = [
    {
        username: "rajeshpatil@gmail.com",
        password: "rajeshpatil"
    }
];

localStorage.setItem('LoginUsers', JSON.stringify(validUserData));
document.querySelector(".login_form").addEventListener("submit", function(e){

    // Prevent the form from submitting
    e.preventDefault();

    // validated() will be called when the form is submitted
    validated();
});

// Validation code for inputs
const userName = document.getElementById('username');
const password = document.getElementById('password');
const errorElem = document.getElementById('error');
const submitBtn = document.getElementById('submitBtn');
const helpText = document.getElementById('help-text');

userName.addEventListener('textInput', username_verify);
password.addEventListener('textInput', password_verify);

// function to validate input fields
function validated() {
    if (userName.value.length === 0 && password.value.length === 0) {
        userName.style.border = '1px solid red';
        password.style.border = '1px solid red';
        errorElem.style.display = 'block';
        return false;
    } else if (userName.value.length === 0) {
        userName.style.border = '1px solid red';
        errorElem.style.display = 'block';
        userName.focus();
        return false;
    }else if (password.value.length === 0) {
        password.style.border = '1px solid red';
        errorElem.style.display = 'block';
        password.focus();
        return false;
    } else {
        login();
    }
}

function username_verify() {
    if (userName.value.length > 0) {
        userName.style.border = '1px solid silver';
        errorElem.style.display = 'none';
        return true;
    }
}

function password_verify() {
    if (password.value.length > 0) {
        password.style.border = '1px solid silver';
        errorElem.style.display = 'none';
        return true;
    }
}

const validateEmail = (userName) => {
    return String(userName)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// To make stable the submit button after validation 
submitBtn.onmouseover = () => {
    if (validateEmail(userName.value) && password.value.length > 8) {
        helpText.innerText = "Now you can submit"
    } else {
        if (submitBtn.style.alignSelf === "flex-end") {
            submitBtn.style.alignSelf = "flex-start"
        }
        else {
            submitBtn.style.alignSelf = "flex-end"
        }
        helpText.innerText = "You cannot submit until your email is validated and passowrd is greater than 8 characters"
    }
}

function login() {
    if (localStorage.getItem('LoginUsers')) {
        const userDetails = JSON.parse(localStorage.getItem('LoginUsers'));
        const currentUser = userDetails.find((user) => { 
            if (userName.value === user.username) {
                return user;
            }
        });
        if ((userName.value.length && password.value.length) !== 0 && currentUser === undefined) {
            userName.style.border = '1px solid red';
            password.style.border = '1px solid red';
            errorElem.style.display = 'block';
            return false;
        }  
        if (currentUser.password === password.value) {

            // Navigate to login success page
            window.location.href = "../HTML/loginSuccess.html";
        } 
        if (password.value.length !== 0) {
            console.log('Invalid Username / Password.');
            password.style.border = '1px solid red';
            errorElem.style.display = 'block';
            return false;
        }
    } else 
        alert('User details are not stored');
}

// This function will restrict the user from going back to the login page (Once the user is in the Login Success page)
window.history.forward();
function noBack() {
  window.history.forward();
}

