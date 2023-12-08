document.addEventListener("DOMContentLoaded", () => {
    const loadingElement = document.getElementById("loading");
    const moviesListElement = document.getElementById("movies-list");
    const addMovieForm = document.getElementById("add-movie-form");

    // Function to fetch movies
    const fetchMovies = async () => {
        try {
            const response = await fetch("http://localhost:3000/movies");
            const movies = await response.json();
            return movies;
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // Function to render movies
    const renderMovies = (movies) => {
        moviesListElement.innerHTML = "";
        movies.forEach((movie) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<span>${movie.title} - Rating: ${movie.rating}</span> 
                           <button onclick="editMovie(${movie.id})">Edit</button>
                           <button onclick="deleteMovie(${movie.id})">Delete</button>`;
            moviesListElement.appendChild(listItem);
        });
    };

    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const rating = document.getElementById("rating").value;

        try {
            const response = await fetch("http://localhost:3000/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, rating }),
            });

            const newMovie = await response.json();
            // Fetch and render updated movie list
            const movies = await fetchMovies();
            renderMovies(movies);
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

    // Function to handle movie deletion
    window.deleteMovie = async (movieId) => {
        try {
            await fetch(`http://localhost:3000/movies/${movieId}`, {
                method: "DELETE",
            });

            // Fetch and render updated movie list
            const movies = await fetchMovies();
            renderMovies(movies);
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    // Function to handle movie editing
    window.editMovie = async (movieId) => {
        // Fetch movie details
        try {
            const response = await fetch(`http://localhost:3000/movies/${movieId}`);
            const movieDetails = await response.json();

            // Pre-populate the form with movie details
            document.getElementById("title").value = movieDetails.title;
            document.getElementById("rating").value = movieDetails.rating;

            // TODO: Add logic to update movie details on form submission
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    // Initial setup
    const init = async () => {
        try {
            // Start JSON server
            await fetch("http://localhost:3000/movies");
            // Fetch movies and render
            const movies = await fetchMovies();
            renderMovies(movies);
            // Remove loading message
            loadingElement.style.display = "none";
        } catch (error) {
            console.error("Error initializing app:", error);
        }
    };

    // Event listeners
    addMovieForm.addEventListener("submit", handleFormSubmit);

    // Initialize app
    init();
});





