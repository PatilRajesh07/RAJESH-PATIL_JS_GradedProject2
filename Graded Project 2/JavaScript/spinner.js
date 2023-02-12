// Function to navigate to the Resume Viewer page
function openResumeViewer() {
    window.location.href = "../HTML/resumePage.html";
}

// Function to navigate to the Spinner page
function spin() {
    window.location.href = "../HTML/spinner.html";
  
  // SetTimeout to change display to none
    setTimeout(function () {
      document.querySelector('.box').style.display = "none";
    }, 3000);   

}

//This function will display the Resume Viewer page after 3 seconds
//a promise
let promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(openResumeViewer())
  }, 5000);
});

//async function
async function asyncFunc() {

    //wait until the promise resolves
    let result = await promise;

    console.log(result);
    console.log(spin())
}

 // This function will restrict the user from going back to the login success page (Once the user is in the Resume viewer page)
 window.history.forward();
 function noBack() {
 window.history.forward();
 }