const getTime=()=>{
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes()} ,${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
}
const buildTemplate=(k,v)=>`<p><b>${k} : </b><span>${v}</span></p>`
const cardElements=(name, obj)=>{
    const getItems_ls = localStorage.getItem('wa_app')? JSON.parse(localStorage.getItem('wa_app')):[];
    if (getItems_ls.length===0){
        return(
            `   
            <h1>${name.toUpperCase()}</h1>
            <p><b>Longitude :- </b><span>${lon}</span></p>
            <p><b>Latitude :- </b><span>${lat}</span></p>
            <p><b>Temperature :- </b><span>${temp}</span></p>
            <p><b>Humidity :- </b><span>${humidity}</span></p>
            <p><b>Pressure :- </b><span>${pressure}</span></p>
            <p><b>Wind speed :- </b><span>${windSpeed}</span></p>
            <p><b>Time & Date :- </b><span>${getTime()}</span></p>
        `
        )
    }else{
        const a = [
            ["coord",
                [
                    ["longitude", "lon"], ["latitude", "lat"]
                ]
            ],
            ["main",
                [
                    ["Temperature", "temp"], ["Humidity", "humidity"], ["Pressure", "pressure"], ["minTemp", "temp_min"], ["maxTemp", "temp_max"], ["seaLevel", "sea_level"] 
                ]
            ]
        ]
        let template = [];
        template.push(`<h1>${name.toUpperCase()}</h1>`)
        getItems_ls.forEach(e1=>{
            if (e1.isChecked){
                a.forEach(e2=>{
                    e2[1].forEach(e3=>{
                        if(e3[0].trim().toLowerCase()===e1.val.trim().toLowerCase()){
                            template.push(buildTemplate(e1.val, obj[e2[0]][e3[1]]))
                            console.log("added", e1.val, obj[e2[0]][e3[1]])
                        }
                    })
                })
            }
        })
        template.push(buildTemplate("Time & Date", getTime()));
        template = template.join("");
        return template;
    }
}



const useDebounce=(fn, delay = 1000)=>{
    let timeOutID;
    return function(apiKey, e){
        if (timeOutID){
            clearTimeout(timeOutID);
        }
        timeOutID = setTimeout(()=>{
            console.log("api called")
            fn(apiKey, e.target.value.trim())
        },delay)
    }
}

const manageBackgrounds=(c=null)=>{
    const r = document.querySelector("main").style;
    if (c==="sun"){
        r.backgroundImage = "url('./assets/sun.jpg')";
    }else if(c==="clouds"){
        r.backgroundImage = "url('./assets/clouds.jpg')"
    }else if (c==="rain"){
        r.backgroundImage = "url('./assets/rain.jpg')"
    }else if (c==="mist"){
        r.backgroundImage = "url('./assets/mint.jpg')"
    }else if (c==="clear"){
        r.backgroundImage = "url('./assets/clearsky.webp')"
    }
    else{
        r.backgroundImage='';
    }
}

export { cardElements, useDebounce, manageBackgrounds }