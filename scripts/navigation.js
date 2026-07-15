const yearSpan = document.getElementById("currentyear");
const today = new Date().getFullYear();

yearSpan.textContent = today;
document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;


const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

// toggle the show class off and on
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});


