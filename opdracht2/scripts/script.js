// array met de muziek kaarten
const theStapel = document.querySelector('.muziek ul');
const theCards = theStapel.querySelectorAll('.muziek ul li');

// de counter 
const theCounter = document.querySelector('.afspeellijst h1 span');

// de lege lijst
const theList = document.querySelector('.afspeellijst ul');




/*****************/
/* EVENTS SWIPEN */
/*****************/

// Met de HAMMER.js library
// de library wordt onderin de HTML ingeladen
// documentation: https://hammerjs.github.io

// loopen over de cards in de array
theCards.forEach( card => {	
	// swipen laten werken op de kaarten
	let cardHammer = new Hammer(card);
	cardHammer.on("swipeleft", (e) => {;
		let card;
		
		if(e.target.nodeName == "LI") {
			card = e.target;
		} else {
			card = e.target.closest("li");
		}
		trashCard(card);
	});
	cardHammer.on("swiperight", (e) => {
		console.log(e.target.nodeName);
		let card;
		
		if(e.target.nodeName == "LI") {
			card = e.target;
		} else {
			card = e.target.closest("li");
		}
		likeCard(card);
	});
});





/******************/
/* EVENTS TOETSEN */
/******************/

document.addEventListener("keydown", handleKeypresses);

function handleKeypresses(e) {
	
	switch (e.code) {
		case "ArrowLeft":
			// als er nog een card is
			if(getBovensteCard()) {
				// trashen dan
				trashCard(getBovensteCard());
			}
			break;
		case "ArrowRight":
			// als er nog een card is
			if(getBovensteCard()) {
				// liken dan
				likeCard(getBovensteCard());
			}
			break;
	}
}

function getBovensteCard() {
	let swippebleCards, bovensteCard;
	swippebleCards = theStapel.querySelectorAll("li:not(.trash):not(.like)");
	bovensteCard = swippebleCards[swippebleCards.length - 1];
	return bovensteCard;
}





/*********************/
/* EVENTS AFHANDELEN */
/*********************/

function trashCard(card) { 
	// class "trash" op de li zetten
	// dan met css verplaatsen
	card.classList.add("trash");
};
	
function likeCard(card) {
	// eerst class "like" op li zetten
	// dan met css verplaatsen
	card.classList.add("like");
	
	
	
	// en daarna li toevoegen aan ul.lijst
	// een kopie maken van het article
	let cardClone = card.cloneNode(true);
	cardClone.style = "";
	
	var playButton = cardClone.querySelector("button");
	playButton.addEventListener("click", function(event) {
		// vorige nummers uitzetten
		var favSongs = theList.querySelectorAll("li");
		favSongs.forEach(favSong => {
			let favSongAudio = favSong.querySelector("audio");
				favSongAudio.pause();
		}); 


		// nieuw nummer opzoeken/aanzetten
		theSong = event.target.closest("li");
		startPlayListSong(theSong);
	});

	// button maken
	let trashButton = document.createElement("button");
	trashButton.textContent = "🗑";
	// button laten luisteren naar clicks
	trashButton.addEventListener("click", trashFavo);
	// de trashButton aan de clone toevoegen
	cardClone.appendChild(trashButton);
	
	// de clone aan de ul toevoegen
	theList.appendChild(cardClone);
	
	
	
	// counter ophogen
	let huidigeWaarde = parseInt(theCounter.textContent);
	let nieuweWaarde = huidigeWaarde + 1;
	theCounter.textContent = nieuweWaarde;
};


function trashFavo(e) {
	// de button waarop geklikt is
	let theButton = e.target;
	// de favo card opzoeken die bij die button hoort
	let theFavoCard = theButton.closest("li");
	// die favo card verwijderen
	theFavoCard.remove();
	
	
	
	// counter verlagen
	let huidigeWaarde = parseInt(theCounter.textContent);
	let nieuweWaarde = huidigeWaarde - 1;
	theCounter.textContent = nieuweWaarde;
}





/**********************/
/* AFSPEELIJST OMHOOG */
/**********************/
var afspeellijstMenu = document.querySelector('.afspeellijst')
var afspeellijstButton = document.querySelector('.afspeellijstomhoog')

afspeellijstButton.addEventListener('click', function() {
    afspeellijstButton.classList.toggle('draaiom');
    afspeellijstMenu.classList.toggle('omhoog');
    console.log("omhoog")
});





/**********/
/* FILTER */
/**********/
var filterAlles = document.querySelector("#filter-alles");
var filterPop = document.querySelector("#filter-pop");
var filterHouse = document.querySelector("#filter-house");
var filterTechno = document.querySelector("#filter-techno");

function filterList(event){
    let deLijst = document.querySelector("ul");
    let nieuweFilter = event.target.value;
    deLijst.className = "";
    deLijst.classList.add(nieuweFilter);
  };

filterAlles.addEventListener("change", filterList);
filterPop.addEventListener("change", filterList);
filterHouse.addEventListener("change", filterList);
filterTechno.addEventListener("change", filterList);


/************/
/* SORTEREN */
/************/ 
function initSorteren() {
	let player = document.getElementById("list");
	var sortable = new Sortable(list, {
	  animation: 200
	});
};

window.onload = function() {
	initSorteren();
  };


/****************/
/* MUZIEKSPELER */
/****************/
var playPauseBtn = document.querySelector(".muziekspeler button");
// var playPauseBtn = document.querySelector(".playPause");

// variabelen voor waar de textcontent moet komen te staan
var hierNaamNummer = document.querySelector(".muziekspeler h2");
var hierNaamArtiest = document.querySelector(".muziekspeler h3");


// playpause button 
playPauseBtn.addEventListener('click', function() {
	var favSongs = theList.querySelectorAll("li");
	
	// als er geen in de rij staan dan niks
	if (favSongs.length > 0){
		var isPlaying = false;

		// voor elk liedje opzoeken binnen de favSong en dan kijken of die wordt afgspeeld
		favSongs.forEach(favSong => {
			let favSongAudio = favSong.querySelector("audio");
			if (!favSongAudio.paused) {
				isPlaying = true;
				favSongAudio.pause();
				hierNaamArtiest.textContent = "Naam Artiest";
				hierNaamNummer.textContent = "Naam Nummer";
				playPauseBtn.classList.remove("playing");
			}
		}); 
		// als er niks wordt afgespeeld wordt afspeellijst gestart na klikken
		if(isPlaying == false) {
			var firstSong = theList.querySelector("li");
			startPlayListSong (firstSong); 
				playPauseBtn.classList.add("playing");
		}

		
	}
	
});

// functie om de muziek te startten
function startPlayListSong (song) {
	// variabelen ophalen van een liedje
	var songTitle = song.querySelector("h3");
	var songArtist = song.querySelector("h2");
	var songAudio = song.querySelector("audio");
	// textcontent aanpassen in de muziekspeler
	hierNaamArtiest.textContent = songTitle.textContent;
	hierNaamNummer.textContent = songArtist.textContent;
	// audio afspelen
	songAudio.play();


	// wanneer de muziek is geeindigd het volgende nummer aanzetten
	songAudio.addEventListener('ended', (event) => {
		var currentSong = event.target.closest("li");
		var nextSong = currentSong.nextSibling;
		if (nextSong) {
			startPlayListSong (nextSong);
		}
		// wanneer er geen muziek is weer de oude textcontent neerzetten
		else {
			hierNaamArtiest.textContent = "Naam Artiest";
			hierNaamNummer.textContent = "Naam Nummer";

		}
	});
};