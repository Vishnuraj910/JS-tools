
var oJSONBuilder = function (_c, _j) {
    $(function () {
        if (_j.structure.type == "table") {
            var jCon = _j.structure.config;
            for (var i = 0; i < _j.structure.data.length; i++) {
                var mRow = "";
                var jD = _j.structure.data[i];
                if (jD.config.class && jCon.class) {
                    jD.config.class += " " + jCon.class;
                }
                var _ht = "<table "
                $.each($.extend({}, jCon, jD.config), function (key, val) {
                    _ht += key + "='" + val + "' ";
                });
                _ht += ">"
                var _hd = "<thead><tr >";
                for (var k = 0; k < jD.headers.length; k++) {
                    _hd += "<th>" + jD.headers[k] + "</th>";
                }
                _hd += "</tr></thead>";
                var _b = "<tbody>"
                for (var k = 0; k < jD.content.length; k++) {
                    _b += "<tr>"
                    for (var l = 0; l < jD.content[k].length; l++) {
                        var jEh = jD.content[k][l];
                        if (typeof (jEh.type) != "undefined") {
                            var inpItm = "<input "
                            $.each(jEh, function (key, val) {
                                inpItm += key + "='" + val + "' "; });
                            inpItm += " />"
                            _b += "<td>" + inpItm + "</td>"
                        } else if (typeof (jEh.tag) != "undefined") {
                            var selItm = "<" + jEh.tag + " ";
                            $.each(jEh.prop, function (key, val) {
                                selItm += key + "='" + val + "' "; });
                            selItm += ">";
                            $.each(jEh.options, function (key) {
                                selItm += "<option value='" + jEh.options[key].value + "'>" + jEh.options[key].name + "</option>"; });
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
                $(_c)[0].innerHTML += _ht
            }
        }
        if (_j.assets) {
            for (var i = 0; i < _j.assets.js.length; i++) {
                
                if($.isArray(_j.assets.js[i]))
                {
                    
                    $.getScript(_j.assets.js[i][0]).done(function(a,b){
                        window[_j.assets.js[i][1]]();    
                    });
                }else{
                $.getScript(_j.assets.js[i]);
                }
                
            }
            for (var i = 0; i < _j.assets.css.length; i++) {
                var head = $("head")[0];
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = _j.assets.css[i];
                head.appendChild(link);
            }
        }
    })
}
