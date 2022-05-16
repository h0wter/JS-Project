class MoviesStorage {

    addMoviesToStorage(movies) {

        try {
            localStorage.setItem('movies', JSON.stringify(movies));
        } catch (error) {
            console.error("Save movie to storage error: ", error.message);
        }  
  
    }

 
    getMovieById(id) {

        try {
            const movies = JSON.parse(localStorage.getItem('movies'));
            const movie = movies.find(m => m.id == id)
            if (movie) {
                return movie;
            }
            const watchedMovies = JSON.parse(localStorage.getItem('Watched'));
            const watchedMovie = watchedMovies.find(w => w.id == id)
            if (watchedMovie) {
                return watchedMovie;
            }
            const queuedMovies = JSON.parse(localStorage.getItem('Queue'));
            const queuedMovie = queuedMovies.find(q => q.id == id)
            if (queuedMovie) {
                return queuedMovie;  
            }         
        } catch (error) {
            console.error("Get movie error: ", error.message);
        }     
    }

 } 

 export default new MoviesStorage();




