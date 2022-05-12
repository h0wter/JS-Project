export default function fetchId(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e900ddd99edc3affd146f1905e638fd1&language=en-US`)
        .then(r => { return r.json() })
}