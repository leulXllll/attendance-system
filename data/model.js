const {Client}= require('pg');

const client = new Client({
    user:'postgres',
    password:'elitebook',
    host:'localhost',
    database:'attendance',
    port:5432

})

async function showData() {
    try{

        let res = await client.query('SELECT * FROM person');
        

        return res.rows;
    }catch(e){
        console.log(e)
    }
    
}
async function saveToDatabase(fname,lastname) {
    try{

        let clientQuery = `INSERT INTO person(firstname,lastname) VALUES ($1,$2)`;
        
        let values = [fname,lastname];
        
        await client.query(clientQuery,values);

    }catch(e){
        console.log(e);
    }


}
async function connetToDatabase(params) {
    try{

        await client.connect()
        console.log('connected')
        // showData();
    }catch(e){
        console.log(e);
    }
    
}

module.exports = {connetToDatabase,showData,saveToDatabase};