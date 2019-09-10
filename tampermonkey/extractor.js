// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://healthy.kaiserpermanente.org/va/Clinical/TestResults?lang=english&jsenabled=1
// @grant        none
// ==/UserScript==

(async function() {
  "use strict";

  const parseHtml = async el => {
    const data = {};
    const anchorEl = el.querySelector("a");
    data.title = anchorEl.innerHTML;
    data.href = anchorEl.getAttribute("href");
    data.date = el.querySelector(".Date > span:nth-child(2)").innerHTML;

    const domparser = new DOMParser();
    const res = await fetch(data.href);
    const html = await res.text();
    const doc = domparser.parseFromString(html, "text/html");
    const detailItems = [
      ...doc.querySelectorAll("table.components tbody tr")
    ].map(el => {
      const itemData = {};
      itemData.name = el.querySelector(".nameCol").innerHTML;
      itemData.value = el.querySelector(".valueCol").innerHTML;
      itemData.range = el.querySelector(".rangeCol").innerHTML;
      return itemData;
    });
    data.items = detailItems;
    return data;
  };

  const button = document.createElement("button");
  button.innerHTML = "Extract Data";
  button.addEventListener("click", async event => {
    const data = await dataExtractor();
    console.log(data);
  });

  document.body.appendChild(button);

  async function dataExtractor() {
    return Promise.all(
      [...document.querySelectorAll(".TestResultsList > li")].map(el =>
        parseHtml(el)
      )
    );
  }
})();
