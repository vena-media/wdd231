const url = 'data/members.json';
const container = document.getElementById('directory-container');
const gridBtn = document.getElementById('view-grid');
const listBtn = document.getElementById('view-list');
// 1. Fetch JSON Member Data
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error('Error fetching member data:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// 2. Render Cards into HTML Container
function displayMembers(members) {
    container.innerHTML = ''; // Clear existing contents

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        // Convert membership number to human-readable tier label
        let levelText = 'Member';
        if (member.membership === 2) levelText = 'Silver';
        if (member.membership === 3) levelText = 'Gold';

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="membership-tier"><strong>Tier:</strong> ${levelText}</p>
            <p>📍 ${member.address}</p>
            <p>📞 ${member.phone}</p>
            <p>🌐 <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        `;
        container.appendChild(card);
    });
}

// 3. Grid vs. List View Toggle Events
gridBtn.addEventListener('click', () => {
    container.classList.add('grid-layout');
    container.classList.remove('list-layout');
    gridBtn.classList.add('active-btn');
    listBtn.classList.remove('active-btn');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-layout');
    container.classList.remove('grid-layout');
    listBtn.classList.add('active-btn');
    gridBtn.classList.remove('active-btn');
});



// 4. Dynamic Footer Dates
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Run initial fetch
getMembers();