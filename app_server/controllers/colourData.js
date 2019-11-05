//reads/writes chart data to/from Google BigQuery using SQL query syntax.

const {BigQuery} = require('@google-cloud/bigquery');

//Create BigQuery Client
// var file = "./app_server/models/gcloud-auth.json";
var bigquery = new BigQuery({
    projectId: "rogergoh",
    datasetId: "Visualization_Demo",
    tableId: "Favourite_Colours"
    // keyFilename: file
})

module.exports.getData = function(req,res){

    const query = "SELECT colour, COUNT(*) AS count FROM Visualization_Demo.Favourite_Colours GROUP BY colour";

    bigquery.query(query, function(err, rows) {
    if (!err) {
        console.log(rows)
            return res.render("index", {colourData: JSON.stringify(rows)})
        } else {
            console.log(err)
            return res.render("index", {colourData: ""})
        }
    });
}

module.exports.sendData = function(req,res){

    var rainbow = ["red","orange","yellow","green","blue","indigo","violet"]
    var colour = req.body.colour
    console.log(colour)
    if(rainbow.includes(colour)){
        const query = "INSERT INTO Visualization_Demo.Favourite_Colours VALUES ('"+colour+"')"

        bigquery.query(query, function(err, rows) {
            if (err) {
                console.log(err)
            }
        });
    }
    return;
}