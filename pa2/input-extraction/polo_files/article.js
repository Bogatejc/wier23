function storeArticle() {

    $('.js_storeArticle').click(function (e) {

        e.preventDefault();

        var button    = $(this);
        var action    = button.data('action');
        var url       = button.attr('href');
        var deleteUrl = button.data('delete-url');

        if (action === 'store'){

            $.ajax({
                type: "POST",
                url: url,
                data: {
                    'app_model': button.data('app'),
                    'pk': button.data('pk'),
                    'csrfmiddlewaretoken': button.data('csrf')
                },

                success: function(data) {
                    button.data('action', 'remove');
                    button.html('Remove article');
                },

                error: function(data) {
                    // todo: standardni alert
                }

            });

        } else if (action == 'remove'){

            $.ajax({
                type: "DELETE",
                url: deleteUrl,

                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-CSRFToken", button.data('csrf'));
                },

                success: function(data) {
                    button.data('action', 'store');
                    button.text('Store article');
                },

                error: function(data) {
                    // todo: standardni alert
                }

            });
        }

    });
};



function sendCorrection() {

    $('.js_submitCorrection').click(function (e) {

        e.preventDefault();

        var msg  = $('.js_modalMsg');
        var form = $(this).parent('form');
        var url  = form.attr('action');
        var data = form.serializeArray();

        $.ajax({
            type: "POST",
            url: url,
            data: data,

            success: function(data) {
                msg.html('<div class="modal__message modal__message--success">Hvala.</span>');

                setTimeout(function(){
                    $('.js_modalClose').trigger('click');
                }, 2000);
            },

            error: function(data) {
                msg.html('<div class="modal__message modal__message--error">Dogodila se greška.</span>');
            }
        });

    });

};

sendCorrection();
storeArticle();
$(function () {

    // manipulacija url parametrima, miče # iz urla i updatea parametre, ako parametar ne postoji stvori ga
    function updateQueryStringParameter(uri, key, value) {

        if ( uri.indexOf('#') ) { uri=uri.split('#')[0]; }

        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    }


    function checkHash() {
        var hash = window.location.hash;
        if(hash) {

            if ( !$(hash).length ) { return; }

            $('html,body').animate({

                scrollTop: $(hash).offset().top

            }, 300, 'swing');
        }
    }

    checkHash();


    // fake select
    function initSelect() {

        $('.js_selectWrap').each(function() {

            var el = $(this),
                $btn = el.find('.fake__form_select_btn'),
                $list = el.find('.fake__form_select_list'),
                $item = el.find('.fake__form_select_item'),
                select = el.find('.fake__form_select_box'),
                selected = $('.js_selectedSection');

            el.addClass('js_selectWrapFN');

            $btn.on('click', function() {
                $list.addClass('is_visible');
            });

            $list.on('mouseleave', function() {
                $list.removeClass('is_visible');
            });

            $item.on('click', function(e){

                var _item_text  = $(this).html(),
                    _item_value = $(this).data('value'),
                    option = select.find('option[value="' + _item_value + '"]');

                $list.removeClass('is_visible');
                $btn.html(_item_text);
                select.val(_item_value);

                document.location.href = updateQueryStringParameter(document.location.href, 'order', _item_value);

            });

            if ( selected.html() ) {

                var option = select.find('option[value="' + selected.html() + '"]');
                $btn.html(option.html());
            }

        });
    }


    // commentLocation
    var currentLocation = window.location.pathname,
        commentLocation = 'Stranica komentara';

    if ( currentLocation.indexOf('/komentari') === -1 ){
        commentLocation = 'Članak';
    }


    // plugin za autoresize textarea - radi na svima, staviti atribut data-autoresize
    function initTextareaAutoResize () {

        $.each($('textarea[data-autoresize]'), function() {

            var $textarea =$(this);

            // maxlength parametar na textarea
            var limit = $(this).attr('maxlength');

            var $counter = $textarea
                            .closest('.onecomment')
                            .find('.js_textareaCount > span');

            var offset = this.offsetHeight - this.clientHeight;


            // autoresize bez fake elementa
            function resizeTextarea (el) {

                var $el = $(el);

                $el.css('height', 'auto')
                   .css('height', el.scrollHeight + offset);
            }

            function countChars (el) {
                $counter.parent('.js_textareaCount').addClass('is_visible');
                $counter.text(
                    (limit - $(el).val().length)
                );
            }


            $textarea.on('keyup input', function( e) {

                resizeTextarea(this);
                countChars(this);

                if (e.ctrlKey && e.keyCode == 13) {
                    $textarea
                        .closest('.onecomment__form')
                        .find('.js_sendNewComment, .js_sendReplyComment')
                        .trigger('click');
                }
            });

            $textarea
                .removeAttr('data-autoresize')
                .addClass('js_initTextareaAutoResize');
       });
    }




    function toggleSubcomment( $toggleBtn, e ) {
        e.preventDefault();

        // otvaranje commentboxa zajedno sa odgovorima
        if ( !$toggleBtn.siblings('.js_showReplyComment').hasClass('has_commentWindow') ) {

            $toggleBtn
                .siblings('.js_showReplyComment')
                .trigger('click');
        }

        $subComment = $toggleBtn
                        .closest('.thread__item')
                        .find('.thread__sublist');

        $toggleBtn.toggleClass('is_active');

        if( $toggleBtn.hasClass('is_active') ) {

            $subComment.addClass('is_visible');

        } else {

            $subComment.removeClass('is_visible');

            // zatvaranje commentboxa
            $toggleBtn
                .closest('.thread__item')
                .find('.js_cancelComment')
                .trigger('click');
        }

        dataLayer.push({
            'event' : 'GAEvent',
            'eventCategory' : 'Komentari',
            'eventAction' : 'Prikaži odgovore',
            'eventLabel' : commentLocation,
            'eventValue' : undefined
        });
    }






    function showMoreComment( $toggleBtn, e ) {
        e.preventDefault();

        var $hiddenContent = $toggleBtn
            .closest('.onecomment__content, .onereply__content, .commbox__content')
            .find('.js_onecommentContentHidden');

        $hiddenContent
            .removeClass('onecomment__content--hidden onereply__content--hidden commbox__post_content--hidden ');

        $toggleBtn.off().hide()
            .siblings('.js_onecommentVisible').find('.commbox__hellip').hide();

        dataLayer.push({
            'event' : 'GAEvent',
            'eventCategory' : 'Komentari',
            'eventAction' : 'Prikaži još - tekst link',
            'eventLabel' : commentLocation,
            'eventValue' : undefined
        });
    }



    function initReplyComments() {


        var $showReplyComments  = $('.js_showReplyComment');

        $showReplyComments.each(function(){

            var $showReplyComment = $(this);

            $showReplyComment.on ('click', function( e ){

                showReplyComments( $(this), e );
            });
        });
    }






    function voteForComment( $toggleBtn, e ) {
        e.preventDefault();

        if( $toggleBtn.hasClass('btn--invert') ){ return; }

        var $ratingBox = $toggleBtn.closest('.onecomment__rating, .commbox__rating');

        $.ajax({

            type: "POST",
            url: $toggleBtn.data('api'),

            success: function(data) {

                $ratingBox
                    .find('.js_like, .js_dislike')
                    .removeClass('btn--invert');

                $toggleBtn.addClass('btn--invert');

                $ratingBox.find('.js_like .vote__value').text( data.plus );
                $ratingBox.find('.js_dislike .vote__value').text( data.minus );
                $ratingBox.find('.js_line').css({ 'width': data.percentage + '%' });

                dataLayer.push({
                    'event' : 'GAEvent',
                    'eventCategory' : 'Komentari',
                    'eventAction' : 'Dobar / Loš',
                    'eventLabel' : commentLocation,
                    'eventValue' : undefined
                });
            },

            statusCode: {

                201: function() {
                    // console.log('Uspješno');
                },

                403: function() {
                    // console.log('Korisnik nije logiran');
                },

                408: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                },

                500: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                },

                502: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                }
            }
        });
    }






    function profileFollowActions( $toggleBtn, e ) {
        e.preventDefault();
        $.ajax({

            type: "POST",
            url: $toggleBtn.data('api'),

            success: function(data) {

                if( $toggleBtn.hasClass('js_profileUnfollow') ){

                    $toggleBtn
                        .removeClass('is_visible')
                        .siblings('.js_profileFollow')
                            .addClass('is_visible');

                } else {

                    $toggleBtn
                        .removeClass('is_visible')
                        .siblings('.js_profileUnfollow')
                            .addClass('is_visible');
                }
            },

            statusCode: {

                201: function() {
                    // console.log('Uspješno');
                },

                403: function() {
                    // console.log('Korisnik nije logiran');
                },

                408: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                },

                500: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                },

                502: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                }
            }
        });
    }






    function flagComment( $toggleBtn, e ) {
        e.preventDefault();

        if( $toggleBtn.hasClass('btn--invert') ){ return; }

        $.ajax({

            type: "POST",
            url: $toggleBtn.data('api'),

            success: function(data) {

                $toggleBtn.addClass('btn--invert');

                dataLayer.push({
                    'event' : 'GAEvent',
                    'eventCategory' : 'Komentari',
                    'eventAction' : 'Flagiranje',
                    'eventLabel' : commentLocation,
                    'eventValue' : undefined
                });
            },

            statusCode: {

                201: function() {
                    // console.log('Uspješno');
                },

                403: function() {
                    // console.log('Korisnik nije logiran');
                },

                408: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                },

                500: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                },

                502: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                }
            }
        });
    }

    function deleteComment( $toggleBtn, e ) {
        e.preventDefault();

        if( $toggleBtn.hasClass('btn--invert') ){ return; }

        $.ajax({

            type: "POST",
            url: $toggleBtn.data('api'),

            success: function(data) {

                $toggleBtn.addClass('btn--invert');

                $toggleBtn
                    .closest('.thread__item')
                    .addClass('thread__item--deleted')
                    .fadeIn() // ubačena animacija koja ne radi ništa jer delay radi samo nakone neke animacija
                    .delay(1500)
                    .slideUp( function(){
                        $(this).remove();
                    });

                dataLayer.push({
                    'event' : 'GAEvent',
                    'eventCategory' : 'Komentari',
                    'eventAction' : 'Flagiranje',
                    'eventLabel' : commentLocation,
                    'eventValue' : undefined
                });
            },

            statusCode: {

                201: function() {
                    // console.log('Uspješno');
                },

                403: function() {
                    // console.log('Korisnik nije logiran');
                },

                408: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                },

                500: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                },

                502: function() {
                    // console.log('Problem sa serverom - Pokušajte kasnije');
                }
            }
        });
    }




    function newComment( $toggleBtn, e ) {
        e.preventDefault();

        var threadID = $toggleBtn.data('thread-id'),
            postID = $toggleBtn.data('post-id'),
            commentObject = $toggleBtn.data('comment-object');

        // tekst poruke koju šaljemo
        var $commentText = $toggleBtn
                            .closest('.onecomment__form')
                            .find('.js_commentText');

        var headPostID = $toggleBtn
                            .closest('.js_oneCommentReply')
                            .siblings('.js_oneComment')
                            .attr('id');

        var ajaxPath = $('#' + headPostID).data('thread-url');
        var newPath = '';

            if( $commentText.val().length === 0 ) { return; }

            $toggleBtn
                .removeClass('btn--r')
                .addClass('btn--disabled')
                .css('pointer-events', 'none');

            var commentObj = {
                'content': $commentText.val(),
                'comment_object': commentObject
            };

            if (threadID) {
                commentObj.thread_id = threadID;
            }

            if (postID) {
                commentObj.post_id = postID;
            }

            $.ajax({

                type: "POST",
                url: $toggleBtn.data('api'),
                data: commentObj,

                success: function(data) {

                    $commentText.val('');

                var txtMessage = data.message,
                    newPath = data.url;

                        if( ajaxPath ){ // imaju samo odgovori na komentar pa je ovo odgovor

                            if( !$('#' + headPostID).length ) { return; }

                            $('#' + headPostID)
                                .closest('.thread__item')
                                .load( ajaxPath, function() {

                                    // eventi za nove ajax komentare
                                    initComments ();
                                    $('#' + headPostID)
                                        .closest('.thread__item')
                                        .find('.js_showReplyComment ')
                                        .trigger('click');

                                    if( $('body').hasClass('post_view') ) {
                                        $('.post_view .js_oneCommentReply').show();
                                    }

                                });

                        } else { // a ovo je novi komentar

                            setTimeout(function () {

                                if( newPath ) {
                                    // console.log(newPath);
                                    window.location.href = newPath;
                                } else {
                                    location.reload();
                                }

                                window.onhashchange = function() {
                                    location.reload();
                                };

                            }, 600);
                        }
                },

                error: function ( jqXHR, textStatus, errorThrown ) {
                    $toggleBtn
                        .removeClass('btn--disabled')
                        .addClass('btn--r')
                        .css('pointer-events', 'auto');

                    var $toaster = $('.js_toaster');
                        $toaster.addClass('is_open');
                        $toaster.find('.js_toasterText').text( jqXHR.responseJSON.message ) ;

                        setTimeout(function(){
                            $toaster.removeClass('is_open');
                        }, 3000);

                        $('.js_closeToaster').on('click', function () {
                            $toaster.removeClass('is_open');
                        });
                },

                statusCode: {

                    201: function() {
                        // console.log('Uspješno');
                    },
                    403: function() {
                        // console.log('Korisnik nije logiran');
                    },
                    408: function() {
                        // console.log('Problem sa serverom - Pokušajte kasnije');
                    },
                    429: function() {

                    },
                    500: function() {
                        // console.log('Problem sa serverom - Pokušajte kasnije');
                    },
                    502: function() {
                        // console.log('Problem sa serverom - Pokušajte kasnije');
                    }
                }
            });

    }



    function showReplyComments( $toggleBtn, e ) {
        e.preventDefault();

        if ( $toggleBtn.hasClass('has_commentWindow') ) {

            $('html,body').animate({

                scrollTop: ($toggleBtn.closest('.thread__item').find('.js_oneCommentReply').offset().top - $( window ).height() / 2)

            }, 300, 'swing');

            return;
        }

        $('.js_cancelComment').trigger('click'); // očisti prozor za komentiranje

        var threadID    = $toggleBtn.data('thread-id'),
            postID      = $toggleBtn.data('post-id'),
            apiURL      = $toggleBtn.data('comment-object');

        var $commentWindow = $('.js_newComment').clone(); //  markup za novi kommentbox

        // kloniranje i modificiranje donjeg kommentboxa
        $commentWindow
            .removeClass('js_newComment')
            .addClass('js_oneCommentReply')
            .css({ 'display': 'none' });


        // modificiranje gumba za odgovor na komentar
        $commentWindow
            .find('.js_sendNewComment')
                .removeClass('js_sendNewComment')
                .addClass('js_sendReplyComment')
                .attr({
                  'data-thread-id': threadID,
                  'data-post-id': postID,
                  'data-api': apiURL,
                })
                .text('Odgovori');

        // dodavanje autoresize atributa na textarea
        $commentWindow
            .find('.js_commentText')
                .attr({
                    'data-autoresize': '',
                    'style': ''
                });

        // ukoliko kopirana forma ima vidljiv counter sakrijemo ga
        $commentWindow
            .find('.js_textareaCount')
                .removeClass('is_visible');


        $toggleBtn
            .addClass('has_commentWindow')
            .closest('.thread__item')
                .append( $commentWindow );


        $commentWindow.slideDown( function () {

            initTextareaAutoResize();
        });


        // dodavanje evenata
        var $replyComments = $commentWindow.find('.js_sendReplyComment');
        var $cancelComments = $commentWindow.find('.js_cancelComment');


        $replyComments.on ('click', function( e ){

            newComment( $(this), e );
        });


        $cancelComments.on ('click', function( e ){
            e.preventDefault();

            $toggleBtn.removeClass('has_commentWindow');
            $(this)
                .closest('.js_oneCommentReply')
                .slideUp( function(){

                    $(this).remove();
                });
        });
    }



    function bindEvents ( $oneComment ) {

    // events for one comment
    // $oneComment = $('.js_oneComment');

    if( $oneComment.hasClass('js_bindEvents') ) { return; }
        $oneComment.addClass('js_bindEvents');

    var $likeComment         = $oneComment.find('.js_like'),
        $dislikeComment      = $oneComment.find('.js_dislike'),

        $profileFollow       = $oneComment.find('.js_profileFollow'),
        $profileUnfollow     = $oneComment.find('.js_profileUnfollow'),

        $flagComment         = $oneComment.find('.js_flagComment'),
        $deleteComment       = $oneComment.find('.js_deleteComment'),
        $showMoreComment     = $oneComment.find('.js_showMoreComment'),
        $toggleSubcomment    = $oneComment.find('.js_toggleSubcomment');




        $likeComment.on      ('click', function( e ){ voteForComment       ( $(this), e ); });
        $dislikeComment.on   ('click', function( e ){ voteForComment       ( $(this), e ); });

        $profileFollow.on    ('click', function( e ){ profileFollowActions ( $(this), e ); });
        $profileUnfollow.on  ('click', function( e ){ profileFollowActions ( $(this), e ); });

        $flagComment.on      ('click', function( e ){ flagComment          ( $(this), e ); });
        $deleteComment.on    ('click', function( e ){ deleteComment        ( $(this), e ); });
        $showMoreComment.on  ('click', function( e ){ showMoreComment      ( $(this), e ); });
        $toggleSubcomment.on ('click', function( e ){ toggleSubcomment     ( $(this), e ); });

    }



    function initComments() {

        initReplyComments();

        var $allComments            = $('.js_oneComment'),
            $newComment             = $('.js_sendNewComment');
            $cancelComment          = $('.js_cancelComment');
            $toggleAllSubcomment    = $('.js_toggleAllSubcomment');


        if ( !$newComment.hasClass('js_sendNewCommentInit') ) {
            $newComment.addClass('js_sendNewCommentInit');
            $newComment.on ('click', function( e ){ newComment( $(this), e ); });
        }

        $cancelComment.on ('click', function( e ){
            e.preventDefault();

            $(this)
                .closest('.onecomment__content')
                .find('.js_commentText')
                .val('');
        });


        $toggleAllSubcomment.on ('click', function( e ){
            e.preventDefault();

            $('.js_toggleSubcomment').trigger('click');

            dataLayer.push({
                'event' : 'GAEvent',
                'eventCategory' : 'Komentari',
                'eventAction' : 'Prikaži sve odgovore',
                'eventLabel' : commentLocation,
                'eventValue' : undefined
            });

        });

        $allComments.each(function(){

        var $oneComment = $(this);
            bindEvents( $oneComment );

        });
    }



    initComments ();
    initSelect();
    initTextareaAutoResize();
});

function initArticleCorrection() {

    $('.js_modalOpen').magnificPopup({
        type:'inline',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
}


function setModalClose() {

    $('.js_modalClose').on('click', function(evt) {
        evt.preventDefault();

        var magnificPopup = $.magnificPopup.instance;
        magnificPopup.close();

    });
}


setModalClose();
initArticleCorrection();
$(function() {

    //jshint multistr:true





    /* IN ARTICLE PREROLL
    *******************************************************/
    $.fn.inView = function(){

        var $article = $('.detail_content');
        var portion = 4; // parseInt( $article.data('videoautoplay_p'));

        var win = $(window);
        var headerOffset = 250;
        obj = $(this);

        // detekcije jel u drugoj trećini ekrana
        var scrollPosition = win.scrollTop() + ( win.height() / portion ) + headerOffset; // pomak za trećinu + header
        var visibleArea = win.scrollTop() + ( win.height() / portion * 2 ) + headerOffset; // gornja trećina ekrana
        var objEndPos = obj.offset().top + obj.outerHeight();

        return(visibleArea >= objEndPos && scrollPosition <= objEndPos ? true : false);
    };



    var setVimeo = function(objID, file_url ){

        f_width = '100%';
        f_height = '100%';

        // http://vimeo.com/77474520
        var vimeoMovieID = file_url.substr( file_url.lastIndexOf('/') + 1 );
        if( vimeoMovieID.indexOf('id=') !== -1 ) {
            vimeoMovieID = file_url.substr( file_url.lastIndexOf('clip_id=') + 8 );
        }

        var vimeoInner = $('<iframe src="https://player.vimeo.com/video/' + vimeoMovieID + '?color=00adef&portrait=0&badge=0"\
        width="' + f_width + '" height="' + f_height + '" frameborder="0"\
        webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

        var vimeoHolder = $('#' + objID);

        var paddTop = 30;
        if( vimeoHolder.hasClass('inline_jwplayer')){
            paddTop = 0;
        }

        vimeoHolder.css({
            'width': f_width,
            'height': f_height,
            'padding-top': paddTop
        }).append( vimeoInner );
    };






    var setYouTube = function( objID, file_url, autoplay ){  // 0 - false

        if (autoplay === undefined) {
              autoplay = 0;
        }

        if ( autoplay === true) {
              autoplay = 1;
        }

        var f_width  = '100%',
            f_height = '100%';

        // https://www.youtube.com/watch?v=uIf9GdCzY_Y
        var ytMovieID = file_url.split('?v=')[1];

        if( !ytMovieID ) {

            // http://www.youtube.com/v/uIf9GdCzY_Y
            ytMovieID = file_url.split('/v/')[1];

        }
        // http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com

        var ytInner = $('<iframe type="text/html" width="' + f_width + '" height="' + f_height + '"\
          src="https://www.youtube.com/embed/' + ytMovieID + '?autoplay=' + autoplay + '&origin=https://zurnal24.si"\
          frameborder="0" style="position: absolute;" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>');

        var ytHolder = $('#' + objID);

        var paddTop = 0;
        if( ytHolder.hasClass('inline_jwplayer')){
            paddTop = 0;
        }

        ytHolder
            .html('')
            .css({
                'display': 'block',
                'position': 'relative',
                'height': '0',
                'width': f_width,
                'padding-top': paddTop,
                'padding-bottom': '56.25%',
                'margin-bottom': '20px' // malo razmaka ispod playera
            })
            .append( ytInner );
    };





    var setJWplayer = function(objID, file_url, poster_url, autoplay){

        jwplayer.key="g1st/18c6koHgHREMSYddDH3sd3cb7eWu8V+4Q==";

        var prerollTag = '';
        var aspectRatio = "16:9";

        if (objID == "video") {
            aspectRatio = "16:9"; // samo za specijal box
            prerollTag = "";
        }

        if ( $('body').data('bodyextrainfo', 'no_preroll') ) {
            prerollTag = "";
            // console.log('no');
        }

        jwplayer( objID ).setup({
            width: '100%',
            file: file_url,
            image: poster_url,
            aspectratio: aspectRatio,
            // primary: 'flash',
            skin: 'beelden',  // beelden, bekle, five, glow, modieus, roundster, six, stormtrooper, vapor
            autostart: autoplay,
            ga: {},
            advertising: {
                client: 'vast',
                tag: prerollTag,
                admessage: 'Nastavak videa za XX sekundi.',
                skipoffset: '10',
                skipmessage: 'Skip in xx s',
                skiptext: 'Skip'
            }
        });

        if( autoplay ) {
            setTimeout(function(){
                jwplayer( objID ).play( true );
            }, 300);
        }

        jwplayer().onPlay( function(event){
            // dataLayer.push({
            //     'event' : 'GAEvent',
            //     'eventCategory' : 'JW Player Video',
            //     'eventAction' : 'Video Plays - API',
            //     'eventLabel' : undefined,
            //     'eventValue' : undefined
            // });
        });

        jwplayer().onComplete( function(event){
            // dataLayer.push({
            //     'event' : 'GAEvent',
            //     'eventCategory' : 'JW Player Video',
            //     'eventAction' : 'Video Completes - API',
            //     'eventLabel' : undefined,
            //     'eventValue' : undefined
            // });
        });
    };





    var getVideoType = function ( file_url ){

        var type = '';

        if( file_url.indexOf('vimeo') != -1 ){
            return 'vimeo';
        }

        if( file_url.indexOf('youtube') != -1 ){
            return 'youtube';
        }

        if( file_url.indexOf('youtu.be') != -1 ){
            return 'youtube';
        }

        return 'CDN';
    };




    function articleVideoPlayer( $el, event, autoplay ) {

        if( event !== '' ){ event.preventDefault(); }
        if( autoplay === undefined ){ autoplay = false; }

        var $singlePlayer = $el;

        // offset top makes error with offset()
        if ( !$singlePlayer.length ) { return; }

        var videoURL    = $singlePlayer.data('href'),
            videoPoster = $singlePlayer.data('poster'),
            videoID     = $singlePlayer.attr('id'),
            videoType   = getVideoType( videoURL );

        // dataLayer.push({
        //     'event' : 'GAEvent',
        //     'eventCategory' : 'Video',
        //     'eventAction' : videoType,
        //     'eventLabel' : videoURL,
        //     'eventValue' : undefined
        // },{
        //     'event' : 'GAEvent',
        //     'eventCategory' : 'Video',
        //     'eventAction' : 'Članak',
        //     'eventLabel' : window.location.pathname,
        //     'eventValue' : undefined
        // });

        switch ( videoType ) {

            case 'vimeo':
                setVimeo ( videoID, videoURL, autoplay );
                break;

            case 'youtube':
                setYouTube ( videoID, videoURL, autoplay );
                break;

            default:
                setJWplayer ( videoID, videoURL, videoPoster, autoplay );
                break;
        }
    }


    // TODO: vidjeti kako je najbolje kontrolirati ponašanje autoplaya
    function inlineAutoplayInit( $playerSlot, playerID ) {

        var $article = $('#article_content .main_gutter');
        if ( $article.data('videoautoplay') === false ) { return; }

        var sensitivity = 100; // parseInt( $article.data('videoautoplay_s'));

        var playerOffset = $( '#' + playerID ).offset(),
            playerInstance = jwplayer( $playerSlot.attr('id') ),
            init = true;
            var userInteracted = false;

        $playerSlot.addClass('autoplay_init');
        playerInstance.setVolume( 33 );  // ******  mora biti isti kao getVolume


        playerInstance.onSeek(function(){
            userInteracted = true;
            // console.log('onSeek', userInteracted);
        });


        playerInstance.onVolume(function(){
            userInteracted = true;
            // console.log('onVolume', userInteracted);
        });


        playerInstance.onDisplayClick(function(){
            userInteracted = true;
            // console.log('onDisplayClick', userInteracted);
        });




        $( window ).scroll( $.throttle(500, checkTopPosition) );

        // showing when share buttons disappeare
        function checkTopPosition() {

            // console.log(userInteracted);

            // korisnik je pojačavao/smanjivao video video
            if ( !userInteracted ){

                // jesmo li došli do sredine
                if ( $( '#' + playerID ).inView() ){

                    init = false;
                    playerInstance.play( true );

                } else {

                    playerInstance.pause( true );

                }
            }
        }
    }




    function inlinePlayerInit() {

        var placementID = $('#article_content').find('.main_gutter').data('video-placement-id');

        if($('.inline_jwplayer').length ){

            $('.inline_jwplayer').show().each(function(){


                var $playerSlot = $(this);
                $playerSlot.addClass('inlinePlayerInitFN');

                if ( getVideoType( $playerSlot.data('href') ) != 'CDN' ) {

                    articleVideoPlayer($playerSlot, '');
                    return;
                }

                $playerSlot.attr('data-placement-id', placementID);

                $playerSlot
                    .find('> span').remove().end()
                    .wrap('<div class="responsive_inline_container" id="container_' + $playerSlot.attr('id') + '">').wrap('<div>');

                // jwvideo_embed($playerSlot);
                // var setJWplayer = function(objID, file_url, poster_url, autoplay){
                articleVideoPlayer($playerSlot, '');
                inlineAutoplayInit($playerSlot, 'container_' + $playerSlot.attr('id') );
            });

        }
    }



    function inlinePrerollVideo () {

        var articleContent = $('.article__text'),
            contentHeight,
            prerollTag,
            file_url,
            playerInstance,
            playerContainer,
            prerollExit = false;

        prerollTag = '';
        file_url = '/static/video/blank_video.mp4';

        var scrollEnabled = false;

        $(window).scroll( $.throttle(500, checkTopPosition) );

        setInterval(function() {

            if( scrollEnabled ) {
                scrollEnabled = false;
            }

        }, 100);


        function checkTopPosition() {

            playerContainer = $('#inline_preroll_player');
            playerInstance = jwplayer('inline_preroll_player');
            scrollEnabled = true; // scroll trotting

            if(playerContainer.length > 0) {

                if ( playerContainer.inView() ){
                    //ako je video vec jednom zavrsio ili ako je skipan
                    //nece se ponovo pokrenuti
                    if(prerollExit === false) {

                        playerInstance.play( true );

                    }

                } else {

                    //ovo ne radi jer se reklama ne moze pauzirati
                    playerInstance.pause( true );

                }
            }

        }

        setTimeout(function() {

            contentHeight = articleContent.height();

            if(contentHeight >= 1000){

                // _gaq.push(['_trackEvent', 'JW Player Video', 'Visina članka za inarticle', '' + contentHeight + '']);

                //ako je clanak visi od 1000px na dno upucaj inline container
                articleContent.append('\
                    <div id="inline_preroll_player_container" style="position: relative; width:100%; height:0px; visibility:hidden; transition: height 0.5s; overflow: hidden;" href="#">\
                        <div id="inline_preroll_player" style="position: absolute; width: 100%; height: 100%;"></div>\
                    </div>\
                ');

                //inicijalizacija, autostart: false
                jwplayer('inline_preroll_player').setup({
                    file: file_url,
                    width: '100%',
                    height: '100%',
                    // dodano
                    //primary: 'flash',
                    skin: 'glow',  // beelden, bekle, five, glow, modieus, roundster, six, stormtrooper, vapor
                    autostart: false,
                    mute: true,
                    ga: {},
                    advertising: {
                        client: 'vast',
                        tag: prerollTag,
                        admessage: 'Nastavak videa za XX sekundi.',
                        skipoffset: '10',
                        skipmessage: 'Skip in xx s',
                        skiptext: 'Skip'
                    }
                });

                jwplayer().onAdImpression(function(event){

                    // console.log('onAdImpression');

                    $('#inline_preroll_player_container').css({
                        'visibility': 'visible',
                        'padding-bottom': '56.3%',
                        'margin-bottom': '20px'
                    });

                    $('#inline_preroll_player').css({
                        'position': 'absolute'
                    });

                    // _gaq.push(['_trackEvent', 'JW Player Video', file_url, 'Blank Video - Inline preroll']);
                    // jw.settings.userLeft = true;

                });

                jwplayer().onAdComplete(function(){

                    $('#inline_preroll_player_container').css({
                        'height': '0px'
                    });

                    // jw.settings.userLeft = false;
                    // _gaq.push(['_trackEvent', 'JW Player Video', file_url, 'onAdComplete']);

                    prerollExit = true;

                });

                jwplayer().onAdError(function(){

                    console.log('onAdError');

                    $('#inline_preroll_player_container').css({
                        'height': '0px'
                    });

                    // jw.settings.userLeft = false;
                    // _gaq.push(['_trackEvent', 'JW Player Video', file_url, 'onAdError']);

                    prerollExit = true;

                });

                jwplayer().onAdSkipped(function(){

                    $('#inline_preroll_player_container').css({
                        'height': '0px'
                    });

                    // jw.settings.userLeft = false;
                    // _gaq.push(['_trackEvent', 'JW Player Video', file_url, 'onAdSkipped']);

                    prerollExit = true;

                });

                jwplayer().onAdClick(function(){

                    // _gaq.push(['_trackEvent', 'JW Player Video', file_url, 'onAdClick']);

                });
            }
        }, 1500);
    }



    // Specijal box video (homepage)
    function initSpecialBoxPlayer() {

        var $inlineJWPlayer = $('.js_SpecialBoxVideoPlayer'),
            $counter = 0;

        // offset top makes error with offset()
        if ( !$inlineJWPlayer.length ) { return; }

        $('.js_SpecialBoxVideoPlayerTrigger').on('click', function(evt) {

            evt.preventDefault();

            if ( $counter ===  0 ) {

                $(this).find('.gallerybtn--play').remove();
                articleVideoPlayer($inlineJWPlayer, '', true);
            }

            $counter =+ 1;
        });
    }

    $('.js_articleVideoPlayer').on( 'click', function ( event ) {
        articleVideoPlayer ( $(this), event, true );
    });

    function videoArticleInitPlayer() {

        articleVideoPlayer ( $('.js_startArticleVideo'), '', true );

    }


    // inlineJWPlayer ();
    inlinePrerollVideo ();
    initSpecialBoxPlayer();
    inlinePlayerInit();
    videoArticleInitPlayer();
});

/*jshint multistr: true */

//@prepros-prepend 'modules/userscontent.js'
//@prepros-prepend 'modules/comments.js'
//@prepros-prepend 'modules/popup.js'
//@prepros-prepend 'modules/video_player.js'


$(function () {
    // vanjski urlovi u target="_blank"
    function fixOutsideUrl() {
        $(".article__content a[href^='http']").attr('target', '_blank');
    }

    // slanje ispravka za članak
    function newArticleCorrect( $toggleBtn ) {

        var $articleText           = $('.js_articleText'),
            $sendCorrectedArticle  = $('.js_sendCorrectedArticle'),
            errorTekst             = $toggleBtn.data('m_error'),

            app                    = $toggleBtn.data('m_meta-app-name'),
            model                  = $toggleBtn.data('m_meta-model-name'),
            pk                     = $toggleBtn.data('m_meta-pk'),
            articleTitle           = $toggleBtn.data('m_meta-article-title');

        $sendCorrectedArticle.on('click', function( e ){
            e.preventDefault();

            if( $articleText.val().length === 0 ) { return; }

            $.ajax({

                type: "POST",
                url: $toggleBtn.data('url'),
                data: { 'title': articleTitle, 'correction': $articleText.val(), 'model': model, 'app': app, 'pk': pk },

                success: function(data) {

                    // JSON vrijednosti:
                    // console.log( 'info message: ' + data.info.message );

                    $('.mfp-content .js_modalTitle').text('Članak uspješno prijavljen');
                    $('.mfp-content .js_articleText').slideUp();

                    setTimeout(function(){

                        var magnificPopup = $.magnificPopup.instance;
                        magnificPopup.close();

                    }, 3000);


                },

                statusCode: {

                    201: function() {
                        // console.log('Uspješno');
                    },

                    403: function() {
                        // console.log('Korisnik nije logiran');

                        $('.mfp-content .js_modalTitle').text(errorTekst).css('color', '#F00');
                        $('.mfp-content .js_articleText').slideUp();
                    },

                    408: function() {
                        // console.log('Problem sa serverom - Pokušajte kasnije');
                    },
                    409: function() {
                        //$('.error').text( "Molimo Vas pričekajte da prođe 60 sek od tvog zadnjeg ispravka!" );

                        $('.mfp-content .js_modalTitle').text(errorTekst).css('color', '#F00');
                        $('.mfp-content .js_articleText').slideUp();
                    },
                    500: function() {
                        // console.log('Problem sa serverom - Pokušajte kasnije');
                    },

                    502: function() {
                        // console.log('Problem sa serverom - Pokušajte kasnije');
                    }
                }
            });

        });
    }





    // zatvaranje otvorenog modala
    function setModalClose() {

        $('.js_modalClose').addClass('js_modalCloseFN');

        $('.js_modalClose').on('click', function(evt) {

            if ( $('body').hasClass('standalone_modal') || $('body').hasClass('modal--standalone') ) {
                return;
            } else {
                evt.preventDefault();
            }

            var magnificPopup = $.magnificPopup.instance;
            magnificPopup.close();

        });
    }





    // otvaranje modala za ispravak članka (template mora postojati u članku)
    function initArticleCorrection() {

        $('.js_articleCorrect').magnificPopup({
            modal: true,
            items: {
                src: '#article_correction',
                type:'inline',
                midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
            },
            callbacks: {
                open: function() {
                    setModalClose();
                    newArticleCorrect( $('.js_articleCorrect') );
                }
            }
        });
    }



    fixOutsideUrl();
    initArticleCorrection();


});


//# sourceMappingURL=article.js.map
