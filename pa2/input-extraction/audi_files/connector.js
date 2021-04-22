window.addEventListener('load', function(){
    !function () {
        function e(e, t) {
            var o = t.parentNode;
            o.lastchild == t ? o.appendChild(e) : o.insertBefore(e, t.nextSibling)
        }

        for (var t = "", o = "", n = document.getElementsByTagName("meta"), r = 0, a = n.length; a > r; r++) "keywords" == n[r].name.toLowerCase() && (o = n[r].content);
        var d = document.getElementsByTagName("script");
        for (var scripts = 0; scripts < d.length; scripts++) {
            if(d[scripts].className.indexOf('sales-module') > -1 && d[scripts].className.indexOf('module-loaded') == -1) {
                d[scripts].classList.add('module-loaded-' + scripts);
                var iframe_url = d[scripts].src;
                var full_path = iframe_url.split('#');
                var full_link = decodeURIComponent(full_path[1]);
                if(full_link.indexOf('?') > -1) {
                    full_link += '&';
                } else {
                    full_link += '?';
                }

                module = document.createElement("iframe"), module.setAttribute("src", t + full_link + "load=" + scripts + "&location=" + encodeURIComponent(window.location.href) + "&title=" + encodeURIComponent(document.title) + "&keywords=" + encodeURIComponent(o)), module.setAttribute("class", "loaded-" + scripts), module.setAttribute("width", "100%"), module.setAttribute("height", "500"), module.setAttribute("frameborder", "0"), e(module, document.querySelector(".module-loaded-" + scripts));

                window.removeEventListener("message", function(e){});

                window.addEventListener("message", function (e) {
                //if(e.origin.indexOf('localhost') > -1) {
                    //var m = e.data.split("=");
                    //if(m[0].indexOf('.loaded-') > -1) {


                        //console.log(e);
                        module.setAttribute("height", e.data);
                   // }
                //}
                }); 
            }
        }
    }();
}, false)

console.log('connector');

$('.header_wrapper').append('<iframe class="dars_scroller" src="https://ad.zurnal24.si/dars/" style="width: 100%; height: 25px;" frameborder="0"></iframe>');

$('.dfp_banner--BellowLead').css('margin-bottom', '22px');

$('.header__special').html('<a href="https://www.zurnal24.si" target="_blank"><img src="https://ad.zurnal24.si/test.png" style="width:50px; height: 50px; display: block;"></a>').css({
    'width': '50px',
    'height': '50px',
    'top': '6px'
});

$(".adsense_matched_content").css({
    'position' : 'relative',
    'z-index' : '5'
});

var dars_width = $('.dars_scroller').width();
if (dars_width < 1024) {
    $('.content__wrap').css('margin-top', '25px');
} else if (dars_width > 1024) {
    var subnav = $('.header_wrapper__subback');
    if (subnav.length > 0 && subnav.is(':visible')) {
        $('.dars_scroller').css('margin-top', '40px');
    }
    $('.content__wrap .container').css('margin-top', '89px !important');
}

var getUrl = document.URL;
console.log(getUrl);

// if (getUrl == 'https://www.zurnal24.si' || getUrl == 'https://www.zurnal24.si/' || getUrl == 'https://www.zurnal24.si/?meta_refresh=true') {

//     var wwidth = $(window).width();

//     console.log('window: ' + wwidth);

//     if (wwidth > 1370) {

//         $('.special_widget__background').eq(0).css({
//             'background-image' : 'url("https://www.zurnal24.si/banners/2021/01/gg/desk.jpg")'
//         });

//     } else if (wwidth < 1370 && wwidth > 1024) {

//         $('.special_widget__background').eq(0).css({
//             'background-image' : 'url("https://www.zurnal24.si/banners/2021/01/gg/tablet.jpg")'
//         });

//     } else if (wwidth < 1024) {

//         $('.special_widget__background').eq(0).css({
//             'background-image' : 'url("https://www.zurnal24.si/banners/2021/01/gg/mobile.jpg")'
//         });

//     }

// }

if (getUrl.indexOf('gallery-') != -1) {
	console.log('GALLERY!!!!!!!!!!!!');
	$('.header__logo_heading').css({
		'display' : 'none'
	});
}

if ($('.fold_article__bellow_content').length != 0) {

    $('.fold_article__bellow_content').append('\
        <style>\
            .fold_article__bellow_content .dfp_banner>div{\
                margin: 10px 0 10px\
            }\
        </style>\
        ');

}


if (getUrl == 'https://www.zurnal24.si/popotnik' || getUrl == 'https://www.zurnal24.si/popotnik?meta_refresh=true') {

    if ($('.fold_section--additional_news').length != 0) {
        $('.fold_section--additional_news').hide();
    }

}

if (getUrl == 'https://www.zurnal24.si/zmigaj-se' || getUrl == 'https://www.zurnal24.si/zmigaj-se?meta_refresh=true') {

    $('#divBillboardTop').css('height', '10px');
    $('.fold_special_mid--banner').css('display', 'none');
    $('#divBillboardBot').css('display', 'none');

}

if (getUrl == 'https://www.zurnal24.si/glas-generacije' || getUrl == 'https://www.zurnal24.si/glas-generacije?meta_refresh=true') {

    $('.leadblock__title').after('\
        <div class="slogan_special">\
            <h1>\
                <span>April: mesec za vrtičke, terase in balkone</span>\
            </h1>\
        </div>\
        <style>\
            .slogan_special{\
                clear: both;\
                display: inline-block;\
                width: 100%;\
                margin: 0;\
                padding: 0;\
                text-align: center;\
                font: normal 700 100% "Rubik", sans-serif;\
                letter-spacing: -0.025em;\
                margin-top: 20px;\
            }\
            .slogan_special h1 {\
                display: inline;\
                padding: 0 14px;\
                font-size: 2.8rem;\
                line-height: 3.2rem;\
                -webkit-box-decoration-break: clone;\
                box-decoration-break: clone;\
                color: #fff;\
                background: #292929;\
            }\
            .slogan_special h1 span {\
                position: relative;\
            }\
        </style>\
    ');

    $('.leadblock__title h1 span').html('Glas generacije');

    $('#divBillboardTop').after('\
        <style>\
            #divBillboardTop{\
                display: none;\
            }\
            #divBillboardMid{\
                display: none;\
            }\
        </style>');
    
}

if (getUrl == 'https://www.zurnal24.si/dosje' || getUrl == 'https://www.zurnal24.si/dosje?meta_refresh=true') {
    $('#divBillboardMid').after('\
        <style>\
            #divBillboardTop{\
                display: none;\
            }\
            #divBillboardMid{\
                display: none;\
            }\
            #divBillboardBot{\
                display: none;\
            }\
        </style>');
}

if (getUrl.indexOf('335234') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/335234/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('327795') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('342977') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/342977/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('343089') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/343089/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('343138') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/343138/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('344519') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/344519/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('342805') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/342805/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('343163') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/343163/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('343165') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/343165/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('337113') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/337113/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('337527') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/337527/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}


if (getUrl.indexOf('337302') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/337302/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('338639') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/338639/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('340489') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/340489/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('340123') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/340123/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('337443') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/337443/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}
if (getUrl.indexOf('337490') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/337490/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}
if (getUrl.indexOf('337491') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/337491/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}
if (getUrl.indexOf('337494') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/337494/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}


if (getUrl.indexOf('336375') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/336375/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('337938') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/337938/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('337407') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/337407/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('335972') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/335972/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('336656') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/336656/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('327965') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/327965/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('333150') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/333150/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('326654') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/326654/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('332768') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/332768/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('328099') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/328099/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('327664') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/327664/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('327123') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/327123/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('345620') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/345620/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('345331') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/345331/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('345265') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/345265/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('345395') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/345395/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('345070') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/345070/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('345728') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/345728/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('345787') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/345787/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('347177') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/347177/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('346963') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/346963/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('346873') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/346873/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('348701') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/348701/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}


if (getUrl.indexOf('343375') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/343375/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('347483') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/347483/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('347417') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/347417/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('347173') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/347173/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('346566') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/346566/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('344976') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/344976/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('344466') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/344466/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('343649') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/343649/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('341316') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/341316/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });

}

if (getUrl.indexOf('340244') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/340244/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('347960') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/347960/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}


if (getUrl.indexOf('348406') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/348406/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}


if (getUrl.indexOf('348632') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/348632/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}


if (getUrl.indexOf('348699') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/348699/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('348897') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/348897/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('348342') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/348342/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('352385') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/352385/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('352534') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/352534/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('352924') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/352924/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('354001') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/354001/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('353355') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/353355/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('354203') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/354203/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('355057') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/355057/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('354473') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/354473/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('354587') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/354587/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('354541') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/354541/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('343733') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/343733/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('343316') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/343316/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('344228') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/344228/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('355256') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/355256/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('354830') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/354830/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('354963') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/354963/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('354102') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/354102/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('354867') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/354867/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('357400') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/357400/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('359009') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/359009/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('359013') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/359013/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('357453') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/357453/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('352576') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/352576/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('352480') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/352480/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('349693') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/349693/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('360335') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/360335/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('346124') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/346124/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('361680') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/361680/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('361891') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/361891/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('362471') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/362471/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('361221') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/361221/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('362399') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/362399/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('358358') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/358358/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('358215') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/358215/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('358806') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/358806/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('362529') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/362529/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('362528') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/362528/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('362760') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/362760/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('6291') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/6291/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('363798') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/363798/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('281861') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/281861/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('239552') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/239552/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('270838') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/270838/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('364425') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/364425/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

if (getUrl.indexOf('364426') != -1) {
    $.ajax({
        type: 'POST',
        url: 'https://ad.zurnal24.si/count/364426/index.php',
        data: {},
        dataType:'text',
        success: function(data) {
          $('.article__views strong').html(data);
          $('.article__views').css('display', 'block');
        },

        error: function(request, status, error) {
            console.log(error);
        }
    });
}

// isArticle = $('body').hasClass('article');

// if (isArticle) {
    
//     $('.midas_widget').before('\
//             <div class="fold_article__related_articles cf">\
//                 <div class="main_label main_label--line"><strong>Ne spreglejte</strong></div>\
//                 <div class="main_tile__content">\
//                     <article class="card card--slovenija position-- card--11">\
//                         <div class="card__wrap">\
//                             <a class="card__link" href="https://www.zurnal24.si/uporabno/namen-gasilstva-ni-zgolj-resevanje-ampak-tudi-izobrazevanje-ljudi-348632" title="Namen gasilstva ni zgolj reševanje, ampak tudi izobraževanje ljudi" target="">\
//                                 <!-- blok sa slikom -->\
//                                 <div class="card__photo_wrap">\
//                                     <span class="card__photo">\
//                                         <figure class="card__figure">\
//                                             <picture data-alt="Namen gasilstva ni zgolj reševanje, ampak tudi izobraževanje ljudi" data-default-src="https://www.zurnal24.si/banners/2020/06/article_widget/p1.jpg">\
//                                                 <source srcset="https://www.zurnal24.si/banners/2020/06/article_widget/p1.jpg" data-size="120x120">\
//                                                 <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/p1.jpg" alt="Namen gasilstva ni zgolj reševanje, ampak tudi izobraževanje ljudi" data-size="120x120">\
//                                                 <noscript>\
//                                                     <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/p1.jpg" alt="Namen gasilstva ni zgolj reševanje, ampak tudi izobraževanje ljudi" />\
//                                                 </noscript>\
//                                             </picture>\
//                                         </figure>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa nadnaslovom, naslovom i podnaslovom -->\
//                                 <div class="card__data_wrap cf">\
//                                     <span class="card__data cf">\
//                                         <span class="card__overtitle_wrap">\
//                                             <span class="card__overtitle card__overtitle--background">Uporabno</span>\
//                                         </span>\
//                                         <h2 class="card__title">\
//                                             <span class="card__title_highlight">Namen gasilstva ni zgolj reševanje, ampak tudi izobraževanje ljudi</span>\
//                                         </h2>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa lead textom -->\
//                                 <div class="card__label">Promo</div>\
//                             </a>\
//                         </div>\
//                     </article>\
//                     <article class="card card--slovenija position-- card--11">\
//                         <div class="card__wrap">\
//                             <a class="card__link" href="https://www.zurnal24.si/avto/pozor-pred-dopusti-zelena-karta-s-1-julijem-ni-vec-zelena-karta-348911" title="Pozor pred dopusti: zelena karta s 1. julijem ni več zelena karta" target="">\
//                                 <!-- blok sa slikom -->\
//                                 <div class="card__photo_wrap">\
//                                     <span class="card__photo">\
//                                         <figure class="card__figure">\
//                                             <picture data-alt="Pozor pred dopusti: zelena karta s 1. julijem ni več zelena karta" data-default-src="https://www.zurnal24.si/banners/2020/06/article_widget/a1.jpg">\
//                                                 <source srcset="https://www.zurnal24.si/banners/2020/06/article_widget/a1.jpg" data-size="120x120">\
//                                                 <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/a1.jpg" alt="Pozor pred dopusti: zelena karta s 1. julijem ni več zelena karta" data-size="120x120">\
//                                                 <noscript>\
//                                                     <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/a1.jpg" alt="Pozor pred dopusti: zelena karta s 1. julijem ni več zelena karta" />\
//                                                 </noscript>\
//                                             </picture>\
//                                         </figure>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa nadnaslovom, naslovom i podnaslovom -->\
//                                 <div class="card__data_wrap cf">\
//                                     <span class="card__data cf">\
//                                         <span class="card__overtitle_wrap">\
//                                             <span class="card__overtitle card__overtitle--background">Avto</span>\
//                                         </span>\
//                                         <h2 class="card__title">\
//                                             <span class="card__title_highlight">Pozor pred dopusti: zelena karta s 1. julijem ni več zelena karta</span>\
//                                         </h2>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa lead textom -->\
//                                 <div class="card__label">preberi več…</div>\
//                             </a>\
//                         </div>\
//                     </article>\
//                     <article class="card card--slovenija position-- card--11">\
//                         <div class="card__wrap">\
//                             <a class="card__link" href="https://www.zurnal24.si/uporabno/nova-generacija-cedevite-prinasa-izboljsan-obcutek-uzivanja-v-priljubljeni-osvezitvi-347696" title="Nova generacija Cedevite prinaša izboljšan občutek uživanja v priljubljeni osvežitvi" target="">\
//                                 <!-- blok sa slikom -->\
//                                 <div class="card__photo_wrap">\
//                                     <span class="card__photo">\
//                                         <figure class="card__figure">\
//                                             <picture data-alt="Nova generacija Cedevite prinaša izboljšan občutek uživanja v priljubljeni osvežitvi" data-default-src="https://www.zurnal24.si/banners/2020/06/article_widget/p2.jpg">\
//                                                 <source srcset="https://www.zurnal24.si/banners/2020/06/article_widget/p2.jpg" data-size="120x120">\
//                                                 <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/p2.jpg" alt="Nova generacija Cedevite prinaša izboljšan občutek uživanja v priljubljeni osvežitvi" data-size="120x120">\
//                                                 <noscript>\
//                                                     <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/p2.jpg" alt="Nova generacija Cedevite prinaša izboljšan občutek uživanja v priljubljeni osvežitvi" />\
//                                                 </noscript>\
//                                             </picture>\
//                                         </figure>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa nadnaslovom, naslovom i podnaslovom -->\
//                                 <div class="card__data_wrap cf">\
//                                     <span class="card__data cf">\
//                                         <span class="card__overtitle_wrap">\
//                                             <span class="card__overtitle card__overtitle--background">Uporabno</span>\
//                                         </span>\
//                                         <h2 class="card__title">\
//                                             <span class="card__title_highlight">Nova generacija Cedevite prinaša izboljšan občutek uživanja v priljubljeni osvežitvi</span>\
//                                         </h2>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa lead textom -->\
//                                 <div class="card__label">Promo</div>\
//                             </a>\
//                         </div>\
//                     </article>\
//                     <article class="card card--slovenija position-- card--11">\
//                         <div class="card__wrap">\
//                             <a class="card__link" href="https://www.zurnal24.si/uporabno/ohladite-se-z-najbolj-vrocim-kavnim-hitom-tega-poletja-348345" title="Ohladite se z najbolj vročim kavnim hitom tega poletja" target="">\
//                                 <!-- blok sa slikom -->\
//                                 <div class="card__photo_wrap">\
//                                     <span class="card__photo">\
//                                         <figure class="card__figure">\
//                                             <picture data-alt="Ohladite se z najbolj vročim kavnim hitom tega poletja" data-default-src="https://www.zurnal24.si/banners/2020/06/article_widget/p3.jpg">\
//                                                 <source srcset="https://www.zurnal24.si/banners/2020/06/article_widget/p3.jpg" data-size="120x120">\
//                                                 <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/p3.jpg" alt="Ohladite se z najbolj vročim kavnim hitom tega poletja" data-size="120x120">\
//                                                 <noscript>\
//                                                     <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/p3.jpg" alt="Ohladite se z najbolj vročim kavnim hitom tega poletja" />\
//                                                 </noscript>\
//                                             </picture>\
//                                         </figure>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa nadnaslovom, naslovom i podnaslovom -->\
//                                 <div class="card__data_wrap cf">\
//                                     <span class="card__data cf">\
//                                         <span class="card__overtitle_wrap">\
//                                             <span class="card__overtitle card__overtitle--background">Uporabno</span>\
//                                         </span>\
//                                         <h2 class="card__title">\
//                                             <span class="card__title_highlight">Ohladite se z najbolj vročim kavnim hitom tega poletja</span>\
//                                         </h2>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa lead textom -->\
//                                 <div class="card__label">Promo</div>\
//                             </a>\
//                         </div>\
//                     </article>\
//                     <article class="card card--slovenija position-- card--11">\
//                         <div class="card__wrap">\
//                             <a class="card__link" href="https://www.zurnal24.si/sport/zadnje-besede-sampionke-ljubim-te-je-dejala-in-to-je-bilo-to-349199" title="Zadnje besede šampionke: Ljubim te, je dejala, in to je bilo to" target="">\
//                                 <!-- blok sa slikom -->\
//                                 <div class="card__photo_wrap">\
//                                     <span class="card__photo">\
//                                         <figure class="card__figure">\
//                                             <picture data-alt="Zadnje besede šampionke: Ljubim te, je dejala, in to je bilo to" data-default-src="https://www.zurnal24.si/banners/2020/06/article_widget/a2.jpg">\
//                                                 <source srcset="https://www.zurnal24.si/banners/2020/06/article_widget/a2.jpg" data-size="120x120">\
//                                                 <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/a2.jpg" alt="Zadnje besede šampionke: Ljubim te, je dejala, in to je bilo to" data-size="120x120">\
//                                                 <noscript>\
//                                                     <img class="card__img" src="https://www.zurnal24.si/banners/2020/06/article_widget/a2.jpg" alt="Zadnje besede šampionke: Ljubim te, je dejala, in to je bilo to" />\
//                                                 </noscript>\
//                                             </picture>\
//                                         </figure>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa nadnaslovom, naslovom i podnaslovom -->\
//                                 <div class="card__data_wrap cf">\
//                                     <span class="card__data cf">\
//                                         <span class="card__overtitle_wrap">\
//                                             <span class="card__overtitle card__overtitle--background">Šport</span>\
//                                         </span>\
//                                         <h2 class="card__title">\
//                                             <span class="card__title_highlight">Zadnje besede šampionke: "Ljubim te, je dejala, in to je bilo to"</span>\
//                                         </h2>\
//                                     </span>\
//                                 </div>\
//                                 <!-- blok sa lead textom -->\
//                                 <div class="card__label">preberi več…</div>\
//                             </a>\
//                         </div>\
//                     </article>\
//                 </div>\
//             </div>\
//             ');
// }


if (getUrl.indexOf('span-kolesarstvo') != -1) {

    $('.leadblock__wrap').on('click', function(){
        window.open("https://trgovina.span.si/sl/Kolesa/", "_blank");
    });

}

if (getUrl.indexOf('vizita-za-zivali/festival') != -1) {

    $('.card--05').before('\
        <div class="festival_foto_19" style="max-width: 950px; max-height: 610px; margin-bottom: 25px;">\
            <a href="https://www.zurnal24.si/vizita-za-zivali/festival/znan-datum-najvecjega-festivala-za-ljubitelje-zivali-pri-nas-341258" target="_blank">\
                <img src="https://www.zurnal24.si/banners/2019/04/festival/fb_cover.png" alt="Festival za ljubitelje živali 2020" style="width: 100%; height: auto;">\
            </a>\
        </div>\
        ');

}




if (getUrl == 'https://www.zurnal24.si/isci/') {
    $('.dars_scroller').hide();
    $('.body_inner_wrap').css('margin-top', '89px');
} else if (getUrl.indexOf('a1-mesec-druzine') != -1) {
    console.log('Special hide ads');
    //$('.dfp_banner--Leaderboard').eq(0).hide();
    $('.dfp_banner--Leaderboard').eq(1).hide();
    $('.dfp_banner--Leaderboard').eq(2).hide();
} else if (getUrl.indexOf('hibridne-zgodbe') != -1) {
    console.log('Special hide ads');
    $('.dfp_banner--Leaderboard').eq(0).hide();
    $('.dfp_banner--Leaderboard').eq(1).hide();
    $('.dfp_banner--Leaderboard').eq(2).hide();
} else if (getUrl.indexOf('glas-generacije') != -1) {
    console.log('Special change color');
    $('.card__overtitle_wrap .card__overtitle').css({
        'background' : '#35b2a2'
    });
}



// if (getUrl == 'https://www.zurnal24.si/gorenjska' || getUrl == 'https://www.zurnal24.si/gorenjska?meta_refresh=true') {
//     console.log('Special change color');
//     $('.fold_home_a').before('\
//     	<style>\
// 			.gor_test_container{\
// 				box-sizing: border-box;\
// 				position: relative;\
// 				height: auto;\
// 				padding: 20px;\
// 				margin-top: 30px;\
// 				background: #3c8b47;\
// 				font-family: "Roboto";\
// 				font-size: 26px;\
// 				line-height: 28px;\
// 				font-weight: 400;\
// 				color: #fff;\
// 				text-align: center;\
// 				margin-left: 15px;\
//     			margin-right: 15px;\
// 			}\
// 			@media screen and (max-width: 1024px){\
// 				.gor_test_container{\
// 					margin-left: 0px;\
// 					margin-right: 0px;\
// 				}\
// 			}\
// 		</style>\
// 		<div class="gor_test_container">To je testna spletna stran</div>\
//     	');
// }


// if (getUrl == 'https://www.zurnal24.si/popotnik' || getUrl == 'https://www.zurnal24.si/popotnik?meta_refresh=true') {

//     $('.position--A8').html('\
//         <div class="card__wrap">\
//             <a class="card__link" href="https://track.adform.net/C/?bn=32545784" title="Kjer se smučarski dan začne in konča pred hotelskimi vrati" target="_blank">\
//                 <!-- blok sa slikom -->\
//                 <div class="card__photo_wrap">\
//                     <span class="card__photo">\
//                         <figure class="card__figure">\
//                             <picture data-alt="Promo" data-default-src="https://www.zurnal24.si/banners/2019/10/avstrija/11big.jpg">\
//                                 <source srcset="https://www.zurnal24.si/banners/2019/10/avstrija/11big.jpg" media="(min-width: 1024px)" data-size="297x224">\
//                                 <source srcset="https://www.zurnal24.si/banners/2019/10/avstrija/11med.jpg" media="(min-width: 1024px)" data-size="222x148">\
//                                 <source srcset="https://www.zurnal24.si/banners/2019/10/avstrija/11small.jpg" data-size="120x120">\
//                                 <img class="card__img" src="https://www.zurnal24.si/banners/2019/10/avstrija/11small.jpg" alt="Promo" data-size="120x120">\
//                                 <noscript>\
//                                     <img class="card__img" src="https://www.zurnal24.si/banners/2019/10/avstrija/11big.jpg" alt="Promo" />\
//                                 </noscript>\
//                             </picture>\
//                         </figure>\
//                     </span>\
//                 </div>\
//                 <!-- blok sa nadnaslovom, naslovom i podnaslovom -->\
//                 <div class="card__data_wrap cf">\
//                     <span class="card__data cf"> \
//                         <span class="card__overtitle_wrap">\
//                             <span class="card__overtitle card__overtitle--background">Promo</span>\
//                         </span>  \
//                         <h2 class="card__title">\
//                             <span class="card__title_highlight">Kjer se smučarski dan začne in konča pred hotelskimi vrati</span>\
//                         </h2>\
//                     </span>\
//                 </div>\
//                 <!-- blok sa lead textom -->\
//             </a>\
//         </div>\
//         <img src="https://track.adform.net/adfserve/?bn=32545784;1x1inv=1;srctype=3;ord=[timestamp]" style="display: none;" border="0" width="1" height="1"/>\
//         ');

// }

// if (getUrl == 'https://www.zurnal24.si' || getUrl == 'https://www.zurnal24.si/' || getUrl == 'https://www.zurnal24.si/?meta_refresh=true') {

//     $('.position--G4').html('\
//         <div class="card__wrap">\
//             <a class="card__link" href="https://track.adform.net/C/?bn=40950007" title="Spominjaj se vseh lepih trenutkov – in sanjaj o novih. Prva počitniška regija v Zillertalu. Dober razlog, da se veselite prihodnosti" target="_blank">\
//             <!-- blok sa slikom -->\
//                 <div class="card__photo_wrap">\
//                     <span class="card__photo">\
//                         <figure class="card__figure">\
//                             <picture data-alt="promo" data-default-src="https://www.zurnal24.si/banners/2020/10/avstrija/03_big.jpg">\
//                                 <source srcset="https://www.zurnal24.si/banners/2020/10/avstrija/03_big.jpg" media="(min-width: 1024px)" data-size="297x167">\
//                                 <source srcset="https://www.zurnal24.si/banners/2020/10/avstrija/03_small.jpg" data-size="120x120">\
//                                 <img class="card__img" src="https://www.zurnal24.si/banners/2020/10/avstrija/03_small.jpg" alt="promo" data-size="120x120">\
//                                 <noscript>\
//                                     <img class="card__img" src="https://www.zurnal24.si/banners/2020/10/avstrija/03_big.jpg" alt="promo" />\
//                                 </noscript>\
//                             </picture>\
//                         </figure>\
//                     </span>\
//                 </div>\
//                 <!-- blok sa nadnaslovom, naslovom i podnaslovom -->\
//                 <div class="card__data_wrap cf">\
//                     <span class="card__data cf"> \
//                         <span class="card__overtitle_wrap">\
//                             <span style="background: transparent !important;" class="card__overtitle card__overtitle--background">PROMO</span>\
//                         </span>\
//                         <h2 class="card__title">\
//                             <span class="card__title_highlight">Spominjaj se vseh lepih trenutkov – in sanjaj o novih</span>\
//                         </h2>\
//                     </span>\
//                 </div>\
//                 <!-- blok sa lead textom -->\
//                 <div class="card__description_wrap">\
//                     <span class="card__description"><b>Prva počitniška regija v Zillertalu.</b> Dober razlog, da se veselite prihodnosti.</span>\
//                 </div>\
//                 <div style="padding-top: 10px; font: normal 700 100% Rubik, sans-serif; font-size: 12px; font-size: 1.2rem; letter-spacing: 0.1em; color: #a3a3a3; text-transform: uppercase;">preberi več…</div>\
//             </a>\
//         </div>\
//         <img src="https://track.adform.net/adfserve/?bn=40950007;1x1inv=1;srctype=3;ord=[timestamp]" border="0" style="width: 1px !important; height: 1px !important;" width="1" height="1"/>\
//         ');
// }

// if (getUrl == 'https://www.zurnal24.si' || getUrl == 'https://www.zurnal24.si/' || getUrl == 'https://www.zurnal24.si/?meta_refresh=true') {

//     $( ".article_list__link:eq( 0 )" ).attr("href", "https://med.over.net/clanek/za-duso-in-druzbo-kako-je-korona-spremenila-uzivanje-v-kavi/");
//     $( ".article_list__link:eq( 0 ) .article_list__title" ).html('Za dušo in družbo – kako je korona spremenila uživanje v kavi');

// }

if (getUrl == 'https://www.zurnal24.si/pod-streho' || getUrl == 'https://www.zurnal24.si/pod-streho/' || getUrl == 'https://www.zurnal24.si/pod-streho?meta_refresh=true') {
    console.log('hwuejriowejriowej');
    $('.position--B1 .card__wrap .card__link .card__photo_wrap').append('<img src="https://ad.zurnal24.si/eplus.jpg" style="position: absolute; top: 0; left: 0; width: 150px;">');

}

if (getUrl == 'https://www.zurnal24.si/pod-streho' || getUrl == 'https://www.zurnal24.si/pod-streho/' || getUrl == 'https://www.zurnal24.si/pod-streho?meta_refresh=true') {
    $('.main_label--line').eq(2).css({
        'display' : 'none'
    });
    $('.main_label--line').eq(4).css({
        'display' : 'none'
    });
}

if (getUrl.indexOf('354417') != -1) {

    $('.article__figure').append('<img src="https://ad.zurnal24.si/nlblogo.jpg" style="position: absolute; top: 10px; right: 10px; width: 110px;">');

}

if (getUrl == 'https://www.zurnal24.si' || getUrl == 'https://www.zurnal24.si/' || getUrl == 'https://www.zurnal24.si/?meta_refresh=true') {

    // if ($('title')[0].innerText.indexOf('Gorenjska') == -1) {

    //     var wwidth = $(window).width();

    //     if (wwidth > 1370) {

    //         $('.position--G2 .card__wrap .card__link .card__photo_wrap').append('<a href="https://www.zurnal24.si/mesec-pametnih-obrokov" target="_blank"><img src="https://ad.zurnal24.si/eurospin.jpg" style="position: absolute; top: 5px; right: 5px; width: 80px;"><div style="position: absolute; right: 5px; top: 100px; font-weight: bold; font-size: 14px; color: #fff; text-shadow: 2px 2px 0px #000; width: 80px; text-align: center;">MESEC PAMETNIH OBROKOV</div><div style="position: absolute; right: 13px; top: 170px; padding: 5px 15px; font-weight: bold; font-size: 12px; color: #fff; text-align: center; background: #0065b3">VEČ ></div></a>');

    //     } else if (wwidth < 1370 && wwidth > 1024) {

    //         $('.position--G2 .card__wrap .card__link .card__photo_wrap').append('<a href="https://www.zurnal24.si/mesec-pametnih-obrokov" target="_blank"><img src="https://ad.zurnal24.si/eurospin.jpg" style="position: absolute; top: 5px; left: 5px; width: 70px;"><div style="position: absolute; left: 0px; top: 90px; font-weight: bold; font-size: 12px; color: #fff; text-shadow: 2px 2px 0px #000; width: 80px; text-align: center;">MESEC PAMETNIH OBROKOV</div><div style="position: absolute; left: 8px; top: 150px; padding: 5px 15px; font-weight: bold; font-size: 12px; color: #fff; text-align: center; background: #0065b3">VEČ ></div></a>');

    //     } else if (wwidth < 1024) {

    //         $('.position--G2 .card__wrap .card__link .card__photo_wrap').append('<a href="https://www.zurnal24.si/mesec-pametnih-obrokov" target="_blank"><img src="https://ad.zurnal24.si/eurospin.jpg" style="position: absolute; top: 5px; right: 70px; width: 45px;"><div style="position: absolute; right: -15px; top: 5px; font-weight: bold; font-size: 11px; color: #fff; text-shadow: 2px 2px 0px #000; width: 80px; text-align: left;">MESEC PAMETNIH OBROKOV</div></a><div style="position: absolute; right: 25px; top: 85px; padding: 5px 15px; font-weight: bold; font-size: 12px; color: #fff; text-align: center; background: #0065b3">VEČ ></div></a>');

    //     }
    
    // }


    //Mesec april - special


    $('.home__content_exchange').after('\
            <link rel="stylesheet" href="https://ad.zurnal24.si/posveceno-mesto/mesecapril/style.css">\
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">\
            <div class="spec_modul_posveceno">\
                <a href="https://www.zurnal24.si/glas-generacije" target="_blank">\
                    <div class="spec_modul_left">\
                        <div class="spec_modul_text_big">April:<br><strong><span style="font-weight: 800;">mesec za vrtove, terase in balkone</span></strong> </div>\
                        <div class="spec_modul_logo">\
                            <img  src="https://ad.zurnal24.si/posveceno-mesto/mesecapril/logo.png" alt="">\
                        </div>\
                    </div>\
                </a>\
                <div class="spec_modul_right">\
                    <a href="https://www.zurnal24.si/zdravje/prehrana/je-paradiznik-sadje-ali-zelenjava-270838" target="_blank">\
                        <div class="spec_modul_article">\
                            <img class="spec_modul_article_img" src="https://ad.zurnal24.si/posveceno-mesto/mesecapril/a1.jpeg" alt="">\
                            <div class="spec_modul_article_title">Je paradižnik sadje ali zelenjava?</div>\
                        </div>\
                    </a>\
                    <hr class="spec_modul_hr_line">\
                    <a href="https://www.zurnal24.si/zdravje/eko-koticek/vrticek-disavnic-na-okenski-polici-364425" target="_blank">\
                        <div class="spec_modul_article">\
                            <img class="spec_modul_article_img" src="https://ad.zurnal24.si/posveceno-mesto/mesecapril/a2.jpg" alt="">\
                            <div class="spec_modul_article_title">Vrtiček dišavnic na okenski polici</div>\
                        </div>\
                    </a>\
                    <hr class="spec_modul_hr_line">\
                    <a href="https://www.zurnal24.si/zdravje/otrok/ne-jezite-se-ce-pohodijo-kaksno-zelenjavo-364426" target="_blank">\
                        <div class="spec_modul_article">\
                            <img class="spec_modul_article_img" src="https://ad.zurnal24.si/posveceno-mesto/mesecapril/a3.jpeg" alt="">\
                            <div class="spec_modul_article_title">Ne jezite se, če pohodijo kakšno zelenjavo</div>\
                        </div>\
                    </a>\
                </div>\
            </div>\
        ');


}


// if ($.cookie('merc_junij') == null && (getUrl == 'https://www.zurnal24.si/slovenija' || getUrl == 'https://www.zurnal24.si/slovenija?meta_refresh=true')) {
//     console.log('Mercator opendoor init');
//     var expDate = new Date();
//     //expDate.setTime(expDate.getTime() + (3 * 60 * 60 * 1000)); // add 15 minutes
//     document.write('<scr'+'ipt src="https://sigde.adocean.pl/_'+(new Date()).getTime()+'/ad.js?id=y.Dx6u3EDG6rQ3JwFw.Ne8GX7zenOc9YU60U4_HtvDv.N7/nc=0/redir=" language="javascript"></scr'+'ipt>');
//     $.cookie('merc_junij', '1', {expires: 1});

// } else if ($.cookie('merc_junij') != null) {

//     console.log('Open door: cookie already set, freqency cap 1. Ad display stopped.');

// }


