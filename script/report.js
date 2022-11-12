var currentTab = 0; // Current tab is set to be the first tab (0)


var district = 'Sunnyvale Unified School District';
var dd = {
        content: [
{text:'Strategic Implementation Plan for Computer Science', style:'header'},            
{text:district, margin: [ 0, 10, 0, 10 ], bold:true},     
]};
        

showTab(currentTab); // Display the current tab
  getOption();


function getOption() {
  const d = new Date();
  document.getElementById("dateToday").innerHTML = d.toLocaleDateString();

  document.getElementById("schoolDist").innerHTML = document.querySelector('input[name="district"]').value;
  document.getElementById("superintendent").innerHTML = document.querySelector('input[name="supt"]').value;
  document.getElementById("distCounty").innerHTML = document.querySelector('select[name="county"]').value;
  document.getElementById("ourVision").innerHTML = document.querySelector('textarea[name="vision"]').value;
  document.getElementById("techText1").innerHTML = document.querySelector('input[name="tech1"]:checked').value;
  document.getElementById("techScore1").innerHTML = document.querySelector('input[name="tech1"]:checked').title;
  document.getElementById("techText2").innerHTML = document.querySelector('input[name="tech2"]:checked').value;
  document.getElementById("techText3").innerHTML = document.querySelector('input[name="tech3"]:checked').value;
  document.getElementById("techText4").innerHTML = document.querySelector('input[name="tech4"]:checked').value;
  document.getElementById("techText5").innerHTML = document.querySelector('input[name="tech5"]:checked').value;
  document.getElementById("techText6").innerHTML = document.querySelector('input[name="tech6"]:checked').value;

//FR: I wonder if there's a more efficient way to do this...


}


function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Download PDF";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
  getOption();
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  //if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    //document.getElementById("regForm").submit();
    pdfMake.createPdf(dd).download();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
//  return valid; // return the valid status
return true;
 }

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}


