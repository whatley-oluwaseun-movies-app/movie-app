let counter = 100; // Starting counter from a higher value to avoid potential conflicts
let movies = []; // Empty array, will be populated with data from JSON file
let displayedMovies = 4; // Number of movies to display initially

function renderMovie(movie) {
    let html = '<div class="movie row col-6">';
    html += `<img class="col-12" src="${movie.image}" alt="${movie.title}">`; // Include the image property
    // html += `<p id="movie-id">${movie.id || counter++}</p>`;
    // html += `<h5 class="col-7">${movie.title}</h5>`;
    html += `<h5 class="col-2">${movie.rating}</h5>`;
    html += `<p class="col-12">${movie.movieSummary}</p>`;
    html += `<p class="col-12">${movie.genre}</p>`;
    html += `<button class="btn btn-danger btn-sm" onclick="deleteMovie(${movie.id})">Delete</button>`;
    html += `<button class="btn btn-warning btn-sm" onclick="editMovie(${movie.id})">Edit</button>`;
    html += '</div>';
    return html;
}

function renderMovies(movies, limit) {
    let html = '';
    for (let i = movies.length - 1; i >= 0 && limit > 0; i--) {
        html += renderMovie(movies[i]);
        limit--;
    }
    return html;
}

function updateMovies(e) {
    e.preventDefault();
    const selectedGenre = roastSelection.value;
    if (selectedGenre === "All Genre") {
        section.innerHTML = renderMovies(movies, displayedMovies);
    } else {
        const filteredMovies = movies.filter(movie => movie.genre.includes(selectedGenre));
        section.innerHTML = renderMovies(filteredMovies, displayedMovies);
    }
}

function deleteMovie(id) {
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        movies.splice(index, 1);
        section.innerHTML = renderMovies(movies, displayedMovies);
    }
}

function editMovie(id) {
    const movieToEdit = movies.find(movie => movie.id === id);
    if (movieToEdit) {
        const newName = prompt("Enter the new movie name:", movieToEdit.title);
        const newRating = prompt("Enter the new movie rating:", movieToEdit.rating);

        if (newName !== null && newRating !== null) {
            movieToEdit.title = newName;
            movieToEdit.rating = newRating;
            section.innerHTML = renderMovies(movies, displayedMovies);
        }
    }
}

const section = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');

fetch('./data/movies.json')
    .then(response => response.json())
    .then(data => {
        movies = data.movies;
        section.innerHTML = renderMovies(movies, displayedMovies);
    })
    .catch(error => console.error('Error fetching data:', error));

const searchBar = document.getElementById("coffee-name");

searchBar.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const resultsList = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    section.innerHTML = renderMovies(resultsList, displayedMovies);
});

function addNewMovie() {
    const newMovieName = document.getElementById('newCoffeeName').value;
    const newMovieGenre = document.getElementById('newCoffeeRoast').value;

    if (newMovieName === "" || newMovieGenre === "") {
        alert("Please enter both movie name and genre.");
        return;
    }

    const newMovie = {
        id: counter++,
        title: newMovieName,
        rating: "N/A", // You may want to prompt the user for the rating or set it to a default value
        genre: newMovieGenre
    };

    movies.push(newMovie);
    section.innerHTML = renderMovies(movies, displayedMovies);

    document.getElementById('newCoffeeName').value = "";
    document.getElementById('newCoffeeRoast').value = "";
}

section.innerHTML = renderMovies(movies, displayedMovies);

submitButton.addEventListener('click', updateMovies);
document.querySelector('#addCoffeeForm').addEventListener('submit', addNewMovie);
