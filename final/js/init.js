// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

let undergradfour = L.featureGroup();
let undergradtransfer = L.featureGroup();
let master = L.featureGroup();
let doctorate = L.featureGroup();

let layers = {
    "Undergraduate, 4-year": undergradfour,
    "Undergraduate, transfer student": undergradtransfer,
    "Master": master,
    "Doctorate": doctorate
}

let circleOptions = {
    radius: 4.5,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 3,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/1yf5CHkfRLPXI8r1qnHEVcSLtcBFRefxudmbkb2wY_q8/edit?usp=sharing"

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// add layer control box
L.control.layers(null,layers).addTo(map)

function addMarker(data){
    if(data['What program are you currently enrolled in at UCLA?'] == "Undergraduate, 4-year"){
        circleOptions.fillColor = "red"
        undergradfour.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['If applicable, what companies did you work under and what were your job titles?']}</h2> <h3>${data['The summer after my junior year, I applied to 150 internships. I heard back from 3, and was ultimately rejected from all of them.']}</h3>`))
        createButtons(data.lat,data.lng,data['If applicable, what companies did you work under and what were your job titles?'])
        }
    if(data['What program are you currently enrolled in at UCLA?'] == "Undergraduate, transfer student"){
        circleOptions.fillColor = "blue"
        undergradtransfer.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['If applicable, what companies did you work under and what were your job titles?']}</h2> <h3>${data['The summer after my junior year, I applied to 150 internships. I heard back from 3, and was ultimately rejected from all of them.']}</h3>`))
        createButtons(data.lat,data.lng,data['If applicable, what companies did you work under and what were your job titles?'])
        }
    if(data['What program are you currently enrolled in at UCLA?'] == "Master"){
        circleOptions.fillColor = "green"
        master.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['If applicable, what companies did you work under and what were your job titles?']}</h2> <h3>${data['The summer after my junior year, I applied to 150 internships. I heard back from 3, and was ultimately rejected from all of them.']}</h3>`))
        createButtons(data.lat,data.lng,data['If applicable, what companies did you work under and what were your job titles?'])
        }
    if(data['What program are you currently enrolled in at UCLA?'] == "Doctorate"){
        circleOptions.fillColor = "purple"
        doctorate.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['If applicable, what companies did you work under and what were your job titles?']}</h2> <h3>${data['The summer after my junior year, I applied to 150 internships. I heard back from 3, and was ultimately rejected from all of them.']}</h3>`))
        createButtons(data.lat,data.lng,data['If applicable, what companies did you work under and what were your job titles?'])
        }
    return data
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    undergradfour.addTo(map) // add our layers after markers have been made
    undergradtransfer.addTo(map) // add our layers after markers have been made  
    master.addTo(map)
    doctorate.addTo(map)
    let allLayers = L.featureGroup([undergradfour,undergradtransfer,master,doctorate]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)