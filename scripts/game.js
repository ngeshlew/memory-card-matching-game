(function () {
	"use strict";

	/** DOM Elements */
	const boardElement = document.getElementById("board");
	const timerElement = document.getElementById("timer");
	const movesElement = document.getElementById("moves");
	const scoreElement = document.getElementById("score");
	const resetButton = document.getElementById("resetBtn");
	const overlay = document.getElementById("winOverlay");
	const finalTimeElement = document.getElementById("finalTime");
	const finalMovesElement = document.getElementById("finalMoves");
	const finalScoreElement = document.getElementById("finalScore");
	const bestStatsElement = document.getElementById("bestStats");
	const playAgainButton = document.getElementById("playAgainBtn");

	/** Game Config */
	const numberOfRows = 4;
	const numberOfColumns = 4;
	const totalCards = numberOfRows * numberOfColumns; // 16
	const totalPairs = totalCards / 2; // 8

	/** Emoji symbols used as icons */
	const symbolSet = [
		"🍎", "🚗", "🎧", "🐶", "🌟", "⚽", "🍩", "🎲"
	];

	/** State */
	let shuffledDeck = [];
	let firstFlippedCard = null;
	let secondFlippedCard = null;
	let isBoardLocked = false;
	let matchedPairsCount = 0;

	let movesCount = 0;
	let timerIntervalId = null;
	let gameStartedAtMs = null;

	/** Helpers */
	function shuffleArray(array) {
		const copy = array.slice();
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy;
	}

	function formatTime(totalSeconds) {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	}

	function getElapsedSeconds() {
		if (gameStartedAtMs == null) return 0;
		return Math.floor((Date.now() - gameStartedAtMs) / 1000);
	}

	function updateTimerDisplay() {
		timerElement.textContent = formatTime(getElapsedSeconds());
	}

	function updateMovesDisplay() {
		movesElement.textContent = String(movesCount);
	}

	function updateScoreDisplay() {
		const elapsedSeconds = Math.max(1, getElapsedSeconds());
		const effectiveMoves = Math.max(1, movesCount);
		const score = Math.max(0, Math.floor(10000 / (elapsedSeconds * effectiveMoves)));
		scoreElement.textContent = String(score);
		return score;
	}

	function startTimerIfNeeded() {
		if (timerIntervalId != null) return;
		gameStartedAtMs = Date.now();
		timerIntervalId = setInterval(() => {
			updateTimerDisplay();
			updateScoreDisplay();
		}, 1000);
	}

	function stopTimer() {
		if (timerIntervalId != null) {
			clearInterval(timerIntervalId);
			timerIntervalId = null;
		}
	}

	function createCardElement(symbol, index) {
		const button = document.createElement("button");
		button.className = "card";
		button.setAttribute("type", "button");
		button.setAttribute("aria-label", "Memory card");
		button.dataset.symbol = symbol;
		button.dataset.index = String(index);

		const inner = document.createElement("div");
		inner.className = "card-inner";

		const front = document.createElement("div");
		front.className = "card-face card-front";
		front.textContent = ""; // hidden face

		const back = document.createElement("div");
		back.className = "card-face card-back";
		back.textContent = symbol;

		inner.appendChild(front);
		inner.appendChild(back);
		button.appendChild(inner);
		return button;
	}

	function resetBoardState() {
		firstFlippedCard = null;
		secondFlippedCard = null;
		isBoardLocked = false;
	}

	function handleCardClick(event) {
		const target = event.currentTarget;
		if (!(target instanceof HTMLButtonElement)) return;

		if (isBoardLocked) return;
		if (target.classList.contains("is-flipped") || target.classList.contains("is-matched")) return;

		startTimerIfNeeded();

		target.classList.add("is-flipped");

		if (firstFlippedCard == null) {
			firstFlippedCard = target;
			return;
		}

		secondFlippedCard = target;
		isBoardLocked = true;
		movesCount += 1;
		updateMovesDisplay();
		updateScoreDisplay();

		const isMatch = firstFlippedCard.dataset.symbol === secondFlippedCard.dataset.symbol;
		if (isMatch) {
			firstFlippedCard.classList.add("is-matched");
			secondFlippedCard.classList.add("is-matched");
			firstFlippedCard.disabled = true;
			secondFlippedCard.disabled = true;
			matchedPairsCount += 1;
			resetBoardState();
			checkForWin();
			return;
		}

		// Not a match, flip back after delay
		setTimeout(() => {
			if (firstFlippedCard) firstFlippedCard.classList.remove("is-flipped");
			if (secondFlippedCard) secondFlippedCard.classList.remove("is-flipped");
			resetBoardState();
		}, 800);
	}

	function checkForWin() {
		if (matchedPairsCount === totalPairs) {
			stopTimer();
			const elapsed = getElapsedSeconds();
			const score = updateScoreDisplay();
			finalTimeElement.textContent = formatTime(elapsed);
			finalMovesElement.textContent = String(movesCount);
			finalScoreElement.textContent = String(score);

			// Best stats persistence
			const previousBest = JSON.parse(localStorage.getItem("memory_best") || "null");
			const best = previousBest && previousBest.score > score ? previousBest : { score, elapsed, moves: movesCount };
			localStorage.setItem("memory_best", JSON.stringify(best));
			if (best) {
				bestStatsElement.hidden = false;
				bestStatsElement.textContent = `Best — Score ${best.score}, Time ${formatTime(best.elapsed)}, Moves ${best.moves}`;
			}

			overlay.hidden = false;
		}
	}

	function setupBoard() {
		// Build deck: duplicate symbol set and shuffle
		const deck = symbolSet.concat(symbolSet);
		shuffledDeck = shuffleArray(deck);

		// Reset UI and state
		boardElement.innerHTML = "";
		matchedPairsCount = 0;
		movesCount = 0;
		updateMovesDisplay();
		stopTimer();
		gameStartedAtMs = null;
		timerElement.textContent = "00:00";
		updateScoreDisplay();
		overlay.hidden = true;
		bestStatsElement.hidden = true;

		// Render grid
		shuffledDeck.forEach((symbol, index) => {
			const cardEl = createCardElement(symbol, index);
			cardEl.addEventListener("click", handleCardClick);
			boardElement.appendChild(cardEl);
		});
	}

	// Controls
	resetButton.addEventListener("click", setupBoard);
	playAgainButton.addEventListener("click", setupBoard);

	// Init
	setupBoard();
})();