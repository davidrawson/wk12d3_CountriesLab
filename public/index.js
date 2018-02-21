const  app = function(){
  const url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;

  let savedCountry = JSON.parse(localStorage.getItem('country'))
  displayCountryDetails(savedCountry);

  const countries = JSON.parse(jsonString);
  populateDropDown(countries);
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
    const ul = document.getElementById("country-detail-list");
    ul.innerHTML = "";
    const li_name = document.createElement("li");
    li_name.setAttribute("id", "li_name");
    li_name.innerText = "Country: " + country.name;
    const li_capital = document.createElement("li");
    li_capital.setAttribute("id", "li_capital");
    li_capital.innerText = "Capital: " + country.capital;
    const li_population = document.createElement("li");
    li_population.setAttribute("id", "li_population");
    li_population.innerText = "Population: " + country.population;
    ul.appendChild(li_name);
    ul.appendChild(li_capital);
    ul.appendChild(li_population);
    console.log(ul.innerHTML);

    persistCountry(country);
  }

  const persistCountry = function(country){
    localStorage.setItem('country', [JSON.stringify(country)]);
  }

  document.addEventListener('DOMContentLoaded', app);
