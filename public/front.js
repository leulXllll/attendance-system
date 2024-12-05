// const { default: axios } = require("axios");

window.addEventListener('DOMContentLoaded',()=>{
        
        let name = window.location.pathname;
        
        let body = document.querySelector('body');


        if(name=='/'){

        let unorderedl = document.createElement('ul');

        let showdata = document.getElementById('showData');

        showdata.addEventListener('click',()=>{


                fetch('/showdata',{method:'GET',
                        headers: {
                                'Accept': 'application/json'
                        }}).then(res=>{
                                return res.json();
                        }).then(data=>{

                                console.log(typeof data);           
                                let size = JSON.parse(data).length;           
                                let fragment = document.createDocumentFragment();            
                                let Data = JSON.parse(data);
                                 for(let i=0;i<size;i++){
                                 let user = document.createElement('li');

                               user.innerText = `ID ${Data[i].id} FirstName: ${Data[i].firstname} LastName: ${Data[i].lastname}`;            
                                 fragment.appendChild(user);  
                            }

                            unorderedl.replaceChildren(fragment);


                            body.append(unorderedl);
                    })
        })

        }else if(name=='/delete.html'){

                

                let id = document.getElementById('pid')


                let deleteBtn = document.getElementById('btn-dlt');

                deleteBtn.addEventListener('click',async()=>{

                        console.log(`delete reached with ${id.value}`)
                        try{
                                await axios.delete(`/data/${id.value}`);
                        }catch(e){
                                console.log(e);
                        }
                        
                });
        }else if(name=='/userattendance.html'){


         let idValue = document.getElementById('idInfo');
         
         let btnStat = document.getElementById('btn-stat');

         let orderdList = document.createElement('ol');
         
         async function getInfo(id){
                 try{
                         
                         let response = await axios.get(`/getinfo/${id}`);
                         let fragment = document.createDocumentFragment();
                          
                           JSON.parse(response.data).forEach(data=>{
                                let li = document.createElement('li');

                                if(data.date!=null||data.status!=null||data.time!=null){
                                        li.textContent = `Date ${data.date} Status ${data.status} Time ${data.time}`;
                                }else{

                                        li.textContent = 'No recorded attendance for this user';
                                }

                                fragment.appendChild(li);
                           }); 
                                orderdList.replaceChildren(fragment);
                                body.appendChild(orderdList);

                        }catch(e){
                                console.log(e.message);
                        }
                }
                
                
                btnStat.addEventListener('click',()=>{      
                getInfo(idValue.value);
        })
        }else if(name=='/setattendance.html'){
         
                let form = document.querySelector('form');


                let id = document.getElementById('id');
                let date = document.getElementById('date');
                let status = document.getElementById('status');
                let time = document.getElementById('time');

                form.addEventListener('submit',(e)=>{
                      alert('hello');
                       
                });
               
        }

        })

