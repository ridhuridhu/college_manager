$('.announcement').hide();
$('.notes').hide();

$("#notes").click(function () { 
    $('.announcement').hide();
    $('.notes').show();
    
});

$("#announcement").click(()=>{
    $('.announcement').show();
    $('.notes').hide(); 
})

$('#showAll').click(function () { 
   $('.notesBox').show();
   $(".announcementBox").show();
    
});
$('#showNotes').click(function () { 
    $('.notesBox').show();
   $(".announcementBox").hide();
    
});
$("#showAnnouncement").click(function () { 
    $('.notesBox').hide();
    $(".announcementBox").show();
});