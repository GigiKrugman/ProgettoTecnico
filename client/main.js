function toggleMenu() {
  document.querySelector(".menu").classList.toggle("open");
}

let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("carousel-slide");

  for (let slide of slides) {
    slide.style.display = "none";
  }

  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.display = "flex";
}

showSlides();

setInterval(showSlides, 4000);

const cardsContainer = document.querySelector("#cards-container");
const pagination = document.querySelector("#pagination");
let data = [];
const itemsPerPage = 9;
let currentPage = 1;

fetch("data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
    renderCards();
    renderPagination();
  });

function renderCards() {
  cardsContainer.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  data.slice(start, end).forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <img src="${item.picture}" alt="${item.name}" />
    <h2>${item.name}</h2>
    <p><i class="fas fa-envelope"></i> ${item.email}</p>
    <p><i class="fas fa-phone"></i> ${item.phone}</p>
    <p><i class="fas fa-globe"></i> ${item.address}</p>
    `;
    cardsContainer.appendChild(card);
  });
}

function renderPagination() {
  pagination.innerHTML = "";

  const pageCount = Math.ceil(data.length / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = i === currentPage ? "active" : "";
    button.addEventListener("click", () => {
      currentPage = i;
      renderCards();
      renderPagination();
    });

    pagination.appendChild(button);
  }
}

//mailinglist code:
document
  .getElementById("mailing-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("mailing-form").style.display = "none";
    document.getElementById("message").style.display = "none";

    document.getElementById("thankyou-message").style.display = "block";
  });
