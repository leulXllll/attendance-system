const express = require('express');
const path = require('path');
const { connetToDatabase, showData,setattendanceToDB,
     saveToDatabase, deleteFromDatabase, getInfo } = require('./data/model');
const app = express();


app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
     
    res.sendFile(path.join(__dirname,'public','index.html'));
});
app.get('/showdata',async(req,res)=>{
    
    let respo = await showData();     

    res.json(JSON.stringify(respo));
 
})

app.get('/getinfo/:id',(req,res)=>{

    let reqParam = req.params.id;

    getInfo(reqParam).then(resp=>{
        let response = JSON.stringify(resp);
        res.json(response);
    }).catch(e=>{
        console.log(e)
    });

})

app.delete('/data/:id',(req,res)=>{

       let id = req.params.id;
       deleteFromDatabase(id).then(re=>{
        res.end();
       }).catch(e=>{
        res.status(403).end();
       });

      
});

app.post('/signup',(req,res)=>{
    
    
    const {fname,lname} = req.body;
    
    saveToDatabase(fname,lname);
    
    res.redirect('/');

});

app.post('/setattendance',(req,res)=>{

    const {id,status,date,time} = req.body;

    setattendanceToDB(id,date,status,time);

    res.redirect('/');
});


async function startServer() {
    await connetToDatabase();
  

    app.listen(3000,()=>{
        console.log('server listening on port 3000');
    });
}
startServer();
