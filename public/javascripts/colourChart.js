var config = {
    type: 'doughnut',
    data: {
        datasets: [{
        data: [
            1,
            1,
            1,
            1,
            1,
        ],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
        ],
        label: 'Dataset 1'
        }],
        labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
        ]
    },
    options: {
        responsive: true,
        legend: {
            // position: 'top',
            display: false
        },
        title: {
            display: true,
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

document.getElementById('addData').addEventListener('click', function() {
    if (config.data.datasets.length > 0) {
        config.data.labels.push('data #' + config.data.labels.length);

        // var colorName = colorNames[config.data.datasets[0].data.length % colorNames.length];
        var newColor = "blue";

        config.data.datasets.forEach(function(dataset) {
        dataset.data.push(1);
        dataset.backgroundColor.push(newColor);
        });

        window.myDoughnut.update();
    }
});