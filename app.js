const options = {
  location: ["Bei Vanessa", "Bei mir", "Woanders"],
  cook: ["Ja", "Nein"],
  time: ["Frühstück", "Mittag", "Abend", "Kaffee/Kuchen", "Snacktime"],
  diet: [
    "Glutenfrei",
    "Fruktosearm",
    "Zuckerarm",
    "Zuckerfrei",
    "Stärkefrei",
    "Low Carb",
    "Proteinreich",
    "Rohkost",
    "Ohne Nüsse",
    "Ohne Soja",
    "Halal",
    "Koscher"
  ],
  appetite: ["Sehr wenig", "Wenig", "Mittel", "Viel", "Sehr viel"],
  taste: [
    "Würzig",
    "Salzig",
    "Süß",
    "Scharf",
    "Trocken",
    "Saftig",
    "Herzhaft",
    "Mild",
    "Frisch",
    "Cremig",
    "Knusprig",
    "Fruchtig"
  ],
  breakfast: ["Pfannkuchen", "Brot", "Brötchen", "Knäckebrot", "Süßes Gebäck", "Müsli", "Joghurtspeise", "Obst", "Gemüse"],
  lunch: [
    "Suppe",
    "Salat",
    "Bowl",
    "Pasta",
    "Spaghetti",
    "Pizza",
    "Pfannengericht",
    "Wok-Gericht",
    "Brotmahlzeit",
    "Wrap",
    "Sandwich",
    "Curry",
    "Eintopf",
    "Ofengericht"
  ],
  dinner: ["Brotmahlzeit", "Suppe", "Warmes Gericht", "Salat", "Rohkost"],
  warmDinner: ["Suppe", "Pasta", "Spaghetti", "Pizza", "Pfannengericht", "Wok-Gericht", "Curry", "Eintopf", "Ofengericht"],
  snack: ["Süßigkeiten", "Obst", "Gemüse", "Gebäck", "Was Herzhaftes", "Cracker", "Nüsse", "Trockenfrüchte", "Chips", "Dip"]
};

const veganFoods = [
    "Reis",
    "Naturreis",
    "Basmati",
    "Jasminreis",
    "Quinoa",
    "Glutenfreies Getreide",
    "Hirse",
    "Buchweizen",
    "Haferflocken",
    "Polenta",
    "Mais",
    "Kartoffeln",
    "Süßkartoffeln",
    "Nudeln ohne Ei",
    "Glasnudeln",
    "Reisnudeln",
    "Brot",
    "Brötchen",
    "Wraps",
    "Apfel",
    "Banane",
    "Birne",
    "Orange",
    "Mandarine",
    "Zitrone",
    "Limette",
    "Mango",
    "Ananas",
    "Kiwi",
    "Trauben",
    "Erdbeeren",
    "Himbeeren",
    "Blaubeeren",
    "Kirschen",
    "Pfirsich",
    "Nektarine",
    "Melone",
    "Granatapfel",
    "Tomaten",
    "Gurke",
    "Paprika",
    "Karotten",
    "Zucchini",
    "Aubergine",
    "Brokkoli",
    "Blumenkohl",
    "Spinat",
    "Rucola",
    "Salat",
    "Kohlrabi",
    "Fenchel",
    "Sellerie",
    "Lauch",
    "Zwiebeln",
    "Knoblauch",
    "Pilze",
    "Kürbis",
    "Rote Bete",
    "Linsen",
    "Rote Linsen",
    "Belugalinsen",
    "Kichererbsen",
    "Kidneybohnen",
    "Schwarze Bohnen",
    "Weiße Bohnen",
    "Erbsen",
    "Edamame",
    "Sojabohnen",
    "Tofu",
    "Räuchertofu",
    "Seidentofu",
    "Tempeh",
    "Seitan",
    "Falafel",
    "Hummus",
    "Veganes Hack",
    "Vegane Nuggets",
    "Vegane Würstchen",
    "Lupinenprodukte",
    "Mandeln",
    "Walnüsse",
    "Haselnüsse",
    "Cashews",
    "Pistazien",
    "Erdnüsse",
    "Sonnenblumenkerne",
    "Kürbiskerne",
    "Sesam",
    "Chiasamen",
    "Leinsamen",
    "Hanfsamen",
    "Hafermilch",
    "Sojamilch",
    "Mandelmilch",
    "Reismilch",
    "Kokosmilch",
    "Veganer Joghurt",
    "Vegane Sahne",
    "Vegane Creme fraiche",
    "Veganer Käse",
    "Veganer Frischkäse",
    "Vegane Butter",
    "Olivenöl",
    "Rapsöl",
    "Sesamöl",
    "Avocado",
    "Tahini",
    "Erdnussmus",
    "Mandelmus",
    "Tomatensauce",
    "Pesto vegan",
    "Sojasauce",
    "Tamari",
    "Sriracha",
    "Senf",
    "Ahornsirup",
    "Agavendicksaft",
    "Basilikum",
    "Petersilie",
    "Koriander",
    "Minze",
    "Schnittlauch",
    "Rosmarin",
    "Thymian",
    "Oregano",
    "Paprikapulver",
    "Curry",
    "Kurkuma",
    "Kreuzkümmel",
    "Chili",
    "Pfeffer",
    "Zimt",
    "Ingwer"
];

options.likedFoods = veganFoods;

const singleChoiceGroups = new Set(["location", "cook", "appetite"]);

const state = {
  date: "",
  customLocation: "",
  location: "",
  cook: "",
  time: new Set(),
  diet: new Set(),
  likedFoods: new Set(),
  appetite: "",
  taste: new Set(),
  breakfast: new Set(),
  lunch: new Set(),
  dinner: new Set(),
  warmDinner: new Set(),
  snack: new Set(),
  breakfastNote: "",
  lunchNote: "",
  dinnerNote: "",
  warmDinnerNote: "",
  snackNote: ""
};

let currentStep = 0;
let appStarted = false;
let lastTypedStep = "";
let questionTypeToken = 0;
let readyYesScale = 1;

const form = document.querySelector("#dateForm");
const introScreen = document.querySelector("#introScreen");
const appShell = document.querySelector("#appShell");
const typedIntro = document.querySelector("#typedIntro");
const readyChoices = document.querySelector("#readyChoices");
const readyYes = document.querySelector("#readyYes");
const readyNo = document.querySelector("#readyNo");
const progressFill = document.querySelector("#progressFill");
const stepCount = document.querySelector("#stepCount");
const summary = document.querySelector("#summary");
const finalTitle = document.querySelector("#finalTitle");
const copyButton = document.querySelector("#copyButton");
const copyStatus = document.querySelector("#copyStatus");
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");
const dateInput = document.querySelector("#dateInput");
const customLocation = document.querySelector("#customLocation");
const noteInputs = {
  breakfastNote: document.querySelector("#breakfastNote"),
  lunchNote: document.querySelector("#lunchNote"),
  dinnerNote: document.querySelector("#dinnerNote"),
  warmDinnerNote: document.querySelector("#warmDinnerNote"),
  snackNote: document.querySelector("#snackNote")
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeText(text, speed = 58) {
  typedIntro.textContent = "";
  for (const char of text) {
    typedIntro.textContent += char;
    await wait(speed);
  }
}

async function typeIntoElement(element, text, speed = 38) {
  const token = ++questionTypeToken;
  element.textContent = "";
  for (const char of text) {
    if (token !== questionTypeToken) return false;
    element.textContent += char;
    await wait(speed);
  }
  return token === questionTypeToken;
}

async function eraseText(speed = 28) {
  while (typedIntro.textContent.length) {
    typedIntro.textContent = typedIntro.textContent.slice(0, -1);
    await wait(speed);
  }
}

async function runIntro() {
  await typeText("Hellooooo...Ich habe ein paar kurze Fragen an dich.");
  await wait(900);
  await eraseText();
  await typeText("Bereit?", 72);
  readyChoices.hidden = false;
}

function showApp() {
  appStarted = true;
  lastTypedStep = "";
  introScreen.classList.add("is-hidden");
  appShell.classList.remove("is-hidden");
  render();
}

function moveRunawayButton() {
  readyYesScale = Math.min(2.15, readyYesScale + 0.18);
  readyYes.style.transform = `scale(${readyYesScale})`;
  const maxX = Math.max(0, window.innerWidth - readyNo.offsetWidth - 24);
  const maxY = Math.max(0, window.innerHeight - readyNo.offsetHeight - 24);
  readyNo.classList.add("is-running");
  readyNo.style.left = `${Math.floor(Math.random() * maxX)}px`;
  readyNo.style.top = `${Math.floor(Math.random() * maxY)}px`;
}

function createChip(label, group) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.textContent = label;
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    if (singleChoiceGroups.has(group)) {
      state[group] = state[group] === label ? "" : label;
    } else {
      const selected = state[group];
      selected.has(label) ? selected.delete(label) : selected.add(label);
    }
    keepStepInRange();
    render();
  });
  return button;
}

function renderOptionGroup(group) {
  const target = document.querySelector(`[data-group="${group}"]`);
  target.innerHTML = "";
  options[group].forEach((label) => target.append(createChip(label, group)));
}

function getActiveSteps() {
  const steps = ["date", "location"];
  const isHomeDate = state.location === "Bei Vanessa" || state.location === "Bei mir";

  if (isHomeDate) {
    steps.push("cook");
  }

  if (!isHomeDate || state.cook === "Nein") {
    steps.push("final");
    return steps;
  }

  if (state.cook === "Ja") {
    steps.push("time", "diet", "appetite", "taste");
    if (state.time.has("Frühstück")) {
      steps.push("breakfast");
    }
    if (state.time.has("Mittag")) {
      steps.push("lunch");
    }
    if (state.time.has("Abend")) {
      steps.push("dinner");
      if (state.dinner.has("Warmes Gericht")) {
        steps.push("warmDinner");
      }
    }
    if (state.time.has("Snacktime")) {
      steps.push("snack");
    }
    steps.push("likedFoods");
    steps.push("final");
  }

  return steps;
}

function getStepLabel(step) {
  const labels = {
    date: "Datum",
    location: "Ort",
    cook: "Kochen/Backen",
    time: "Tageszeit",
    diet: "Ernährung",
    likedFoods: "Lebensmittel",
    appetite: "Menge",
    taste: "Geschmack",
    breakfast: "Frühstück",
    lunch: "Mittag",
    dinner: "Abendbrot",
    warmDinner: "Warmes Gericht",
    snack: "Snack",
    final: "Fertig"
  };
  return labels[step] || step;
}

function keepStepInRange() {
  const steps = getActiveSteps();
  currentStep = Math.min(currentStep, steps.length - 1);
}

function updatePressedStates() {
  document.querySelectorAll(".chip").forEach((chip) => {
    const group = chip.closest("[data-group]")?.dataset.group;
    const label = chip.textContent;
    if (!group) return;

    if (singleChoiceGroups.has(group)) {
      chip.setAttribute("aria-pressed", state[group] === label);
      return;
    }

    chip.setAttribute("aria-pressed", state[group].has(label));
  });
}

function formatList(values, fallback) {
  return values.length ? values.join(", ") : fallback;
}

function formatDate(value) {
  if (!value) return "noch nicht ausgewählt";
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function buildSummary() {
  const lines = [
    `<strong>Date:</strong> ${formatDate(state.date)}`,
    `<strong>Ort:</strong> ${state.location || "noch offen"}${state.customLocation ? ` (${state.customLocation})` : ""}`
  ];

  const isHomeDate = state.location === "Bei Vanessa" || state.location === "Bei mir";

  if (state.cook === "Nein") {
    lines.push("<strong>Kochen/Backen:</strong> Vanessa braucht nicht für mich kochen oder backen.");
    return lines.join("\n");
  }

  if (!isHomeDate) {
    return lines.join("\n");
  }

  if (state.cook === "Ja") {
    lines.push(
      "<strong>Kochen/Backen:</strong> Ja",
      `<strong>Tageszeit:</strong> ${formatList([...state.time], "noch offen")}`,
      `<strong>Ernährung/Besonderheiten:</strong> ${formatList([...state.diet], "keine Angabe")}`,
      `<strong>Menge:</strong> ${state.appetite || "keine Angabe"}`,
      `<strong>Geschmack:</strong> ${formatList([...state.taste], "keine Angabe")}`
    );

    if (state.time.has("Frühstück")) {
      lines.push(`<strong>Frühstückswunsch:</strong> ${formatList([...state.breakfast], "noch offen")}`);
      if (state.breakfastNote) lines.push(`<strong>Genauer Frühstückswunsch:</strong> ${state.breakfastNote}`);
    }

    if (state.time.has("Mittag")) {
      lines.push(`<strong>Mittagswunsch:</strong> ${formatList([...state.lunch], "noch offen")}`);
      if (state.lunchNote) lines.push(`<strong>Genauer Mittagswunsch:</strong> ${state.lunchNote}`);
    }

    if (state.time.has("Abend")) {
      lines.push(`<strong>Abendbrotwunsch:</strong> ${formatList([...state.dinner], "noch offen")}`);
      if (state.dinnerNote) lines.push(`<strong>Genauer Abendbrotwunsch:</strong> ${state.dinnerNote}`);
      if (state.dinner.has("Warmes Gericht")) {
        lines.push(`<strong>Warmes Gericht:</strong> ${formatList([...state.warmDinner], "noch offen")}`);
        if (state.warmDinnerNote) lines.push(`<strong>Genauer Wunsch zum warmen Abendessen:</strong> ${state.warmDinnerNote}`);
      }
    }

    if (state.time.has("Snacktime")) {
      lines.push(`<strong>Snackwunsch:</strong> ${formatList([...state.snack], "noch offen")}`);
      if (state.snackNote) lines.push(`<strong>Genauer Snackwunsch:</strong> ${state.snackNote}`);
    }

    lines.push(`<strong>Lebensmittel, die ich mag:</strong> ${formatList([...state.likedFoods], "keine ausgewählt")}`);
  } else if (isHomeDate) {
    lines.push("<strong>Kochen/Backen:</strong> noch offen");
  }

  return lines.join("\n");
}

function renderStep() {
  const steps = getActiveSteps();
  const activeStep = steps[currentStep];
  const isHomeDate = state.location === "Bei Vanessa" || state.location === "Bei mir";
  finalTitle.textContent = (!isHomeDate || state.cook === "Nein") ? "Ich freue mich auf unser Date!" : "Fertig. Ich freue mich auf Dich.";

  document.querySelectorAll(".step-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.step === activeStep);
  });

  const progress = ((currentStep + 1) / steps.length) * 100;
  progressFill.style.width = `${progress}%`;
  stepCount.textContent = `Schritt ${currentStep + 1} von ${steps.length}: ${getStepLabel(activeStep)}`;
  backButton.disabled = currentStep === 0;
  nextButton.textContent = activeStep === "final" ? "Zum Anfang" : "Weiter";

  const activePanel = document.querySelector(`.step-panel[data-step="${activeStep}"]`);
  if (appStarted && activePanel && lastTypedStep !== activeStep) {
    const title = activePanel.querySelector("h2");
    if (activeStep === "final" && title) {
      title.dataset.fullQuestion = finalTitle.textContent;
    }
    const question = title?.dataset.fullQuestion || title?.textContent || "";
    if (title) {
      title.dataset.fullQuestion = question;
      activePanel.classList.remove("question-ready");
      lastTypedStep = activeStep;
      typeIntoElement(title, question).then((finished) => {
        if (finished && document.querySelector(".step-panel.is-active") === activePanel) {
          activePanel.classList.add("question-ready");
        }
      });
    }
  } else if (activePanel && lastTypedStep === activeStep) {
    activePanel.classList.add("question-ready");
  }
}

function render() {
  updatePressedStates();
  summary.innerHTML = buildSummary();
  copyStatus.textContent = "";
  renderStep();
}

function resetState() {
  state.date = "";
  state.customLocation = "";
  state.location = "";
  state.cook = "";
  state.time.clear();
  state.diet.clear();
  state.likedFoods.clear();
  state.taste.clear();
  state.breakfast.clear();
  state.lunch.clear();
  state.dinner.clear();
  state.warmDinner.clear();
  state.snack.clear();
  state.breakfastNote = "";
  state.lunchNote = "";
  state.dinnerNote = "";
  state.warmDinnerNote = "";
  state.snackNote = "";
  state.appetite = "";
  currentStep = 0;
  lastTypedStep = "";
  dateInput.value = "";
  customLocation.value = "";
  Object.values(noteInputs).forEach((input) => {
    input.value = "";
  });
  render();
}

Object.keys(options).forEach(renderOptionGroup);

runIntro();
readyYes.addEventListener("click", showApp);
["mouseenter", "focus", "pointerdown", "touchstart", "click"].forEach((eventName) => {
  readyNo.addEventListener(eventName, (event) => {
    event.preventDefault();
    moveRunawayButton();
  });
});

dateInput.addEventListener("input", () => {
  state.date = dateInput.value;
  render();
});

customLocation.addEventListener("input", () => {
  state.customLocation = customLocation.value.trim();
  render();
});

Object.entries(noteInputs).forEach(([key, input]) => {
  input.addEventListener("input", () => {
    state[key] = input.value.trim();
    render();
  });
});

backButton.addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  render();
});

nextButton.addEventListener("click", () => {
  const steps = getActiveSteps();
  if (steps[currentStep] === "final") {
    currentStep = 0;
  } else {
    currentStep = Math.min(steps.length - 1, currentStep + 1);
  }
  render();
});

copyButton.addEventListener("click", async () => {
  const text = summary.innerText;
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Kopiert.";
  } catch {
    copyStatus.textContent = "Kopieren ist hier nicht verfügbar. Text bitte manuell markieren.";
  }
});

form.addEventListener("reset", (event) => {
  event.preventDefault();
  resetState();
});

render();
