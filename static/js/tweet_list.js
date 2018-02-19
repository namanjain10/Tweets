function dateTime(textDate) {
    var now = (new Date() - new Date(textDate))/1000;
    var rem = Math.floor(now/(60*60));
    var days = Math.floor(rem/24);
    var hr = rem - days*24;
    var min = Math.floor((now%(60*60))/(60));
    var sec = Math.floor((now%(60*60))%(60));
    return (days + " days " + hr+ " hr " + min + " min ");
}
var charstart = 140;

$('.formClass').append('<span id="count">'+ charstart +'</span>');

$('.formClass textarea').keyup(function () {
    console.log();
    $('#count').text(charstart - $(this).val().length);
})

var nextLink = null;
var next = 0;
var hasNext = true;

function ajaxcall(url) {
    if (!url) {
        urlLink = "/api/list/";
        next = 1;
    }
    else {
        urlLink = url;
        next = 0;
    }
    $.ajax({
        url: urlLink,
        method : "GET",
        success: function(response){
            $('.loader').css('display','none');
            if (response.length == 0) {
                $('.put').append("<div class='jumbotron' style = 'text-align:center'>No Tweets Yet!!!</div>");
            }
            else {
                var r = $('<ul>').addClass("media-list");
                if (response.next == null) {
                    hasNext = false;
                }
                nextLink = response.next;
                $.each(response.results, function(i,item) {

                	dataCreated = dateTime(item.dataCreated);
                    dataUpdated = dateTime(item.dataUpdated);


                    var t = $('<div>').addClass('media-right').append(
                        $('<strong>').text(item.user.username),
                        $('<br><br>'),
                        $('<div>').css('font-size','20px').css('font-family','ariel').text(item.content),
                        $('<br>'),$('<mark>').text('created '), dataCreated,
                        " ago | ", $("<mark>") .text("updated"), dataUpdated + " ago ",
                        $('<br>'),
                    )
                    if ($('#name').text() == item.user.username) {
                        t.append(
                            $('<a>').attr('href','/delete/'+item.id).text(' Delete'), ' | ',
                            $('<a>').attr('href','/update/'+item.id).text(' Update'),
                            $('<br>'),
                        );
                    }
                    var u = $('<a>').attr('href','/detail/'+item.id).attr('data-target','#myModal').attr('data-toggle', 'modal') .css('text-decoration','none').css('color','inherit').append($("<li>").addClass('media').css('border','1px solid rgb(221, 221, 224)').css('padding','10px').css('margin-top','14px').append(t));
                    r.append(u);
                });
                if (next == 1) {
                    $('.put').html(r);
                }
                else {
                    $('.put').append(r);
                }
            }
        },
        error : function () {
            console.log("error !!! Cant find the tweets at this moment ");
        }
    });
}

$('.formClass').submit(function (event) {
    event.preventDefault();
    var formData = $(this).serialize();
    var className = $(this).attr('class');
    $.ajax({
        url: "/api/create/",
        data: formData,
        method : "POST",
        success: function(response){
            $('.' + className + " textarea").val('');
            $('#count').text(charstart);
            ajaxcall();
        }
    });
})
var i=0;

$(document).ready(function (){
    ajaxcall();
    scroll();
})

function scroll() {
    setInterval(function() {
        var busy = false;
        if(($(window).scrollTop() + $(window).height()) > $('body').height() && !busy) {
            busy = true;
            $('.loader').css('display','block');
            //$this.find('.loading-bar').html('Loading Posts');
            // console.log(nextLink, i);
            if (hasNext == true) {
                ajaxcall(nextLink);
            }
            else {
                $('.loader').css('display','none');
            }
        }
    }, 1000);
}
