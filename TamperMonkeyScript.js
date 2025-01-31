// ==UserScript==
// @name         SWC-AF Mapper
// @namespace    https://boxfriend.xyz/
// @version      1.0.0
// @description  automatically map asteroid fields in SWC
// @author       boxfriend
// @match        http*://*.swcombine.com/members/cockpit/
// @icon         https://i.imgur.com/hfJ0kHe.png
// @grant        GM_registerMenuCommand
// @grant        GM_addElement
// ==/UserScript==

(function() {
    'use strict';
    const asteroidSensor = document.getElementsByClassName("semitrans asteroidsSemiTrans");
    if(asteroidSensor.length > 0) {
        const iconRow = document.querySelector(".cockpit_card tbody > tr:last-child div");
        console.log(iconRow);
        const button = GM_addElement(iconRow, 'img', { src: "https://i.imgur.com/hfJ0kHe.png", height: 30, width: 30, title: "Downloads a map of the current Asteroid field"});
        button.addEventListener("click", () => downloadMap(asteroidSensor));
    }
    GM_registerMenuCommand("Map Asteroids", () => downloadMap(asteroidSensor), { accessKey: "m", autoClose: true, title: "Downloads a map of the current Asteroid field" });
})();

function downloadMap(asteroidSensor) {
  const asteroidPositions = Array.from({ length: 21 }, () => Array(21).fill(""));

  for (let i = 1; i < 21; i++) {
    asteroidPositions[i][0] = i - 1;
    asteroidPositions[0][i] = i - 1;
  }

  Array.from(asteroidSensor).forEach(as => {
    const top = parseInt(as.style.top, 10);
    const left = parseInt(as.style.left, 10);
    const size = parseInt(as.style.width, 10);

    const gridX = left / size;
    const gridY = top / size;

    asteroidPositions[gridY + 1][gridX + 1] = `"${gridX},${gridY}"`;
  });

  const infopane = Array.from(document.getElementsByClassName("tableheader"));
  const asteroidFieldInfo = infopane.find(info => info.innerText.includes("Asteroid Field"));

  let fieldName = "asteroid_positions";
  if (asteroidFieldInfo) {
    fieldName = asteroidFieldInfo.innerText.split(/\r\n|\r|\n/)[1];
    asteroidPositions[0][0] = `"${fieldName}"`;
  }

  const csv = asteroidPositions.map(row => row.join(",")).join("\n");
  const file = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fieldName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
