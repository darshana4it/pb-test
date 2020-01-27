# PB Tech Assigmnent
## Introduction
An assignment written for a technical evaluation. The scope is to build a clickthrough demo of a single page website for a photobook checkout using HTML5 & CSS3.

The core is written in HTML5, Sass and jQuery. Sass is written to reuse using a combination of SMACSS & atomic design principles. All the custom plugins used in the code are written from scratch using jQuery & Modernizr. Custom plugins include,
 - Switchable card-based content manager for mobile
 - Turnable photobook (WIP)

### Running the code
```
git clone https://github.com/darshana4it/pb-test.git
cd pb-test
npm install
sass --no-source-map --update sass:css --style compressed
```

### Todo
 - Pending functionality of desktop and mobile pages
 - Photobook plugin needs to be improved to turn pages through controls. 
 - Photobook scaler based on the screen change (WIP; run `photobookResizer();` on console to check the current progress)
 - Overall improvements/ refactoring to JS and styles

## Related Deliverables 
 1. [Clickthrough prototype](https://www.figma.com/proto/6ZghCtgpoiE9xXRwBqOslX/Pastbook-Checkout?node-id=21%3A1364&scaling=scale-down) — for viewing, Figma native apps are recommended ([Mac](https://www.figma.com/download/desktop/mac/), [Windows](https://www.figma.com/download/desktop/win/)) for smoother transitions. View a [recording](https://drive.google.com/file/d/1z_eHdHu5Jl3-QdfhbbYSKuoTwTb9hG1r/view?usp=sharing) of the prototype — recorded through web, so transitions aren't very smooth :(
 2. [Concept UI/UX figma file](https://www.figma.com/file/6ZghCtgpoiE9xXRwBqOslX/Pastbook-Checkout?node-id=21%3A1363)

## Assignment Spec
https://docs.google.com/document/d/1054Za3tTjh3zOL3diosxUptfIUGD_mByNQ1YTdhzkdg/edit?usp=sharing
