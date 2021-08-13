"use strict";
alert("Click Anywhere on the map to know the location");
class App {
  #data = [];
  #map;
  #option = {
    enableHighAccuracy: true,
  };
  #database;
  constructor() {
    this.getPosition();
  }
  getPosition() {
    navigator.geolocation.getCurrentPosition(
      this.loadmap.bind(this),
      () => alert("Position Not found"),
      Option
    );
  }
  loadmap(position) {
    const { latitude, longitude } = position.coords;
    this.#map = L.map("map").setView([latitude, longitude], 8);
    let lat, lng;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.googlemap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on("click", this.startfetching.bind(this));
  }

  place = async function (lat, lng) {
    //console.log(lat, lng);
    try {
      let city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (city.status === 403)
        city = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      const data = await city.json();
      if (data.success === false) throw new Error();
      if (data.latt == "0.00000") throw new Error("Please, Click on Main Land");
      //console.log(data.prov);
      const country = await fetch(
        `https://restcountries.eu/rest/v2/alpha/${data.prov}`
      );
      if (country.status === 403)
        country = await fetch(
          `https://restcountries.eu/rest/v2/alpha/${data.prov}`
        );
      if (country.status === 403)
        country = await fetch(
          `https://restcountries.eu/rest/v2/alpha/${data.prov}`
        );

      const data2 = await country.json();
      return [data, data2];
    } catch (err) {
      alert(err);
    }
  };
  startfetching(mapE) {
    const { lat, lng } = mapE.latlng;
    this.place(lat, lng)
      .then((ev) => {
        console.log(ev);
        // if (ev.success == false)
        //   throw new Error("Try Again,Failed to fetch data");
        // if (ev.latt == "0.00000") throw new Error("Please, Click on Main Land");
        if (ev == undefined) throw new Error("Failed");
        this.popup(ev);
        this.database(ev);
      })
      .catch((err) => console.log(err));
  }

  popup(data) {
    const layer = L.marker([data[0].latt, data[0].longt]).addTo(this.#map);
    const popup = layer
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent(`${data[0].city},${data[1].name}`)
      .openPopup();
  }
  database(data) {
    const { latt, longt } = data[0];
    const date = String(Date.now());
    this.#database = {
      city: data[0].city,
      country: data[1].name,
      district: "No Information",
      state: "No Information",
      latitude: latt,
      longitude: longt,
      countryfind: function () {
        if (this.country.includes("(")) {
          this.country = this.country.split("(")[0];
        }
      },
      districtfind: function () {
        if (typeof data[0].region == "string") {
          if (data[0].region.includes(",")) {
            const arr = data[0].region.split(",");
            this.district = arr[0];
            this.state = arr[1];
          } else if (data[0].region) {
            this.state = data[0].region;
          }
        }
      },
      id: date,
      flag: data[1].flag,
    };
    this.#database.countryfind();
    this.#database.districtfind();
    // console.log(data);
    this.append();
    this.#data.unshift(this.#database);
  }
  append() {
    const slidebar = document.querySelector(".box");
    const box1 = document.createElement("div");
    box1.classList.add("workout");
    box1.classList.add("workout--running");
    box1.classList.add("grid-container");
    const box2 = document.createElement("div");
    box2.classList.add("pos");
    box1.setAttribute("data-id", `${this.#database.id}`);
    const html = `<li>
          <h2 class="workout__title">ADDRESS DETAILS</DETAils></h2>
          <div class="workout__details">
            <span class="workout__icon country">Country:</span>
            <span class="workout__value country_name">${
              this.#database.country
            }</span>
            <span class="workout__unit flag"></span>
          </div>
          <div class="workout__details">
            <span class="workout__icon state">State:</span>
            <span class="workout__value state_name" >${
              this.#database.state
            }</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon district">District:</span>
            <span class="workout__value district_name ">${
              this.#database.district
            }</span>
            
          </div>
          <div class="workout__details">
            <span class="workout__icon city">City:</span>
            <span class="workout__value">${this.#database.city}</span>
          </div>
          <div class="weather workout__icon" data-ok="0">
            <span class="status" style="transform: translateX(3.5rem)">Check Weather</span> 
            </div>
           </li>`;
    const box3 = document.createElement("div");
    const html2 = `<img src="${
      this.#database.flag
    }" style="width:150px;height:150px;position:relative;">`;
    box2.innerHTML = html;
    box3.innerHTML = html2;
    box1.append(box2);
    box1.append(box3);
    slidebar.prepend(box1);
    this.slideto();
    const check = document.querySelector(".weather");
    check.addEventListener("click", this.checkweather.bind(this));
  }
  slideto() {
    const slideTo = document.querySelector(".workout");
    const sidebar = document.querySelector(".sidebar");
    slideTo.scrollIntoView({ behavior: "smooth" });
  }
  checkweather(e) {
    let j;
    const targetdetail = document.querySelectorAll(".workout");
    for (let i = 0; i < targetdetail.length; i++) {
      if (e.target.closest(".workout") === targetdetail[i]) {
        j = i;
        break;
      }
    }
    const html = `<div class="weather_report add" style="position: relative;">  </div>`;
    const button = e.target.closest(".weather");
    const target = e.target.closest(".status") || e.target.children[0];
    if (button.dataset.ok == "0") {
      target.closest(".workout").insertAdjacentHTML("afterend", html);
      button.dataset.ok = "1";
    }
    const sibling = target.closest(".workout").nextSibling;
    if (sibling.classList.contains("add")) {
      this.showweather(sibling, button, target, j);
    } else {
      this.closeweather(sibling, button, target, j);
    }

    ////////////{
  }
  showweather = function (sibling, button, target, j) {
    sibling.classList.remove("add");
    button.classList.add("weather_button");
    target.textContent = "Hide Weather";
    sibling.style.width = window.getComputedStyle(
      target.closest(".workout")
    ).width;
    sibling.style.height = "180px";
    this.fetchReport(j, sibling);
    //console.log("datawata", this.#data[j]);
  };
  closeweather = function (sibling, button, target, j) {
    sibling.classList.add("add");
    button.classList.remove("weather_button");
    target.textContent = "Check Weather";
    sibling.style.height = "0px";
    sibling.textContent = "";
  };
  weather_report = async function (lat, lon) {
    const key = "5c15139977cd460d2d51fde21f1111a7";
    try {
      let weather = await fetch(
        ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
      );
      let report = await weather.json();
      return report;
    } catch (err) {
      console.log(err);
    }
  };
  fetchReport(j, sibling) {
    const { latitude: lat, longitude: lon } = this.#data[j];
    this.weather_report(lat, lon).then((report) =>
      this.weatherdata(report, sibling)
    );
  }
  weatherdata(report, sibling) {
    const { main, weather, wind } = report;
    const weatherdata = {
      humidity: main.humidity,
      maxtemp: main.temp_max,
      mintemp: main.temp_min,
      description: weather[0].description,
      windspeed: wind.speed,
      degree: wind.deg,
    };
    console.log(weatherdata);
    console.log(sibling);
    this.showWeatherReport(weatherdata, sibling);
  }
  showWeatherReport(weatherdata, sibling) {
    const html = `<div class="reports"> <h3> Weather Report</h3>
         <span class="report">Max Temp</span><span>: ${Math.round(
           weatherdata.maxtemp - 273
         )}℃</span><br>
         <span class="report">Min Temp</span><span>: ${Math.round(
           weatherdata.mintemp - 273
         )}℃</span><br>
         <span class="report">Humidity</span><span>: ${
           weatherdata.humidity
         }</span><br>
         <span class="report">Wind Speed</span> <span>: ${
           weatherdata.windspeed
         }</span><br>
         <span class="report">Description</span><span>: ${
           weatherdata.description
         }</span>
             </div>`;
    setTimeout(function () {
      sibling.insertAdjacentHTML("afterbegin", html);
    }, 2000);
  }
}

const app = new App();
//
//       let total = targetelement.length;
//       let j;
//
//       }
