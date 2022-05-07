let moviesCache  = {};

export function addMoviesToCache(movies) {
    moviesCache  = {};
    for (const movie of movies) {
        moviesCache[movie.id] = movie;
    }
}

export function getMovieById(id) {
    return moviesCache[id]
}