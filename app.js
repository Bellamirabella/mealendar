const options = {
  location: ["Bei mir zuhause", "Bei dem Mann", "Woanders"],
  cook: ["Ja", "Nein"],
  time: ["Frühstück", "Mittag", "Abend", "Kaffee/Kuchen", "Snack"],
  diet: [
    "Vegan",
    "Vegetarisch",
    "Glutenfrei",
    "Laktosefrei",
    "Fruktosearm",
    "Zuckerarm",
    "Zuckerfrei",
    "Low Carb",
    "Proteinreich",
    "Rohkost",
    "Ohne Nüsse",
    "Ohne Soja",
    "Ohne Ei",
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
  breakfast: ["Pfannkuchen", "Brot", "Brötchen", "Süßes Gebäck", "Müsli", "Joghurtspeise", "Obst", "Gemüse"],
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
  ]
};

const singleChoiceGroups = new Set(["location", "cook", "appetite"]);

const state = {
  date: "",
  customLocation: "",
  location: "",
  cook: "",
  time: new Set(),
  diet: new Set(),
  appetite: "",
  taste: new Set(),
  breakfast: new Set(),
  lunch: new Set()
};

let currentStep = 0;

const form = document.querySelector("#dateForm");
const progressFill = document.querySelector("#progressFill");
const stepCount = document.querySelector("#stepCount");
const summary = document.querySelector("#summary");
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
  const isHomeDate = state.location === "Bei mir zuhause" || state.location === "Bei dem Mann";

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
    appetite: "Menge",
    taste: "Geschmack",
    breakfast: "Frühstück",
    lunch: "Mittag",
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
    `Date: ${formatDate(state.date)}`,
    `Ort: ${state.location || "noch offen"}${state.customLocation ? ` (${state.customLocation})` : ""}`
  ];

  const isHomeDate = state.location === "Bei mir zuhause" || state.location === "Bei dem Mann";

  if (!isHomeDate || state.cook === "Nein") {
    lines.push("Ich freue mich auf das Date mit dir! <3");
    return lines.join("\n");
  }

  if (state.cook === "Ja") {
    lines.push(
      "Kochen/Backen: Ja",
      `Tageszeit: ${formatList([...state.time], "noch offen")}`,
      `Ernährung/Besonderheiten: ${formatList([...state.diet], "keine Angabe")}`,
      `Menge: ${state.appetite || "keine Angabe"}`,
      `Geschmack: ${formatList([...state.taste], "keine Angabe")}`
    );

    if (state.time.has("Frühstück")) {
      lines.push(`Frühstückswunsch: ${formatList([...state.breakfast], "noch offen")}`);
    }

    if (state.time.has("Mittag")) {
      lines.push(`Mittagswunsch: ${formatList([...state.lunch], "noch offen")}`);
    }
  } else if (isHomeDate) {
    lines.push("Kochen/Backen: noch offen");
  }

  return lines.join("\n");
}

function renderStep() {
  const steps = getActiveSteps();
  const activeStep = steps[currentStep];

  document.querySelectorAll(".step-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.step === activeStep);
  });

  const progress = ((currentStep + 1) / steps.length) * 100;
  progressFill.style.width = `${progress}%`;
  stepCount.textContent = `Schritt ${currentStep + 1} von ${steps.length}: ${getStepLabel(activeStep)}`;
  backButton.disabled = currentStep === 0;
  nextButton.textContent = activeStep === "final" ? "Zum Anfang" : "Weiter";
}

function render() {
  updatePressedStates();
  summary.textContent = buildSummary();
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
  state.taste.clear();
  state.breakfast.clear();
  state.lunch.clear();
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
  const text = buildSummary();
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
