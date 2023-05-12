// Lista de palavras para o jogo da forca
const words = ["abacaxi", "banana", "caju", "damasco", "figo", "goiaba", "laranja", "manga", "nectarina", "pêssego"];

// Palavra selecionada aleatoriamente
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Número de tentativas restantes
let remainingGuesses = 6;

// Lista de letras adivinhadas corretamente
let guessedLetters = [];

// Inicializa a palavra escondida
let hiddenWord = "";
for (let i = 0; i < selectedWord.length; i++) {
	if (guessedLetters.includes(selectedWord[i])) {
		hiddenWord += selectedWord[i];
	} else {
		hiddenWord += "_";
	}
}

// Elementos da página
const wordContainer = document.getElementById("word-container");
const guessesContainer = document.getElementById("guesses-container");
const hangman = document.getElementById("hangman");
const message = document.getElementById("message");
const guessInput = document.getElementById("guess");
let hangmanChildrens = 10;

// Atualiza a palavra escondida na página
function updateWord() {
	wordContainer.textContent = hiddenWord;
}

// Atualiza as letras adivinhadas na página
function updateGuesses() {
	guessesContainer.textContent = "Letras adivinhadas: " + guessedLetters.join(", ");
}

// Atualiza o desenho do enforcado na página
function updateHangman() {
	hangman.children[hangmanChildrens].style.display = "none";
}

// Verifica se a letra adivinhada está na palavra
function checkGuess(guess) {
	if (selectedWord.includes(guess)) {
		for (let i = 0; i < selectedWord.length; i++) {
			if (selectedWord[i] === guess) {
				guessedLetters.push(guess);
				hiddenWord = hiddenWord.slice(0, i) + guess + hiddenWord.slice(i + 1);
			}
		}
	} else {
		remainingGuesses--;
        hangmanChildrens--;
		updateHangman();
	}
}

// Verifica se o jogo acabou
function checkGameOver() {
	if (hiddenWord === selectedWord) {
		message.textContent = "Parabéns, você ganhou!";
		guessInput.disabled = true;
	} else if (remainingGuesses === 0) {
		message.textContent = "Você perdeu! A palavra era " + selectedWord + ".";
		guessInput.disabled = true;
	}
}

// Evento de envio do formulário
document.querySelector("form").addEventListener("submit", function(event) {
	event.preventDefault();

	let guess = guessInput.value.toLowerCase();
	if (!/[a-z]/.test(guess)) {
		message.textContent = "Por favor, digite apenas letras.";
	} else if (guessedLetters.includes(guess)) {
		message.textContent = "Você já adivinhou essa letra. Tente outra.";
	} else {
		checkGuess(guess);
		updateWord();
		updateGuesses();
		checkGameOver();
	}
	guessInput.value = "";
});