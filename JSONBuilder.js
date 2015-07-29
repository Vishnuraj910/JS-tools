var oJSONBuilder = function (_c, _j) {

$(function(){
	
    if(_j.assets){
    for(var i=0;i<_j.assets.js.length;i++)
    {
        $.getScript(_j.assets.js[i]);
    }
        for(var i=0;i<_j.assets.css.length;i++)
    {
        var head  = $("head")[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = _j.assets.css[i]
    head.appendChild(link);
    }
    }
    
    
	if (_j.structure.config.type == "table") {
        var jCon = _j.structure.config;

        for (var i = 0; i < _j.structure.data.length; i++) {
            var mRow = "";
            var jD = _j.structure.data[i]
            if (jD.config) {
                mRow = jD.config.maxRow ? jD.config.maxRow : "";
                //console.log("Max Row"+mRow);
            }

            var _ht = "<table max-row='" + mRow + "' class='" + jCon.tableCssClass + "' border='" + jCon.border + "'>"

            var _hd = "<thead><tr >";
            //console.log(jD.headers)
            for (var k = 0; k < jD.headers.length; k++) {
                _hd += "<th>" + jD.headers[k] + "</th>";
            }
            _hd += "</tr></thead>";
            //console.log(_hd)
            var _b = "<tbody>"
            for (var k = 0; k < jD.content.length; k++) {
                _b += "<tr>"
                for (var l = 0; l < jD.content[k].length; l++) {
                    var jEh = jD.content[k][l];
                    if (typeof (jEh.type) != "undefined") {

                        var inpItm = "<input "

                        $.each(jEh, function (key, val) {
                            inpItm += key + "='" + val + "' ";
                        });
                        inpItm += " />"
                        _b += "<td>" + inpItm + "</td>"
                    } else if (typeof (jEh.tag) != "undefined") {

                        var selItm = "<" + jEh.tag + " ";
                        $.each(jEh.prop, function (key, val) {
                            selItm += key + "='" + val + "' ";
                        });
                        selItm += ">";
                        $.each(jEh.options, function (key) {
                            selItm += "<option value='" + jEh.options[key].value + "'>" + jEh.options[key].name + "</option>";
                        });
                        selItm += "</" + jEh.tag + ">";
                        _b += "<td>" + selItm + "</td>"
                    } else {

                        _b += "<td>" + jEh + "</td>";
                    }
                }
                _b += "</tr>"
            }
            _b += "<tbody>";

            _ht = _ht + _hd + _b + "</tbody>"
            //console.log(_ht)
            //fullString += _ht;
            $(_c)[0].innerHTML += _ht
           

        }
        if (jQuery().oneSimpleTablePagination) {
            $("[max-row]").filter(function () {
                return $(this).attr("max-row") > 0;
            }).oneSimpleTablePagination({
                rowFromTab: true
            });
        }

    }
	
})
    

}
