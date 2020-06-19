
$('.delBox').click(function () { 
    (this.innerHTML=``)
    $(this).hide();
    //console.log(this.id);
    //console.log('ji');
        $.post('/attendance/delBox',{id:this.id},(id)=>{
            if(id){
               var id =this.id
               //console.log(id);
               $(`.${id}`).html(null);
            }
        });   

    
});



$('.present').click(async  function () { 
   //console.log('present');
   //console.log(this.id);
  
    $.post('/attendance/present',{id:this.id},(NewSubject)=>{
       // console.log( NewSubject.present,NewSubject.absent,NewSubject.total,NewSubject.percentage);
       // console.log(NewSubject);
       // console.log(document.getElementsByClassName(`${NewSubject.id}`));
        document.getElementsByClassName(`${NewSubject.id}`).innerHTML=` <div class="card ${NewSubject.id}">
        <h4 class="card-title"> ${NewSubject.name}
            <span>
                <button ${NewSubject.id} class="delBox btn btn-danger">
                        X
                </button>
            </span>
        </h4>
        ${NewSubject.status}
        <div class="card-body">
            <p> Total Classes  : ${NewSubject.total}</p>
            <p> Present : ${NewSubject.present}</p>
            <p> Absent :${NewSubject.absent}</p>
        </div>
        <div class="card-footer">
            <button ${NewSubject.id} class="btn btn-success present">
                ✔
            </button>
            <button ${NewSubject.id} class="btn btn-danger absent" >
                ❌
            </button>
        </div>
        </div>`
        $(`.${NewSubject.id}`).html(` <div class="card ${NewSubject.id}">
        <h4 class="card-title"> ${NewSubject.name}
            <span>
                <button ${NewSubject.id} class="delBox btn btn-danger">
                        X
                </button>
            </span>
        </h4>
        ${NewSubject.status}
        <div class="card-body">
        <p> Total Classes  : ${NewSubject.total}</p>
        <p> Present : ${NewSubject.present}</p>
        <p> Absent :${NewSubject.absent}</p>
        </div>
        <div class="card-footer">
            <button ${NewSubject.id} class="btn btn-success present">
                ✔
            </button>
            <button ${NewSubject.id} class="btn btn-danger absent" >
                ❌
            </button>
        </div>
        </div>`);
    })
   
    
});

$('.absent').click(function(){
    $.post('/attendance/absent',{id:this.id},(NewSubject)=>{
        document.getElementsByClassName(`${NewSubject.id}`).innerHTML=` <div class="card ${NewSubject.id}">
        <h4 class="card-title"> ${NewSubject.name}
            <span>
                <button ${NewSubject.id} class="delBox btn btn-danger">
                        X
                </button>
            </span>
        </h4>
        ${NewSubject.status}
        <div class="card-body">
            <p> Total Classes  : ${NewSubject.total}</p>
            <p> Present : ${NewSubject.present}</p>
            <p> Absent :${NewSubject.absent}</p>
        </div>
        <div class="card-footer">
            <button ${NewSubject.id} class="btn btn-success present">
                ✔
            </button>
            <button ${NewSubject.id} class="btn btn-danger absent" >
                ❌
            </button>
        </div>
        </div>`
        $(`.${NewSubject.id}`).html(` <div class="card ${NewSubject.id}">
        <h4 class="card-title"> ${NewSubject.name}
            <span>
                <button ${NewSubject.id} class="delBox btn btn-danger">
                        X
                </button>
            </span>
        </h4>
        ${NewSubject.status}
        <div class="card-body">
        <p> Total Classes  : ${NewSubject.total}</p>
        <p> Present : ${NewSubject.present}</p>
        <p> Absent :${NewSubject.absent}</p>
        </div>
        <div class="card-footer">
            <button ${NewSubject.id} class="btn btn-success present">
                ✔
            </button>
            <button ${NewSubject.id} class="btn btn-danger absent" >
                ❌
            </button>
        </div>
        </div>`); 
    })
});