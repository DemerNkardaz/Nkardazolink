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
      if (className.includes("top") || className.includes("bottom") || className.includes("left") || className.includes("right")) {
        var value = className.split("_")[1];
        style.position = "absolute";
        
        if (className.includes("top")) {
          style.top = value;
        } else if (className.includes("bottom")) {
          style.bottom = value;
        } else if (className.includes("left")) {
          style.left = value;
        } else if (className.includes("right")) {
          style.right = value;
        }
        if (className.includes("topright")) {
          style.top = value;
          style.right = value;
        } else if (className.includes("topleft")) {
          style.top = value;
          style.left = value;
        } else if (className.includes("bottomright")) {
          style.bottom = value;
          style.right = value;
        } else if (className.includes("bottomleft")) {
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

// Вызов функции после загрузки страницы
window.addEventListener('load', function() {
    setWidthToChildren();
});
