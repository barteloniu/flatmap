const map = document.querySelector("#map")
const night = document.querySelector("#night")
const imgs = document.querySelectorAll("img")
const osmLink = document.querySelector("#osmLink")

//resizing the map
function resize(){
    if(window.innerWidth > window.innerHeight){
        for (const i of imgs){
            i.style.height = window.innerHeight + "px"
            i.style.width = window.innerHeight + "px"
        }
    }
    else{
        for (const i of imgs){
            i.style.height = window.innerWidth + "px"
            i.style.width = window.innerWidth + "px"
        }
    }
}

resize()
window.addEventListener("resize", e => {
    resize()
})

//calculating position
function calcLongLat(distance, angle){
    const long = angle
    const lat = -(distance * (180/(map.width / 2)) - 90)
    console.table([long, lat, osmLink.href])
    osmLink.href = `https://openstreetmap.org#map=8/${lat}/${long}`
    osmLink.click()
}

//detecting clicks
map.addEventListener("click", e => {
    const distance = Math.sqrt((e.layerX - map.width / 2) ** 2 + (e.layerY - map.height / 2) ** 2)
    const angle = Math.atan2(e.layerX - map.width / 2, e.layerY - map.height / 2) * 180 / Math.PI
    calcLongLat(distance, angle)
})

//rotating night img
function rotateNight(){
    const date = new Date()
    const time = date.getHours() + date.getMinutes() / 60
    night.style.transform = `rotateZ(${time * 15}deg)`
}
rotateNight()
setInterval(() => {
    rotateNight()
}, 3600000)