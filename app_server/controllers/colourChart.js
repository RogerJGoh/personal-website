//dynamic controller (requires data externally) vs static controllers in /public/javascripts/
var config = {
    type: 'doughnut',
    data: {
        datasets: [{
        data: [
            1,
            1,
            1,
        ],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 206, 86, 0.2)',
        ],
        label: 'Dataset 1'
        }],
        labels: [
            'red',
            'orange',
            'yellow',
        ]
    },
    options: {
        responsive: true,
        legend: {
            // position: 'top',
            display: false
        },
        title: {
            // display: true,
            display: false,
            text: "Page Visitor's Favourite Colours"
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myDoughnut = new Chart(ctx, config);
};

var rainbowColours = ["red","orange","yellow", "green", "blue", "indigo", "violet"]

document.getElementById('addData').addEventListener('click', function() {
    if (config.data.datasets.length > 0) {
        var colourInput = document.getElementById('colourInput').value.toLowerCase();
        if(!(rainbowColours.includes(colourInput))){return}
        var rgbValue = 'rgba(255, 99, 132, 0.2)'
        switch(colourInput){
            case "red":
                break;
            case "orange":
                rgbValue = 'rgba(255, 159, 64, 0.2)' 
                break;
            case "yellow":
                rgbValue = 'rgba(255, 206, 86, 0.2)'
                break;
            case "green":
                rgbValue = 'rgba(75, 192, 192, 0.2)'
                break;
            case "blue":
                rgbValue = 'rgba(54, 162, 235, 0.2)'
                break;
            case "violet":
                rgbValue = 'rgba(238, 130, 238, 0.2)'
                break;
            case "indigo":
                rgbValue = 'rgba(75, 0, 130, 0.1)'
                break;
            default:
        }
        var hasColour = false;
        for(i=0;i<config.data.datasets[0].data.length;i++){
            if(config.data.labels[i]==colourInput){
                config.data.datasets[0].data[i]+=1; //increment if already in chart
                hasColour = true;
            }
        }
        if(hasColour==false){
            config.data.datasets[0].data.push(1);
            config.data.datasets[0].backgroundColor.push(rgbValue);
            config.data.labels.push(colourInput);
        }
        window.myDoughnut.update();
    }
});