const membersUrl = 'data/members.json';
const spotlightContainer = document.querySelector('#spotlight-container');

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();

            // Filter for Silver (2) and Gold (3) members only
            const qualifiedMembers = members.filter(
                member => member.membership === 2 || member.membership === 3
            );

            // Randomly select 2 or 3 members
            const selectedMembers = getRandomMembers(qualifiedMembers, 3);

            displaySpotlights(selectedMembers);
        } else {
            console.error('Failed to fetch members data.');
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to pick N random items from an array without duplicates
function getRandomMembers(memberList, count) {
    const shuffled = [...memberList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Render spotlight cards to HTML
function displaySpotlights(spotlights) {
    spotlightContainer.innerHTML = ''; // Clear container

    spotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        const levelText = member.membership === 3 ? 'Gold Member' : 'Silver Member';

        card.innerHTML = `
      <h3>${member.name}</h3>
      <p class="membership-tag">${levelText}</p>
      <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlightMembers();