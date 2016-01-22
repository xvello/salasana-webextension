// Javascript file attached to the page

self.port.on("injectPassword", function(pass) {
  var i=0;
  var injected = false;
  var elements = document.getElementsByTagName('input');
  var e;
  
  for (i = 0; i < elements.length; i++) {
    e = elements[i];
    if (e.type == 'password') {
      e.value = pass;
      e.focus();
      injected = true;
    }
  }
    
  if (!injected) {
    window.prompt('Couldn\'t find a password input field.\nYour generated password is:', pass)
  }    
}); 
