/*$('a').click(function (e) { 
    e.preventDefault();
    let id=e.target.id;
    console.log(e.target)
    if(id){
        let xhr=new XMLHttpRequest();
        xhr.open('GET',`/unlike/${id}`,true)
        xhr.onload=function(){
            if(xhr.status==200){
                console.log( xhr.response)
                //console.log(e.target)
            }
            else{
                console.log(xhr.status);
            }
        }
    
        xhr.send();

    }
    
   
    
});

*/

