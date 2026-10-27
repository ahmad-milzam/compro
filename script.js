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

// Portfolio slider controls
const portfolioSlider = document.getElementById("portfolio-slider");
const portfolioCards = portfolioSlider?.querySelectorAll(".portfolio-card");
const portfolioPrev = document.getElementById("portfolio-prev");
const portfolioNext = document.getElementById("portfolio-next");
const portfolioSlideCount = document.getElementById("portfolio-slide-count");
const portfolioSliderFrame = portfolioSlider?.closest(".portfolio-slider-frame");

if (
  portfolioSlider &&
  portfolioCards?.length &&
  portfolioPrev &&
  portfolioNext &&
  portfolioSlideCount &&
  portfolioSliderFrame
) {
  const getVisibleCardCount = () => {
    const card = portfolioCards[0];
    const styles = getComputedStyle(portfolioSlider);
    const gap = Number.parseFloat(styles.gap) || 0;
    const padding =
      (Number.parseFloat(styles.paddingLeft) || 0) +
      (Number.parseFloat(styles.paddingRight) || 0);
    return Math.max(
      1,
      Math.round(
        (portfolioSlider.clientWidth - padding + gap) /
          (card.clientWidth + gap),
      ),
    );
  };

  const getCurrentCardIndex = () =>
    Array.from(portfolioCards).reduce((closestIndex, card, index) => {
      const closestCard = portfolioCards[closestIndex];
      const cardPosition = card.offsetLeft - portfolioCards[0].offsetLeft;
      const closestPosition = closestCard.offsetLeft - portfolioCards[0].offsetLeft;
      return Math.abs(cardPosition - portfolioSlider.scrollLeft) <
        Math.abs(closestPosition - portfolioSlider.scrollLeft)
        ? index
        : closestIndex;
    }, 0);

  const updatePortfolioControls = () => {
    const firstVisible = getCurrentCardIndex();
    const lastVisible = Math.min(
      firstVisible + getVisibleCardCount(),
      portfolioCards.length,
    );

    portfolioSlideCount.textContent = `Proyek ${firstVisible + 1}–${lastVisible} dari ${portfolioCards.length}`;
    portfolioPrev.disabled = firstVisible === 0;
    portfolioNext.disabled = lastVisible === portfolioCards.length;
    portfolioSliderFrame.dataset.showPrev = String(!portfolioPrev.disabled);
    portfolioSliderFrame.dataset.showNext = String(!portfolioNext.disabled);
  };

  const scrollPortfolio = (direction) => {
    const visibleCardCount = getVisibleCardCount();
    const targetIndex = Math.max(
      0,
      Math.min(
        portfolioCards.length - visibleCardCount,
        getCurrentCardIndex() + direction * visibleCardCount,
      ),
    );

    portfolioSlider.scrollTo({
      left: portfolioCards[targetIndex].offsetLeft - portfolioCards[0].offsetLeft,
      behavior: "auto",
    });
  };

  portfolioPrev.addEventListener("click", () => scrollPortfolio(-1));
  portfolioNext.addEventListener("click", () => scrollPortfolio(1));
  portfolioSlider.addEventListener("scroll", updatePortfolioControls, {
    passive: true,
  });
  window.addEventListener("resize", updatePortfolioControls);
  updatePortfolioControls();
}

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
