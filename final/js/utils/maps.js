let mapData;
let respondents;

function countTestimonies(statesCount){
    // stateNames is an array of state names
    console.log(Object.keys(statesCount))
    let stateNames = Object.keys(statesCount);
    statesData.features.forEach(state => addTestimonyCounts(stateNames, statesCount, state));
}

function addTestimonyCounts(stateNames, statesCount, state)
{
    if (stateNames.includes(state.properties.name)){
        state.properties['testimonyCount'] = statesCount[state.properties.name];
    }
    else{
        state.properties['testimonyCount'] = 0;
    }
}

function filterData(){   
    let filteredData = statesData.features.filter(mapdata => mapdata.properties.testimonyCount > 0);
    return filteredData
}

function filterSurveyData(state2filter){   
    console.log(state2filter)
    let filteredsurveyData = surveyData.filter(respondents => respondents.state == state2filter);
    return filteredsurveyData
}