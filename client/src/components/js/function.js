// filter.js
export function filterByCategory(category) {
  var allCards = document.querySelectorAll(".col-sm-3");

  function showCard(card) {
    card.style.display = "block";
  }

  function hideCard(card) {
    card.style.display = "none";
  }

  allCards.forEach((card) => {
    var cardCategories = card.classList;

    if (category === "all" || cardCategories.contains(category)) {
      showCard(card);
    } else {
      hideCard(card);
    }
  });
}
