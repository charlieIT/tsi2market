/**
 * Created by luis on 3/13/17.
 */
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "agenda/empresas.json", true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function (response) {
        var actual_JSON = JSON.parse(response);

        var emp_div = $("#empresas-js");

        var grid = document.createElement("div");
        grid.className = "ui stackable centered grid";

        var row = document.createElement("div");
        row.className =  "four column row";

        var col_count = 0;

        for (var item in actual_JSON) {



            for (var emp in actual_JSON[item]) {

                if(col_count == 3) {
                    var row = document.createElement("div");
                    row.className =  "four column row";
                    col_count = 0;
                }

                var obj = actual_JSON[item][emp];
                var logo = obj.img;

                var col = document.createElement("div");
                col.className = "column img-container "+ col_count;

                var img = document.createElement("img");
                img.src = logo;

/*
                var img = document.createElement("div");
                img.className = "img";
                img.style = "background-image:url('"+logo+"')";
*/
                if(obj.href) {
                    var ref = document.createElement("a");
                    ref.href = obj.href;
                    ref.appendChild(img);
                   /* img.appendChild(ref);*/
                    col.appendChild(ref);
                } else {

                    col.appendChild(img);
                }

                row.appendChild(col);



                grid.appendChild(row);
                col_count++;
            }

        }
        emp_div.append(grid);
    });
}init();