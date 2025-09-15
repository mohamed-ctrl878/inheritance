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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="master.css">
    <meta name="description" content="This site is for resolving inheritance issues according to Islamic law. Enter, try and identify the deceased, then identify all his relatives now..! Of course, there are some cases that I did not discuss, but I discussed many, many issues related to “cliques” and “those with authority.”">
    <title>Inheritance</title>
</head>
<body>
    <div class="layout"> <div></div></div>
    <div class="bigcontent">
    <div id="content" class="container">
        <div class="inhers"><span></span></div>
        <div class="members">
          <div class="member">
          <div class="devo">
            <span class="hers son mother-non father-non orign" data-gender ="male">son</span>
          </div>
            <div class="devo">
            <span class="hers daug mother-non father-non  son-non orign" data-gender ="male">daughter</span>
          </div>
          <div class="devo">
            <span class="hers father father-non  son-non">father</span>
          </div>
            <div class="devo">
            <span class="hers mother mother-non son-non">mother</span>
          </div>
          <div class="devo">
            <span class="hers husband son-non mother-non father-non orign  choice-mele" >husband</span>
          </div>
          <div class="devo">
            <span class="hers wife son-non mother-non  father-non orign choice-female">wife</span>
          </div>
          <div class="devo">
            <span class="hers  mother-non father-non orign">brother</span>
          </div>
          <div class="devo">
            <span class="hers mother-non father-non son-non orign">sister</span>
          </div>
          <div class="devo">
            <span class="hers mother-non puncle father-non orign"data-gender ="male">paternal uncle</span>
          </div>
          <!-- <div class="devo">
            <span class="hers mother-non paunt father-non  husband-non uncle-non"data-gender ="female">paternal aunt</span>
          </div>
          <div class="devo">
            <span class="hers mother-non muncle father-non  husband-non uncle-non"data-gender ="male">maternal uncle</span>
          </div>
          <div class="devo">
            <span class="hers mother-non maunt father-non  husband-non uncle-non"data-gender ="female">maternal aunt</span>
          </div> -->
          <div class="devo">
            <button class="next">next branch</button>
            </div>
          <div class="devo">
            <button class="result" >Results</button>
            </div>
          </div>
        </div>
      <div class="head"><span>I</span><span>N</span><span>H</span><span>E</span><span>R</span><span>I</span><span>T</span><span>A</span><span>N</span><span>C</span><span>E</span><span>S</span></div>
        </div>
      </div>


        <div id="pop" class="popup">
          <div class="layout"></div>
          <section class="hint">
            <div class="text">
              <div class="transition">
                <div class="hint-one">
                  <i class="fa-solid fa-circle-exclamation waring"></i>
                  <ul>
                    <li>The results will be in accordance with Islamic law.</li>
                    <li>In this application, I did not discuss everything that revolves around inheritance, of course.</li>
                    <li class="red-li">Do not depend on the results of the application. You can ask the specialist in this science to help you.</li>
                    <li>We discussed ESABAT & FOROD, but Companions of the womb not yet.</li>
                    <li>I did not discuss my maternal or paternal brothers, nor did I discuss my paternal uncles.</li>
                    <li>In this version, the blocked persons will not be displayed, the heirs will be displayed.</li>
                </ul>
                </div>
                <div class="hint-two">
                  <span>How to use:</span>
                    <p>Branches can be selected from the original branch, for example </p>
                    <ul>
                      <li>
                        Such as the son of the son of the son or the daughter of the son of the son, and so on
                    </li>
                      <li>
                        You can also do what we mentioned above with brother and uncle
                    </li>
                      <li>
                        You can also do this with grandparents, whether they are maternal grandmother, paternal grandmother, or paternal grandfather
                    </li>
                    <li><span>examples of testing:</span> <br>Son son son son cousin: here, click on the Son button 4 times, then click on Uncle</li>
                  </ul>
                </div>
                <div class="hint-three">
                  <ul>
                    <li>Daughter son son son : here, click on the Daughter button 1 times, then click on son button 3 times, Then click the next branch</li>
                    <li> Paternal grandfather : here, click on the father button 2 times, Then click the next branch</li>
                    <li>There are some people who, once selected, will move to create another branch, namely the husband, wife, brother, sister and uncle</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="btns">
              <button class="prev">Previous</button>
              <button class="nest">Next</button>
            </div>
          </section>
        </div>
        <div class="choice">
          <div class="male">
           <i class="fa-solid fa-mars"></i>
           <span>male</span>
          </div>
          <div class="female">
           <i class="fa-solid fa-venus"></i>
           <span>female</span>
          </div>
         </div>
        <div class="results">
          <button class="btn-back">back</button>
        </div>
        <footer class="footer">
          <span class="creator">Creator : <span>Mohamed Mahmoud Eleskandarany</span></span>
          <span class="contact">Contact : bnaboabdallah@gmail.com</span>
        </footer>
        <script src="master.js"></script>
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
