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
	cardHammer.on("swipeleft", (e) => {
		let card = e.target;
		trashCard(card);
	});
	cardHammer.on("swiperight", (e) => {
		let card = e.target;
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