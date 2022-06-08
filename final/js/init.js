// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

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

// let statesLayer = L.featureGroup()

// statesLayer.addLayer(L.geoJson(statesData))
// statesLayer.addTo(map)

var sidebar = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'right',     // left or right
}).addTo(map);


var panelContent = {
    id: 'dietakoyaki',                     // UID, used to access the panel
    tab: '<i class="fa fa-bars"></i>',  // content can be passed as HTML string,
    pane: ':(',        // DOM elements can be passed, too
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

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

let statesCount = {}


function processData(results){
    console.log(results)
    results.data.forEach(data => {
        if(!(data['lat'] == 0 && data['lng'] == 0)){
            console.log(data)
            // 🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌
            statesCount[data['state']] = (statesCount[data['state']] || 0) + 1 ;
            // ( う-´)づ︻╦̵̵̿╤── \(˚☐˚”)/ 
            // 🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌
            // statesData[data['state']] += 1;
            // statesData.features.forEach(state => addTestimonyCounts(state));
            // state.properties.name == [data['state']] += 1;
        }
    })
    countTestimonies(statesCount);
    mapData = filterData();
    surveyData = results.data;
    processGeojson(mapData);
    addLegend()
    map.fitBounds(geojson.getBounds());
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

// let geoJsonStyle = {
//     weight: 2,
//     opacity: 1,
//     color: 'gray',
//     fillOpacity:0.0
// }

// let geojson
// fetch("js/countries.geo.js") 
//     .then(response =>{ 
//         return response.json();})
//         .then(data =>{
//             geojson = L.geoJson(data,{style:geoJsonStyle,onEachFeature: onEachFeature}).addTo(map)
//             console.log('loading geojson')
//         })
//         // Basic Leaflet method to add GeoJSON data

// function highlightFeature(e) {
//     var layer = e.target;

//     layer.setStyle({
//         weight: 5,
//         // fillColor: 'none',
//         color: 'crimson', // the blood of daiki
//         dashArray: '',
//         fillOpacity: 0.0

//     });

//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
// }

// function resetHighlight(e) {
//     geojson.resetStyle(e.target);
// }

// function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         // click: zoomToFeature
//     });
// }

// control that shows state info on hover
var info = L.control({position: 'bottomleft'});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    console.log(props)
    this._div.innerHTML = '<div class="propUp"><h4>Work Opportunities by State</h4>' +  (props ?
        '<b>' + props.name + '</b><br /><div class="animate-character">' + props.testimonyCount + ' respondent(s)</div>' : 'Hover over a state</div>');
};

info.addTo(map);

var geojson;

// get color depending on population density value
function getColor(d) {
    return d > 6  ? '#01aea5' :
        d > 4  ? '#01e3d8' :
        d > 2   ? '#8cdbf2' :
        d > 0   ? '#bcfffb' : '#d7fffd';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.testimonyCount)
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

let sidebarStatus = false;

function focusFeature(e) {
    map.fitBounds(e.target.getBounds());
    let clickedName = e.target.feature.properties.name;
    console.log(e.target.feature.properties.name)

    if (sidebarStatus == false){
        sidebarStatus = true;
        populatePanel(clickedName)
        // populatePanel(clickedName)
        sidebar.open('dietakoyaki');
    }
    else{
        sidebarStatus = false;
        sidebar.close();
        map.fitBounds(geojson.getBounds());
    }
}

function populatePanel(stateInfo){
    let data2loop = filterSurveyData(stateInfo);
    console.log(data2loop)
    panelContent = `<div> <h3>${stateInfo}</h3><p> The experience of international students at UCLA who face career-related opportunity barriers </p </div>`
    panelContent += `<div class="pyro"><div class="before"></div><div class="after"></div></div>`
    data2loop.forEach(element => addtoPanel(element));
    console.log(panelContent)
}

function addtoPanel(data) {
    console.log(data)
    panelContent += `<div class="card"> ${data["Timestamp"]} </div>`
    document.getElementById("dietakoyaki").innerHTML = panelContent;
}


map.doubleClickZoom.disable(); 

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: focusFeature
    });
}



map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

function addLegend(){
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [0, 2, 4, 6];
        var labels = [];
        var from, to;
        // labels.push(`<i style="background:'#49e8df'"></i>) < 1`);
        // labels.push(`<i style="background:'#8cdbf2'"></i>) 1-5`);
        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
    
            labels.push(
                '<i style="padding:5px;background:' + getColor(from + 1) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }
    
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(map);
}

function processGeojson(targetGeoJson){
    /* global statesData */
    geojson = L.geoJson(targetGeoJson, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
    
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

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


// ocument.getElementById("myBtn").click() // simulate click to start modal

window.onload = function() {
    modal.style.display = "block";
  };