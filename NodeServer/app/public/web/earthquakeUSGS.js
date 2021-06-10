(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    console.log('load data')
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "val",
            alias: "value",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "title",
            alias: "title",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "lucaReserv",
            alias: "LUCA reservations",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // myConnector.init = function(initCallback){
    //     // Your init code here
    //     initCallback();
    // };



    // Download the data
    myConnector.getData = function(table, doneCallback) {
        let tableData = [];

        for (let index = 0; index < 100; index++) {
            tableData.push({
                "id": Math.random()+"",
                "val": 1.1,
                "title": "titleke "+index
            });
        }

        table.appendRows(tableData);
        doneCallback();

        // $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
        //     var feat = resp.features,
        //         tableData = [];

        //     // Iterate over the JSON object
        //     for (var i = 0, len = feat.length; i < len; i++) {
        //         tableData.push({
        //             "id": Math.random()+"",
        //             "val": 1.1,
        //             "title": feat[i].properties.title
        //         });
        //     }

        //     table.appendRows(tableData);
        //     doneCallback();
        // });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "LUCA Reservations"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();