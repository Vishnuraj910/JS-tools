var oJSONBuilder = function (_c, _j) {
    $(function () {
            if($(".js-ldr").length == 0){
        $("body").append("<div class='js-ldr'></div>");
    }else{
    $(".js-ldr").fadeIn(100);
    }
    if(_j.assets)
    {
    if (_j.assets.jsPre) {
            for (var i = 0; i < _j.assets.jsPre.length; i++) {
                if($.isArray(_j.assets.jsPre[i]))
                {
                    
                    $.getScript(_j.assets.jsPre[i][0]).done(function(a,b){
                        window[_j.assets.jsPre[i][1]]();    
                    });
                }else{
                $.getScript(_j.assets.jsPre[i]);
                }
                
            }
    }
        if(_j.assets.cssPre)
        {
            for (var i = 0; i < _j.assets.cssPre.length; i++) {
                var head = $("head")[0];
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = _j.assets.cssPre[i];
                head.appendChild(link);
            }
        }
        }
        
        
        if (_j.structure.type == "table") {
            var jCon = _j.structure.prop;
            for (var i = 0; i < _j.structure.data.length; i++) {
                var mRow = "";
                var jD = _j.structure.data[i];
                if (jD.prop.class && jCon.class) {
                    jD.prop.class += " " + jCon.class;
                }
                var _ht = "<table "
                $.each($.extend({}, jCon, jD.prop), function (key, val) {
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
        if (_j.assets)
        {
        if(_j.assets.jsPost){
            for (var i = 0; i < _j.assets.jsPost.length; i++) {
                if($.isArray(_j.assets.jsPost[i]))
                {
                    
                    $.getScript(_j.assets.jsPost[i][0]).done(function(a,b){
                        window[_j.assets.jsPost[i][1]]();    
                    });
                }else{
                $.getScript(_j.assets.jsPost[i]);
                }
                
            }}
        if(_j.assets.cssPost)
        {
            for (var i = 0; i < _j.assets.cssPost.length; i++) {
                var head = $("head")[0];
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = _j.assets.cssPost[i];
                head.appendChild(link);
            }
        }
        $(".js-ldr").delay(500).fadeOut(50);
        }else{
        $(".js-ldr").fadeOut(50);
        }
    })
}
