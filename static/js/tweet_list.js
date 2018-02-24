var charstart = 140;

$('.formClass').append('<span id="count">'+ charstart +'</span>');

$('.formClass textarea').keyup(function () {
    console.log();
    $('#count').text(charstart - $(this).val().length);
})

var nextLink = null;
var next = 0;
var hasNext = true;
var first = true;

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

                    var t = $('<div>').addClass('media-right').append(
                        $('<strong>').text(item.user.username),
                        $('<br><br>'),
                        $('<div>').css('font-size','20px').css('font-family','ariel').text(item.content),
                        $('<br>'),$('<mark>').text('created '), item.dataCreated,
                        " | ", item.timesince,
                        $('<br>'),
                    )
                    if ($('#name').text() == item.user.username) {
                        t.append(
                            $('<a>').attr('href','/delete/'+item.id).text(' Delete'), ' | ',
                            $('<a>').attr('href','/update/'+item.id).text(' Update'),
                            $('<br>'),
                        );
                    }

                    var u = $('<a>').addClass('modalClass').attr('href','javascript:void(0)').attr('value', item.id)
                            //.attr('data-target','#myModal').attr('data-toggle', 'modal')
                            .css('text-decoration','none').css('color','inherit')
                            .append(
                                    $("<li>")
                                    .addClass('media')
                                    .css('border','1px solid rgb(221, 221, 224)')
                                    .css('padding','10px').css('margin-top','14px').append(t));
                    r.append(u);
                });
                if (next == 1) {
                    $('.put').html(r);
                }
                else {
                    $('.put').append(r);
                }

            }
            busy = false;
        },
        error : function () {
            console.log("error !!! Cant find the tweets at this moment ");
        }
    });
}

$('body').on("click", '.modalClass', function(){
    // console.log(response);
    callModalAjax($(this).attr('value'));
});

function callModalAjax(id) {
    $.ajax({
        url: '/api/detail/',
        method : "GET",
        data : {'id':id},
        success: function(response){
            //console.log(response);
            $('.modal-content').html(
                "<div class='modal-body'><button type='button' class='close' data-dismiss='modal'>&times;</button>                    <div class='media-right'>                        <strong>" + response.user.username + "</strong><br>                      <br><div style='font-size:20px'>" +
                            response.content +
                        "</div><br><mark>created</mark> " + response.dataCreated + " | " + response.timesince + "<br><br><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div>"
            );
            // $('#myModal').modal('toggle');
            $('#myModal').modal('show');
        },
        error: function () {
            console.log('error');
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
});

var busy = false;

$(document).scroll(function() {
    // console.log('check');
    if(($(window).scrollTop() + $(window).height()) > $('body').height() && !busy) {
        busy = true;
        $('.loader').css('display','block');
        // console.log(nextLink, i);
        if (hasNext == true) {
            // console.log('calling ajax');
            ajaxcall(nextLink);
        }
        else {
            $('.loader').css('display','none');
        }
    }
})
