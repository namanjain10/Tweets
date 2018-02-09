function dateTime(textDate) {
    var now = (new Date() - new Date(textDate))/1000;
    var rem = Math.floor(now/(60*60));
    var days = Math.floor(rem/24);
    var hr = rem - days*24;
    var min = Math.floor((now%(60*60))/(60));
    var sec = Math.floor((now%(60*60))%(60));
    return (days + " days " + hr+ " hr " + min + " min ");
}

// $('.form').

$(document).ready(function (){
    $.ajax({
        url: "/api/list/",
        success: function(response){
            if (response.length == 0) {
                console.log('now');
                $('.put').append("<div class='jumbotron' style = 'text-align:center'>No Tweets Yet!!!</div>");
            }
            else {
                r = '<ul class="media-list">';
                //console.log(response.results);
                $.each(response.results, function(i,item) {

                	dataCreated = dateTime(item.dataCreated);
                    dataUpdated = dateTime(item.dataUpdated);

                    r += "<li class='media' style='border :1px solid rgb(221, 221, 224); padding :10px'><div class='media-right'> <strong>" + item.user.username + "</strong><br><br><div style='font-size:20px'>" + item.content + "</div><br><mark>created </mark>" + dataCreated + " ago | <mark>updated </mark>" + dataUpdated + " ago <br><a href = '/detail/" + item.id + "'> View </a>|<a href='/delete/" + item.id + "'> Delete </a>|<a href='/update/" + item.id + "'> Update</a><br>";
                    });

                $('.put').append(r+'</ul>');
            }
        },
        error : function () {
            console.log("error !!! Cant find the tweets at this moment ");
        }
    });


})

// $(window).ajaxComplete(function () {
//     setInterval(function() {
//         var busy = false;
//         if(($(window).scrollTop() + $(window).height()) > $('body').height() && !busy) {
//             busy = true;
//             //$this.find('.loading-bar').html('Loading Posts');
//             console.log('hey ok jajakakakak');
//             setTimeout(function() {
//                 console.log('hey ok then');
//             }, 500);
//         }
//     }, 1000);
// })
