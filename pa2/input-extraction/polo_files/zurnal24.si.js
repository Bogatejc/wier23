
var TWAGORAINARTICLE=TWAGORAINARTICLE||function(){
			
	var getHTScriptElement = function(){
		var hTClass = 'pa-ht-class';
		if (document.currentScript)
			return document.currentScript;
		else {
			
			var scripts = document.getElementsByTagName('script');
			var currentHTag = 'paslsa.com/c/zurnal24.si.js'; 
			var sl = scripts.length;
			for (var s=0; s<sl; s++){
				if ( (scripts[s].src.indexOf(currentHTag) !== -1) && !scripts[s].classList.contains(hTClass)){
					scripts[s].classList.add(hTClass);
					break;
				}
			}

			return scripts[s];
		}
	}
    
	var getQueryString = function(script){
		var queryString = script.src.replace(/^[^\?]+\??/,'');
		return '?'+queryString;
	}
    
	var getParameterByName = function(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, '$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		try {
			return decodeURIComponent(results[2].replace(/\+/g, ' '));
		}catch(err){
			return null;
		}
	}
            
	var getPartnerSCOfromHTUrl = function(currentScript){
		var schain = null;
		var currentHTScript = currentScript;
		var qS = getQueryString(currentHTScript);
		if (qS) schain = getParameterByName('schain',qS);
		
		return schain;

	}
			
			
	var config = {"site_name":"zurnal24.si","rules":[{"name":"taboola widget","priority":3,"type":"Taboola","product":{"Taboola":{"name":"zurnal24gr-p16150568","tags":[{"selector":"body > div.body_wrap > div > div.content__wrap.container > div.container.container--sidebarsmall.fold_article__top > div.column_content > div > div > div > article > div > div.container.fold_article__outbrain","position":"before","widgets":[{"widgetType":"hybrid","mode":"alternating-zurnal24","containerId":"taboola-alternating-below-article","placement":"Alternating Below Article Two"}]}],"pageLevelTracking":{"enabled":true}}},"targeting":{"url_targeting":{"pathname":{"notEquals":["\/"]}}}},{"name":"taboola widget homepage desktop only","priority":3,"type":"Taboola","product":{"Taboola":{"name":"zurnal24-homepagegr-p16150568","tags":[{"selector":"body > div.body_wrap > div > div.content__wrap.container > div.container.fold_home_a.fold_home_a--recommend > div.main_tile","position":"before","widgets":[{"widgetType":"sponsored","mode":"sc-zurnal24-homepage","containerId":"taboola-sponsored-below-article-homepage","placement":"Sponsored Below Article-homepage"}]}],"pageLevelTracking":{"enabled":true}}},"targeting":{"device_targeting":"desktop","url_targeting":{"pathname":{"equals":["\/"]}}}},{"name":"inarticle pages desktop","priority":3,"type":"Magic","product":{"magic":{"enabled":true,"formats":{"inarticle":{"pmp":{"paragraphLimit":2,"placementId":"17478066","probability":10,"tagNames":["p","br"],"selectorType":"class","selectorName":"article__content no_page_break cf","isLight":true,"flipQuizEnabled":true},"direct":{"paragraphLimit":2,"placementId":"","probability":0,"tagNames":["p","br"],"selectorType":"class","selectorName":"article__content no_page_break cf"}},"vast":{"pmp":{"paragraphLimit":2,"placementId":"17478046,\/\/www8.smartadserver.com\/ac?siteid=345911&pgid=1208020&fmtid=88523&ab=1&oc=1&out=vast3&ps=1&pb=0&visit=S&vcn=s&tmstp=PA_timestamp&pgdomain=%%PA_PAGE_URL%%&tgt=domain%3Dzurnal24.si&ctc=News&ctk=[contenttags]&ctt=[contenttype]&ctn=[sas_contentTitle]&ctd=[sas_videoContentDuration]&vpw=PA_width&vph=PA_height&gdpr=&gdpr_consent=,\/\/vpaid.pubmatic.com\/ads\/video\/vadtag.html?adtype=13&pubId=156400&siteId=632917&adId=2471643&vadFmt=3&vapi=2&vminl=1&vmaxl=500&vh=350&vw=620&placement=1&vtype=0&vpos=1&vskip=0&vcom=0&vfmt=1+3+4+5+6+7&sec=1&gdpr=&gdpr_consent=&kadpageurl=%%PA_PAGE_URL%%,\/\/adx.adform.net\/adx\/?mid=786784&t=2,\/\/ads.stickyadstv.com\/vast\/vpaid-adapter\/9471297,\/\/projectagora-d.openx.net\/v\/1.0\/av?auid=541154693&url=%%PA_PAGE_URL%%&cb=PA_timestamp&vwd=PA_width&vht=PA_height,\/\/www8.smartadserver.com\/ac?siteid=329204&pgid=1259036&fmtid=47614&ab=1&tgt=&oc=1&out=vast3&ps=1&pb=0&visit=S&vcn=s&tmstp=[timestamp]&pgdomain=%%PA_PAGE_URL%%&vpw=PA_width&vph=PA_height&gdpr=&gdpr_consent=","probability":70,"tagNames":["p","br"],"selectorType":"class","selectorName":"article__content no_page_break cf"},"direct":{"paragraphLimit":2,"placementId":"17478046,\/\/vpaid.pubmatic.com\/ads\/video\/vadtag.html?adtype=13&pubId=156400&siteId=632917&adId=2471643&vadFmt=3&vapi=2&vminl=1&vmaxl=500&vh=350&vw=620&placement=1&vtype=0&vpos=1&vskip=0&vcom=0&vfmt=1+3+4+5+6+7&sec=1&gdpr=&gdpr_consent=&kadpageurl=%%PA_PAGE_URL%%,\/\/adx.adform.net\/adx\/?mid=786784&t=2,\/\/ads.stickyadstv.com\/vast\/vpaid-adapter\/9471297,\/\/projectagora-d.openx.net\/v\/1.0\/av?auid=541154693&url=%%PA_PAGE_URL%%&cb=PA_timestamp&vwd=PA_width&vht=PA_height,\/\/www8.smartadserver.com\/ac?siteid=329204&pgid=1259036&fmtid=47614&ab=1&tgt=&oc=1&out=vast3&ps=1&pb=0&visit=S&vcn=s&tmstp=[timestamp]&pgdomain=%%PA_PAGE_URL%%&vpw=PA_width&vph=PA_height&gdpr=&gdpr_consent=","probability":20,"tagNames":["p","br"],"selectorType":"class","selectorName":"article__content no_page_break cf"},"incorner":{"enabled":true,"incorner_probability":100,"position":"right","effect":"detach_to_incorner"}}},"rulePassback":"<script async src=\"https:\/\/securepubads.g.doubleclick.net\/tag\/js\/gpt.js\"><\/script><script> var inArticleSlot=null; window.googletag = window.googletag || {cmd: []};  googletag.cmd.push(function() {  inArticleSlot =  googletag.defineSlot('\/1025510\/17478046_zurnal24.si_inarticle_300x250', [[300, 250], [640, 480], [336, 280], [640, 360]], 'div-gpt-ad-1573049470162-0').addService(googletag.pubads()).setCollapseEmptyDiv(true,true);    googletag.pubads().enableSingleRequest();    googletag.enableServices();  });<\/script> <!-- \/1025510\/17478046_zurnal24.si_inarticle_300x250 --><div id='div-gpt-ad-1573049470162-0'>  <script>    googletag.cmd.push(function() { if (googletag.pubads().isInitialLoadDisabled()) {googletag.pubads().refresh([inArticleSlot]);} else {googletag.display('div-gpt-ad-1573049470162-0'); } });  <\/script><\/div>","adMngrPassback":"<!-- PA Ad Tag - zurnal24.si_inarticle-adtag_300x250 <- DO NOT MODIFY --><script src=\"\/\/ads.projectagoraservices.com\/?id=5604\" type=\"text\/javascript\"><\/script><!-- End PA Ad Tag -->"}},"targeting":{"device_targeting":"desktop"}},{"name":"inarticle pages mobile","priority":3,"type":"Magic","product":{"magic":{"enabled":true,"formats":{"inarticle":{"pmp":{"paragraphLimit":2,"placementId":"17478066","probability":10,"tagNames":["p","br"],"selectorType":"class","selectorName":"article__content no_page_break cf","isLight":true,"socialCardsEnabled":true,"flipQuizEnabled":true},"direct":{"paragraphLimit":2,"placementId":"","probability":0,"tagNames":["p","br"],"selectorType":"class","selectorName":"article__content no_page_break cf"}},"vast":{"pmp":{"paragraphLimit":2,"placementId":"17478046,\/\/www8.smartadserver.com\/ac?siteid=345911&pgid=1208020&fmtid=88523&ab=1&oc=1&out=vast3&ps=1&pb=0&visit=S&vcn=s&tmstp=PA_timestamp&pgdomain=%%PA_PAGE_URL%%&tgt=domain%3Dzurnal24.si&ctc=News&ctk=[contenttags]&ctt=[contenttype]&ctn=[sas_contentTitle]&ctd=[sas_videoContentDuration]&vpw=PA_width&vph=PA_height&gdpr=&gdpr_consent=,\/\/vpaid.pubmatic.com\/ads\/video\/vadtag.html?adtype=13&pubId=156400&siteId=632917&adId=2471643&vadFmt=3&vapi=2&vminl=1&vmaxl=500&vh=350&vw=620&placement=1&vtype=0&vpos=1&vskip=0&vcom=0&vfmt=1+3+4+5+6+7&sec=1&gdpr=&gdpr_consent=&kadpageurl=%%PA_PAGE_URL%%,\/\/adx.adform.net\/adx\/?mid=786784&t=2,\/\/ads.stickyadstv.com\/vast\/vpaid-adapter\/9471297,\/\/projectagora-d.openx.net\/v\/1.0\/av?auid=541154693&url=%%PA_PAGE_URL%%&cb=PA_timestamp&vwd=PA_width&vht=PA_height,\/\/www8.smartadserver.com\/ac?siteid=329204&pgid=1259036&fmtid=47614&ab=1&tgt=&oc=1&out=vast3&ps=1&pb=0&visit=S&vcn=s&tmstp=[timestamp]&pgdomain=%%PA_PAGE_URL%%&vpw=PA_width&vph=PA_height&gdpr=&gdpr_consent=","probability":70,"tagNames":["p","br"],"selectorType":"class","selectorName":"article__content no_page_break cf","height_video":{"enabled":true,"height":75}},"direct":{"paragraphLimit":2,"placementId":"17478046,\/\/vpaid.pubmatic.com\/ads\/video\/vadtag.html?adtype=13&pubId=156400&siteId=632917&adId=2471643&vadFmt=3&vapi=2&vminl=1&vmaxl=500&vh=350&vw=620&placement=1&vtype=0&vpos=1&vskip=0&vcom=0&vfmt=1+3+4+5+6+7&sec=1&gdpr=&gdpr_consent=&kadpageurl=%%PA_PAGE_URL%%,\/\/adx.adform.net\/adx\/?mid=786784&t=2,\/\/ads.stickyadstv.com\/vast\/vpaid-adapter\/9471297,\/\/projectagora-d.openx.net\/v\/1.0\/av?auid=541154693&url=%%PA_PAGE_URL%%&cb=PA_timestamp&vwd=PA_width&vht=PA_height,\/\/www8.smartadserver.com\/ac?siteid=329204&pgid=1259036&fmtid=47614&ab=1&tgt=&oc=1&out=vast3&ps=1&pb=0&visit=S&vcn=s&tmstp=[timestamp]&pgdomain=%%PA_PAGE_URL%%&vpw=PA_width&vph=PA_height&gdpr=&gdpr_consent=","probability":20,"tagNames":["p","br"],"selectorType":"class","selectorName":"article__content no_page_break cf"}}},"rulePassback":"<script async src=\"https:\/\/securepubads.g.doubleclick.net\/tag\/js\/gpt.js\"><\/script><script> var inArticleSlot=null; window.googletag = window.googletag || {cmd: []};  googletag.cmd.push(function() {  inArticleSlot =  googletag.defineSlot('\/1025510\/17478046_zurnal24.si_inarticle_300x250', [[300, 250], [336, 280]], 'div-gpt-ad-1573049470162-0').addService(googletag.pubads()).setCollapseEmptyDiv(true,true);    googletag.pubads().enableSingleRequest();    googletag.enableServices();  });<\/script> <!-- \/1025510\/17478046_zurnal24.si_inarticle_300x250 --><div id='div-gpt-ad-1573049470162-0'>  <script>    googletag.cmd.push(function() { if (googletag.pubads().isInitialLoadDisabled()) {googletag.pubads().refresh([inArticleSlot]);} else {googletag.display('div-gpt-ad-1573049470162-0'); } });  <\/script><\/div>","adMngrPassback":"<!-- PA Ad Tag - zurnal24.si_inarticle-adtag_300x250 <- DO NOT MODIFY --><script src=\"\/\/ads.projectagoraservices.com\/?id=5604\" type=\"text\/javascript\"><\/script><!-- End PA Ad Tag -->","height_display":{"enabled":true,"height":80}}},"targeting":{"device_targeting":"mobile"}},{"name":"custom css alingment issue","priority":3,"type":"CustomScript","product":{"CustomScript":{"scripts":[{"code":"<script>var addcss = function(css){    var head = document.getElementsByTagName('head')[0];    var s = document.createElement('style');    s.setAttribute('type', 'text\/css');    if (s.styleSheet) {           s.styleSheet.cssText = css;    } else {                        s.appendChild(document.createTextNode(css));    }    head.appendChild(s); };addcss('div[id^=\"pa_1x1_psbk_\"] iframe[id^=\"postbid_if\"] {width: unset!important;}');<\/script>"}]}}},{"name":"ad block tags","priority":3,"type":"AdBlock","product":{"AdBlock":{"scripts":[{"breakpoints":{"minWidth":10},"tags":[{"code":"<div id=\"1409947-1\" style=\"width:300px;height:250px; margin:0 auto;\"><\/div>\n\t\t\t\t\t\t\t\t\t<script type=\"text\/javascript\">\n\t\t\t\t\t\t\t\t\tvar Criteo = Criteo || {};\n\t\t\t\t\t\t\t\t\tCriteo.events = Criteo.events || [];\n\t\t\t\t\t\t\t\t\tCriteo.events.push(function() {\n\t\t\t\t\t\t\t\t\tCriteo.DisplayAcceptableAdIfAdblocked({\n\t\t\t\t\t\t\t\t\t\tzoneid: 1409947,\n\t\t\t\t\t\t\t\t\t\tcontainerid: \"1409947-1\"\n\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t<\/script>","selector":"body > div.body_wrap > div > div.content__wrap.container > div.container.container--sidebarsmall.fold_article__top > div.column_sidebar > div > div:nth-child(1)"},{"code":"<div id=\"1409947-2\" style=\"width:300px;height:250px; margin:0 auto;\"><\/div>\n\t\t\t\t\t\t\t\t\t<script type=\"text\/javascript\">\n\t\t\t\t\t\t\t\t\tvar Criteo = Criteo || {};\n\t\t\t\t\t\t\t\t\tCriteo.events = Criteo.events || [];\n\t\t\t\t\t\t\t\t\tCriteo.events.push(function() {\n\t\t\t\t\t\t\t\t\tCriteo.DisplayAcceptableAdIfAdblocked({\n\t\t\t\t\t\t\t\t\t\tzoneid: 1409947,\n\t\t\t\t\t\t\t\t\t\tcontainerid: \"1409947-2\"\n\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t<\/script>","selector":"body > div.body_wrap > div > div.content__wrap.container > div.container.container--sidebarsmall.fold_article__top > div.column_sidebar > div"}]}]}}}],"sco":{"paSellerId":"103021","paOwns":"Owned & Operated"}};

	var currentHTScript = getHTScriptElement();

	return {
		getConfig:function(){return config;},
		getPartnersSCO: function(){return getPartnerSCOfromHTUrl(currentHTScript);}
	}

}();

!function(e,t,a){var n,r=e.getElementsByTagName(t)[0];e.getElementById("pa-tag")||((n=e.createElement(t)).id="pa-tag",n.src="//aghtag.tech/libs/projectagora.min.js",r.parentNode.insertBefore(n,r))}(document,"script");
			