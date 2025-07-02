const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");

tabLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
    tabLinks.forEach(l => l.classList.remove("active"));
    tabContents.forEach(tc => tc.classList.remove("active"));

    link.classList.add("active");
    tabContents[index].classList.add("active");
    });
});

const modal = document.getElementById("certificate-modal");
const modalImg = document.getElementById("modal-img");
const img = document.querySelector(".clickable-certificate");
const closeBtn = document.querySelector(".close");

img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
};

const certImages = document.querySelectorAll(".clickable-certificate");

certImages.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});


closeBtn.onclick = function () {
    modal.style.display = "none";
};

// Optional: close modal on outside click
window.onclick = function (e) {
    if (e.target === modal) {
    modal.style.display = "none";
    }
};


const cursor = document.getElementById("cursor");
const cursorBorder = document.getElementById("cursor-border");

const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;

  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

function animateCursorBorder() {
  const easing = 8;
  cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easing;
  cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easing;

  cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;

  requestAnimationFrame(animateCursorBorder);
}

animateCursorBorder();

// Handle elements with data-cursor
document.querySelectorAll("[data-cursor]").forEach((button) => {
  button.addEventListener("mouseover", () => {
    if (button.dataset.cursor === "pointer") {
      cursorBorder.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
      cursorBorder.style.setProperty("--size", "30px");
    } else if (button.dataset.cursor === "pointer2") {
      cursorBorder.style.backgroundColor = "white";
      cursorBorder.style.mixBlendMode = "difference";
      cursorBorder.style.setProperty("--size", "80px");
    }
  });

  button.addEventListener("mouseout", () => {
    cursorBorder.style.backgroundColor = "unset";
    cursorBorder.style.mixBlendMode = "unset";
    cursorBorder.style.setProperty("--size", "50px");
  });
});


