var role = localStorage.getItem("role");
var fullName = localStorage.getItem("fullName");
var token = localStorage.getItem('token');
var userId = localStorage.getItem('userId');
var formSubmitted = false;
let currentStep = 0;

// let asset_path = './home/mkt_assets/';
let asset_path = 'https://mobisium.com/wp-content/themes/Newspaper/mkt_assets/';

let stepSrc = [`${asset_path}img/steps/step1.png`, `${asset_path}img/steps/step2.png`, `${asset_path}img/steps/step3.png`]

// document.readyState()
var navUl = document.getElementById("nav-ul");

// console.log(navUl.innerHTML);

function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("role");
    $.ajax({
        url: "https://www.mobisium.com/write/api/logout",
        type: 'GET',
        success: function () {
            console.log('Not logged in');
            location.reload();
        }
    });
}

function checkFullName() {
    const x = document.getElementById('fullName');
    if (!x.value && formSubmitted) {
        x.classList.add('is-invalid');
        return false;
    } else {
        x.classList.remove('is-invalid');
        return true;
    }
}

function checkEmail() {
    const x = document.getElementById('email');
    // console.log(x);
    const re = /\S+@\S+\.\S+/;
    if (!re.test(x.value) && formSubmitted) {
        // console.log("true");
        x.classList.add('is-invalid');
        return false;
    } else {
        x.classList.remove('is-invalid');
        return true;
    }
}

function checkPhoneNo() {
    const x = document.getElementById('phoneNumber');
    if (x.value.length != 10 && formSubmitted) {
        x.classList.add('is-invalid');
        return false;
    } else {
        x.classList.remove('is-invalid');
        return true;
    }
}

function checkPassword() {
    const x = document.getElementById('password');
    if (x.value.length < 6 && formSubmitted) {
        x.classList.add('is-invalid');
        return false;
    } else {
        x.classList.remove('is-invalid');
        return true;
    }
}

function formValid() {
    // const f1 = checkFullName();
    const f2 = checkEmail();
    const f3 = checkPhoneNo();
    const f4 = checkPassword();
    if (f2 && f3 && f4) {
        return true;
    }
    return false;
}

// Signup modal
// $(document).ready(function () {
//     if (!token) {
//         // setTimeout(() => {
//         $('#signupModal').modal('show')
//         // console.log("ready");
//         $('#signupBtn').on('click', function (e) {
//             formSubmitted = true;
//             var form = $('#signupForm').serializeArray();
//             console.log(form);
//             // const url1 = "http://localhost:3000/api/user/signup";
//             // const url2 = "http://localhost:4200/mkt/auth/login";
//             const url1 = "https://www.mobisium.com/mkt/api/user/signup";
//             const url2 = "https://www.mobisium.com/mkt/auth/login";
//             if (formValid()) {
//                 const signupBtn = document.getElementById('signupBtn');
//                 signupBtn.classList.add('hide');
//                 const spinner = '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>';
//                 const loadingContainer = document.getElementById('loading-container');
//                 loadingContainer.innerHTML = spinner;
//                 const body = {
//                     fullName: form[0].value,
//                     email: form[1].value,
//                     // company: form[2].value,
//                     countryCode: form[2].value,
//                     phone: form[3].value,
//                     password: form[4].value
//                 }
//                 // console.log(body);
//                 $.ajax({
//                     url: url1,
//                     type: "POST",
//                     data: body,
//                     success: function (result) {
//                         // console.log(result);
//                         window.location.href = url2 + '?email=' + body.email + '&pass=' + body.password;
//                     },
//                     error: function (err) {
//                         // console.log(err);
//                         alert(err.responseJSON.message);
//                     }
//                 })
//             }
//         });
//         // }, 10 * 1000);
//     }
// });

//PHONE LEAD MODAL
$(document).ready(function () {
    if (!token && !formSubmitted) {
        setTimeout(() => {
            $('#phoneNoModal').modal('show')
            console.log("ready");
        }, 15 * 1000);
    }
});



//PHONE NUMBER LEAD
function onNumberSubmit(inputID) {
    const phoneElement = document.getElementById(inputID);
    const phoneNo = parseInt(document.getElementById(inputID).value);
    const length = phoneNo ? phoneNo.toString().length : 0;
    // const url = 'http://localhost:3000/api/public/lead/phone';
    const url = 'https://mobisium.com/mkt/api/public/lead/phone';
    console.log(phoneNo);
    if (length === 10) {
        phoneElement.classList.remove('is-invalid');
        phoneElement.value = '';
        document.getElementById('phone-btn').disabled = true;
        document.getElementById('phone-btn2').disabled = true;
        //save number
        $.ajax({
            url: url,
            type: "POST",
            data: { phoneNo },
            success: function (result) {
                console.log(result);
                document.getElementById('phoneNoSaveMsg').classList.remove('hide-component');
                document.getElementById('phoneNoSaveMsg2').classList.remove('hide-component');
                formSubmitted = true;
            },
            error: function (err) {
                console.log(err);
                alert(err.responseJSON.message);
                // alert('Phone number not saved');
            }
        })
    } else {
        phoneElement.classList.add('is-invalid');
    }
    console.log(length);
}

//3 steps script
function onStepClick(element, stepNo) {
    const steps = document.getElementsByClassName('steps-text');
    const currentImg = 'step-image' + (currentStep + 1);
    const nextImg = 'step-image' + stepNo
    // console.log(imgID);
    document.getElementById(currentImg).classList.add('hide-component');
    document.getElementById(nextImg).classList.remove('hide-component');
    steps[currentStep].className += 'alert-light step-unselect';
    steps[currentStep].classList.remove('alert-primary');
    currentStep = stepNo - 1;
    element.classList.add('alert-primary');
    element.classList.remove('alert-light');
}



if (token && role === "admin") {
    // console.log("i m admin");
    navUl.innerHTML = ' <li><a href="mkt/admin/client">Client</a></li> <li><a href="mkt/admin/project">Project</a></li> <li><a href="mkt/admin/writer">Writer</a></li> <li><a href="mkt/chat">Chats</a></li> <li><a href="mkt/admin/messages">Messages</a></li><li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">' + fullName + '</a> <div class="dropdown-menu"> <a class="dropdown-item drop-item" href="mkt/admin/setting">Setting</a> <div class="dropdown-divider"></div> <a class="dropdown-item drop-item" href="#" onclick="Logout()">Logout</a> </div> </li> '
}

if (token && role === "client") {
    // console.log("i m client");
    navUl.innerHTML = '<li><a href="https://www.mobisium.com/mkt/client/writer/search">Writers</a></li>' +
        '<li><a href="https://www.mobisium.com/mkt/client/project/new">Project</a></li>' +
        '<li><a href="https://www.mobisium.com/mkt/client/payments">Payments</a></li>' +
        '<li> <a href="https://www.mobisium.com/mkt/chat">Chats</a></li>' +
        '<li><a href="https://www.mobisium.com/mkt/contact-us">Contact Us</a></li>' +
        '<li><a href="https://www.mobisium.com/mkt/project">Live Project</a></li>' +
        '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">' + fullName + '</a> <div class="dropdown-menu"> <a class="dropdown-item drop-item" href="https://www.mobisium.com/mkt/client/setting/profile">Setting</a> <div class="dropdown-divider"></div> <a class="dropdown-item drop-item" href="#" onclick="Logout()">Logout</a> </div> </li>'
}

if (token && role === 'writer') {
    // console.log("i m writer");
    navUl.innerHTML = ' <li> <a href="https://www.mobisium.com/mkt/writer/portfolio">My Portfolio</a></li>' +
        '<li> <a href="https://www.mobisium.com/mkt/write/dashboard">Mobisium Projects</a></li>' +
        '<li> <a href="https://www.mobisium.com/mkt/writer/project/live">Client Projects</a></li>' +
        '<li> <a href="https://www.mobisium.com/mkt/chat">Chats</a></li>' +
        '<li><a href="https://www.mobisium.com/mkt/contact-us">Contact Us</a></li>' +
        '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">' + fullName + '</a> <div class="dropdown-menu"> <a class="dropdown-item drop-item" href="https://www.mobisium.com/mkt/writer/setting/payment">Setting</a> <div class="dropdown-divider"></div> <a class="dropdown-item drop-item" href="#" onclick="Logout()">Logout</a> </div> </li> '
}

// console.log(role);

