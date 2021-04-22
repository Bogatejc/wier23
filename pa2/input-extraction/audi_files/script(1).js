$(function(){

    ajaxIt();

});

function ajaxIt(){
    $.ajax({
        url: 'data.json',
        data: {},
        dataType:'json',
        success: function(data) {

            var isData = data['features'].length;

            if (isData == 0) {
                $('#dars_scroller').hide();
            } else {
                init(data);
            }

        },
        error: function(request, status, error) {
            console.log(error);
        }
    });
}

function init(data){

    $('.slider_content').css('left', 105);

    var size = data['features'].length;
    //console.log(size);
    var html = '';
    var updated = [];

    for (i=0; i < size; i++) {
    
        var time = data['features'][i]['properties']['updated'];
        var time = new Date(time);
        var curr_date = time.getDate();
        var curr_month = time.getMonth()+1;
        var curr_year = time.getFullYear();
        var curr_hour = time.getHours();
        var curr_minute = time.getMinutes();
        var uTime = curr_date+'.'+curr_month+'.'+curr_year+' '+curr_hour+':'+curr_minute;
        //console.log(curr_date+'.'+curr_month+'.'+curr_year+' '+curr_hour+':'+curr_minute);
        updated.push(uTime);

        html += '<div class="dars_entry">'+updated[i]+' - <b>'+data['features'][i]['properties']['opis']+'</b></div>';

    }
    
    $('.slider_content').html(html+html+html+html);
    getWidth(data, size);

}


function getWidth(data, size) {

	var entries = $('.slider_content .dars_entry').length;
	var totalWidth = 0;
    var w_width = $(window).width();
	$(".slider_content").children().each(function() {
	      totalWidth = totalWidth + $(this).width() + 30;
	});

	//console.log(totalWidth);

    $('.slider_content').css('width', totalWidth+500);

    runEndless(totalWidth, w_width, data, size);
}



function runEndless(totalWidth, w_width, data, size) {

    if (size == 1) {
        var speed = 90000;
    } else if (size == 2) {
        var speed = 180000;
    } else if (size == 3) {
        var speed = 200000;
    } else if (size == 4 ) {
        var speed = 350000;
    } else if (size < 10 && size > 4) {
        var speed = 700000;
    } else if (size == 10) {
        var speed = 700000;
    } else if (size > 10 && size < 15) {
        var speed = 900000;
    } else if (size == 15) {
        var speed = 900000;
    } else if (size > 15 && size < 20) {
        var speed = 1200000;
    } else if (size == 20) {
        var speed = 1200000;
    } else if (size > 20 && size < 30) {
        var speed = 1400000;
    } else if (size == 30) {
        var speed = 1400000;
    } else if (size > 30 && size < 40) {
        var speed = 2000000;
    } else if (size == 30) {
        var speed = 2000000;
    } else if (size > 40 && size < 50) {
        var speed = 2600000;
    }

    //console.log('Speed: '+speed);

    $('.slider_content').animate({ left: "-=" + (totalWidth-w_width+130) }, speed, "linear", function() { 
        init(data); 
    });

}