// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

let undergradfour = L.featureGroup();
let undergradtransfer = L.featureGroup();
let master = L.featureGroup();
let doctorate = L.featureGroup();

let layers = {
    "<svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='Crimson' /></svg> Undergraduate, 4-year": undergradfour,
    "<svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='MediumSpringGreen' /></svg> Undergraduate, transfer student": undergradtransfer,
    "<svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='YellowGreen' /></svg> Master": master,
    "<svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='LightSalmon' /></svg> Doctorate": doctorate,
}

let circleOptions = {
    radius: 4.5,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 3,
    fillOpacity: 0.8
}

let qCompanies = 'If applicable, what companies did you work under and what were your job titles?';
let qChallenges = 'Have you faced any challenges finding employment/internship opportunities in the US because of your immigration status?';

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSMp69QF0ErDoM8xCf_OZ5RNKlUlw2xMYKMLotWLjbQGsPk6NagJRmuDaFqeaid49qnppH9Vs6NTct4/pub?output=csv"

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	subdomains: 'abcd',
	accessToken: 'LKTW24tyB1L58EkjGQmMI14e8Mv94UwoVCgXguxoILneySdi1Q3iyB4wGvg1U8tY'
}).addTo(map);

// L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
// }).addTo(map);

var sidebar = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'right',     // left or right
}).addTo(map);

// let someDomNode = document.getElementById("surveyBtn");


var panelContent = {
    id: 'dietakoyaki',                     // UID, used to access the panel
    tab: '<i class="fa fa-gear"></i>',  // content can be passed as HTML string,
    pane: '👧🔪👦🩸🐙🩸 <iframe src="https://i.giphy.com/media/xT1Ra5Gy397nfkSz6g/giphy.webp" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p></p>',        // DOM elements can be passed, too
    title: 'Dietakoyaki',              // an optional pane header
    position: 'top'                  // optional vertical alignment, defaults to 'top'
};

var panelContent2 = {
    id: 'whatsup',                     // UID, used to access the panel
    tab: '<i class="fa fa-question"></i>',  // content can be passed as HTML string,
    pane: 'WHASSSSSSAAAUPPP',        // DOM elements can be passed, too
    title: 'WHAZZAAAAA',              // an optional pane header
    position: 'top'                  // optional vertical alignment, defaults to 'top'
};

sidebar.addPanel(panelContent);
sidebar.addPanel(panelContent2);


// add layer control box
L.control.layers(null,layers,{collapsed:false,position:'bottomleft'}).addTo(map);

// Get the modal
var modal = document.getElementById("surveyModal");

// Get the button that opens the modal
var btn = document.getElementById("surveyBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "grid";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function addMarker(data){
    if(data['What program are you currently enrolled in at UCLA?'] == "Undergraduate, 4-year"){
        circleOptions.fillColor = "Crimson"
        undergradfour.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data[qCompanies]}</h2> <h3>${data[qChallenges]}</h3>`))
        }
    if(data['What program are you currently enrolled in at UCLA?'] == "Undergraduate, transfer student"){
        circleOptions.fillColor = "MediumSpringGreen"
        undergradtransfer.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data[qCompanies]}</h2> <h3>${data[qChallenges]}</h3>`))
        }
    if(data['What program are you currently enrolled in at UCLA?'] == "Master"){
        circleOptions.fillColor = "YellowGreen"
        master.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data[qCompanies]}</h2> <h3>${data[qChallenges]}</h3>`))
        }
    if(data['What program are you currently enrolled in at UCLA?'] == "Doctorate"){
        circleOptions.fillColor = "LightSalmon"
        doctorate.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data[qCompanies]}</h2> <h3>${data[qChallenges]}</h3>`))
        }
    return data
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
        if(!(data['lat'] == 0 && data['lng'] == 0)){
            console.log(data)
            addMarker(data)
        }
    })
    undergradfour.addTo(map) // add our layers after markers have been made
    undergradtransfer.addTo(map) // add our layers after markers have been made  
    master.addTo(map)
    doctorate.addTo(map)
    let allLayers = L.featureGroup([undergradfour,undergradtransfer,master,doctorate]);
    map.fitBounds(allLayers.getBounds());
}

function closeModal(e){
    let parentDiv = e.target.parentElement.id
    console.log(parentDiv)
    if(parentDiv != "surveyBtn"){

        modal.style.display = "none";
    }
    if(parentDiv == "menuButtons"){

        modal.style.display = "none";
    }
}
document.body.addEventListener('click', function(e) {
    closeModal(e)
        // your code
    // console.log(e.target.id)
});
// document.iframe.addEventListener('click', closeModal, true); 

loadData(dataUrl)

// let searchUrl = "https://results.dogpile.com/serp?qc=images&q=naruto"
// fetch(searchUrl,{
//     method: "GET",
//     headers: {"Accept": "text/html",
//     "User-Agent": "Chrome"}})
//     .then(response => response.json())
//     .then(json => console.log('yoooooooooooo!'))

geoJsonStyle = {
    weight: 2,
    opacity: 1,
    color: 'gray',
    fillOpacity:0.0
}



let geojson
fetch("js/countries.geo.js") 
    .then(response =>{ 
        return response.json();})
        .then(data =>{
            geojson = L.geoJson(data,{style:geoJsonStyle,onEachFeature: onEachFeature}).addTo(map)
            console.log('loading geojson')
        })
        // Basic Leaflet method to add GeoJSON data

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        // fillColor: 'none',
        color: 'crimson', // the blood of daiki
        dashArray: '',
        fillOpacity: 0.0

    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
    });
}

// geojson = L.geoJson(statesData, {
//     style: style,
    
// }).addTo(map);