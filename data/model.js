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

async function deleteFromDatabase(id){
     
    let Query = `DELETE FROM person p WHERE p.id=$1 `;
    let Query2 = `DELETE FROM attendance a WHERE a.person_id=$1`;
    
    let ID = [id];
    try{

        await client.query(Query,ID);
        await client.query(Query2,ID);
        
        console.log('deleted succesfully ')
    }catch(e){
        console.log('error here');
        console.log(e)
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
async function getInfo(id) {
    

    let Query2 = `SELECT p.id ,p.firstname ,p.lastname, a.date , a.status,a.time
     FROM person p FULL OUTER JOIN attendance a ON p.id=a.person_id`;

    let queryValues = [id]; 

    let Query3 = `INSERT INTO attendance(person_id,date,status,time) 
     VALUES($1,CAST($2 AS DATE),$3,$4)`;

     let secondValues = await client.query(Query3,[21,'2024-11-30','late','12:05']);
    
    let values  = await client.query(Query2);

    console.log('get info from backend called');

    console.log(values.rows)
    console.log('second values ||')
    console.log(secondValues.rows)

    
}

module.exports = {connetToDatabase,showData,saveToDatabase,deleteFromDatabase , getInfo};