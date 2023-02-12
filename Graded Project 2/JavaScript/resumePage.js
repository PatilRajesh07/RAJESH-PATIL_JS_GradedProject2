let resumesData; 
let resumesArray = [];
let resumeArrayIndex = 0;

// HTML selectors
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("search");
const noResultContainer = document.getElementById("noResultContainer");
const resumeContainer = document.getElementById("resumeContainer");

// fetch API to read local JSON file (Data.json)
fetch("../Resources/Data.json")
    .then(function (response) {
        return response.json();
    }).then((data) => {
        console.log(data);
        resumesData = data.resume;
        resumesArray = resumesData;
        searchResultVisibility();
        buttonsVisibility();
        populateAllDetails();
    }).catch(function (error) {
        console.error('Something went wrong while retrieving resumes');
        console.error(error);
    });

// function to populate all the details
function populateAllDetails() {
    const currentResume = resumesArray[resumeArrayIndex];
    populateBasicDetails(currentResume.basics);
    populateTechSkills(currentResume.skills);
    populateTechnicalSkills(currentResume.skills.keywords);
    populateHobbies(currentResume.interests.hobbies);
    populateWorkDetails(currentResume.work);
    populateProjectDetails(currentResume.projects);
    populateEducationDetails(currentResume.education);
    populateInternshipDetails(currentResume.Internship);
    populateAchievementDetails(currentResume.achievements.Summary);
}

// function to populate basic details of the applicant eg: name, postion applied for, phone etc.
function populateBasicDetails(basicDetails) {
    document.getElementById("name").innerText = basicDetails.name;
    document.getElementById("appliedFor").innerText = basicDetails.AppliedFor;
    document.getElementById("phone").innerText = basicDetails.phone;
    document.getElementById("email").innerText = basicDetails.email;
    console.log(`url: ${basicDetails.profiles.url}`)
    document.getElementById("linkedin").innerHTML = `<a href="${basicDetails.profiles.url}" target="_blank">LinkedIn</a>`;
    document.getElementById("address").innerText = basicDetails.location.address;
    document.getElementById("city").innerText = basicDetails.location.city;
    document.getElementById("state").innerText = basicDetails.location.state;
    document.getElementById("postalCode").innerText = basicDetails.location.postalCode;
}

// function to populate technical specialization of the applicant
function populateTechSkills(skills) {
  let skillSet = document.getElementById("skillName");
  skillSet.innerHTML = `<p><span><Strong>Skill : </Strong></span>${skills["skillName"]}</li>
      <p class="li-margin"><span><Strong>Level : </Strong></span>${skills["level"]}</li>`
}    

// function to populate technical skills of the applicant
function populateTechnicalSkills(skills) {
    let techList = document.getElementById("technicalSkills");
    techList.innerHTML = '';
    skills.forEach((skill) => {
        techList.innerHTML += `<p>${skill}<p>`;
    });
}

// function to populate hobbies of the applicant
function populateHobbies(hobbies) {
    let hobbyList = document.getElementById("hobbies");
    hobbyList.innerHTML = '';
    hobbies.forEach((hobby) => {
        hobbyList.innerHTML += `<p>${hobby}<p>`;
    });
}

// function to populate work-experience detials of the applicant
function populateWorkDetails(workDetails) {
    let workExpList = document.getElementById("previousCompanyDetails");
    workExpList.innerHTML = `<li><span><Strong>Company Name : </Strong></span>${workDetails["Company Name"]}</li>
        <li class="li-margin"><span><Strong>Position : </Strong></span>${workDetails["Position"]}</li>
        <li class="li-margin"><span><Strong>Start Date : </Strong></span>${workDetails["Start Date"]}</li>
        <li class="li-margin"><span><Strong>End Date : </Strong></span>${workDetails["End Date"]}</li>
        <li><span><Strong>Summary : </Strong></span> ${workDetails["Summary"]}</li>`;
}

// function to populate project related details of the applicant
function populateProjectDetails(projectDetails) {
    let projectList = document.getElementById('projectDetails');
    projectList.innerHTML = `<li><span><Strong>${projectDetails.name} : </Strong></span>${projectDetails.description}</li>`;
}

// function to populate education of the applicant
function populateEducationDetails(educationDetails) {
    let educationList = document.getElementById("education");
    educationList.innerHTML = `<li><span><Strong>UG : </Strong></span>${educationDetails.UG.institute}, ${educationDetails.UG.course}, 
    ${educationDetails.UG["Start Date"]}, ${educationDetails.UG["End Date"]}, ${educationDetails.UG.cgpa}</li>
    <li><span><Strong>PU : </Strong></span>${educationDetails["Senior Secondary"].institute}, ${educationDetails["Senior Secondary"].cgpa}</li>
    <li><span><Strong>High School : </Strong></span>${educationDetails["High School"].institute}, ${educationDetails["High School"].cgpa}</li>`;
}

// function to populate internship details of the applicant
function populateInternshipDetails(internshipDetails) {
    let internshipList = document.getElementById("internship");
    internshipList.innerHTML = `<li><span><Strong>Company Name : </Strong></span>${internshipDetails['Company Name']}</li>
        <li><span><Strong>Position : </Strong></span>${internshipDetails['Position']}</li>
        <li><span><Strong>Start Date : </Strong></span>${internshipDetails['Start Date']}</li>
        <li><span><Strong>End Date : </Strong></span>${internshipDetails['End Date']}</li>
        <li><span><Strong>Summary : </Strong></span>${internshipDetails['Summary']}</li>`;
}

// function to populate achievements of the applicant
function populateAchievementDetails(achievements) {
    let achievementList = document.getElementById("achievements");
	achievementList.innerHTML = '';
    achievements.forEach((a) => {
        achievementList.innerHTML += `<li>${a}</li>`
    });   
}

// function to check the visibilty of the "Previous" and "Next" buttons based on the available applicant profiles
function buttonsVisibility() {
    nextBtn.style.visibility = (resumeArrayIndex + 1 >= resumesArray.length) ? 'hidden' : 'visible';
    previousBtn.style.visibility =  (resumeArrayIndex === 0) ? 'hidden' : 'visible';
};

// function to display the resume-container and invalid-search container based on the searched result
function searchResultVisibility() {
    if (resumesArray.length > 0) {
        noResultContainer.style.display = "none";
        resumeContainer.style.display = "block";
    } else {
        noResultContainer.style.display = "flex";
        resumeContainer.style.display = "none";
    }
};

// click event gets triggered on click of "Next" button
document.getElementById("nextBtn").addEventListener("click", function () {    
    resumeArrayIndex += 1;
    populateAllDetails();
    buttonsVisibility();
});

// click event gets triggered on click of "Previous" button
document.getElementById("previousBtn").addEventListener("click", function () {    
    resumeArrayIndex -= 1;
    populateAllDetails();
    buttonsVisibility();
});

// input event should get triggered on searching of any keyword in the search input field 
document.getElementById("search").addEventListener('input', function (event) {
    const searchInputValue = event.target.value;
    if (searchInputValue.length > 0) {
        resumesArray = resumesArray.filter((resume) =>
            resume.basics.AppliedFor
            .toLowerCase()
            .includes(searchInputValue.toLowerCase())
      );
    } else 
        resumesArray = resumesData;
    resumeArrayIndex = 0;
    if (resumesArray.length > 0) {
        populateAllDetails();
    }
    searchResultVisibility();
    buttonsVisibility();
});

// function call 
buttonsVisibility();
  