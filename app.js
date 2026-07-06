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
  warmDinner: ["Suppe", "Pasta", "Spaghetti", "Pfannengericht", "Wok-Gericht", "Curry", "Eintopf", "Ofengericht"],
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
  snack: new Set()
};

let currentStep = 0;

const form = document.querySelector("#dateForm");
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
    }

    if (state.time.has("Mittag")) {
      lines.push(`<strong>Mittagswunsch:</strong> ${formatList([...state.lunch], "noch offen")}`);
    }

    if (state.time.has("Abend")) {
      lines.push(`<strong>Abendbrotwunsch:</strong> ${formatList([...state.dinner], "noch offen")}`);
      if (state.dinner.has("Warmes Gericht")) {
        lines.push(`<strong>Warmes Gericht:</strong> ${formatList([...state.warmDinner], "noch offen")}`);
      }
    }

    if (state.time.has("Snacktime")) {
      lines.push(`<strong>Snackwunsch:</strong> ${formatList([...state.snack], "noch offen")}`);
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

  document.querySelectorAll(".step-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.step === activeStep);
  });

  const progress = ((currentStep + 1) / steps.length) * 100;
  progressFill.style.width = `${progress}%`;
  stepCount.textContent = `Schritt ${currentStep + 1} von ${steps.length}: ${getStepLabel(activeStep)}`;
  backButton.disabled = currentStep === 0;
  nextButton.textContent = activeStep === "final" ? "Zum Anfang" : "Weiter";
  finalTitle.textContent = (!isHomeDate || state.cook === "Nein") ? "Ich freue mich auf unser Date!" : "Fertig. Ich freue mich auf Dich.";
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
  state.appetite = "";
  currentStep = 0;
  dateInput.value = "";
  customLocation.value = "";
  render();
}

Object.keys(options).forEach(renderOptionGroup);

dateInput.addEventListener("input", () => {
  state.date = dateInput.value;
  render();
});

customLocation.addEventListener("input", () => {
  state.customLocation = customLocation.value.trim();
  render();
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
