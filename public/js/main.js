// requests(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=b30d510745bc4fa112235b620b536775`)

const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');


const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    } else {
        try {

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=b30d510745bc4fa112235b620b536775`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];

            // City Name
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            // Changing Temp Data
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color:#f1f2f6;'></i>";

            }
            datahide.classList.remove('data_hide');
            cityVal = "";

        } catch {
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText = `Please Enter the Proper City Name`;
            datahide.classList.add("data_hide");
        }

    }
}

submitBtn.addEventListener('click', getInfo);