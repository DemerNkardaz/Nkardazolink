function updateCopyrightYears() {
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
