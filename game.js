var res_split;
var removed;
var removed_indexes;
var result; //<-- liczba trafionych slow, bylo wycinanych 10 to na nastepnej stronie mozna sobie policzyc albo tu wprowadzic zmienna i ja tez wysylac w poscie
var c=0;
var is_signed_in="";

window.onload = function onload() {
    var url_string = window.location.href
    var url = new URL(url_string);
    var author = url.searchParams.get("author");
    var title = url.searchParams.get("title");
    console.log(author + "," + title);
    document.getElementById("title-author").innerHTML = title + " <i>" + author + "</i>";

    var url_address = "http://localhost:8080/get/lyrics/" + author + "/" + title;
    var url_get_vid_id = "http://localhost:8080/get/video/" + author + "/" + title;
    var src_gen = "";

    $.ajax({
        url: url_get_vid_id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function(results) {
            console.log(results);
            results = results.replace(/"/g, '');
            src_gen = "https://www.youtube.com/embed/" + results;
            console.log(src_gen);

            frame_code = "<iframe id=\"frame\" src=\"" + src_gen + "\" frameborder=\"0\" allowfullscreen> </iframe>";

            $("#frame-holder").append((frame_code));
        }
    });


    // document.getElementById("frame").src = src_gen;


    $.ajax({
        url: url_address,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function(results) {
            console.log(results)
          //  if ((results.localeCompare('No lyrics for this song available in our database'))!=0){
            results1 ="Loro non sanno di che parlo\\n\\nVestiti sporchi, fra', di fango\\n\\nGiallo di siga' fra le dita\\n\\nIo con la siga' camminando\\n\\nScusami, ma ci credo tanto\\n\\nChe posso fare questo salto\\n\\nE anche se la strada è in salita\\n\\nPer questo ora mi sto allenando\\n\\n\\n\\nE buonasera, signore e signori\\n\\nFuori gli attori\\n\\nVi conviene toccarvi i coglioni\\n\\nVi conviene stare zitti e buoni\\n\\nQui la gente è strana tipo spacciatori\\n\\nTroppe notti stavo chiuso fuori\\n\\nMo li prendo a calci 'sti portoni\\n\\nSguardo in alto tipo scalatori\\n\\nQuindi scusa mamma se sto sempre fuori, ma\\n\\n\\n\\nSono fuori di testa, ma diverso da loro\\n\\nE tu sei fuori di testa, ma diversa da loro\\n\\nSiamo fuori di testa, ma diversi da loro\\n\\nSiamo fuori di testa, ma diversi da loro\\n\\n\\n\\nIo ho scritto pagine e pagine\\n\\nHo visto sale, poi lacrime\\n\\nQuesti uomini in macchina\\n\\nNon scalare le rapide\\n\\nScritto sopra una lapide\\n\\nIn casa mia non c'è Dio\\n\\nMa se trovi il senso del tempo\\n\\nRisalirai dal tuo oblio\\n\\nE non c'è vento che fermi\\n\\nLa naturale potenza\\n\\nDal punto giusto di vista\\n\\nDel vento senti l'ebrezza\\n\\nCon ali in cera alla schiena\\n\\nRicercherò quell'altezza\\n\\nSe vuoi fermarmi ritenta\\n\\nProva a tagliarmi la testa\\n\\nPerché\\n\\n\\n\\nSono fuori di testa, ma diverso da loro\\n\\nE tu sei fuori di testa, ma diversa da loro\\n\\nSiamo fuori di testa, ma diversi da loro\\n\\nSiamo fuori di testa, ma diversi da loro\\n\\n\\n\\nParla la gente purtroppo\\n\\nParla, non sa di che cosa parla\\n\\nTu portami dove sto a galla\\n\\nChe qui mi manca l'aria\\n\\nParla la gente purtroppo\\n\\nParla, non sa di che cosa parla\\n\\nTu portami dove sto a galla\\n\\nChe qui mi manca l'aria\\n\\nParla la gente purtroppo\\n\\nParla, non sa di che cazzo parla\\n\\nTu portami dove sto a galla\\n\\nChe qui mi manca l'aria\\n\\n\\n\\nMa sono fuori di testa, ma diverso da loro\\n\\nE tu sei fuori di testa, ma diversa da loro\\n\\nSiamo fuori di testa, ma diversi da loro\\n\\nSiamo fuori di testa, ma diversi da loro\\n\\n\\n\\nNoi siamo diversi da loro";
            //var res = results.replace(/\\n\\n/g, "</br>");
            var res = results1.replace(/\\n\\n/g, "</br>");

            res = res.replace(/\\r\\n/g, "</br>");
            res = res.replace(/"/g, '');

            res_split = res.split(' ');
            var l = res_split.length;
            removed = []
            removed_indexes = []
            var min = 0;
            var max = l - 1;
            for (i = 0; i < 10; i++) {
                rand = Math.floor(Math.random() * (+max - +min)) + +min;
                removed.forEach(function(item, index, array) {
                    while ((item.localeCompare(res_split[rand])) == 0) {
                        rand = Math.floor(Math.random() * (+max - +min)) + +min;
                    }
                });
                removed.push(res_split[rand]);
                removed_indexes.push(rand);
                res_split[rand] = "<input type='text' id='input-" + i + "' class='input-game' placeholder='wprowadź słowo'>"
            }
            var res_glue = "";
            res_split.forEach(function(item, index, array) {
                res_glue = res_glue + " " + item;
            });
            res = res_glue;
         //   }
         //   else var res = results;
            $("#lyrics").append((res));
            $("#preloader").css("display", "none");

        }
    })

    if(is_signed_in.length>0)
        console.log(is_signed_in);

    //document.getElementById("lyrics").innerHTML = "Hello JavaScript";

}

function checkResult() {

    var auth2 = gapi.auth2.getAuthInstance();
    var profile = auth2.currentUser.get().getBasicProfile();
   // console.log("Uiiii: "+profile.getEmail());
    var url_string = window.location.href
    var url = new URL(url_string);

    var str = [];
   // var s = "";

    for (i = 0; i < 10; i++) {
        if (document.getElementById("input-" + i) != null)
            str.push(document.getElementById("input-" + i).value);
    }
   // console.log(s);

    result = 0;



    sortWithIndeces(removed_indexes); //sortujemy indexy usuniete i zwracamy indexy posortowanych indexow - zby wiedziec w jakiej kolejnosci porownywac tabele slow
    var counter = 0;
    for (i = 0; i < str.length; i++) {
        if ((removed[removed_indexes.sortIndices[i]].localeCompare(str[i])) == 0 && str[i].length > 0) {
            result++;
        }
        counter++;
    }
    if (c==1){console.log(result);}
    else {
        c++;
        checkResult();
    }


   // var uname = getCookie("username")
    if(profile != null && (profile.getEmail()).length>0){
        console.log(profile.getEmail());
        var url_get_user = "http://localhost:8080/get/userByData/" + profile.getEmail();
        var url_add_score = "http://localhost:8080/add/scoreByData/"+result+"/"+str.length+"/" + url.searchParams.get("title") + "/" + url.searchParams.get("author");
        var user_id=0;
        var user_email ="";
        $.ajax({
            url: url_get_user,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function(results) {
                    user_id = results.id;
                    user_email = results.email;
                   // console.log(user_id+", "+user_email);       
                   $.ajax({
                    url: url_add_score,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        "id": results.id,
                        "email": results.email
                    }),
                    success: function(result) {
                        console.log("Dodano wynik");
                    }
                });
               
            }
        });
      //  console.log(results.id+", "+results.email);

    //    $.ajax({
    //     url: url_add_score,
    //     type: "POST",
    //     contentType: "application/json; charset=utf-8",
    //     body: {
    //         "id": user_id,
    //         "email": user_email
    //     },
    //     success: function(results) {
    //         console.log("Niby sukces");
    //     }
    // });
    }

   // window.alert("Twój wynik: "+result+"/10");
   document.getElementById("modalBody").innerHTML =result+"/10";
}

function sortWithIndeces(toSort) {
    for (var i = 0; i < toSort.length; i++) {
        toSort[i] = [toSort[i], i];
    }
    toSort.sort(function(left, right) {
        return left[0] < right[0] ? -1 : 1;
    });
    toSort.sortIndices = [];
    for (var j = 0; j < toSort.length; j++) {
        toSort.sortIndices.push(toSort[j][1]);
        toSort[j] = toSort[j][0];
    }
    return toSort;
}


function onSignIn(googleUser) {
    console.log('User is ' + JSON.stringify(googleUser.getBasicProfile()))

    var element = document.querySelector('#content');
    var str_short = (googleUser.getBasicProfile().getName()).split(' ');
    var str="";
    str_short.forEach(element => {
        str = str+element[0];
    });
    element.innerText = str;//googleUser.getBasicProfile().getName();

    var image = document.createElement('img');
    image.setAttribute('src', googleUser.getBasicProfile().getImageUrl());
    image.setAttribute('height',"30px");
    image.style.marginLeft="7px";
    element.append(image);
    document.getElementById('signOut').style.display = 'block';

    var ulr_add_user = "http://localhost:8080/addOrNotByData/user/"+googleUser.getBasicProfile().getEmail();
        $.ajax({
            url: ulr_add_user,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function(results) {
            $("#signIn").css("visibility", "none");
            }
        });

  //  document.cookie = "username="+googleUser.getBasicProfile().getEmail()+"; path=/;";
    
    //document.getElementById('signIn').style.display = 'hidden';
}


// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }