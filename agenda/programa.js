/**
 * Created by luis on 3/11/17.
 */

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "https://charlieit.github.io/agenda/programa.json", true);
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

        var prog_container = $('#prog_js');

        /**
         * Titulo da secção -> header com texto Programa
         * @type {Element}
         */
        var header_container = document.createElement("div");
        header_container.className = "ui container right aligned header";
        var header = document.createElement("h1");
        header.style = "color: white;";
        header.innerHTML = "programa";
        header_container.appendChild(header);

        prog_container.append(header_container);


        for (var item in actual_JSON) {
            //console.log(item);
            /**
             * Nome das atividades -> workshops, sessões, etc!
             * @type {string}
             */
            var desc = item;
            var prog_holder = document.createElement("div");
            prog_holder.className = "ui inverted my-darken-blue message";
            var title_holder = document.createElement("div");
            /*
            * experimentar middle aligned header
            */
            title_holder.className = "ui header";
            var title = document.createElement("h1");
            title.style="color:white;"
            title.innerHTML = item;

            /**
             * adicionar conteúdos
             * */
            title_holder.appendChild(title);
            prog_holder.appendChild(title_holder);
            prog_container.append(prog_holder);

            /**
             * Conteúdo de cada sessão
             */
            col_count = 0;
            var row = document.createElement("div");
            row.className = "row";

            /**
             * Sessão holder é uma grelha (4 colunas? )
             * */
            var sessao_holder = document.createElement("div");
            sessao_holder.className = "ui stackable equal width centered grid container sessao-holder";

            for (var s in actual_JSON[item]) {

                /**
                 * adicionar nova linha na grelha
                 */
                if (col_count == 4) {
                    col_count = 0;
                    var row = document.createElement("div");
                    row.className = "row";
                    /*sessao_holder.appendChild(row);*/
                }

                /**
                 * nome da sessão
                 */
                var sessao = s;

                /**
                 * conteudos de cada sessão
                 */
                var conteudo_sessao = actual_JSON[item][s];

                var sessao_coluna = document.createElement("div");
                sessao_coluna.className = "four wide column " + item + "-" + col_count;
                sessao_coluna.style = "text-align: center;"
                /*sessao_holder.appendChild(sessao_coluna);*/


                var sessao_title = document.createElement("h2");

                if (!conteudo_sessao.icon) {
                    if (!conteudo_sessao.img) {
                        var sessao_icon = document.createElement("i");
                        sessao_icon.className = "code icon";
                    } else {
                        var sessao_icon = document.createElement("img");
                        sessao_icon.src = conteudo_sessao.img;
                    }
                } else {
                    var sessao_icon = document.createElement("i");
                    sessao_icon.className = conteudo_sessao.icon;
                }
                sessao_title.appendChild(sessao_icon);
                var sessao_txt = document.createElement("span");
                /*
                * texto em letras pequnas -> ncl
                * */
                sessao_txt.className = "ncl";
                sessao_txt.innerHTML = sessao;
                //console.log("->"+sessao);
                sessao_title.appendChild(sessao_txt);
                sessao_coluna.appendChild(sessao_title);

                var sessao_contents = document.createElement("div");
                sessao_contents.className = "transformed prog-contents";
                sessao_contents.style = "";

                /**
                 *
                 * construir texto relativo a cada sessão
                 */

                if(item != "networking" && item != "entreternimento") {
                    /** Orador / formador */

                    var orador = document.createElement("p");
                    var orador_txt = document.createElement("span");
                    orador_txt.innerHTML = conteudo_sessao.orador;
                    orador_icon = document.createElement("i");
                    orador_icon.className = "user icon";
                    orador.appendChild(orador_icon);
                    orador.appendChild(orador_txt);

                    sessao_contents.appendChild(orador);
                }
                /** Dia + hora */
                var time = document.createElement("p");
                var time_icon = document.createElement("i");
                time_icon.className = "clock icon";
                time_txt = document.createElement("span");
                if (conteudo_sessao.time != "") {
                    time_txt.innerHTML = "dia " + conteudo_sessao.dia + " - " + conteudo_sessao.time;
                } else {
                    time_txt.innerHTML = "dia " + conteudo_sessao.dia;
                }
                time.appendChild(time_icon);
                time.appendChild(time_txt);

                /** Descrição */
                var descricao = document.createElement("p");
                descricao.className = "ncl";
                descricao.innerHTML = conteudo_sessao.descricao;
                /**
                 * adicionar linha caso já estejam preenchidas 3 colunas
                 */
                if (row != null) {

                }

                if (conteudo_sessao.empresas) {
                    //console.log("net -> ");
                    var empresas = document.createElement("p");
                    var emp_icon = document.createElement("i");
                    emp_icon.className = "building icon";
                    empresas.appendChild(emp_icon);
                    var emp_txt = document.createElement("span");
                    emp_txt.innerHTML = conteudo_sessao.empresas;
                    empresas.appendChild(emp_txt);
                } else {
                    var empresas = null;
                }

                /**
                 * organizar conteudos e adicionar à div principal
                 */

                sessao_contents.appendChild(time);
                if(empresas) {
                    sessao_contents.appendChild(empresas);
                }
                sessao_contents.appendChild(descricao);
                sessao_coluna.appendChild(sessao_contents);
                row.appendChild(sessao_coluna);
                sessao_holder.appendChild(row);
                //console.log(sessao_coluna);
                /*sessao_holder.appendChild(sessao_contents);*/
                /* prog_container.append(sessao_contents);*/
                prog_container.append(sessao_holder);


                col_count++;
            }

        }




        /*
         <div id="label_atividades" class="ui container right aligned header">
         <h1 class="transformed"> Atividades </h1>
         </div>
         */

    });
}init();
