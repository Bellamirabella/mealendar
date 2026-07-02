const options = {
  dishes: [
    "Suppe",
    "Salat",
    "Bowl",
    "Pasta",
    "Wrap/Sandwich",
    "Curry/Eintopf",
    "Ofengericht",
    "Frühstück",
    "Dessert/Süßes",
    "Snack/Kleinigkeit",
    "Getränk/Smoothie"
  ],
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
  hunger: [
    "Keinen Hunger",
    "Wenig Hunger",
    "Mittelmäßig Hunger",
    "Starker Hunger",
    "Sehr starker Hunger"
  ],
  spice: ["Mild", "Würzig", "Scharf"]
};

const ingredientCatalog = {
  "Suppe": ["Kartoffeln", "Karotten", "Kürbis", "Linsen", "Kichererbsen", "Tomaten", "Kokosmilch", "Ingwer", "Croutons"],
  "Salat": ["Blattsalat", "Gurke", "Tomaten", "Paprika", "Mais", "Oliven", "Feta", "Avocado", "Kerne"],
  "Bowl": ["Reis", "Quinoa", "Couscous", "Edamame", "Süßkartoffel", "Avocado", "Tofu", "Falafel", "Sesam"],
  "Pasta": ["Spaghetti", "Penne", "Gnocchi", "Glutenfreie Pasta", "Tomatensauce", "Pesto", "Pilze", "Spinat", "Parmesan", "Chiliöl"],
  "Wrap/Sandwich": ["Tortilla", "Mais-Tortilla", "Glutenfreies Brot", "Fladenbrot", "Hummus", "Salat", "Gurke", "Tomate", "Tofu", "Falafel", "Käse"],
  "Curry/Eintopf": ["Reis", "Kartoffeln", "Kichererbsen", "Linsen", "Kokosmilch", "Spinat", "Blumenkohl", "Tofu", "Koriander"],
  "Ofengericht": ["Kartoffeln", "Süßkartoffeln", "Gemüse", "Feta", "Käse", "Tomatensauce", "Kichererbsen", "Kräuter", "Knoblauch"],
  "Frühstück": ["Glutenfreie Haferflocken", "Haferflocken", "Joghurt", "Beeren", "Banane", "Nüsse", "Samen", "Toast", "Glutenfreies Brot", "Avocado", "Rührei"],
  "Dessert/Süßes": ["Schokolade", "Beeren", "Banane", "Vanille", "Joghurt", "Kokos", "Nüsse", "Keksboden", "Zimt"],
  "Snack/Kleinigkeit": ["Gemüsesticks", "Hummus", "Nüsse", "Obst", "Glutenfreie Cracker", "Cracker", "Käse", "Oliven", "Dattel", "Dip"],
  "Getränk/Smoothie": ["Banane", "Beeren", "Mango", "Spinat", "Hafermilch", "Joghurt", "Ingwer", "Minze", "Zitrone"]
};

const dietIngredientHints = {
  "Vegan": ["Tofu", "Tempeh", "Hummus", "Kichererbsen", "Hafermilch"],
  "Vegetarisch": ["Ei", "Feta", "Halloumi", "Joghurt", "Käse"],
  "Glutenfrei": ["Reis", "Quinoa", "Kartoffeln", "Glutenfreie Pasta", "Mais-Tortilla"],
  "Laktosefrei": ["Laktosefreier Joghurt", "Hafermilch", "Kokosmilch", "Laktosefreier Käse"],
  "Fruktosearm": ["Reis", "Kartoffeln", "Gurke", "Spinat", "Naturjoghurt"],
  "Zuckerarm": ["Beeren", "Nüsse", "Zimt", "Naturjoghurt"],
  "Zuckerfrei": ["Nüsse", "Samen", "Naturjoghurt", "Gemüsesticks"],
  "Low Carb": ["Blumenkohlreis", "Zucchini", "Salat", "Tofu", "Ei"],
  "Proteinreich": ["Linsen", "Bohnen", "Tofu", "Ei", "Joghurt"],
  "Rohkost": ["Gurke", "Karotte", "Paprika", "Apfel", "Kohlrabi"],
  "Ohne Nüsse": ["Kerne", "Sesam", "Croutons ohne Nüsse", "Samen"],
  "Ohne Soja": ["Linsen", "Bohnen", "Falafel", "Ei", "Halloumi"],
  "Ohne Ei": ["Tofu", "Falafel", "Hummus", "Kichererbsen"],
  "Halal": ["Falafel", "Kichererbsen", "Gemüse", "Reis", "Linsen"],
  "Koscher": ["Gemüse", "Reis", "Linsen", "Kichererbsen", "Obst"]
};

const blockedByDiet = {
  "Vegan": ["Feta", "Parmesan", "Käse", "Halloumi", "Joghurt", "Naturjoghurt", "Laktosefreier Joghurt", "Laktosefreier Käse", "Rührei", "Ei"],
  "Glutenfrei": ["Spaghetti", "Penne", "Gnocchi", "Tortilla", "Fladenbrot", "Toast", "Cracker", "Croutons"],
  "Laktosefrei": ["Feta", "Parmesan", "Käse", "Halloumi", "Joghurt", "Naturjoghurt"],
  "Ohne Nüsse": ["Nüsse"],
  "Ohne Soja": ["Tofu", "Tempeh", "Edamame"],
  "Ohne Ei": ["Ei", "Rührei"],
  "Zuckerfrei": ["Schokolade", "Keksboden", "Dattel"],
  "Fruktosearm": ["Apfel", "Mango", "Banane", "Beeren", "Obst", "Dattel"]
};

const state = {
  dishes: new Set(),
  diet: new Set(),
  ingredients: new Set(),
  hunger: "",
  spice: ""
};

const stepNames = ["Gericht", "Ernährung", "Hunger", "Schärfe", "Zutaten", "Fertig"];
let currentStep = 0;

const form = document.querySelector("#foodForm");
const progressFill = document.querySelector("#progressFill");
const stepCount = document.querySelector("#stepCount");
const summary = document.querySelector("#summary");
const ingredientHint = document.querySelector("#ingredientHint");
const ingredientGroups = document.querySelector("#ingredientGroups");
const customRequest = document.querySelector("#customRequest");
const copyButton = document.querySelector("#copyButton");
const copyStatus = document.querySelector("#copyStatus");
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");

function createChip(label, group, singleChoice = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.textContent = label;
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    if (singleChoice) {
      state[group] = state[group] === label ? "" : label;
    } else {
      const selected = state[group];
      selected.has(label) ? selected.delete(label) : selected.add(label);
    }
    render();
  });
  return button;
}

function renderOptionGroup(group, singleChoice = false) {
  const target = document.querySelector(`[data-group="${group}"]`);
  target.innerHTML = "";
  options[group].forEach((label) => target.append(createChip(label, group, singleChoice)));
}

function filterIngredients(items) {
  const blocked = new Set();
  state.diet.forEach((diet) => {
    (blockedByDiet[diet] || []).forEach((item) => blocked.add(item));
  });
  return items.filter((item) => !blocked.has(item));
}

function getSuggestedIngredients() {
  const groups = [];
  state.dishes.forEach((dish) => {
    groups.push({ title: dish, items: filterIngredients(ingredientCatalog[dish] || []) });
  });

  const dietItems = new Set();
  state.diet.forEach((diet) => {
    filterIngredients(dietIngredientHints[diet] || []).forEach((item) => dietItems.add(item));
  });

  if (dietItems.size) {
    groups.push({ title: "Passend zu Ernährung", items: [...dietItems] });
  }
  return groups;
}

function syncSelectedIngredientsWithDiet() {
  state.ingredients.forEach((item) => {
    if (!filterIngredients([item]).length) {
      state.ingredients.delete(item);
    }
  });
}

function renderIngredients() {
  syncSelectedIngredientsWithDiet();
  const groups = getSuggestedIngredients();
  ingredientGroups.innerHTML = "";
  ingredientHint.textContent = groups.length ? "Zutaten anklicken, die dabei sein sollen." : "Wähle erst ein Gericht aus.";

  groups.forEach((group) => {
    const section = document.createElement("div");
    section.className = "ingredient-group";

    const title = document.createElement("div");
    title.className = "ingredient-title";
    title.innerHTML = `<h3>${group.title}</h3><span>${group.items.length} Vorschläge</span>`;

    const chips = document.createElement("div");
    chips.className = "chip-grid";
    group.items.forEach((item) => chips.append(createChip(item, "ingredients")));

    section.append(title, chips);
    ingredientGroups.append(section);
  });
}

function updatePressedStates() {
  document.querySelectorAll(".chip").forEach((chip) => {
    const label = chip.textContent;
    const group = chip.closest("[data-group]")?.dataset.group;
    const inIngredients = chip.closest(".ingredient-group");

    if (inIngredients) {
      chip.setAttribute("aria-pressed", state.ingredients.has(label));
      return;
    }

    if (group === "hunger" || group === "spice") {
      chip.setAttribute("aria-pressed", state[group] === label);
      return;
    }

    chip.setAttribute("aria-pressed", state[group].has(label));
  });
}

function formatList(values, fallback) {
  return values.length ? values.join(", ") : fallback;
}

function buildSummary() {
  const lines = [
    `Gericht: ${formatList([...state.dishes], "noch offen")}`,
    `Ernährung/Besonderheiten: ${formatList([...state.diet], "keine Angabe")}`,
    `Hunger: ${state.hunger || "keine Angabe"}`,
    `Schärfe: ${state.spice || "keine Angabe"}`,
    `Zutaten: ${formatList([...state.ingredients], "noch keine ausgewählt")}`
  ];

  const note = customRequest.value.trim();
  if (note) {
    lines.push(`Eigene Angabe: ${note}`);
  }

  return lines.join("\n");
}

function renderStep() {
  document.querySelectorAll(".step-panel").forEach((panel, index) => {
    panel.classList.toggle("is-active", index === currentStep);
  });

  const progress = ((currentStep + 1) / stepNames.length) * 100;
  progressFill.style.width = `${progress}%`;
  stepCount.textContent = `Schritt ${currentStep + 1} von ${stepNames.length}: ${stepNames[currentStep]}`;
  backButton.disabled = currentStep === 0;
  nextButton.textContent = currentStep === stepNames.length - 1 ? "Zum Anfang" : "Weiter";
}

function render() {
  renderIngredients();
  updatePressedStates();
  summary.textContent = buildSummary();
  copyStatus.textContent = "";
  renderStep();
}

function resetState() {
  state.dishes.clear();
  state.diet.clear();
  state.ingredients.clear();
  state.hunger = "";
  state.spice = "";
  currentStep = 0;
  customRequest.value = "";
  render();
}

Object.keys(options).forEach((group) => {
  renderOptionGroup(group, group === "hunger" || group === "spice");
});

customRequest.addEventListener("input", render);

backButton.addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  render();
});

nextButton.addEventListener("click", () => {
  if (currentStep === stepNames.length - 1) {
    currentStep = 0;
  } else {
    currentStep += 1;
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
