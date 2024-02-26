document.querySelectorAll('[class^="rotate-"]').forEach(function
(element) {
  var angle = parseInt(element.className.replace("rotate-", 
""));
  element.style.transform = "rotate(" + angle + "deg)";
});