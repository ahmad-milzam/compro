// Mobile menu toggle
const menuBtn = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  if (mobileMenu.classList.contains("hidden")) {
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  } else {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  }
});

// Close mobile menu when clicking menu items
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  });
});

// Send form data directly to WhatsApp
function sendToWhatsApp() {
  const name = document.getElementById("form-name").value;
  const project = document.getElementById("form-project").value;
  const message = document.getElementById("form-message").value;

  let text = `Halo PT SINERGI WASTU NUSANTARA,%0A%0A`;
  text += `Saya ingin berkonsultasi mengenai proyek.%0A`;
  if (name) text += `*Nama:* ${encodeURIComponent(name)}%0A`;
  if (project) text += `*Jenis Proyek:* ${encodeURIComponent(project)}%0A`;
  if (message) text += `*Pesan:* ${encodeURIComponent(message)}%0A`;

  window.open(`https://wa.me/6281314119332?text=${text}`, "_blank");
}
