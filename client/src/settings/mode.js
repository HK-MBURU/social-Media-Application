const setDarkMode=()=>{
    document.querySelector("body").setAttribute('data-theme','dark')
    localStorage.setItem("selectedTheme","dark")
}
const setLightMode=()=>{
    document.querySelector("body").setAttribute('data-theme','light')
    localStorage.setItem("selectedTheme","light")
}
const selectedTheme=localStorage.getItem("selectedTheme")

if(selectedTheme==="dark"){
    setDarkMode()
}
 export {setDarkMode,setLightMode}