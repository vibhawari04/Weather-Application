const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector("[weather-container]");
const grantAccessConatiner = document.querySelector(
  ".grant-location-container"
);
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorImage = document.querySelector(".imageError");
const futureForecast = document.querySelector(".wrapper2");
// varibles
let currentTab = userTab;
const API_key = "aa48b4faf0e10617b295e21d7b17dd67";
currentTab.classList.add("current-tab");

getfromSessionStorage();

function switchTab(clickedTab) {
  if (currentTab != clickedTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    // errorImage.classList.add("active");

    currentTab.classList.add("current-tab");
    // active class nhi contain krti hai
    if (!searchForm.classList.contains("active")) {
      userInfoContainer.classList.remove("active");
      grantAccessConatiner.classList.remove("active");
      searchForm.classList.add("active");
      futureForecast.classList.remove("active");
    } else {
      searchForm.classList.remove("active");
      errorImage.classList.remove("active");
      userInfoContainer.classList.remove("active");
      futureForecast.classList.add("active");

      // to display your weather , we need to get user location
      getfromSessionStorage();
    }
  }
}

userTab.addEventListener("click", () => {
  switchTab(userTab);
});

searchTab.addEventListener("click", () => {
  switchTab(searchTab);
});

// to get geoLocation from here
// check cordinates are already  present in session storage
function getfromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    grantAccessConatiner.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

// fetchUserWeatherInfo fectingn latitute and longitute

async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;
  console.log(lat, " ", lon);
  //make grant conatiner invisibele
  grantAccessConatiner.classList.remove("active");
  // make loading visible
  loadingScreen.classList.add("active");
  futureForecast.classList.add("active");

  //API call
  try {
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
    // );
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`
    );
    const data = await response.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    // futureForecast.classList.add("active");

    renderWeatherInfo(data);
  } catch (err) {
    // home work
    // loading screen remove
    console.log(err);
    loadingScreen.classList.remove("active");
    alert("something went wrong ");
  }
}

// rendering weather value
// function renderWeatherInfo(weatherInfo) {
//   //  weatherInfo json object
//   //fetching weather info which we want to render

//   const cityName = document.querySelector("[data-cityName]");
//   const countryIcon = document.querySelector("[data-countryIcon]");
//   const desc = document.querySelector("[data-weatherDesc]");
//   const weatherIcon = document.querySelector("[data-weatherIcon]");
//   const temp = document.querySelector("[data-temp]");
//   const windspeed = document.querySelector("[data-windspeed]");
//   const humidity = document.querySelector("[data-humidity]");
//   const clouds = document.querySelector("[data-cloudiness]");

//   // rendering the values which is fetching from the api

//   cityName.innerText = weatherInfo?.name;

//   countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

//   desc.innerText = `( ${weatherInfo?.weather?.[0]?.description} )`;

//   weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

//   temp.innerText = `${weatherInfo?.main?.temp} °C`;

//   windspeed.innerText = `${weatherInfo?.wind?.speed}  m/s`;
//   humidity.innerText = `${weatherInfo?.main?.humidity}%`;
//   clouds.innerText = `${weatherInfo?.clouds?.all}%`;
// }
function renderWeatherInfo(weatherInfo) {
  //  weatherInfo json object
  //fetching weather info which we want to render

  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const desc = document.querySelector("[data-weatherDesc]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");

  const temp = document.querySelector("[data-temp]");
  const windspeed = document.querySelector("[data-windspeed]");
  const humidity = document.querySelector("[data-humidity]");
  const clouds = document.querySelector("[data-cloudiness]");

  // wrapper 2
  const icon = document.querySelectorAll(".icon");
  const w_desc = document.querySelectorAll(".w-desc");
  console.log(icon.length);
  console.log(icon);
  const days_temp = document.querySelectorAll(".days-temp");
  console.log(days_temp, days_temp.length);

  // rendering the values which is fetching from the api

  let j = 0;
  for (let i = 0; i < 40; i += 8) {
    // console.log("data", weatherInfo?.list[i]?.name);
    cityName.innerText = weatherInfo?.city.name;
    desc.innerText = `( ${weatherInfo?.list[i]?.weather[0]?.description} )`;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.city?.country.toLowerCase()}.png`;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.list[i]?.weather[0]?.icon}.png`;
    temp.innerText = `${(weatherInfo?.list[i]?.main?.temp - 273.15).toFixed(
      2
    )} °C`;
    windspeed.innerText = `${weatherInfo?.list[i]?.wind?.speed}  m/s`;
    humidity.innerText = `${weatherInfo?.list[i]?.main?.humidity}%`;
    clouds.innerText = `${weatherInfo?.list[i]?.clouds.all}%`;

    if (j < 5) {
      w_desc[
        j
      ].innerText = `( ${weatherInfo?.list[i]?.weather[0]?.description} )`;
      icon[
        j
      ].src = `http://openweathermap.org/img/w/${weatherInfo?.list[i]?.weather[0]?.icon}.png`;

      days_temp[j].innerText = `${(
        weatherInfo?.list[i]?.main?.temp - 273.15
      ).toFixed(2)} °C`;
      j++;
    }

    // icon.innerText.src = `http://openweathermap.org/img/w/${weatherInfo?.list[i]?.weather[0]?.icon}.png`;
    //  console.log("data", obj?.list[i]?.dt_txt);
    //  console.log("data", obj?.list[i]?.dt_txt);
    //   console.log("data", obj?.list[i]?.dt_txt);
    for (let j = 0; j < 5; j++) {
      // w_desc[
      //   j
      // ].innerText = `( ${weatherInfo?.list[j]?.weather[0]?.description} )`;
    }
    console.log("chal " + i);
  }

  const d = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  function CheckDay(day) {
    if (day + d.getDay() > 6) {
      return day + d.getDay() - 7;
    } else {
      return day + d.getDay();
    }
  }

  console.log("day is : ", d.getDay());
  for (let x = 0; x < 5; x++) {
    console.log(x);
    console.log(weekday[CheckDay(x)]);
    document.getElementById("day-" + (x + 1)).innerText = weekday[CheckDay(x)];
    // console.log("week is ", weekday[CheckDay(i)]);
  }
  // cityName.innerText = weatherInfo?.name;

  // countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

  // desc.innerText = `( ${weatherInfo?.weather?.[0]?.description} )`;

  // weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

  // temp.innerText = `${weatherInfo?.main?.temp} °C`;

  // windspeed.innerText = `${weatherInfo?.wind?.speed}  m/s`;
  // humidity.innerText = `${weatherInfo?.main?.humidity}%`;
  // clouds.innerText = `${weatherInfo?.clouds?.all}%`;
}
// get location of the user
function getLocation() {
  if (navigator.geolocation) {
    //passing showposition call back function
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //hw show an alert for no geoloaction suppport availabel

    console.log("error aa raha h 2");
    alert("Geolocation support is not available.");
  }
}

// defination of showPosition callback function

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  // saving user coordinates

  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}
const grantAccessBtn = document.querySelector("[data-grantAcess]");
grantAccessBtn.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = searchInput.value;
  if (cityName === "") return;
  else fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city) {
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessConatiner.classList.remove("active");
  errorImage.classList.remove("active");

  try {
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    // );

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`
    );
    const data = await response.json();
    if (data?.cod === "404") {
      displayErrorFunction();

      throw new Error("City No found");
    }

    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    futureForecast.classList.add("active");

    renderWeatherInfo(data);
    // console.log("chala kya");
  } catch (err) {
    console.log("error found ", err);
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.remove("active");
    futureForecast.classList.remove("active");
  }
}

function displayErrorFunction() {
  errorImage.classList.add("active");
}
