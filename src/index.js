const img = "https://image.tmdb.org/t/p/w500";
const MOVIES_URL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=754ad3989128c7d8cfcc82e6591e7f2e";
class Movie {
  constructor(json) {
    this.image = `${img}${json.poster_path}`;
    this.title = json.original_title;
    this.release_date = json.release_date;
  }
  static getMovies() {
    return fetch(MOVIES_URL)
      .then(response => response.json())
      .then(json => json.results.map(movie => new Movie(movie)))
      .catch(error => console.log(error));
  }

  static renderMovie(movie) {
    const usersList = document.getElementById("moviesList");
    usersList.insertAdjacentHTML(
      "beforeend",
      `
    <li>
      <img src="${movie.image}" alt="profile" width="100"/>
      <h3>${movie.title}</h3>      
      <h3>${movie.release_date}</h3>
      <hr>
    </li>
    `
    );
  }

  static render(movies) {
    movies.forEach(movie => {
      Movie.renderMovie(movie);
    });
  }
}

Movie.getMovies()
  .then(movies => Movie.render(movies))
  .catch(err => console.log(err));

const TV_URL =
  "https://api.themoviedb.org/3/tv/popular?api_key=754ad3989128c7d8cfcc82e6591e7f2e";

class TV {
  constructor(json) {
    this.image = `${img}${json.poster_path}`;
    this.title = json.original_name;
    this.release_date = json.first_air_date;
  }
  static getTVSeries() {
    return fetch(TV_URL)
      .then(response => response.json())
      .then(json => json.results.map(tvSeries => new TV(tvSeries)))
      .catch(error => console.log(error));
  }

  static renderTVSeries(series) {
    const tvsList = document.getElementById("tvsList");
    tvsList.insertAdjacentHTML(
      "beforeend",
      `
    <li>
      <img src="${series.image}" alt="profile" width="100"/>
      <h3>${series.title}</h3>      
      <h3>${series.release_date}</h3>
      <hr>
    </li>
    `
    );
  }

  static render(tvSeries) {
    tvSeries.forEach(series => {
      TV.renderTVSeries(series);
    });
  }
}

TV.getTVSeries()
  .then(tvSeries => TV.render(tvSeries))
  .catch(err => console.log(err));
