document.addEventListener("DOMContentLoaded", () =>{
    // Get the list of all the movies
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(films => {
        // Display the list of all the movie names
        const list = document.querySelector('#moviesList');
        films.forEach(film => {
            const item = document.createElement('li');
            item.textContent = film.title;
            item.addEventListener('click', () => {
                // Get the details of a selected movie
                fetch(`http://localhost:3000/films/${film.id}`)
                .then(response => response.json())
                .then(data => {
                    // Display the details of the selected cute animal
                    const details = document.querySelector('#movieDetails');
                    details.innerHTML = `
                        <div class="absolute"> 
                        <h2>${data.title}</h2>
                        <h3>${data.runtime} minutes</h3>
                        <h4>${data.showtime}</h4>
                        <p>${data.description}</p>
                        <img src="${data.poster}" alt="${data.title}">
                        <h5>${data.tickets} tickets</h5>
                        <button id="buyTicket-btn">Buy Ticket</button>
                        </div>
                    `;
                    // Add the ability to buy tickets for the selected movie
                    const voteBtn = document.querySelector('#buyTicket-btn');
                    let tickets = data.tickets;
                        voteBtn.addEventListener('click', () => {
                            tickets= data.tickets;
                            tickets--;
                            data.tickets = tickets;
                        details.querySelector('h5').textContent = `${tickets} tickets`;
                        if (data.tickets<=0){
                            details.querySelector('h5').textContent = "Sold Out"
                        }

                    });



                });
            });
            list.appendChild(item);
            
        });
    });
    
});