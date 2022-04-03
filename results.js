var score;
var max_score;


window.onload = function onload() {
    /*
    var url_string = window.location.href
    var url = new URL(url_string);
    var author = url.searchParams.get("result");
    var title = url.searchParams.get("maxResult");

    document.getElementById("title-author").innerHTML = title + " <i>" + author + "</i>";


    
        $.ajax({
            url: "http://localhost:8080/add/score",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function(results) {
                console.log(results);
                results = results.replace(/"/g, '');
                src_gen = "https://www.youtube.com/embed/" + results;
                console.log(src_gen);

                frame_code = "<iframe id=\"frame\" src=\"" + src_gen + "\" frameborder=\"0\" allowfullscreen> </iframe>";

                $("#frame-holder").append((frame_code));
            }
        })
        */

    /* chart.js chart examples */

    // chart colors
    var colors = ['#CC7501', '#000000'];




    /* 3 donut charts */
    var donutOptions = {
        cutoutPercentage: 85,
        legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } }
    };



    // donut 2
    var chDonutData2 = {
        labels: ['Score'],
        datasets: [{
            backgroundColor: colors.slice(0, 2),
            borderWidth: 0,
            data: [8, 2]
        }]
    };
    var chDonut2 = document.getElementById("chDonut2");
    if (chDonut2) {
        new Chart(chDonut2, {
            type: 'pie',
            data: chDonutData2,
            options: donutOptions
        });
    }



}