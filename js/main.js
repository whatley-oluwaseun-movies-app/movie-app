movieApi= "81edec77"



function generateMovies() {
    const loader = document.querySelector(".popcorn");
    const movieListContainer = document.getElementById("moviecards");

    const delay = 2000; // delay time in milliseconds

    setTimeout(() => {
        loader.style.display = "none";
    }, delay);


    function renderMovies(movies) {
        // Clear existing content
        movieListContainer.innerHTML = '';

        // Iterate through movies and create HTML elements
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            //language = html
            movieElement.innerHTML = `
<div class="card" style="width: 18rem;">
            <img src="${movie.Poster}" class="d-block w-100" alt="${movie.Title} Poster">
                                                  <div class="carousel-caption d-none d-md-block">
                                                      <h5>${movie.Title}</h5>
                                                      <p>${movie.Year}</p>
                                                  </div>
                                                     </div>
                                                     
            `;
            movieListContainer.appendChild(movieElement);
        });
    }






    document.getElementById('movieForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const movieValue = document.getElementById('movieInput').value;

        if (movieValue.trim() !== '') {

            const apiUrl = `http://www.omdbapi.com/?apikey=${movieApi}&s=${encodeURIComponent(movieValue)}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Process the response data
                    if (data.Response === 'True') {
                        // Movies found
                        renderMovies(data.Search);
                        // console.log(data.Search[0].Poster)
                    } else {
                        // No movies found or an error occurred
                        console.error(data.Error);
                    }
                })
                .catch(error => console.error('Error fetching data:', error))


        } else
        {
            // Handle the case when the input is empty
            console.error('Please enter a movie title');
        }
    });
}

generateMovies();


