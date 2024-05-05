window.updateCopyrightYears = function() {
  const copyrightYears = document.querySelectorAll('.copyrightYears');
  const currentYear = new Date().getFullYear();
  const startYear = 2024;

  copyrightYears.forEach(element => {
    if (currentYear > startYear) {
      element.innerHTML = `${startYear}-${currentYear}`;
    } else {
      element.innerHTML = `${currentYear}`;
    }
  });
}

updateCopyrightYears();

window.returnCopyright = function (CJK) {
  const start = 2024;
  const current = new Date().getFullYear();

  if (CJK) {
    const toFullWidthDigits = num => num.toString().replace(/[0-9]/g, char => String.fromCharCode(char.charCodeAt(0) + 0xFEE0));
    const startYear = toFullWidthDigits(start);
    const currentYear = toFullWidthDigits(current);
    return (current > start) ? `${startYear} - ${currentYear}` : `${currentYear}`;
  } else {
    return (current > start) ? `${start}-${current}` : `${current}`;
  }
}


const h3 = document.querySelectorAll('h3.rule');

h3.forEach(header => {
  if (header.id) {
    header.innerHTML += '<span class="material-icons">link</span>';
    header.addEventListener('click', () => {
      const id = header.id;
      const url = window.location.href;
      let newUrl = `${url}#${id}`;
      const name = header.querySelector('span').textContent;
    
      url.includes('#') ? newUrl = `${url.split('#')[0]}#${id}` : newUrl = `${url}#${id}`;

      navigator.clipboard.writeText(newUrl)
        .then(() => {
          alert(`Ссылка на правильно «${name}» скопирована`);
        })
        .catch(error => {
          console.error('Ошибка при копировании:', error);
        });
    });
  }
});
