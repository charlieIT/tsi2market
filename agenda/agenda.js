/**
 * Created by luis on 3/13/17.
 */

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "agenda.json", true);
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

        var agenda = $('#agenda');
        var grid = document.createElement('div')
        grid.className = "ui two column stackable grid"

        var col_count = 1;

        for (var item in actual_JSON) {
            //console.log(item);

            var coluna = document.createElement('div');
            coluna.className = "ui stackable column " + col_count;

            var row_um = document.createElement('div');
            row_um.className = "ui stackable row";

            if (col_count == 1){

                var segment = document.createElement('div');
                segment.className = "ui inverted teal segment"
                var titulo_dia = document.createElement("h3");
                titulo_dia.innerHTML = "dia " + item;

                segment.appendChild(titulo_dia);
                row_um.appendChild(segment);
                coluna.appendChild(row_um);
                grid.appendChild(coluna);

            } else if (col_count > 1) {

                var segment = document.createElement('div');
                segment.className = "ui inverted my-blue segment"
                var titulo_dia = document.createElement("h3");
                titulo_dia.innerHTML = "dia " + item;

                segment.appendChild(titulo_dia);
                row_um.appendChild(segment);
                coluna.appendChild(row_um);
                grid.appendChild(coluna);

            }

            for (var s in actual_JSON[item]) {

                var conteudo_sessao = actual_JSON[item][s];

                //console.log(conteudo_sessao)
                var row = document.createElement('div');
                row.className = "ui stackable row ";

                var segment = document.createElement('div');
                if (col_count==1) {
                    segment.className = "ui secondary left aligned segment";
                } else {
                    segment.className = "ui secondary right aligned segment";
                }

                var div_aux = document.createElement('div');

                /**
                 *
                 * ícone sessão
                 */
                var icon = document.createElement('i');
                icon.className = conteudo_sessao.icon;

                /*
                horas e titulo sessão
                 */
                var span_conteudo = document.createElement('span');
                var span_time = document.createElement("span");
                span_time.className = "time-span-2";
                span_time.innerHTML = conteudo_sessao.time;

                /**
                 * almoço tem imagem e não um ícone
                 */
                if (conteudo_sessao.title == "almoço") {

                    icon = null;
                    icon = document.createElement('img');
                    icon.className = "ag-icon";
                    icon.src = "../assets/lunch_light_gray.png";
                }
                /**
                 * python tem imagem e não ícone
                 */
                if (conteudo_sessao.note == "python") {

                    icon = null;
                    icon = document.createElement('img');
                    icon.className = "ag-icon";
                    icon.src = "../assets/python_icon.ico";
                }

                if(col_count == 1) {
                    /**
                     *
                     * ícone sessão à direita
                     */
                    icon.style = "float:right;"
                    segment.appendChild(icon);
                    /**
                     * tempos à esquerda
                     */
                    div_aux.appendChild(span_time);
                    div_aux.innerHTML += " " + conteudo_sessao.title;

                    /**
                     * se existirem empresas associadas à sessão
                     */
                    if(conteudo_sessao.empresa) {
                        div_aux.innerHTML += " - " + conteudo_sessao.empresa;
                    }

                }
                else {
                    /**
                     *
                     * ícone da sessão à esquerda
                     */
                    icon.style = "float:left;";

                    /**
                     * tempos à direita
                     */
                    div_aux.innerHTML = conteudo_sessao.title + " ";
                    /**
                     * se existirem empresas associadas à sessão
                     */
                    if(conteudo_sessao.empresa && !conteudo_sessao.orador) {
                        div_aux.innerHTML += " - " + conteudo_sessao.empresa + " ";
                    }
                    div_aux.appendChild(span_time);
                }

                div_aux.appendChild(icon);

                segment.appendChild(div_aux);

                row.appendChild(segment);
                coluna.appendChild(row);

                //console.log(coluna);
            }

            grid.appendChild(coluna);
            agenda.append(grid);
            col_count++;
            if(col_count > 2) {
                col_count = 1;
            }
        }


    });

}init();