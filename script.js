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

  // Step 4: Hole alle SECTIONS als Liste
  // querySelectorAll holt MEHRERE Items
  const sections = document.querySelectorAll("section");

  // snapshot positions of all sections (=> absolute)
  const stateSections = Flip.getState(sections);

  // STEP 5: Verschiebe erstes Item aus der Liste an letzte Stelle!
  // mit sections[0] komme ich an ERSTE Section heran
  // mit sections[2] => DRITTE Section, usw
  // mit sections[sections.length-1] => LETZTE Section im Grid
  // grid.append(sections[0]);

  sections.forEach((section) => {
    console.log(section.dataset.type);
    // checke ob button KEIN Data Attribute hat
    // => heißt: ALLE Items anzeigen!
    if (!event.target.dataset.type) {
      section.style.display = "block";
    }

    // du bist nicht das Item, dass wir wollen => RAUS!
    else if (section.dataset.type !== type) {
      section.style.display = "none";
    }
    // du BIST das Item, dass wir wollen => REIN!
    else {
      section.style.display = "block";
    }
  });

  // Teste ob Flip Plugin in JS geladen wurde
  // console.log(Flip);
  Flip.from(stateSections, {
    duration: 1,
    ease: "power1.inOut",
    absolute: true,
    onEnter: (elements) =>
      gsap.fromTo(
        elements,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.5 }
      ),
    // // handles elements that are fading out (= were set to display:none)
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
