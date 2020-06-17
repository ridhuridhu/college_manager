var joinBtn=document.getElementById('join')
const createBtn=document.getElementById('create')
 
$('.join').hide();
$('.create').hide();
joinBtn.addEventListener('click',()=>{
    $('.join').show();
    $('.create').hide();
})

$('#create').click(function (e) { 
    $('.create').show();
    $('.join').hide();
});
