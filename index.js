document.addEventListener("DOMContentLoaded", () =>{
    // Get the list of all the movies
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(films => {
        // Display the list of all the movie names
        const list = document.querySelector('#movieList');
        films.forEach(film => {
            const item = document.createElement('li');
            item.textContent = film.name;
            item.addEventListener('click', () => {
                // Get the details of a selected movie
                fetch(`http://localhost:3000/films/${film.id}`)
                .then(response => response.json())
                .then(data => {
                    // Display the details of the selected cute animal
                    const details = document.querySelector('#movieDetails');
                    details.innerHTML = `
                        <h2>${data.title}</h2>
                        <h3>${data.runtime}</h3>
                        <h4>${data.showtime}</h4>
                        <p>${data.description}</p>
                        <img src="${data.poster}" alt="${data.title}">
                        <p>${data.tickets} votes</p>
                        <button id="buyTicket-btn">Buy Ticket</button>
                        <button id ="reset-btn">Reset</button>
                    `;
                    // Add the ability to add votes for the selected cute animal
                    const ticketBtn = document.querySelector('#buyTicket-btn');
                    let tickets = function getTickets(capacity, tickets_sold){
                        return capacity - tickets_sold

                    }
    
                    ticketBtn.addEventListener('click', () => {
                        tickets--;
                        details.querySelector('p').textContent = `${tickets} tickets`;
                    });
                    //Add ability to reset votes for the selected cute animals
                    const resetBtn = document.querySelector('#reset-btn');
                    resetBtn.addEventListener('click', () => {
                        votes=0;
                        details.querySelector('p').textContent = `${tickets} tickets`;
                    });
    

                });
            });
            list.appendChild(item);
            
        });
    });
    
});