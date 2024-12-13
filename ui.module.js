import { Api } from './games.js'; // Import the Api function from games.js
import { ApiDetails } from './details.js'; // Import ApiDetails for detailed game views

const navLinks = document.querySelectorAll('.nav-link');
const sideAll = document.querySelectorAll('.sideAll');
const detailsSection = document.getElementById('detailsGames');

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        // Call Api based on category
        const category = e.target.id.toLowerCase() || 'mmorpg'; 
        Api(category);
    });
});

// Handle card clicks for game details
export function setupCardClickListeners(cards) {
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const gameId = this.getAttribute('data-id');
            ApiDetails(gameId);

            sideAll.forEach(side => side.classList.add('d-none'));
            detailsSection.classList.remove('d-none');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultCategory = 'mmorpg';
    const defaultLink = document.querySelector('.nav-link.active');
    
    if (defaultLink) {
        defaultLink.classList.add('active');
    }
    Api(defaultCategory);
});