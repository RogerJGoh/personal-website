//doughnut chart configuration - init and response to new data.

var config = {
    type: 'doughnut',
    data: {
        datasets: [{
        data: [],
        backgroundColor: [],
        label: 'Dataset 1'
        }],
        labels: []
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
    var colourDataRaw = document.getElementById('colourData').innerHTML;
    var colourData = JSON.parse(colourDataRaw)
    console.log(colourData)
    for(i in colourData){
        config.data.datasets[0].data.push(colourData[i].count);
        config.data.datasets[0].backgroundColor.push(getRGBA(colourData[i].colour));
        config.data.labels.push(colourData[i].colour);
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    window.myDoughnut = new Chart(ctx, config);
};

document.getElementById('addData').addEventListener('click', function() {
    //add valid colour to chart
    var colourInput = document.getElementById('colourInput').value.toLowerCase();
    var rgbValue = getRGBA(colourInput)
    if(rgbValue=="none"){
        alert("Not a colour of the Rainbow!")
        return
    }
    var hasColour = false;

    //increment if already part of chart
    for(i=0;i<config.data.datasets[0].data.length;i++){
        if(config.data.labels[i]==colourInput){
            config.data.datasets[0].data[i]+=1; //increment if already in chart
            hasColour = true;
        }
    }
    //else add new slice to doughnut chart
    if(hasColour==false){
        config.data.datasets[0].data.push(1);
        config.data.datasets[0].backgroundColor.push(rgbValue);
        config.data.labels.push(colourInput);
    }
    window.myDoughnut.update();
});

$("#colourForm").submit(function(e){
    e.preventDefault();
    $.ajax({
        url: "/",
        type: "POST",
        data: {
            "colour": $("#colourInput").val()
        },
        success: function(data){
            console.log(data);
        }
    });
});

function getRGBA(colourName){
    switch(colourName){
        case "red":
            return 'rgba(255, 99, 132, 0.2)'
            break;
        case "orange":
            return 'rgba(255, 159, 64, 0.2)' 
            break;
        case "yellow":
            return 'rgba(255, 206, 86, 0.2)'
            break;
        case "green":
            return 'rgba(75, 192, 192, 0.2)'
            break;
        case "blue":
            return 'rgba(54, 162, 235, 0.2)'
            break;
        case "violet":
            return 'rgba(238, 130, 238, 0.2)'
            break;
        case "indigo":
            return 'rgba(75, 0, 130, 0.1)'
            break;
        default:
            return 'none'
    }
}