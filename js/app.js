//Main APP starts here

let dataList = [];
//Start 14/07/2020
//Make so if removed value from list, it removes from graph [OK]
//Make so that only 9 values could be on graph/list at once [OK]
//Dates are bugged [OK]
//Make no more than 9 values available [OK]
//ADD history dropdown, so if more than 8 values inputted I can see []

(function(){
    const valColl = document.querySelector('.collection');
    const inputBtn = document.querySelector('#submit');
    const saveBtn = document.querySelector('#save');
    const inputFld = document.querySelector('#input');
    const listUpBtn = document.querySelector('#listUpBtn');
    const listDownBtn = document.querySelector('#listDownBtn');

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

    listUpBtn.addEventListener('click', e => {
        //Rather than poping or splicing value list i need to take snapshots of it
        ValueList.moveListUp();
    });

    
    listDownBtn.addEventListener('click', e => {
        //Rather than poping or splicing value list i need to take snapshots of it
        ValueList.moveListDown();
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
        
        //If there are 8 values on list then the lowest displayed value index of that list increases
        if(dataList.length > 7){
            ValueList.lowIndex++;
        }
        
        const entry = {};
        entry.timestamp = Date.now();
        entry.date = getDate();
        entry.value = input.value;
        
        dataList.push(entry);

        //A prepared snipped of data contained within the list to be displayed
        const dataToDisplay = dataList.slice(ValueList.lowIndex).splice(0,7);

        ValueList.wipe();
        ValueList.update(dataToDisplay);
        Canvas.update(dataToDisplay);
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
    //Loads data from local storage
    dataList = load();
    //Loaded data is displayed
    ValueList.update(dataList);
    Canvas.update(dataList);
})();

//
//UTILITY FUNCTIONS
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
        });
    });
    return loadedData;
}