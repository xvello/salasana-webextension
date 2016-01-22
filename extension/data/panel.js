var form      = document.getElementById("form");
var urlInput  = document.getElementById("url");
var passInput = document.getElementById("pass");

self.port.on("show", function onShow(urlString) {
  if (urlString) {
    urlInput.value = urlString;
  } else {
    urlInput.value = "";
  }
  passInput.value = "";
  passInput.focus();
  loaded();
});

form.addEventListener('submit', function formSubmitted(event) {
  var pass = b64_sha1(passInput.value+':'+ urlInput.value).substr(0,13) + '@1a';
  self.port.emit("submitted", pass);
  event.preventDefault();    //stop form from submitting
  passInput.value = "";
}, false);

function loaded() {
  //self.port.emit("loaded", form.getBoundingClientRect().width, form.getBoundingClientRect().height);
  self.port.emit("loaded", form.scrollWidth+20, form.scrollHeight+20);
}
