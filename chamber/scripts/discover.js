import { places } from '../data/places.mjs';


const visitMessage = document.querySelector('#visit-message');
const lastVisit = localStorage.getItem('discoverLastVisit');
const now = Date.now();
const msInDay = 1000 * 60 * 60 * 24;

if (!lastVisit) {

    if (visitMessage) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    }
} else {
    const timeDifference = now - Number(lastVisit);

    if (visitMessage) {
        if (timeDifference < msInDay) {

            visitMessage.textContent = "Back so soon! Awesome!";
        } else {

            const daysAgo = Math.floor(timeDifference / msInDay);
            if (daysAgo === 1) {
                visitMessage.textContent = "You last visited 1 day ago.";
            } else {
                visitMessage.textContent = `You last visited ${daysAgo} days ago.`;
            }
        }
    }
}


localStorage.setItem('discoverLastVisit', now);



const gridContainer = document.querySelector('#discover-grid');

places.forEach((place) => {
    const card = document.createElement('section');
    card.classList.add('discover-card');

    card.innerHTML = `
    <h2>${place.title}</h2>
    <figure>
      <img src="${place.photo_url}" alt="${place.title}" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button">Learn More</button>
  `;

    gridContainer.appendChild(card);
});