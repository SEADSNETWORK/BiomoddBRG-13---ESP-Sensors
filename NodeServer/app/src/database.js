const MongoClient = require('mongodb').MongoClient;

exports.default = (settings)=>{
    const uri = `${settings.mongoString}`;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    async function list() {
     
        async function listDatabases(client) {
            databasesList = await client.db().admin().listDatabases();
            console.log("Databases:");
            databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        };
    
        try {
            await listDatabases(client);
        } catch (e) {
            console.error(e);
        } 
    }

    function add(data){
        client.db("data").collection('data').insertOne(data);
    }

    function getData(query){
        return new Promise((resolve, reject)=>{
            const getData = ()=>{
                client.db("data").collection('data').find(query).toArray((err, data)=>{
                    resolve(data);
                });
            }

            getData();
        })
    }

    const connect = ()=>{
        return new Promise((resolve, reject)=>{
            client.connect().then(()=>{
                resolve({
                    client,
                    list,
                    add,
                    getData,
                    close: ()=>{
                        console.log("closing database")
                        client.close()
                    }
                })
            })
        })
    }
    return { 
        connect
    }
}