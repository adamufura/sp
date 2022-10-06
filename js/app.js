// ===================== ADD A WORD =====================

let newWordText = document.querySelector("#new-word");
let newWordMeaning = document.querySelector("#new-meaning");
let newWordExample = document.querySelector("#new-example");
const addNewWordBtn = document.querySelector("#btn-save");

addNewWordBtn.addEventListener("click", () => {
  // check if the word exists
  if (localStorage.getItem(newWordText) !== null) {
    alert("Word exists");
    return;
  }
  //add word

  const newWord = {
    word: newWordText.value,
    meaning: newWordMeaning.value,
    example: newWordExample.value,
  };

  newWordText = newWordText.value.toLowerCase();
  localStorage.setItem(newWordText, JSON.stringify(newWord));
  location.reload();
});

// ===================== GET ALL WORDS =====================

document.addEventListener("DOMContentLoaded", () => {
  // fetch all words
  let wordLists = document.querySelector("#word-list");

  words = Object.keys(localStorage);
  words = words.sort();
  words.forEach((word) => {
    let Cword = word.charAt(0).toUpperCase() + word.slice(1);
    wordLists.insertAdjacentHTML(
      "beforeend",
      `<li class="list-group-item wordList" data-word='${word}' >${Cword}</li>`
    );
  });

  // =======================SELECT A WORD ====================
  const wordItems = document.querySelectorAll(".wordList");
  wordItems.forEach((wordItem) => {
    wordItem.addEventListener("click", (e) => {
      let selectedWord = e.target.getAttribute("data-word");
      displaySelectedWord(selectedWord);
    });
  });
});

function displaySelectedWord(word) {
  let getWord = JSON.parse(localStorage.getItem(word));
  let completeWord = getWord;
  // display selected word
  let WordText = document.querySelector("#selectedWord");
  let WordMeaning = document.querySelector("#meaning");
  let WordExample = document.querySelector("#example");

  WordText.innerHTML = completeWord.word;
  WordMeaning.innerHTML = completeWord.meaning;
  WordExample.innerHTML = completeWord.example;
}

// Search Word
const searchButton = document.querySelector("#search-btn");

searchButton.addEventListener("click", () => {
  let searchText = document.querySelector("#word-search").value;

  searchText = searchText.toLowerCase();

  words = Object.keys(localStorage);
  let filtered = words.filter((value) => {
    return value.indexOf(searchText) !== -1;
  });

  words = words.sort();
  document.querySelectorAll(`[data-word]`).forEach((item) => {
    item.style.display = "none";
  });

  filtered.forEach((word) => {
    document.querySelector(`[data-word='${word}']`).style.display = "block";
  });

  if (searchText === "") {
    location.reload();
  }
});
