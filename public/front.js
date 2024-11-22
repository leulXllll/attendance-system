

// alert('the javascript just loaded');

let showdata = document.getElementById('showData');

showdata.addEventListener('click',()=>{

        
        fetch('/showdata',{method:'GET',
            headers: {
                'Accept': 'application/json'
            }}).then(res=>{
                return res.json();
            }).then(data=>{
                    console.log(data);

                    let size = JSON.parse(data).length;

                    console.log(JSON.parse(data).length);
                    for(let i=0;i<size;i++){

                    }

            })
})

let unorderedl = document.createElement('ul');
