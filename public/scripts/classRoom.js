$('.announcement').hide();
$('.notes').hide();
$(".poll").hide();
$(".hideGroup").hide();

$("#notes").click(function () { 
    $('.announcement').hide();
    $('.notes').show();
    $(".poll").hide();
    
});

$("#announcement").click(()=>{
    $('.announcement').show();
    $('.notes').hide(); 
    $(".poll").hide();
})
$("#poll").click(()=>{
    $(".poll").show();
    $('.announcement').hide();
    $('.notes').hide();
})

$('#showAll').click(function () { 
   $('.notesBox').show();
   $(".announcementBox").show();
   $(".pollBox").show();
    
});
$('#showNotes').click(function () { 
    $('.notesBox').show();
   $(".announcementBox").hide();
   $(".pollBox").hide();
    
});
$("#showAnnouncement").click(function () { 
    $('.notesBox').hide();
    $(".announcementBox").show();
    $(".pollBox").hide();
});
$('#showPoll').click(()=>{
    $(".pollBox").show();
    $('.notesBox').hide();
    $(".announcementBox").hide();
})

//Show Poll Ajax
$(".showPollResult").click(function(){
    console.log(this.id);
    var pollID=(this.id)
    $(`#${pollID}`).append(`
    <canvas class="pollCard ${pollID}"></canvas>
    `);
    $.post("/classroom/showPollResult",{id:this.id},(data)=>{
        if(data){
            DrawChart(data);
        }
    })
});

//Ajax poll

$(".pollBtn1").click(function(){
    var pollID=(this.id)
    $(`#${pollID}`).append(`
    <canvas class="pollCard ${pollID}" ></canvas>
    `);
    $.post("/classroom/poll/1",{id:this.id},(data)=>{
        DrawChart(data);
        // console.log(1);
    })

})

$(".pollBtn2").click(function(){
    var pollID=(this.id)
    $(`#${pollID}`).append(`
    <canvas class="pollCard ${pollID}" ></canvas>
    `);
    $.post("/classroom/poll/2",{id:this.id},(data)=>{
        DrawChart(data);
        // console.log("2");
    })

})

function DrawChart(data){
    var ctx = document.getElementsByClassName(`${data._id}`);
    document.getElementsByClassName
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [`${data.choice1}`,"","","", `${data.choice2}`],
        datasets: [{
            label: `${data.question}`,
            data: [`${data.dataOne}`, 0, 0,0,`${data.dataTwo}`],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    

}