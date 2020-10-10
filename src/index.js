import {
  cardsContainer,
  questionEl,
  answerEl,
  addCardBtn,
  clearBtn,
  addContainer,
} from "./variables";

import { 
  setCardsData, 
  cardsData, 
  createCards, 
  updateNavigation,
  createCard 
} from './card';

createCards();
updateNavigation();

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";
    addContainer.classList.remove("show");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});