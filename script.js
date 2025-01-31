console.log("Mein Skript starter hier!");

// register GSAP Flip Plugin
gsap.registerPlugin(Flip);

// Step 1: Hole das ganze GRID
const grid = document.querySelector("main");

// Step 2: Hole BUTTON und speicher in Variable
const buttonAll = document.querySelector("button"); // ALL Button
const buttonEx = document.querySelector("button[data-type=ex]"); // EX Button
const buttonActual = document.querySelector("button[data-type=actual"); // Actual Button

const filterItems = (event) => {
  // event => das was passiert ist: onclick
  // event.target => das ITEM, dass das Event getriggert hat!
  const type = event.target.dataset.type;

  // STEP 4: Hole alle SECTIONS als Liste
  // querySelectorAll holt MEHRERE Items
  const sections = document.querySelectorAll("section");

  // STEP 5: "Recorde" absolute (!) Positions von allen Sections mit GSAP Flip
  const stateSections = Flip.getState(sections);

  // STEP 5: Filtere Items
  // if case: ALL Button gedrückt (= Button hat kein data attribute) 
    // => setze ALLE Items zurück 
  // else if case: Check ob Item das gesucht ist => wenn ja: setze display block (visible)
  // else case: Item is nicht das gesuchte => setze display:none (hide) 
  sections.forEach((section) => {
    console.log(section.dataset.type);

    // checke ob button KEIN Data Attribute hat
    // => heißt: ALL Button wurde geklickt
    if (!event.target.dataset.type) {
      section.style.display = "block";
    }

    // du BIST das Item, dass wir wollen => REIN!
    else if (section.dataset.type === type) {
      section.style.display = "block";
    }
    // du bist nicht das Item, dass wir wollen => RAUS!
    else {
      section.style.display = "none";
    }
  });

  // animiere items von voriger position zu neuer position mit Flip.from  
  Flip.from(stateSections, {
    duration: 1,
    ease: "power1.inOut",
    absolute: true,
    // handles elements that are fading IN (= were set to display:block)
    onEnter: (elements) =>
      gsap.fromTo(
        elements,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.5 }
      ),
    // handles elements that are fading OUT (= were set to display:none)
    onLeave: (elements) =>
      gsap.to(elements, { scale: 0, opacity: 0, duration: 0.5 }),
  });
};

// führe SELBE FUNCTION beim Klick aus, bei verschiedenen Buttons
buttonActual.onclick = filterItems;
buttonEx.onclick = filterItems;
buttonAll.onclick = filterItems;

// ** For Fun: Füge neues Element ins Grid ein
// const divNew = document.createElement("section")
// // überschreibe etwas vom default style der section
// divNew.style.backgroundColor = "lime";
// // schreibe einen Text ins Element
// divNew.innerText = "6"
// // adde item in den grid container
// grid.append(divNew)
