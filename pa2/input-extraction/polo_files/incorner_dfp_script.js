var adsManager;
var adsLoader;
var adDisplayContainer;
var intervalTimer;
var videoContent;

function init(adTag) {
  console.log('init started');
  document.getElementById('_dfp_vast_article').innerHTML += '\
                                                      <style>\
                                                        .preroll_mute{\
                                                          width: 45px;\
                                                          height: 45px;\
                                                          position: absolute;\
                                                          left: 15px;\
                                                          bottom: 62px;\
                                                          z-index: 55000;\
                                                          cursor: pointer;\
                                                          background: url(https://www.zurnal24.si/banners/inarticle_sample_video/mute.png);\
                                                        }\
                                                        .preroll_unmute{\
                                                          background: url(https://www.zurnal24.si/banners/inarticle_sample_video/unmute.png) !important;\
                                                        }\
                                                      </style>\
                                                        <div id="dfp_mainContainer" style="display: none; position: relative; overflow: hidden;">\
                                                        <div id="dfp_content">\
                                                          <video id="dfp_contentElement">\
                                                            <source src="https://www.zurnal24.si/banners/inarticle_sample_video/inartc.mp4"></source>\
                                                            <source src="https://www.zurnal24.si/banners/inarticle_sample_video/inartc.webm"></source>\
                                                          </video>\
                                                          </div>\
                                                          <div id="dfp_adContainer" style="position: absolute; top: 0; right: 0; left: 0; bottom: 0;">\
                                                            <div id="test" class="preroll_mute"></div>\
                                                          </div>\
                                                        </div>';

    videoContent = document.getElementById('dfp_contentElement');
    var dfp_url = adTag;
    window.addEventListener("load", requestAds(dfp_url));
}

function createAdDisplayContainer() {
    adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById('dfp_adContainer'), videoContent);
}

function requestAds(dfp_url) {
    google.ima.settings.setPlayerType('google/codepen-demo-gpt');
    google.ima.settings.setPlayerVersion('1.0.0');
    createAdDisplayContainer();
    adDisplayContainer.initialize();
    videoContent.load();
    adsLoader = new google.ima.AdsLoader(adDisplayContainer);
    adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded, false);
    adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError, false);
    var adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = dfp_url;
    adsRequest.linearAdSlotWidth = 640;
    adsRequest.linearAdSlotHeight = 400;
    adsRequest.nonLinearAdSlotWidth = 640;
    adsRequest.nonLinearAdSlotHeight = 150;
    adsLoader.requestAds(adsRequest);
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
    var adsRenderingSettings = new google.ima.AdsRenderingSettings();
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    adsManager = adsManagerLoadedEvent.getAdsManager(videoContent, adsRenderingSettings);
    adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, onContentPauseRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, onContentResumeRequested);
    adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, onAdEvent);
    try {
        if (window.innerWidth > 1371) {
            document.getElementById('dfp_mainContainer').style.width = '786px';
            document.getElementById('dfp_mainContainer').style.height = '482px';
            document.getElementById('dfp_mainContainer').style.margin = '0 auto';
            document.getElementById('dfp_content').style.width = '786px';
            document.getElementById('dfp_content').style.height = '482px';
            document.getElementById('dfp_adContainer').style.width = '786px';
            document.getElementById('dfp_adContainer').style.height = '482px';
            document.getElementById('dfp_contentElement').style.width = '786px';
            document.getElementById('dfp_contentElement').style.height = '482px';
            adsManager.init(786, 482, google.ima.ViewMode.NORMAL);
        } else if (window.innerWidth < 1370 && window.innerWidth > 1026) {
            document.getElementById('dfp_mainContainer').style.width = '664px';
            document.getElementById('dfp_mainContainer').style.height = '414px';
            document.getElementById('dfp_mainContainer').style.margin = '0 auto';
            document.getElementById('dfp_content').style.width = '664px';
            document.getElementById('dfp_content').style.height = '414px';
            document.getElementById('dfp_adContainer').style.width = '664px';
            document.getElementById('dfp_adContainer').style.height = '414px';
            document.getElementById('dfp_contentElement').style.width = '664px';
            document.getElementById('dfp_contentElement').style.height = '414px';
            adsManager.init(664, 414, google.ima.ViewMode.NORMAL);
        } else if (window.innerWidth < 1025 && window.innerWidth > 555) {
            document.getElementById('dfp_mainContainer').style.width = '540px';
            document.getElementById('dfp_mainContainer').style.height = '303px';
            document.getElementById('dfp_mainContainer').style.margin = '0 auto';
            document.getElementById('dfp_content').style.width = '540px';
            document.getElementById('dfp_content').style.height = '303px';
            document.getElementById('dfp_adContainer').style.width = '540px';
            document.getElementById('dfp_adContainer').style.height = '303px';
            document.getElementById('dfp_contentElement').style.width = '540px';
            document.getElementById('dfp_contentElement').style.height = '303px';
            adsManager.init(540, 303, google.ima.ViewMode.NORMAL);
        } else if (window.innerWidth < 554 && window.innerWidth > 453) {
            document.getElementById('dfp_mainContainer').style.width = '453px';
            document.getElementById('dfp_mainContainer').style.height = '255px';
            document.getElementById('dfp_mainContainer').style.margin = '0 auto';
            document.getElementById('dfp_content').style.width = '453px';
            document.getElementById('dfp_content').style.height = '255px';
            document.getElementById('dfp_adContainer').style.width = '453px';
            document.getElementById('dfp_adContainer').style.height = '255px';
            document.getElementById('dfp_contentElement').style.width = '453px';
            document.getElementById('dfp_contentElement').style.height = '255px';
            adsManager.init(453, 255, google.ima.ViewMode.NORMAL);
        } else if (window.innerWidth < 452 && window.innerWidth > 385) {
            document.getElementById('dfp_mainContainer').style.width = '368px';
            document.getElementById('dfp_mainContainer').style.height = '207px';
            document.getElementById('dfp_mainContainer').style.margin = '0 auto';
            document.getElementById('dfp_content').style.width = '368px';
            document.getElementById('dfp_content').style.height = '207px';
            document.getElementById('dfp_adContainer').style.width = '368px';
            document.getElementById('dfp_adContainer').style.height = '207px';
            document.getElementById('dfp_contentElement').style.width = '368px';
            document.getElementById('dfp_contentElement').style.height = '207px';
            adsManager.init(368, 207, google.ima.ViewMode.NORMAL);
        } else if (window.innerWidth < 384) {
            document.getElementById('dfp_mainContainer').style.width = '320px';
            document.getElementById('dfp_mainContainer').style.height = '180px';
            document.getElementById('dfp_mainContainer').style.margin = '0 auto';
            document.getElementById('dfp_content').style.width = '320px';
            document.getElementById('dfp_content').style.height = '180px';
            document.getElementById('dfp_adContainer').style.width = '320px';
            document.getElementById('dfp_adContainer').style.height = '180px';
            document.getElementById('dfp_contentElement').style.width = '320px';
            document.getElementById('dfp_contentElement').style.height = '180px';
            adsManager.init(320, 180, google.ima.ViewMode.NORMAL);
        }
        adsManager.start();
    } catch (adError) {
        console.log('inArticle Ad error. An error may be thrown, if there was a problem with the VAST response.')
    }
}

function onAdEvent(adEvent) {
    var ad = adEvent.getAd();
    switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
            if (!ad.isLinear()) {
                console.log('video content play');
            }
            break;
        case google.ima.AdEvent.Type.STARTED:
            if (ad.isLinear()) {
                intervalTimer = setInterval(function() {
                    var remainingTime = adsManager.getRemainingTime();
                }, 300);
            }
            break;
        case google.ima.AdEvent.Type.COMPLETE:
            if (ad.isLinear()) {
                clearInterval(intervalTimer);
            }
            break;
    }
}

function onAdError(adErrorEvent) {
    console.log(adErrorEvent.getError());
    adsManager.destroy();
}

function onContentPauseRequested() {
  console.log('pause requested');
  document.getElementsByClassName('article__figure')[0].style.display = 'none';
  document.getElementById('dfp_mainContainer').style.display = 'block';
  adsManager.setVolume(0);
  var mute_btn = document.querySelector('.preroll_mute');
  mute_btn.onclick = function(){
    if (mute_btn.classList.contains('preroll_unmute')) {
      adsManager.setVolume(0);
      mute_btn.classList.remove("preroll_unmute");
    } else {
      adsManager.setVolume(1);
      mute_btn.classList.add("preroll_unmute");
    }
  };
}

function onContentResumeRequested() {
  console.log('resume requested');
  setTimeout(function(){
    var el = document.getElementById( 'dfp_mainContainer' );
    el.parentNode.removeChild( el );
    document.getElementsByClassName('article__figure')[0].style.display = 'block';
  }, 1);
}