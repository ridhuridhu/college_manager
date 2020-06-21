let rellax=new Rellax('.rellax');

$(".alert-danger").fadeOut(5000,"linear");
if((document.getElementsByClassName("alert"))[0].textContent){
    $(".alert-danger").show();
}
else{
    $(".alert-danger").hide();
}