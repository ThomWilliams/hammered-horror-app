var typeEl = document.querySelector("#type");
var subgenreEl = document.querySelector("#subgenre");
var yearsEl = document.querySelector("#years");
var languageEl = document.querySelector("#language");
var movieSelectorContainer = document.querySelector(".movieSelectorContainer");
var movieSelectedScreen = document.querySelector(".selected-movie");
var typeContainer = document.getElementById("type");
var subgenreContainer = document.getElementById("subgenre");
var yearsContainer = document.getElementById("years");
var languageContainer = document.getElementById("language");


// Getting the movie criteria
var API_KEY = "7557a7686c1be5c7114f3c419653ff79";
var urlForm = "https://api.themoviedb.org/3/discover/";

// Form - TYPE
var typeEl = document.querySelector(".typeList");
if (document.getElementById("type")) {
  typeEl.addEventListener("click", function (event) {
    var type = event.target.id;
    urlForm += type;
    urlForm += "?api_key=";
    urlForm += API_KEY;
    typeContainer.style.display = "none";
    subgenreContainer.style.display = "flex";
  });
}


// Form - SUBGENRE
var subgenreEl = document.querySelector(".subgenreList");
if (document.querySelector("#subgenre")) {
subgenreEl.addEventListener("click", function (event) {
      var subgenre = event.target.id;
      urlForm += "&genres=horror&with_keywords=";
      urlForm += subgenre;
      subgenreContainer.style.display = "none";
      yearsContainer.style.display = "flex";
});
}

// Form - YEARS
var yearsEl = document.querySelector(".yearsList");
if (document.querySelector("#years")) {
yearsEl.addEventListener("click", function (event) {
    var years = event.target.id;
    urlForm += "&year=";
    urlForm += years;
    yearsContainer.style.display = "none";
    languageContainer.style.display = "flex";
});
}

// Form - LANGUAGE
var languageEl = document.querySelector(".languageList");
if (document.querySelector("#language")) {
languageEl.addEventListener("click", function (event) {
  var language = event.target.id;
  urlForm += "&language=";
  urlForm += language;
  languageContainer.style.display = "none";
  movieSelectorContainer.style.display = "block";
  getTheMovieDatabase();
});
}

// Getting the user Criteria
function getTheMovieDatabase() {
  fetch(urlForm)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      printItemList(data.results);
    });
}

// OPEN MOVIE DATABASE
function getOpenMovieDatabaseAPI(title) {
  movieSelectorContainer.style.display = "none";
  movieSelectedScreen.style.display = "block";
  var API_KEY = "930706b3";
  var requestURL = `http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayExtraSelectedMovie(data);
      trickorTreat(data.Ratings);
    });
}

// Display the Title selected
function displaySelectedMovie(movieData) {
  movieSelectorContainer.style.display = "none";
  movieSelectedScreen.style.display = "block";

  var posterUrl = "https://image.tmdb.org/t/p/w500" + movieData.poster_path;

  var filmTitle = document.getElementById("film-title");
  filmTitle.textContent = movieData.original_title;
  var posterImage = document.getElementById("poster");
  posterImage.setAttribute("src", posterUrl);
  var ageCertificate = document.getElementById("age");
  ageCertificate.textContent = movieData.adult;
  ageCertificate.style.color = "orange";
  var countryLanguage = document.getElementById("country");
  countryLanguage.textContent = movieData.original_language;
  countryLanguage.style.color = "orange";
  var yearReleased = document.getElementById("year-released");
  yearReleased.textContent = movieData.release_date;
  yearReleased.style.color = "orange";
  var filmSynopsis = document.getElementById("synopsis");
  filmSynopsis.textContent = movieData.overview;
  filmSynopsis.classList.add("filmSynopsis");
  document
    .getElementById("back-btn")
    .addEventListener("click", function goBack() {
      window.history.back();
    });
  document.getElementById("save-btn").addEventListener("click", function (e) {
    e.preventDefault();
    saveFilmHistory(movieData.id);
  });
}

function displayExtraSelectedMovie(data) {
  var directorName = document.getElementById("director");
  directorName.textContent = data.Director;
  directorName.style.color = "orange";
  var runTime = document.getElementById("runtime");
  runTime.textContent = data.Runtime;
  runTime.style.color = "orange";
  var ageCertificate = document.getElementById("age");
  ageCertificate.textContent = data.Rated;
  ageCertificate.style.color = "orange";
  var yearReleased = document.getElementById("year-released");
  yearReleased.textContent = data.Released;
}

// Trick or Treat
function trickorTreat(data) {
  var trickOrTreatInput = document.getElementById("trickortreat");
  var IMDBscore = data[0] && data[0].Value;
  var rottenTomatoesScore = data[1] && data[1].Value;
  var metacriticScore = data[2] && data[2].Value;

  // normalises all values out of 100
  // parseFloat takes decimal score and ignores suffix string
  var imdbParsed = parseFloat(IMDBscore) * 10;
  var rottenParsed = parseInt(rottenTomatoesScore);
  var metaParsed = parseInt(metacriticScore);

  // checks error - if not enough score data
  if (
    Number.isNaN(imdbParsed) ||
    Number.isNaN(rottenParsed) ||
    Number.isNaN(metaParsed)
  ) {
    trickOrTreatInput.textContent = " Not Enough Data";
    trickOrTreatInput.setAttribute("class", "spooky");
  } else if (imdbParsed > 50 && rottenParsed > 50 && metaParsed > 50) {
    trickOrTreatInput.textContent = "TREAT!";
    trickOrTreatInput.setAttribute("class", "treat");
  } else if (imdbParsed < 50 && rottenParsed < 50 && metaParsed < 50) {
    trickOrTreatInput.textContent = "TRICK!";
    trickOrTreatInput.setAttribute("class", "trick");
  } else {
    trickOrTreatInput.textContent = " JURY'S OUT - APPROACH WITH CAUTION!";
    trickOrTreatInput.setAttribute("class", "caution");
  }
}

// Local Storage
function saveFilmHistory(movieId) {
  var watchList = JSON.parse(window.localStorage.getItem("watchList")) || [];

  if (!watchList.includes(movieId)) {
    watchList.push(movieId);
  }

  window.localStorage.setItem("watchList", JSON.stringify(watchList));
}
