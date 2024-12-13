import { setupCardClickListeners } from './ui.module.js';

const loading = document.querySelector('.loading');
let arrGames = [];

export async function Api(category) {
    try {
        loading.classList.remove('d-none');
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '78308a9a65msh77a2f2c7740d214p116973jsn8a98e3dc52d6',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        });

        arrGames = await response.json();
        displayGames();

        loading.classList.add('d-none');
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

function displayGames() {
    let boxGames = '';

    arrGames.forEach(game => {
        boxGames += `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card pt-3 px-4 h-100" data-id="${game.id}">
                <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                <div class="card-body pb-0 d-flex justify-content-between align-items-center">
                    <p class="text-white text-header">${game.title.split(' ', 3).join(' ')}</p>    
                    <p class="badge">Free</p>
                </div>
                <div class="card-content">
                    <p class="text-center opacity-75">${game.short_description.split(' ', 10).join(' ')}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <p class="badge">${game.genre}</p>
                    <p class="badge">${game.platform}</p>
                </div>
            </div>
        </div>
        `;
    });

    document.getElementById('rowGames').innerHTML = boxGames;

    const cards = document.querySelectorAll('.card');
    setupCardClickListeners(cards); // Use the function from ui.module.js
}
