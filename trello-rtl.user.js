// ==UserScript==
// @name        trello-rtl-persian
// @namespace   sabersoft
// @description Script for right to left and Persianization of some parts of Trello
// @match     https://trello.com/*
// @version     1
// @grant       none
// ==/UserScript==



function add_style(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


const replaceOnDocument = (pattern, string, {target = document.body} = {}) => {
  // Handle `string` — see the last section
  [
    target,
    ...target.querySelectorAll("*:not(script):not(noscript):not(style)")
  ].forEach(({childNodes: [...nodes]}) => nodes
    .filter(({nodeType}) => nodeType === Node.TEXT_NODE)
    .forEach((textNode) => {textNode.textContent = textNode.textContent.replace(pattern, string)}));
};

const translator = {
'Add a card':'افزودن کارت جدید',
'Add another list' : 'افزودن لیست جدید',
    'Show details' : 'نمایش جزئیات'
}







let myIv = setInterval(function(){
if(document.body.querySelectorAll(".js-add-a-card").length>0) {
    Object.keys(translator).forEach(function(key) {
        replaceOnDocument(key,translator[key]);
        add_style([
  '.window-title-text,',
  '.list-card-title,',
  '.card-detail-item > div,',
  '.new-comment-input,',
  '.action-comment, .pop-over-header-back-btn.is-shown, .pop-over.is-shown, .edit { direction: rtl; }',
    '.list-card-operation {right: auto; left: 2px;}',
    '#board {display: flex; flex-direction: row-reverse;}',
    '#board.collapsed-workspace-nav {padding-left : auto; padding-right: 16px;}',
    '.bxAukXR87tfUht {left: 8px; right: auto;}',
    'body.ff-modernization-update textarea.mod-list-name {padding: 4px 25px 4px 8px;width: 224px;}'
].join('\n'));
    });
    clearInterval(myIv);
}
}, 100);




