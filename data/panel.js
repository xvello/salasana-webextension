"use strict";

function stripUrl(url) {
    if (url.match(/http(s*):\/\/([^/]+)/)) {
        const host = url.match(/http(s*):\/\/([^/]+)/)[2];
        const sld = host.match(/([^.]+\.([a-z][a-z][a-z]+|a[^abhjkpvy]|b[^cdklnpqux]|c[^bejkpqsty]|d[ejkmoz]|e[cegsu]|f[imor]|g[^cjkouvxz]|h[kmnrtu]|i[demnoqrst]|j[eop]|k[gimnpryz]|l[abcikrstuvy]|m[^bfijmz]|n[acefgloru]|om|p[aefhklmnrstwy]|qa|r[eosuw]|s[^fpqsw]|t[^abeiqrsuxy]|u[agsyz]|v[aceginu]|w[fs]|yt))$/i);

        if (sld) {
            return sld[0];
        } else {
            return host.match(/([^.]+\.[^.]+\.[a-z][a-z])$/i)[0];
        }
    }
    return "";
}

browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    const form = document.getElementById("form");
    const urlInput = document.getElementById("url");
    const passInput = document.getElementById("pass");
    const activeTab = tabs[0];

    browser.tabs.executeScript(activeTab.id, {file: "/data/injectPass.js"});
    form.addEventListener('submit', function formSubmitted(event) {
        const pass = b64_sha1(passInput.value + ':' + urlInput.value).substr(0, 13) + '@1a';
        browser.tabs.sendMessage(activeTab.id, pass);
        event.preventDefault();    // stop form from submitting
        passInput.value = "";
        window.close();
    }, false);

    urlInput.value = stripUrl(activeTab.url);
    passInput.value = "";
    passInput.focus();
});
