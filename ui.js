
//Class that creates canvas chart and updates it with new values
class Canvas{
    
    //Deletes the current chart, [this is done to prevent conflicts when new one is generated]
    static deleteChart(){
        document.querySelector('#myChart').remove();
    }

    static createChart(type){
        const container = document.querySelector('.chart');
        container.innerHTML = `<canvas id="myChart" width="400" height="400"></canvas>`;

        const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
        type: type,
        data: {
            labels: [],
            timestamps: [],
            datasets: [{
                label: 'Weight in KG',
                data: [],
                backgroundColor: [
                    'rgba(255, 255, 120, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 0.5)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
        this.chart = chart;
    }
    
    //WIP
    static delete(targetIndex){
        this.chart.data.labels.splice(targetIndex,1);
        this.chart.data.datasets[0].data.splice(targetIndex,1);
        this.chart.data.datasets[0].backgroundColor.splice(targetIndex,1);
        this.chart.data.datasets[0].borderColor.splice(targetIndex,1);
        this.chart.update();
    }
    
    //Updates chart with new values WORKS
    static update(dataList){
        const labels = this.chart.data.labels = [];
        const timestamps = this.chart.timestamps = [];
        const dataSet = this.chart.data.datasets[0].data = [];
        const backgroundColor = this.chart.data.datasets[0].backgroundColor = [];
        const borderColor = this.chart.data.datasets[0].borderColor = [];
        let index = (dataList.length - 1) - 8;
        
        if(index < 0){
            index = 0;
        }

        for(index; index < dataList.length; index++){
            labels.push(dataList[index].date);
            timestamps.push(dataList[index].timestamp);
            dataSet.push(dataList[index].value);
            backgroundColor.push('rgba(255, 255, 132, 0.2)');
            borderColor.push('rgba(255, 0, 0, 0.5)');
        }

        this.chart.update();
    }
}

//Class handles HTML list that holds the numbers
class ValueList{
    static valueList = document.querySelector('.collection');
    static row = [];

    /**
     * Adds value to value list
     * @param {The number displayed in list} value 
     */
    static addValue(entry){
        this.row.push(entry);
        const li = document.createElement('li');
        li.classList.add('collection-item');
        li.innerHTML = `<div><span class="value">${entry.value}</span><a href="#!" class="secondary-content"><i class="material-icons remove">clear</i></a></div>`;
        this.valueList.appendChild(li);
    }
    
    /**
     * Removes value from value list
     * @param {Icon holding X symbol} target 
     */
    static removeTargetValue(target){
        target.parentElement.parentElement.parentElement.remove();
    }
}