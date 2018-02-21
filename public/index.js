const  app = function(){
  // console.log("onload called");
  const url = "https://restcountries.eu/rest/v2/all";
  // const button = document.getElementById("display-button");
  //
  // const handleButtonClicked = function(){
  //   makeRequest(url, requestComplete);
  // }
  //
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
}

// const populateList = function(countries){
//   // console.log(countries[244]);
//   const ul = document.getElementById("country-list")
//
//   countries.forEach(function(country){
//     const li = document.createElement("li");
//     li.innerText = country.name;
//     ul.appendChild(li);
//   })
// }

document.addEventListener('DOMContentLoaded', app);
