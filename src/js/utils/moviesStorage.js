class MoviesStorage {

    addMoviesToStorage(movies) {

        try {
            localStorage.setItem('movies', JSON.stringify(movies));
        } catch (error) {
            console.error("Save movie to storage error: ", error.message);
        }  
        //console.log('MoviesStorage',JSON.parse(localStorage.getItem('movies')))      
    }
    
    getMovieById(id) {
        try {
            const movies = JSON.parse(localStorage.getItem('movies'));
            const movie = movies.find(movie => movie.id == id)
            return movie            
        } catch (error) {
            console.error("Get movie error: ", error.message);
        }     
    }

 } 

 export default new MoviesStorage();




