import {
  cardsContainer,
  navigationContainer,
  addContainer,
  currentEl,
  prevBtn,
  nextBtn,
  showBtn,
  hideBtn,
} from "./variables";

let currentActiveCard = 0;
const cardsEl = [];

const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

const setCardsData = (cards) => {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

const cardsData = getCardsData();

const createCards = () => {
  cardsData.forEach((data, index) => createCard(data, index));
  if (cardsData.length > 1) {
    navigationContainer.style.display = "flex";
  }
}

const createCard = (data, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

const updateNavigation = () => {
  nextBtn.addEventListener("click", () => {
    cardsEl[currentActiveCard].className = "card left";
    currentActiveCard = currentActiveCard + 1;
    if (currentActiveCard > cardsEl.length - 1) {
      currentActiveCard = cardsEl.length - 1;
    }
    cardsEl[currentActiveCard].className = "card active";
    updateCurrentText();
  });

  prevBtn.addEventListener("click", () => {
    cardsEl[currentActiveCard].className = "card right";
    currentActiveCard = currentActiveCard - 1;
    if (currentActiveCard < 0) {
      currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = "card active";
    updateCurrentText();
  });

  showBtn.addEventListener("click", () => addContainer.classList.add("show"));
  hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

}

const updateCurrentText = () => {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

export { 
  setCardsData, 
  cardsData, 
  createCards, 
  createCard, 
  updateNavigation 
}