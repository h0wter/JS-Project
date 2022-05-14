class MoviesStorage {

    addMoviesToStorage(movies) {

        try {
            localStorage.setItem('movies', JSON.stringify(movies));
        } catch (error) {
            console.error("Save movie to storage error: ", error.message);
        }  
        console.log('MoviesStorage',JSON.parse(localStorage.getItem('movies')))      
    }
    
    getMovieById(id) {
        try {
            const movies = JSON.parse(localStorage.getItem('movies'));
            console.log('getMovieById movies returned from storage', movies)
            const movie = movies.find(movie => movie.id == id)
            console.log('getMovieById func returned', movie)
            return movie            
        } catch (error) {
            console.error("Get movie error: ", error.message);
        }     
    }

 } 

 export default new MoviesStorage();




