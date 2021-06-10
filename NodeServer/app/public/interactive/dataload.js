(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    
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
            alias: "LUCA reservations live",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.init = function(initCallback){
        // tableau.authType = tableau.authTypeEnum.basic;
        initCallback();
        // tableau.connectionName = "LUCA Reservations live"; // This will be the data source name in Tableau
        // if(tableau.phase == tableau.phaseEnum.interactivePhase || tableau.phase == tableau.phaseEnum.authPhase) {
        //     tableau.submit();
        // }
    };

    myConnector.shutdown = function(shutdownCallback) {
        // Your shutdown code here
        shutdownCallback();
    }



    // Download the data
    myConnector.getData = function(table, doneCallback) {
        let tableData = [];

        for (let index = 0; index < 100; index++) {
            tableData.push({
                "id": Math.random()+"",
                "val": 1.1,
                "title": "test 2 "+index
            });
        }

        table.appendRows(tableData);
        doneCallback();
    };

    tableau.registerConnector(myConnector);
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "LUCA Reservations"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();