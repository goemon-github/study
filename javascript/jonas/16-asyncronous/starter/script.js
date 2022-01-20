'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');




///////////////////////////////////////

const renderCountry = function (data, className = '') {



    const html = `
            <article class="country ${className}">
            <img class="country__img" src="${Object.values(data.flags)[1]}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
                <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
            </div>
            </article>
        `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    //countriesContainer.style.opacity = 1;
}

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    //countriesContainer.style.opacity = 1;
}

//const getCountryAndNeighbour = function (country) {

//// AJAX call country 1
//const request = new XMLHttpRequest();
//request.open('GET', `https://restcountries.com/v2/name/${country}`);
//request.send();

//request.addEventListener('load', function () {
//const jsonDatas = JSON.parse(this.responseText);
//const data = jsonDatas[0];
//console.log(data);

//// Render country 1
//renderCountry(data);

//// get neigbour country (2) 
//const [neighbour] = data.borders;

//// get neigbour country (2) 
//const request2 = new XMLHttpRequest();
//request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//request2.send();

//request2.addEventListener('load', function () {
//const data2 = JSON.parse(this.responseText);
//renderCountry(data2, 'neighbour');
//});



//});

//};

//getCountryAndNeighbour('portugal');
//getCountryAndNeighbour('usa');



//const request = new XMLHttpRequest();
//request.open('GET', `https://restcountries.com/v2/name/${country}`);
//request.send();
//const request = fetch(`https://restcountries.com/v2/name/portugal`);
//console.log(request);

//const getCountryData = function (country) {
//fetch(`https://restcountries.com/v2/name/${country}`).then(function (response) {
//console.log(response);
//return response.json();
//}).then(function (data) {
//console.log(data);
//renderCountry(data[0]);
//})
//};

//getCountryData('portugal');


const getCountryData = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
            console.log(response);

            if (!response.ok)
                throw new Error(`Country not found (${response.status})`);


            return response.json();
        })
        .then((data) => {

            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) return

            // country 2
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        })
        .then(response => response.json(),)
        .then((data) => {
            return renderCountry(data[0], 'neighbour')
        })
        .catch(err => {
            console.error(`${err}`);
            renderError(`Something went wrong ${err.message}. Try again!`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

btn.addEventListener('click', function () {
    getCountryData('portugal');
})
getCountryData('dfsfsf');