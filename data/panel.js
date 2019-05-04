"use strict";

var form       = document.getElementById("form");
var urlInput   = document.getElementById("url");
var passInput  = document.getElementById("pass");
var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});


function stripUrl(url) {
  if (url.match(/http(s*):\/\/([^/]+)/)) {
    var host = url.match(/http(s*):\/\/([^/]+)/)[2];
    var sld = host.match(/([^.]+\.([a-z][a-z][a-z]+|a[^abhjkpvy]|b[^cdklnpqux]|c[^bejkpqsty]|d[ejkmoz]|e[cegsu]|f[imor]|g[^cjkouvxz]|h[kmnrtu]|i[demnoqrst]|j[eop]|k[gimnpryz]|l[abcikrstuvy]|m[^bfijmz]|n[acefgloru]|om|p[aefhklmnrstwy]|qa|r[eosuw]|s[^fpqsw]|t[^abeiqrsuxy]|u[agsyz]|v[aceginu]|w[fs]|yt))$/i);

    if (sld) {
      return sld[0];
    } else {
      return host.match(/([^.]+\.[^.]+\.[a-z][a-z])$/i)[0];
    }
  }
  return "";
}


gettingActiveTab.then((tabs) => {
  browser.tabs.executeScript(tabs[0].id, { file: "/data/injectPass.js" });
  urlInput.value = stripUrl(tabs[0].url);
  passInput.value = "";
  passInput.focus();
});


form.addEventListener('submit', function formSubmitted(event) {
  var pass = b64_sha1(passInput.value+':'+ urlInput.value).substr(0,13) + '@1a';

  gettingActiveTab.then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, pass);
  });

  event.preventDefault();    // stop form from submitting
  passInput.value = "";

  window.close();
}, false);
