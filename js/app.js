//Main APP starts here

let dataList = [];
//Start 14/07/2020
//Make so if removed value from list, it removes from graph [OK]
//Make so that only 9 values could be on graph/list at once [OK]
//Dates are bugged [OK]
//Make no more than 9 values available [OK]
//ADD history dropdown, so if more than 9 values inputted I can see []

(function(){
    const valColl = document.querySelector('.collection');
    const inputBtn = document.querySelector('#submit');
    const saveBtn = document.querySelector('#save');
    const inputFld = document.querySelector('#input');

    document.querySelector('#lineGraphBtn').addEventListener('click', e => {
        e.preventDefault();
        Canvas.deleteChart();
        Canvas.createChart('line');
        Canvas.update(dataList);
    });

    document.querySelector('#barChartBtn').addEventListener('click', e => {
        e.preventDefault();
        Canvas.deleteChart();
        Canvas.createChart('bar');
        Canvas.update(dataList);
    });

    //Remove from list on click
    valColl.addEventListener('click', e =>{
        e.preventDefault();
        
        const target = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.children);
        const targetIndex = target.indexOf(e.target.parentElement.parentElement.parentElement) - 1
        
        if(e.target.classList[0] === 'material-icons'){
            const number = e.target.parentElement.parentElement.querySelector('.value').innerText;
            ValueList.removeTargetValue(e.target);
            dataList.splice(targetIndex,1);
            Canvas.delete(targetIndex);
        }
    });
    
    //Submit on click
    inputBtn.addEventListener('click', e => {
        e.preventDefault();
        const entry = {};
        entry.timestamp = Date.now();
        entry.date = getDate();
        entry.value = input.value
        
        dataList.push(entry);
        ValueList.addValue(entry);
        
        Canvas.update(dataList);
        //WIP
    });

    //Save on click
    saveBtn.addEventListener('click', e =>{
        save();
    });

    //Side nav button code
    document.querySelector('.dropdown').addEventListener('click', e => {
        const hiddenNavButtons = document.querySelectorAll('.hide');
        if(hiddenNavButtons.length > 0){
            hiddenNavButtons.forEach(e => {
                e.classList.replace('hide','show');
            });
        }else{
            const shownNavButtons = document.querySelectorAll('.show');
            shownNavButtons.forEach(e => {
                e.classList.replace('show','hide');
            });
        }
    });

    //Default line chart created
    Canvas.createChart('line');
    //loads data from local storage, and passes it to the Chart + UL
    dataList = load();
})();

//
//UTILITY FUNCTIOn
//

function getDate(){
    const date = new Date(Date.now());
    const dateStr = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return dateStr;
}

//
//LOADING AND SAVING CODE
//
function save(){
    const stringData = JSON.stringify(dataList);
    localStorage.clear();
    localStorage.setItem('localStorageData',stringData);
}

function load(){
    const loadedData = JSON.parse(localStorage.getItem('localStorageData'));
    //Inserts data into chart
    loadedData.forEach(entry => {
        Canvas.chart.data.labels.push(entry.date);
        Canvas.chart.data.timestamps.push(entry.timestamp);
        Canvas.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(entry.value);
            ValueList.addValue(entry);
        });
    });
    Canvas.chart.update();
    return loadedData;
}