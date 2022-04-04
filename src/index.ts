"use strict";

import "./styles/styles.css";

let prevScrollpos = window.pageYOffset;
let header = document.getElementById("header-top");

header && window.addEventListener('scroll', () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        header!.style.top = "0";
    } else {
        header!.style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
})

