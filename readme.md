# p5sketch

A framework for my p5js sketches. for easy archive for my artwork and learning.

---

- [x] Add a navigation menu to navigate thru all the sketches [240203]

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

- git clone ...
- npm install
- npm run dev to start develop

## Usage

- /src contain all the general codes
- sketches are split into folders by YEAR-QUARTER-# (e.g. 24q1, 24q2, 24q3, 24q4, 25q1...)
- index.html will load the relevant sketch via it URL path

- npm run generate-sketchList - generate /sketchList.json and it will render the navigation for all the sketches according to /YYq{1,2,3,4} directory


## p5js helpers
setup global functions that can reuse across all sketches.

have not figure out how to version control yet so it dont accidentally deprecate my old sketches, one way to find out!

- canvas.js - quick setup with default configuration
- grid.js - standardize grid, love dem goldenratio sized boxes

- toggle for mybrand color for easy copy/paste 

### keyPressed_saveGif()


## License

This project is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/). You are free to modify and distribute the code, but please provide credit to the original author.

