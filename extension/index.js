var { ToggleButton } = require('sdk/ui/button/toggle');
var { Hotkey } = require("sdk/hotkeys");
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var self = require("sdk/self");

var worker = tabs.activeTab;

var button = ToggleButton({
  id: "wpg-button",
  label: "Generate Password",
  icon : "./icon.svg",
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: "./panel.html",
  contentScriptFile: ["./panel.js", "./crypt.js"],
  onHide: handleHide
});

var showHotKey = Hotkey({
  combo: "accel-alt-p",
  onPress: function() {
    button.click();
  }
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  } else {
    panel.hide()
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

panel.on("show", function() {
  worker = tabs.activeTab;
  var domain;
  
  if (worker.url.match(/http(s*):\/\/([^/]+)/)) {
    var host = worker.url.match(/http(s*):\/\/([^/]+)/)[2];
    if (sld = host.match(/([^.]+\.([a-z][a-z][a-z]+|a[^abhjkpvy]|b[^cdklnpqux]|c[^bejkpqsty]|d[ejkmoz]|e[cegsu]|f[imor]|g[^cjkouvxz]|h[kmnrtu]|i[demnoqrst]|j[eop]|k[gimnpryz]|l[abcikrstuvy]|m[^bfijmz]|n[acefgloru]|om|p[aefhklmnrstwy]|qa|r[eosuw]|s[^fpqsw]|t[^abeiqrsuxy]|u[agsyz]|v[aceginu]|w[fs]|yt))$/i)) {
      domain = sld[0];
    } else {
      domain = host.match(/([^.]+\.[^.]+\.[a-z][a-z])$/i)[0];
    }
  }
  panel.port.emit("show", domain);
});

panel.port.on("submitted", function (text) {
  w = worker.attach({
    contentScriptFile: "./injectPass.js"
  });
  w.port.emit("injectPassword", text);
  
  //console.log(text);
  panel.hide();
});

panel.port.on("loaded", function(width, height) {
  //console.log(width, height);
  panel.resize(width, height)
});
