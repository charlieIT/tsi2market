/**
 * Created by luis on 2/18/17.
 */
/**
var folder = "assets/fotos/";

$.ajax({
    url : folder,
    success: function (data) {
        var roster = $("#roster");
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) {

                 roster.append('<article class="caption">');
                 roster.append('<img class="caption__media" src="'+ folder + val +'">');
                 roster.append('<div class="caption__overlay">');
                 roster.append('</div>');
                 roster.append('</article>');

                //append( "<img class='roster-pic' src='"+ folder + val +"'>" );
            }
        });
    }
});*/
