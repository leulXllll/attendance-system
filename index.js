const express = require('express');
const path = require('path');
const { connetToDatabase, showData, saveToDatabase } = require('./data/model');
const app = express();


app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
     
    res.sendFile(path.join(__dirname,'public','index.html'));
});
app.get('/signup',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'public',"signup.html"));

});
app.get('/showdata',async(req,res)=>{
    
    let respo = await showData();     

    res.json(JSON.stringify(respo));
 
    
})
app.delete('/data/:id',(req,res)=>{
       let id = req.params;

       console.log(id);
       
});

app.post('/signup',(req,res)=>{
    
    
    const {fname,lname} = req.body;
    
    saveToDatabase(fname,lname);
    
    res.redirect('/');

});


async function startServer() {
    await connetToDatabase();
  

    app.listen(3000,()=>{
        console.log('server listening on port 3000');
    });
}
startServer();
