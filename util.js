function updateCopyrightYears() {
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const copyrightYears = document.querySelectorAll('.copyrightYears');

    copyrightYears.forEach(element => {
        if (currentYear > startYear) {
            element.textContent = `${startYear}—${currentYear}`;
        } else {
            element.textContent = startYear;
        }
    });
}
document.addEventListener('DOMContentLoaded', updateCopyrightYears);

window.setRLTBPositions = function() {
  var elements = document.querySelectorAll("[class*='top'], [class*='bottom'], [class*='left'], [class*='right']");
  
  elements.forEach(function(element) {
    var classes = element.className.split(" ");
    var style = {};
    
    classes.forEach(function(className) {
      if (className.startsWith("top") || className.startsWith("bottom") || className.startsWith("left") || className.startsWith("right")) {
        var value = className.split("_")[1];
        style.position = "absolute";
        
        if (className.startsWith("top")) {
          style.top = value;
        } else if (className.startsWith("bottom")) {
          style.bottom = value;
        } else if (className.startsWith("left")) {
          style.left = value;
        } else if (className.startsWith("right")) {
          style.right = value;
        }
        if (className.startsWith("topright")) {
          style.top = value;
          style.right = value;
        } else if (className.startsWith("topleft")) {
          style.top = value;
          style.left = value;
        } else if (className.startsWith("bottomright")) {
          style.bottom = value;
          style.right = value;
        } else if (className.startsWith("bottomleft")) {
          style.bottom = value;
          style.left = value;
        }
      }
    });
    
    Object.keys(style).forEach(function(key) {
      element.style[key] = style[key];
    });
  });
};

window.setRLTBPositions();


window.setWidthFromChildren = function() {
    var elements = document.querySelectorAll('.w_children');
    elements.forEach(function(element) {
        var children = element.children;
        if (children.length > 0) {
            var childWidth = children[0].offsetWidth; // Получаем ширину первого дочернего элемента
            element.style.width = childWidth + 'px'; // Устанавливаем ширину родительского элемента
        }
    });
}


window.addEventListener('load', function() {
    setWidthToChildren();
});

