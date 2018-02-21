const  app = function(){
  // console.log("onload called");
  const url = "https://restcountries.eu/rest/v2/all";

  // // requestComplete is a callback for when the request is um completed.
  // button.addEventListener("click", handleButtonClicked)
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  // Remember, you can't do anything with the data until you have it.
  // The callback, requestComplete will fire up once loaded.
  request.addEventListener("load", callback);
  // THIS is an easy step to miss out.
  request.send();
}

const requestComplete = function(){
  // console.log("callback called - requestComplete");
  // .this here refers to request from the eventlistener line.
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  // console.log(jsonString);
  // Parse the string into an array of objects

  let savedCountry = JSON.parse(localStorage.getItem('country'))
  // console.log("savedCoutry", savedCountry);
  // stringCountry = JSON.parse(savedCountry);
  // console.log(stringCountry);
  displayCountryDetails(savedCountry);

  const countries = JSON.parse(jsonString);
  populateDropDown(countries);
  // populateList(countries);
}

const populateDropDown = function(countries){
  const select = document.getElementById("countries-list");
  countries.forEach(function(country){
    const option = document.createElement("option");
    option.innerText = country.name;
    select.appendChild(option);
  })
  select.addEventListener('change', function(){
    getCountryDetails(countries, this.value)});
  }

  const getCountryDetails = function(countries, countryName){
    countries.forEach(function(country){
      if (country.name === countryName){
        displayCountryDetails(country);
      }
    })
  }

  const displayCountryDetails = function(country){
    // li_clearer();


    // console.log(country.name, country.population, country.capital);
    const ul = document.getElementById("country-detail-list");
    const li_name = document.createElement("li");
    li_name.setAttribute("id", "li_name");
    li_name.innerText = " ";
    li_name.innerText = "Country: " + country.name;
    const li_capital = document.createElement("li");
    li_capital.setAttribute("id", "li_capital");
    li_capital.innerText = " ";
    li_capital.innerText = "Capital: " + country.capital;
    const li_population = document.createElement("li");
    li_population.setAttribute("id", "li_population");
    li_population.innerText = " ";
    li_population.innerText = "Population: " + country.population;
    // ul.clear();
    ul.appendChild(li_name);
    ul.appendChild(li_capital);
    ul.appendChild(li_population);

    persistCountry(country);
  }

  const persistCountry = function(country){
    localStorage.setItem('country', [JSON.stringify(country)]);
  }

  document.addEventListener('DOMContentLoaded', app);
