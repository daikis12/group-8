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

let nullStates = {"properties":{"name":"null","testimonyCount":0}};

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
    id: 'testimonies',                     // UID, used to access the panel
    tab: '<i class="fa fa-user"></i>',  // content can be passed as HTML string,
    pane: ':(',        // DOM elements can be passed, too
    title: 'Testimonies',              // an optional pane header
    position: 'top'                  // optional vertical alignment, defaults to 'top'
};

var panelContent2 = {
    id: 'info',                     // UID, used to access the panel
    tab: '<i class="fa fa-question"></i>',  // content can be passed as HTML string,
    pane: 'WHASSSSSSAAAUPPP',        // DOM elements can be passed, too
    title: 'Reading The Testimonies',              // an optional pane header
    position: 'top'                  // optional vertical alignment, defaults to 'top'
};

sidebar.addPanel(panelContent);
sidebar.addPanel(panelContent2);

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
            // 🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌
            statesCount[data['state']] = (statesCount[data['state']] || 0) + 1 ;
            // ( う-´)づ︻╦̵̵̿╤── \(˚☐˚”)/ 
            // 🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌
            // statesData[data['state']] += 1;
            // statesData.features.forEach(state => addTestimonyCounts(state));
            // state.properties.name == [data['state']] += 1;
        }
        else{
            statesCount[data['null']] = (statesCount[data['null']] || 0) + 1 ;
        }
    })
    countTestimonies(statesCount);
    mapData = filterData();
    surveyData = results.data;
    processGeojson(mapData);
    // addLegend();
    map.fitBounds(geojson.getBounds());
    populatePanel(undefined);
    populateInfoPanel();
    sidebar.open('testimonies');
}

loadData(dataUrl)

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
let sidebarStatus = false;


function populatePanel(stateName){
    let data2loop;
    let stateColor;
    let title;

    if(stateName == undefined){
        title = 'Testimonies';
        data2loop = filterSurveyData(undefined);
        stateColor = getColor(statesCount[undefined]);
    }
    else{
        title = "Testimonies: " + stateName;
        data2loop = filterSurveyData(stateName);
        stateColor = getColor(statesCount[stateName])
    }
    
    console.log('data2loop')
    console.log(data2loop)
    panelContent = `<div> <h1>${title}</h1> 
                    Have you faced any challenges finding employment/internship opportunities in the US because of your immigration status?
                    <h4> Hover over a card to read more from a testimony. </h4> </div>`
    // panelContent += `<div class="pyro"><div class="before"></div><div class="after"></div></div>`
    panelContent += `<div class="before"></div><div class="after"></div>`
    if(stateName == undefined){data2loop.forEach(element => addFlipCardToPanel(element,stateColor, disable=true));}
    else{data2loop.forEach(element => addFlipCardToPanel(element,stateColor));}
    

    fireFoxFixForFantasticFolks(stateColor)
}


function addFlipCardToPanel(data,color,disable=false) {
    console.log(color)
    let title;
    if (disable==true){
        
        title=''
    }
    else{
        title = `Story from:<h2>${data["If applicable, what companies did/do you work under and what were/are your job titles? "]}</h2>`
    }

    panelContent += `
    <div class="flip-card" style="background-color:${color}">
        <div class="flip-card-inner">
            <div class="flip-card-front style="background-color:${color}">
                ${title}
                <p class="left">\"${data["Have you faced any challenges finding employment/internship opportunities in the US because of your immigration status?"]}\"</p>
            </div>
            <div class="flip-card-back style="background-color:${color}">
                <h4>Any helpful resources?</h4>
                <p class="left">${data["Are there any people, campus resources, or online resources that you have found helpful and/or utilized to find employment/internship opportunities in the US?"]}</p>
                <h4>Any advice for others?</h4>
                <p class="left">${data["Do you have any advice for current international students at UCLA or is there anything else you'd like to share about your experiences? "]}</p>
            </div>
        </div>
    </div>`
    fireFoxFixForFantasticFolks(color)
    document.getElementById("testimonies").innerHTML = panelContent;
}

function populateInfoPanel(){
    color = '#80C0C0'
    panelContent = 
    `<div> <h1>How to Read the Testimonies</h1></div>
    <div> <h3>The testimonies submitted by users are displayed in a double-sided card format.</h3>
    <p>You can hover over a card to flip it over. </br> The format of the cards is described below.</p></div>
    <h3> Front of card </h3>
    <div class="card" style="background-color:${color}">
        <div> <h2>Name of Opportunity</h2> <p> This is where the stories of users will be displayed in response to the question: \"Have you faced any challenges finding employment/internship opportunities in the US because of your immigration status?\". </p> </div>
    </div>
    <h3> Back of the card </h3>
    <div class="card" style="background-color:${color}">
        <div> 
            <h4>Any helpful resources?</h4>
            <p> This is where the users might share any resources they found helpful and/or found comfort in when dealing with opportunity barriers in place...  </p> 
            <h4>Any advice for others?</h4>
            <p> ...as well as share any advice for community members who might be experiencing similar things. </p>
        </div>
    </div>
    `
    document.getElementById("info").innerHTML = panelContent;
}

function fireFoxFixForFantasticFolks(theColor){
    const backOfcards = document.querySelectorAll('.flip-card-back');
    backOfcards.forEach(ffCard => {
    ffCard.style.backgroundColor = theColor;
    });
}
map.doubleClickZoom.disable(); 

map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

function addCardToPanel(data) {
    console.log(data)

    panelContent += `<div class="card">
    <h3>Stories from: ${data["If applicable, what companies did/do you work under and what were/are your job titles? "]}</h3>
    <p class="left">\"${data["Have you faced any challenges finding employment/internship opportunities in the US because of your immigration status?"]}\"</p>
    <p class="left">Any helpful resource: ${data["Are there any people, campus resources, or online resources that you have found helpful and/or utilized to find employment/internship opportunities in the US?"]}</p>
    <p class="left">Advice for current international students: ${data["Do you have any advice for current international students at UCLA or is there anything else you'd like to share about your experiences? "]}</p>
    </div>`

    document.getElementById("dietakoyaki").innerHTML = panelContent;
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

// Get the modal
var modal2 = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  

window.onload = function() {
    modal2.style.display = "block";
  };
  
window.onclick = function(event) {
if (event.target == modal2) {
    modal2.style.display = "none";
}
}

window.addEventListener("resize", scroller.resize);


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


function processGeojson(targetGeoJson){
    /* global statesData */
    geojson = L.geoJson(targetGeoJson, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
    
}