const {Client}= require('pg');

const client = new Client({
    user:'postgres',
    password:'elitebook',
    host:'localhost',
    database:'attendance',
    port:5432

})

async function showData() {
    let res = await client.query('SELECT * FROM person');
    console.log(res.rows);
}

async function connetToDatabase(params) {
    try{

        await client.connect()
        console.log('connected')
        showData();
    }catch(e){
        console.log(e);
    }
    
}

module.exports = {connetToDatabase};