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