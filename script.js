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
});
