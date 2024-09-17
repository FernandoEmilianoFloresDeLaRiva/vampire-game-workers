import { Game } from "./models/Game.js";
import { Player } from "./models/player.js";

const startButton = document.getElementById("start-game");
const selectCharacterComponent = document.getElementById(
  "selectCharacterComponent"
);
const pasqualinaArticle = document.getElementById("pasqualina-article");
const gennaroArticle = document.getElementById("gennaro-article");
const lamaArticle = document.getElementById("lama-article");
const krochiArticle = document.getElementById("krochi-article");
const healthState = document.getElementById("health-state");
const speedState = document.getElementById("speed-state");
const chooseCharacterBtn = document.getElementById("choose-character");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas vertical
canvas.width = 530;
canvas.height = 740;
//Canvas Horizontal
// canvas.width = 760

let playerId;
const playerX = canvas.width / 2;
const playerY = canvas.height / 2;
const players = [
  // Pasqualina
  new Player(
    playerX,
    playerY,
    2,
    130,
    "../src/assets/gif/pasqualina-character.webp",
    "../src/assets/images/guns/runetracer-gun.png"
  ),
  // Gennaro
  new Player(
    playerX,
    playerY,
    2,
    156,
    "../src/assets/gif/gennaro-chracter.webp",
    "../src/assets/images/guns/knife-gun.png"
  ),
  // Lema
  new Player(
    playerX,
    playerY,
    3,
    143,
    "../src/assets/gif/lama-chracter.webp",
    "../src/assets/images/guns/axe-gun.webp"
  ),
  // Krochi
  new Player(
    playerX,
    playerY,
    4,
    130,
    "../src/assets/gif/Krochi-character.webp",
    "../src/assets/images/guns/cross-gun.png"
  ),
];
let selectedCharacter = false;
let characterSelected = null;

function selectCharacter() {
  if (selectedCharacter) return;
  selectedCharacter = true;
  startButton.style.display = "none";
  selectCharacterComponent.style.display = "flex";
  pasqualinaArticle.classList.add("character-selected");
  updateStates(0);
}

function updateStates(index) {
  playerId = index;
  healthState.textContent = players[playerId].health;
  speedState.textContent = `+${players[playerId].speed * 10}%`;
  characterSelected = players[index];
}

function startGame() {
  if (!characterSelected) return window.alert("Seleccione un personaje ");
  selectCharacterComponent.style.display = "none";
  canvas.style.display = "block";
  const _game = new Game(canvas, ctx, characterSelected);
  _game.init();
}

document.body.addEventListener("click", selectCharacter);

pasqualinaArticle.addEventListener("click", (e) => {
  e.preventDefault();
  updateStates(0);
  pasqualinaArticle.classList.add("character-selected");
  gennaroArticle.classList.remove("character-selected");
  lamaArticle.classList.remove("character-selected");
  krochiArticle.classList.remove("character-selected");
});

gennaroArticle.addEventListener("click", (e) => {
  e.preventDefault();
  updateStates(1);
  gennaroArticle.classList.add("character-selected");
  pasqualinaArticle.classList.remove("character-selected");
  lamaArticle.classList.remove("character-selected");
  krochiArticle.classList.remove("character-selected");
});

lamaArticle.addEventListener("click", (e) => {
  e.preventDefault();
  updateStates(2);
  lamaArticle.classList.add("character-selected");
  gennaroArticle.classList.remove("character-selected");
  pasqualinaArticle.classList.remove("character-selected");
  krochiArticle.classList.remove("character-selected");
});

krochiArticle.addEventListener("click", (e) => {
  e.preventDefault();
  updateStates(3);
  krochiArticle.classList.add("character-selected");
  lamaArticle.classList.remove("character-selected");
  gennaroArticle.classList.remove("character-selected");
  pasqualinaArticle.classList.remove("character-selected");
});

chooseCharacterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  startGame();
});
