

// alert('the javascript just loaded');
let unorderedl = document.createElement('ul');

let body = document.querySelector('body');

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

