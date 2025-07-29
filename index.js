let city_name=document.querySelector(".weather_city")
let datetime=document.querySelector(".weather_date_time");
let w_forecast=document.querySelector(".weather_forecast");
let w_temperature=document.querySelector(".weather_temperature");
let w_icon=document.querySelector(".weather_icon")
let w_mintem=document.querySelector(".weather_min");
let w_maxtem=document.querySelector(".weather_max")
let w_feelslike=document.querySelector('.weather_feelslike')
let w_humidity=document.querySelector('.weather_humidity')
let w_wind=document.querySelector('.weather_wind')
let w_pressure=document.querySelector('.weather_pressure')
let citysearch=document.querySelector(".weather_search")



const getcountry_name=(code)=>{
  return new Intl.DisplayNames([code],{type:"region"}).of(code);
}
const getdatetime=(dt)=>{
 const currdate=new Date(dt*1000);
//  console.log(currdate);
 const option={
  weekday:"long",
  year:"numeric",
  month:"long",
  day:"numeric",
  hour:"numeric",
  minute:"numeric",
 };
 const formatter=new Intl.DateTimeFormat("en-US",option);
 const formateddate=formatter.format(currdate)
 return formateddate;
}



let city='lucknow';
citysearch.addEventListener('submit',(e)=>{
  e.preventDefault();
  const cityname=document.querySelector('.city_name');
  console.log(cityname.value);
  city=cityname.value;
  getweatherdata();
  cityname='';
})

const getweatherdata=async ()=>{
   const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}
   &APPID=5bbce473bd3ea6075dd70d5e490b5260&units=metric
`;

    try{
  const res=await fetch(weatherurl);
  const data=await res.json();
  console.log(data)
    const {main,name,weather,wind,sys,dt}=data;
w_forecast.innerHTML=weather[0].main;
w_icon.innerHTML=`<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`

  city_name.innerHTML=`${name}, ${getcountry_name(sys.country)}`
  datetime.innerHTML=getdatetime(dt)
  w_temperature.innerHTML=`Temp- ${main.temp}&#176C`
w_mintem.innerHTML=`min temp- ${main.temp_min.toFixed()}&#176C`
w_maxtem.innerHTML=`max temp- ${main.temp_max.toFixed()}&#176C`
w_feelslike.innerHTML=`${main.feels_like.toFixed(2)}&#176`
w_humidity.innerHTML=`${main.humidity}%`;
w_wind.innerHTML=`${wind.speed}m/s`;
w_pressure.innerHTML=`${main.pressure}hPa`;


    }
    catch(error){
        alert("city name is not found")
    }
}; 

document.body.addEventListener("load",getweatherdata()); 
