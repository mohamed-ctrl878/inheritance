# Explanation

Welcome — this repository contains a simple front-end application for **inheritance share calculation**. The app builds a family tree from user selections and computes how inheritance is distributed according to the choices. It's implemented in **vanilla JavaScript** and relies on DOM elements present in an HTML page.

---

## Quick summary

The app:

* Lets the user choose the deceased's gender (via a popup).
* Lets the user select relatives (son, daughter, father, mother, brother, sister, paternal/maternal uncles/aunts, husband/wife, etc.).
* Builds a tree of relationships using the `FamilyTree` class.
* Runs a set of calculation routines to produce shares (fractions like 1/2, 1/3, 1/6, 1/4, 1/8 or textual "Association" cases).
* Displays the results in an HTML table.

---

## Features

* Dynamic family-tree construction using the `FamilyTree` class.
* Support for multiple branches (sons, fathers, brothers, paternal/maternal uncles, spouse(s)).
* Step-by-step UI with a popup that asks for the deceased's gender.
* Various share calculation cases with special handling for associations and multiple heirs.
* Result table generation for display and printing.

---

## Required HTML structure (recommended)

> Place the script after the DOM elements or include it at the end of the `<body>` so elements exist before the script runs.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Inheritance Calculator</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <!-- Add CSS here -->
</head>
<body>
  <!-- popup hint -->
  <div id="pop" class="popup"> ... </div>

  <!-- gender choice popup -->
  <div class="choice">
    <button class="male">Male</button>
    <button class="female">Female</button>
  </div>

  <!-- members buttons (each must match the exact text used in the script) -->
  <div class="members">
    <button class="hers member">son</button>
    <button class="hers member">daughter</button>
    <button class="hers member">father</button>
    <button class="hers member">mother</button>
    <button class="hers member">brother</button>
    <button class="hers member">sister</button>
    <button class="hers member">paternal uncle</button>
    <button class="hers member">maternal uncle</button>
    <button class="hers member husband">husband</button>
    <button class="hers member wife">wife</button>
  </div>

  <!-- selected path display -->
  <div class="inhers"><span></span></div>

  <!-- controls and results -->
  <button class="next">Next</button>
  <button class="result">Get Result</button>
  <div class="results" style="display:none"></div>
  <button class="btn-back">Back</button>

  <script src="path/to/your/script.js"></script>
</body>
</html>
```

> **Important:** Button text and class names must match exactly the strings used in the JavaScript (e.g. `"son"`, `"daughter"`, `"father"`, `"mother"`, `"husband"`, `"wife"`, `"paternal uncle"`, etc.).

---

## How to run (local)

1. Put the project files (HTML, CSS, JS) in a folder.
2. Open `index.html` in a browser (it usually works directly).

   * If you encounter local file restrictions, use a tiny static server such as:

     * **Live Server** extension in VS Code, or
     * `npx http-server` (if Node.js is installed).
3. Use the UI: pick the deceased gender, select relatives in order, then click **Get Result** to see the calculated shares.

---

## Code structure (brief)

* `FamilyTree` class — represents nodes (value, gender, children) and is used to build branches.
* Root nodes: `sonsROOT`, `fathersROOT`, `brothersROOT`, `husbandROOT`, `wifeROOT`, `punclesROOT`, `munclesROOT`.
* `addBranch` — builds a branch from the current selection array.
* `goToNext`, `members.forEach(...)` — handle user selections and UI updates.
* Calculation pipeline functions:

  * `getSon`, `getHusband`, `getBrorther`, `getFathers`, `getUncles`
  * `sonResult`, `fatherRes`, `huswife`, `sisterRes`, `deepMother`, `deepFather`, `puncles`
* `addTable` — creates and appends the result table to `.results`.
* `removeMemo` — resets all state for a new calculation.

---

## Required DOM classes/elements (summary)

Make sure the following exist in your HTML and are consistent with the script:

* `#pop` (popup hint)
* `.popup`, `.choice`, `.choice .male`, `.choice .female`
* `.members .hers` (the relative buttons)
* `.inhers` (display of chosen path)
* `.next`, `.result`, `.results`, `.btn-back`
* Optional helper classes used for hiding/showing: `.son-non`, `.father-non`, `.husband-non`, `.uncle-non`, `.mother-non`, `.orign`, `.wife`, `.husband`

---

## Tips & maintenance notes

* The script relies heavily on exact DOM class names and button text — changes require corresponding updates in JS.
* `sessionStorage` is used to remember the popup state: `sessionStorage.setItem("here","true")`.
* The code uses `arrayFromChoice.reverse()` in places which mutates the original array; consider using a non-mutating copy (`[...arrayFromChoice].reverse()`) to avoid side effects.
* `removeChildsFromRoots` sets fields to `null` and recursively calls itself; ensure it is only called on non-empty roots to avoid exceptions.

**Suggested improvements**

* Separate calculation logic from DOM manipulation (decouple business logic for unit testing).
* Add unit tests for the main inheritance scenarios.
* Replace string literals with constants or an enum-like object to reduce brittle string comparisons.
* Localize button labels (e.g., provide Arabic/English versions) if you need multilingual UI.

---

## Known issues

* Errors if a required DOM element is missing — the script sometimes accesses elements without `null` checks.
* Using `reverse()` directly on the shared array can cause unexpected behavior; pass a copy if you need the original.
* Removing a table that doesn't exist will throw — wrap table removal with a conditional check.

---

## Contributing

1. Open an issue describing the bug or feature.
2. Fork the repo and create a branch.
3. Submit a pull request explaining your changes and why.


---

If you want, I can:

* Translate the relationship labels to Arabic inside the UI and code.
* Extract the calculation logic into a separate module and provide unit tests.
* Provide a ready-to-run example with CSS and a polished UI.

Tell me which of the above you'd like and I will create it.
