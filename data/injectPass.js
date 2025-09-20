// Javascript file attached to the page

"use strict";

browser.runtime.onMessage.addListener((pass) => {
    let injected = false;

    document.querySelectorAll('input[type=password]').forEach(function (input) {
        input.focus();
        input.value = pass;
        input.dispatchEvent(new window.Event('input', {bubbles: true}))
        input.dispatchEvent(new window.Event('change', {bubbles: true}))
        injected = true;
    })

    if (!injected) {
        window.prompt('Couldn\'t find a password input field.\nYour generated password is:', pass);
    }
});
