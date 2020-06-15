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

$('.like').click(function () { 
    (this.innerHTML=`
    
    <button class="unlike" id="${this.id}" > 
        <div class="${this.id} btn col">
            Liked &nbsp;
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
 
        </div>
    </button>`)
    console.log(this.id);
        $.post('/likeAjax',{id:this.id},(id)=>{
            if(id){
                console.log(id,"liked")   
            }
        });   

    
});


$('.unlike').click(function(){

    (this.innerHTML=`
    <button class="like" id="${this.id}" >
        <div class="${this.id} btn col">
            unliked &nbsp;
            <i class="fa fa-thumbs-o-up" aria-hidden='true'></i>
        </div>
    </button>`)
    $.post('unlikeAjax',{id:this.id},(id)=>{
        if(id){
            console.log(id,"unliked");

        }
    })
});

