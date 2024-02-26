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