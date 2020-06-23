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
    
    <button class="unlike btn col" id="${this.id}" > 
        <div class="${this.id} btn col">
            Liked &nbsp;
        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
 
        </div>
    </button>`)
    //console.log(this.id);
        $.post('/likeAjax',{id:this.id},(id)=>{
            if(id){
               //console.log(id,"liked")   
            }
        });   

    
});


$('.unlike').click(function(){
    (this.innerHTML=`<button class="like btn col" id="${this.id}" ><div class="${this.id} btn col"> unliked &nbsp;<i class="fa fa-thumbs-up" aria-hidden='true'></i> </div></button>`)
    $.post('/unlikeAjax',{id:this.id},(id)=>{
        //console.log(id)
    })
});
$(".postBox").hide();

//post Container
$("#postContainer").click(function(){
    console.log("post");
    $(this).hide();
    $(".postBox").show();
})

//search bar //SEARCH BAR
$("#chatSearch").keyup(function (e) { 
    
    const searchInput=document.getElementById("chatSearch")
    if(searchInput.value){
        $.post("/search",{name:searchInput.value},(data)=>{
            if(data){
                // console.log(data);
                $(".showSearchList").html(data);
            }
        })
    

    }
    // console.log(searchInput.value)
  
 });
