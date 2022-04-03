//window.onload

var count=0;

window.onload= function onload(){
    var url_get_songs = "http://localhost:8080/get/songs";
    var id=1;
    $.ajax(
        {
            url: url_get_songs,
            type:"GET",
            contentType:"application/json; charset=utf-8",
            success: function(results){
                var htmlc='<table class="table table-hover my-tab-color w-90">'+
                '<thead >'+
                  '<tr>'+
                    '<th class="col1" scope="col">Numer na liście</th>'+
                    '<th class="col2" scope="col">Tytuł</th>'+
                    '<th class="col2" scope="col">Wykonawca</th>'+
                    '<th scope="col"></th>'+
                  '</tr>'+
                '</thead>'+
                '<tbody id="tab-body">';
                $.each(results, function(key,item){
                    htmlc += '<tr>';
                    htmlc += '<td class="col1" scope="row">'+id+'.</td>';
                    htmlc += '<td class="col2" id="row'+id+'-title">'+item.title+'</td>';
                    htmlc += '<td class="col2" id="row'+id+'-author">'+item.author+'</td>';
                    htmlc += '<td id="row'+id+'-play">';
                    htmlc += '<a href="game.html?title='+item.title+'&author='+item.author+'">';
                    htmlc += '<img class="play-btn" src="img/play.png"></a></td></tr>';
                    console.log(item.title+","+item.author);
                    count++;
                    id++;
                });
                htmlc += '</tbody></table>';
                $("#tab-sec").append((htmlc));

               // $('#tab-body').html(htmlc);
            }
        }
    );
}

function randomSong(){
    count = $('#tab-body .col1').length;
    console.log(count);
    if(count>0){
        var rand = Math.ceil(Math.random() * (+count - +1)) + +1;
        var title = document.getElementById("row"+rand+"-title").innerHTML;
        var author = document.getElementById("row"+rand+"-author").innerHTML;
        location.href="game.html?title="+title+"&author="+author;
    }
    else{
        window.alert("Brak piosenek - nie udało się wylosować :/");
    }
}