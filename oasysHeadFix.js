//  $(function(){ $("table[id*=gridViewID]").oasysHeadFix({ maxHeight: "258px",hfColor:"#000" });});





$.prototype.extend(
{
    'oasysHeadFix': function (options) {
        var defaults = {
            maxHeight: "400px",
            maxWidth: "100%",
            hfColor: "#fff",
            backgroundColor: "#408387",
            isReload: true,
            offsetTop: "18px",
            tdthPad:"5px 10px",
            isParentBorder: false,
            isHorizontal:true
        };
        uOpts = $.extend(defaults, options);
 var tabObj = this;
        if (typeof (tabObj[0]) != "undefined")
        {
            if ( uOpts.isHorizontal) {
                if (uOpts.isReload) {
                    var tempClone = tabObj[0].cloneNode(true);
                    $(".ofix-sec div").empty();
                    $(".ofix-sec div")[0].appendChild(tempClone);
                }

                var headScr = document.createElement("style")
                headScr.nodeType = "text/css";
                headScr.innerHTML = ".ofix-sec{height:" + uOpts.maxHeight + ";width:" + uOpts.maxWidth + "}.ofix-sec>div:first-child{position:relative;width:100%;height:100%;overflow:hidden}.header-wrapper{position:absolute;top:0;width:auto;background-color:" + uOpts.backgroundColor + ";z-index:1;font-weight:800;text-align:center;color:" + uOpts.hfColor + "}.row-wrapper{position:absolute;top:0;height:100%;width:100%;box-sizing:border-box;overflow:auto;padding-top:" + uOpts.offsetTop + "}.ofix-sec > td,th{text-overflow:ellipsis;white-space:nowrap}.hf-header td{white-space:nowrap}";
                tabObj[0].appendChild(headScr);
                var columnNames = [];

                var noofCol = $(tabObj).find("tr")[0].cells.length;
                $(tabObj).find("tr > th").each(function () {
                    $(this).parent().hide();

                    columnNames.push({ content: this.innerHTML, height: null, width: null , className:this.className});
                })

                var rowWrapper = $OASYS.element.create("div", null, "row-wrapper");



                var headWrapper = $OASYS.element.create("div", null, "header-wrapper");
                $(".ofix-sec div > table").remove();
                $(".ofix-sec div")[0].appendChild(headWrapper);
                $(".ofix-sec div")[0].appendChild(rowWrapper);
                var headTab = $OASYS.element.create("table", null, "o-header");
                headTab.rules = tabObj[0].rules;
                if (uOpts.isParentBorder) {
                    headTab.border = tabObj[0].border;
                }

                headTab.className += " " + tabObj[0].className;
                headTab.cellSpacing = tabObj[0].cellSpacing;
                //headTab.style.cssText = tabObj[0].style.cssText;
                headTab.cellPadding = tabObj[0].cellPadding;
                var headTabBody = $OASYS.element.create("tbody", null, null);
                var headTabBodyTr = $OASYS.element.create("tr", null, "hf-header");
                headTab.appendChild(headTabBody)
            

                headTabBody.appendChild(headTabBodyTr);
                headWrapper.appendChild(headTab);

                for (var i = 0; i < columnNames.length; i++) {
                    headTabBodyTr.innerHTML += "<td class='" + columnNames[i].className + "'>" + columnNames[i].content + "</td>";
                }


                rowWrapper.appendChild(tabObj[0]);
                var headPad = headWrapper.offsetHeight;


                $headerDiv = $('.header-wrapper');
                $rowDiv = $('.row-wrapper');
                $rowDiv.css("padding-top", headPad + "px");
                $rowDiv.scroll(function (e) {
                    $headerDiv.css({
                        left: -$rowDiv[0].scrollLeft + 'px'
                    });
                });

                $(".row-wrapper tr:nth-child(2) td").each(function () {
                    if ($(this).width() > $(".o-header tr td:nth-child(" + (parseInt($(this).parent().children().index($(this))) + 1) + ")").width()) {
                        $(".o-header tr td:nth-child(" + (parseInt($(this).parent().children().index($(this))) + 1) + ")").css("min-width", $(this).width() + "px")
                        $(this).css("min-width", $(this).width() + "px")
                    } else {
                        $(".o-header tr td:nth-child(" + (parseInt($(this).parent().children().index($(this))) + 1) + ")").css("min-width", $(".o-header tr td:nth-child(" + (parseInt($(this).parent().children().index($(this))) + 1) + ")").width() + "px")
                        $(this).css("min-width", $(".o-header tr td:nth-child(" + (parseInt($(this).parent().children().index($(this))) + 1) + ")").width() + "px")
                    }
                })


                

                var fullWidth = 0;
                $(".row-wrapper tr:nth-child(2) td").each(function () {

                    fullWidth += this.offsetWidth;
                })

                headWrapper.style.width = fullWidth + "px";
                //console.log(fullWidth);

            } else {
                $(this).find("thead").remove();
                var headScr = document.createElement("style")
                headScr.nodeType = "text/css";
                headScr.innerHTML = ".ofix-sec table:first-child{border-spacing:0}.ofix-sec table:first-child td+td{border-left:1px solid #eee}.ofix-sec table:first-child td,th{padding:"+uOpts.tdthPad+"}.ofix-sec table:first-child th{height:0;line-height:0;padding-top:0;padding-bottom:0;color:transparent;border:none;white-space:nowrap}.ofix-sec table:first-child th> :not(div){visibility:hidden}.ofix-sec table:first-child th div{position:absolute;background:0 0;padding:3px;top:0;line-height:normal;color:#fff}.ofix-sec table:first-child th:first-child div{border:none}.ofix-sec{position:relative;padding-top:"+uOpts.offsetTop+";background:" + uOpts.backgroundColor + "}.ofix-sec>div{overflow-y:auto;max-height:" + uOpts.maxHeight + "}";
                tabObj[0].appendChild(headScr);
                var columnNames = [];
                var noofCol = $(tabObj).find("tr")[0].cells.length;
                $(tabObj).find("tr > th").each(function () {
                    $(this).parent().css("visibility","hidden")

                    columnNames.push({ content: this.innerHTML, height: this.offsetHeight, width: this.offsetWidth });
                })
                var tHead = "<thead><tr class='hf-header'>"
                for (var i = 0; i < columnNames.length; i++) {
                    tHead += "<th style='width:" + columnNames[i].width + "px'>" + columnNames[i].content + "<div>" + columnNames[i].content + "</div></th>";
                }
                tHead += "</tr></thead>";
                tabObj[0].innerHTML = tHead + tabObj[0].innerHTML;


            }
        }
       

        //console.log("END")
    }





});

