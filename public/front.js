
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
                            unorderedl.append(fragment);

                            body.append(unorderedl);
                    })
        })

        }else if(name=='/delete.html'){

                
                let id = document.getElementById('pid')

                // console.log(id.value);

                let deleteBtn = document.getElementById('btn-dlt');

                deleteBtn.addEventListener('click',async()=>{


                        alert('reloded')
                        location.reload();
                        await axios.delete(`/data/${id.value}`);
                        

                });
        }
        })

