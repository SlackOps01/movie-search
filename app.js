 //Titles https://www.omdbapi.com/?s=thor&page=1&apikey=3a2e44ee

 // details https://www.omdbapi.com/?i=tt3896198&apikey=3a2e44ee


const movieSearchbox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

async function loadMovies(searchTerm){
    const url = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=3a2e44ee`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.Response == 'True') displayMovieList(data.Search);
}

loadMovies(movieSearchbox.value) 


function findMovies(){
    let searchTerm = (movieSearchbox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    }
    else{
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = ""
    for(let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add("search-list-item");
        if(movies[idx].Poster != 'N/A'){
            moviePoster = movies[idx].Poster;
        }
        else{
            moviePoster = "notfound.png";
        }
        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}" alt="">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem)
    }   
    loadMoviesDetails()
}

function loadMoviesDetails(){
    const searchListMovies = document.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        console.log(movie);
        movie.addEventListener('click', async() => {
            searchList.classList.add('hide-search-list');
            movieSearchbox.value = '';
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=3a2e44ee`);
            const movieDetails = await result.json();
            console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    })
}


function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class="movie-poster">
                        <img src="${(details.Poster != "N/A") ? details.Poster : "notfound.png"}" alt="movie poster">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${details.Title}</h3>
                        <ul class="movie-misc-info">
                            <li class="year">Year: ${details.Year}</li>
                            <li class="rated">Ratings: ${details.Rated}</li>
                            <li class="released">Released: ${details.Released}</li>
                        </ul>
                        <p class="genre"><b>Genre:</b> ${details.Genre}</p>
                        <p class="writer"><b>Writer:</b> ${details.Writer}</p>
                        <p class="actors"><b>Actors:</b> ${details.Actors}</p>
                        <p class="director"><b>Director:</b> ${details.Director}</p>
                        <p class="plot"><b>Plot:</b> ${details.Plot}</p>
                        <p class="language"><b>Language:</b> ${details.Language}</p>
                        <p class="box"><b>Box Office:</b> ${details.BoxOffice}</p>
                        <p class="awards"><b>Awards:</b> ${details.Awards}</p>
                        <p class="awards"><b>Runtime:</b> ${details.Runtime}</p>
                        <p class="awards"><b>IMDB:</b> ${details.imdbRating}</p>
                        <p class="awards"><b>IMDB Votes:</b> ${details.imdbVotes}</p>
                        <p class="awards"><b>Meta Score:</b> ${details.Metascore}/100</p>
                    </div>
    `
}