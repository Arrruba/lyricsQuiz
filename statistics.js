window.onload = function onload() {

/*
var ctxL = document.getElementById("lineChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: ['rgba(105, 0, 132, .2)',],
            borderColor: ['rgba(200, 99, 132, .7)',],
            borderWidth: 2
            },
            {
            label: "My Second dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: ['rgba(0, 137, 132, .2)',],
            borderColor: ['rgba(0, 10, 130, .7)',],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true
        }
});
*/
// var auth2 = gapi.auth2.getAuthInstance();
// var profile = auth2.currentUser.get().getBasicProfile();

var url_get_scores = "http://localhost:8080/get/scores";
$.ajax({
    url: url_get_scores,
    type: "GET",
    contentType: "application/json; charset=utf-8",
    success: function(results) {
        var dates_dataset =[];
        var scores_dataset =[];
        var scores_best =[];  //najlepszy wynik w danym dniu
        var scores_player = []; //wynik gracza;
        
        //  var profile_email ="";
        //  if((profile.getEmail()).length>0) profile_email = profile.getEmail();
        
        $.each(results, function(key,item){

            if(dates_dataset.length>0 && dates_dataset.includes(item.date)){
                scores_dataset[dates_dataset.indexOf(item.date)] = scores_dataset[dates_dataset.indexOf(item.date)] + item.score;
                if (item.score > scores_best[dates_dataset.indexOf(item.date)]){
                    scores_best[dates_dataset.indexOf(item.date)] = item.score;
                }
                // if ((item.user.email).localeCompare(profile_email)==0){
                //     scores_player[dates_dataset.indexOf(item.date)] = scores_player[dates_dataset.indexOf(item.date)] + item.score;
                // }
                // else{
                //     scores_player[dates_dataset.indexOf(item.date)] = 0;
                // }
                
            }
            else{
                dates_dataset.push(item.date);
                scores_dataset.push(item.score);
                scores_best.push(item.score);
                // if ((item.user.email).localeCompare(profile_email)==0){
                //     scores_player.push(item.score);
                // }
                // else 
                //     scores_player.push(0);

            }
           // console.log(profile_email);
            console.log(item.date+" - "+item.score);

        })

        var ctxL = document.getElementById("lineChart1").getContext('2d');
        var myLineChart = new Chart(ctxL, {
            type: 'line',
            data: {
                labels: dates_dataset,
                datasets: [{
                    label: "Suma wyników wszystkich graczy",
                    data: scores_dataset,
                    backgroundColor: ['rgba(204, 117, 1, .2)',],
                    borderColor: ['rgba(204, 117, 3, .7)',],
                    borderWidth: 2
                    },
                    ]
            },
            options: {
                responsive: true
                }
        });


    }
});


}


function call(){
    var auth2 = gapi.auth2.getAuthInstance();
    var profile = auth2.currentUser.get().getBasicProfile();
    var url_get_scores = "http://localhost:8080/get/scores";
    $.ajax({
        url: url_get_scores,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function(results) {
            var dates_dataset =[];
            var scores_best =[];  //najlepszy wynik w danym dniu
            var scores_player = []; //wynik gracza;
            
            var profile_email ="";
            if((profile.getEmail()).length>0) profile_email = profile.getEmail();
            
            $.each(results, function(key,item){

                if(dates_dataset.length>0 && dates_dataset.includes(item.date)){
                    if (item.score > scores_best[dates_dataset.indexOf(item.date)]){
                        scores_best[dates_dataset.indexOf(item.date)] = item.score;
                    }
                    if ((item.user.email).localeCompare(profile_email)==0 && item.score > scores_player[dates_dataset.indexOf(item.date)]){
                        scores_player[dates_dataset.indexOf(item.date)] = item.score;//scores_player[dates_dataset.indexOf(item.date)] + item.score;
                    }
                    else{
                        scores_player[dates_dataset.indexOf(item.date)] = 0;
                    }
                    
                }
                else{
                    dates_dataset.push(item.date);
                    scores_best.push(item.score);
                    if ((item.user.email).localeCompare(profile_email)==0){
                        scores_player.push(item.score);
                    }
                    else 
                        scores_player.push(0);

                }
            })
          
            var ctxL2 = document.getElementById("lineChart2").getContext('2d');
            var myLineChart2 = new Chart(ctxL2, {
                type: 'line',
                data: {
                    labels: dates_dataset,
                    datasets: [
                        {
                        label: "Twój wynik",
                        data: scores_player,
                        backgroundColor: ['rgba(204, 117, 1, .2)',],
                        borderColor: ['rgba(204, 117, 3, .7)',],
                        borderWidth: 2
                        },
                        {
                        label: "Najlepszy wynik",
                        data: scores_best,
                        backgroundColor: ['#dce8f1b2',],
                        borderColor: ['#77b4e2',],
                        borderWidth: 2
                        },
                        ],
                    
                },
                options: {
                    responsive: true,
                    legend:{
                        position: 'top'
                    }
                    }
            });
            


        }
    });
}