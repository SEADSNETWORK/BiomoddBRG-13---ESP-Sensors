
import axios from 'axios'
import moment from 'moment'

const makeConnector = ()=>{
    const tableau = window.tableau;
    const connector =  tableau.makeConnector();

    const getCols = ()=>{
        const cols = [];
        const addCol = (id, dataType, alias)=>{
            cols.push({id, dataType, alias});
        }

        addCol("_id", tableau.dataTypeEnum.string, "id");
        addCol("action", tableau.dataTypeEnum.string, "status");
        addCol("organization", tableau.dataTypeEnum.string);
        addCol("service", tableau.dataTypeEnum.string);
        addCol("location", tableau.dataTypeEnum.string);
        addCol("name", tableau.dataTypeEnum.string);
        addCol("firstName", tableau.dataTypeEnum.string);
        addCol("studentNumber", tableau.dataTypeEnum.string);
        addCol("email", tableau.dataTypeEnum.string);
        addCol("timezone", tableau.dataTypeEnum.string);
        addCol("start", tableau.dataTypeEnum.datetime);
        addCol("end", tableau.dataTypeEnum.datetime);
        addCol("created", tableau.dataTypeEnum.datetime);
        return cols;
    }

    const schemas = {
        all :           {        
            id: "all",
            alias: "reservations: all",
            columns: getCols()
        },
        today :         {
            id: "today",
            alias: "reservations: today",
            columns: getCols()
        },
        todayAndLater : {
            id: "todayAndLater",
            alias: "reservations: today and later",
            columns: getCols()
        },
    }


    const init = (cols)=>{
        
        // Define the schema
        connector.getSchema = function(schemaCallback) {
            schemaCallback([schemas.all, schemas.today, schemas.todayAndLater]);
        };


        // Download the data
        connector.getData = function(table, doneCallback) {
            let url = "/data";
            if (window.location.href.indexOf("3000")!==-1){
                url = "http://localhost:2000"+url;
            }

            axios.get(url+`?selector=${table.tableInfo.id}`)
                    .then(({data})=>{
                        data = data.map((values)=>{
                            var dateFormat = "Y-MM-DD HH:mm:ss";
                            values.start    = moment(new Date(values.start)).format(dateFormat);
                            values.end      = moment(new Date(values.end)).format(dateFormat);
                            values.created      = moment(new Date(values.created)).format(dateFormat);
                            return values;
                        })
                        table.appendRows(data);
                        doneCallback();
            })
        };

        tableau.registerConnector(connector);
    }

    const submit = ()=>{
        tableau.connectionName = "LUCA Reservations"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    }
    
    return {
        submit,
        init
    }
}

export default makeConnector;