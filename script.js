document.addEventListener("DOMContentLoaded", function () {
  // Toggle Email Visibility
  function showEmail() {
    const email = document.getElementById("email");
    email.style.display = (email.style.display === "none" || email.style.display === "") ? "block" : "none";
  }

  // Toggle Section Visibility
  function toggleSection(id) {
    const content = document.getElementById(id);
    content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
  }

  // Double-click to zoom images
  const images = document.querySelectorAll(".image-container img");
  images.forEach((img) => {
    img.addEventListener("dblclick", function () {
      img.classList.toggle("zoomed");
    });
  }); 
  
 function viewCV() {
  // Opens the CV file in a new tab
  window.open('CV.pdf', '_blank');
}

function downloadCV() {
  // Creates a temporary link to trigger download
  const link = document.createElement('a');
  link.href = 'CV.pdf';
  link.download = 'Rudemy_Espina_CV.pdf'; // Optional: rename file on download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  // Expose functions globally (so your inline `onclick=""` still works)
  window.showEmail = showEmail;
  window.toggleSection = toggleSection;

  function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("login-error");
  const loginForm = document.getElementById("login-form");
  const logoutArea = document.getElementById("logout-area");

  if (username === "Espinaru1993" && password === "Espina.1993") {
    error.style.display = "none";
    loginForm.style.display = "none";
    logoutArea.style.display = "block";
    // Optionally hide the rest of the page until login
    document.querySelectorAll("section:not(#login-section)").forEach(sec => sec.style.display = "block");
  } else {
    error.style.display = "block";
  }
}

function logout() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("logout-area").style.display = "none";
  document.getElementById("login-error").style.display = "none";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  // Hide rest of the site again
  document.querySelectorAll("section:not(#login-section)").forEach(sec => sec.style.display = "none");
}

// Hide content by default unless logged in
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("section:not(#login-section)").forEach(sec => sec.style.display = "none");
});

