const express = require('express');
const path = require('path');
const { connetToDatabase } = require('../data/model');
const app = express();


app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/signup',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"signup.html"));
});

app.post('/signup',(req,res)=>{
   
    console.log('post request reached');

    const {fname,lname} = req.body;

    console.log(fname,lname);
    
    res.redirect('/');

});


async function startServer() {
    await connetToDatabase();
    app.listen(3000,()=>{
        console.log('server listening on port 3000');
    });
}
startServer();
