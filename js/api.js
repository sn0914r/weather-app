import { cardElements, useDebounce, manageBackgrounds } from "./utilities.js";
const apiKey = 'f5854f4491565a5c03e33fcc35b2c9f2';
const searchBar = document.querySelector('input');

const fetchData= async (key, name="madanapalle")=>{
    if (name==='') return
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`);
        if (!res.ok) throw new Error ("Not found")
        const data = await res.json();
        console.log(data)
        document.querySelector('section').innerHTML = '';
        document.querySelector('section').innerHTML=cardElements(name,data);
        if (data.weather[0].description.includes("clouds")){
            manageBackgrounds("clouds");
        }else if(data.weather[0].description.includes("sun")){
            manageBackgrounds("sun")
        }else if(data.weather[0].description.includes("rain")){
            manageBackgrounds("rain")
        }else if(data.weather[0].description.includes("mist")){
            manageBackgrounds("mist")
        }else if(data.weather[0].description.includes("clear")){
            manageBackgrounds("clear")
        }
        else{
            manageBackgrounds(null)
        }
    }catch (err){
        document.querySelector("main").style.backgroundImage = '';
        document.querySelector('section').innerHTML= '<p class="bhAAi">Not Found</p>';
        console.log(err.message)
    }
}
fetchData(apiKey)
const deBouncer = useDebounce(fetchData)

searchBar.addEventListener('input',e=>{
    document.querySelector('section').innerHTML = "<p class='bhAAi' >Loading....</p>"
    console.log("value : ", e.target.value)
    if (e.target.value.trim()!==''){
        deBouncer(apiKey, e);
    }else{
        document.querySelector("section").innerHTML = "<p class='bhAAi' >Please, enter a city...</p>"
    }
    
})