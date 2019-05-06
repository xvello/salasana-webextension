// Javascript file attached to the page

"use strict";

browser.runtime.onMessage.addListener((pass) => {
  var injected = false;
  var elements = document.getElementsByTagName('input');

  for (let e of elements) {
    if (e.type == 'password') {
      e.value = pass;
      e.focus();
      injected = true;
    }
  }

  if (!injected) {
    window.prompt('Couldn\'t find a password input field.\nYour generated password is:', pass);
  }
});
