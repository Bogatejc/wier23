!function(){try{var t="1.0.59",e="cta-branding",a=31,r=104,n=10,i=.98,o=22,s=.1,l={},d=0,f=Math.random()<.05,u=null,c=document.createElement("canvas"),m=f?(window.location.href||"").slice(0,200):"";if("cta-test"===e){var v={};try{for(var _=window.location.href.split("?")[1].split("&"),g=0;g<_.length;g++){var b=_[g],h=b.split("=")[0],p=b.split("=")[1];v[h]=p}}catch(t){console.error("*** had issues while reading url parameters")}}function D(t){return t.offsetHeight+T(t,"margin-top",0)+T(t,"margin-bottom",0)}function x(t){var e=0;if(["border-bottom-width","border-top-width","padding-bottom","padding-top"].forEach(function(a){e+=T(t,a)||0}),t.hasChildNodes())for(var a=t.childNodes,r=0;r<a.length;r++){var n=a[r];if(!n.classList.contains("video-cta-href")){var i=D(n);e+=i}}return e}function T(t,e,a){var r=window.getComputedStyle(t);if(!r[e])return a||null;var n=parseInt(r[e]);return isNaN(n)?r[e]:n}l.globalConfig={},l.hooks={"item-renderer":function(a,r,o){if(!u){var c,_=a.rbox;_.formatsData=_.formatsData||{},a.formatsData=a.formatsData||{},a.formatsData.sendAbTestEvent=function(a,r,n){"cta-test"===e&&console.log("cta-test",a,r,n);if(!f)return;var i={location:m,itemId:this.formatsData.itemId,rating:this.formatsData.rating,price:this.formatsData.price,text:this.formatsData.actionText,type:null!=r?r:"event",description:n,module:e,version:t,event:a,cardIndexOnPage:this.formatsData.cardIndex,index:this.formatsData.index,placement:this.formatsData.placement,innerText:this.innerText};window.TRCImpl.sendAbTestEvent("CTA",JSON.stringify(i)),window.TRCImpl.sendAbTestEvent(e,a)}.bind(a),a.formatsData.cardIndex=d++,a.formatsData.index=r.itemIndex,a.formatsData.placement=_.placement,a.formatsData.itemId=f?(r["item-id"]||r.id||"").slice(0,40):"";try{var g=r["cta-text"],b=r.fpr||r["cta-price"],h=r["stars-rating"];if(null==u){var p=C("disable-cta-on-custom-module",o);a.formatsData.sendAbTestEvent(p?"disable_custom":"enable_custom");var D=window.TRCImpl&&window.TRCImpl.global&&window.TRCImpl.global["disable-cta-on-custom-module"];if(a.formatsData.sendAbTestEvent(D?"disable_global":"enable_global"),D||p)return void(u=!0);u=!1}if("cta-test"===e){f="true"===v["cta-report"];var w="true"===v["cta-rating"],A="true"===v["cta-always"];if("false"===v["cta-always"])return;var y=Math.random(),E=2+(w?1:0);w&&y>2/E||b||h?(g=g||"Download Today Today",h=parseFloat(h)||5*Math.random(),b=b||"4$"):(y>1/E||A)&&(g=decodeURIComponent(v["cta-text"])||g||"Learn More")}if(!g)return;if(a.formatsData.sendAbTestEvent("has_cta_text"),!function(t,e,a){if(!e.isSyndicated||e["is-in-network"])return t.formatsData.sendAbTestEvent("filtered_non_sc"),!1;if(a.options&&a.options.trcResponse&&a.options.trcResponse.nup)return t.formatsData.sendAbTestEvent("filtered_next_up"),!1;var r=!window.TRCImpl||!window.TRCImpl.global||function(t,e){if(null==t)return e;return t}(window.TRCImpl.global["enable-cta-with-description"],!0);if(e.description&&!r)return t.formatsData.sendAbTestEvent("filterd_item_with_description"),!1;var o=t.detail_order;if(o&&o.length&&"branding"===o[0])return t.formatsData.sendAbTestEvent("filterd_item_branding_before_title"),!1;if(!t.link)return t.formatsData.sendAbTestEvent("filtered_no_title"),!1;var l=t.querySelector(".video-label-box");if(!l)return t.formatsData.sendAbTestEvent("filtered_no_video_label_box"),!1;var d=l.querySelector(".branding");if(!d)return t.formatsData.sendAbTestEvent("filtered_no_branding"),!1;var f=d.getBoundingClientRect();if(f&&f.width>0){var u=parseFloat(T(d,"margin-left",0))/f.width;if(u>s)return t.formatsData.sendAbTestEvent("filtered_high_margin_left"),!1;var c=parseFloat(T(d,"margin-right",0))/f.width;if(c>s)return t.formatsData.sendAbTestEvent("filtered_high_margin_right"),!1}var m=T(d,"position");if(m&&"absolute"===m)return t.formatsData.sendAbTestEvent("filtered_branding_absolute_position_item_renderer"),!1;var v=d.querySelector(".branding-inner");if(v){var _=T(v,"position");if(_&&"absolute"===_)return t.formatsData.sendAbTestEvent("filtered_branding_inner_absolute_position"),!1}var g=d.querySelector("div.logoDiv");if(g){var b=T(g,"position");if(b&&"absolute"===b)return t.formatsData.sendAbTestEvent("filtered_branding_logo_div_inner_absolute_position"),!1}var h=t.getBoundingClientRect().width;if(h>0&&h<170)return t.formatsData.sendAbTestEvent("filtered_below_min_width"),!1;if(t.rbox.mode_name&&t.rbox.mode_name.indexOf("hero")>-1)return t.formatsData.sendAbTestEvent("filtered_item_in_hero_widget"),!1;if(t.rbox.container.querySelector(".story-widget"))return t.formatsData.sendAbTestEvent("filterd_item_in_reco_reel_story_widget"),!1;if(t.classList.contains("tbl-next-up-widget-item"))return t.formatsData.sendAbTestEvent("filterd_item_next_up"),!1;if(t.querySelector(".added-icon-svg"))return t.formatsData.sendAbTestEvent("filterd_item_branding_has_icon"),!1;var p=T(l,"height");if(p){var D=x(l);if(p+n<D)return t.formatsData.sendAbTestEvent("filtered_videoLabelBox_smaller_than_children"),!1}var w=T(l,"boxSizing",null);if(!w||"border-box"!==w){var A=l.getBoundingClientRect();if(A&&A.width>0){var y=parseFloat(T(l,"width",0))/A.width;if(y>i){var E=T(l,"paddingLeft",0),C=T(l,"paddingRight",0);if(E>0||C>0)return t.formatsData.sendAbTestEvent("filtered_padding_on_full_width"),!1}}}return!0}(a,r,o))return;if(a.formatsData.style={borderColor:C("border-color",o,!0),color:C("title-color",o,!0),fontSize:C("cta-font-size",o,!0)},a.formatsData.isInheritTitleColor=C("inherit-title-color",o,!0),a.formatsData.shouldRenderAsCTA=!0,a.formatsData.actionText=g.slice(0,15),a.formatsData.price=b,h&&(a.formatsData.rating=(c=h,Math.round(2*c)/2)),a.formatsData.isAppInstall=function(t){if(!t.formatsData.rating&&!t.formatsData.price)return!1;return!0}(a),a.formatsData.isAppInstall?a.formatsData.sendAbTestEvent("cta_app_render_candidate"):a.formatsData.sendAbTestEvent("cta_render_candidate"),_.formatsData.isInit)return;_.formatsData.isInit=!0,_.formatsData.hasCTAItem=!0,_.formatsData.isStream=function(t){return"autowidget-template-stream"===t.trc.getProperty(t.mode_name,"widget-creator-layout",t.propertiesOverride)}(_),_.formatsData.shouldAdjustAllItemsHeight=!_.formatsData.isStream&&!function(t){var e=t.getEffectiveResponsiveRule();if(e&&1===e.cells)return!0;return!1}(_)}catch(t){throw a.formatsData.sendAbTestEvent(t.message,"error",t.stack.split("\n",2)[1].trim()),t}}function C(t,e,a){var r=e&&e.globalTrcResponseJSON&&e.globalTrcResponseJSON.dcga&&e.globalTrcResponseJSON.dcga.pubConfigOverride,n=r&&r[t];return n&&a&&(l.globalConfig[t]=n),n||l.globalConfig[t]}},"list-suffix":function(t,e){if(!u){var l=e.boxes,d=!1,m=0;l.forEach(function(t){try{var a=t.rbox.formatsData;if(!a||!a.hasCTAItem)return;if(!t.formatsData.shouldRenderAsCTA&&!a.shouldAdjustAllItemsHeight)return;var o=t.querySelector(".video-label-box");if(!o)return void t.formatsData.sendAbTestEvent("filtered_no_videoLabelBox_list_suffix");if(t.rbox.container.querySelector(".story-widget"))return void t.formatsData.sendAbTestEvent("filterd_item_in_reco_reel_story_widget_list_suffix");var l=o.querySelector(".branding");if(l&&t.formatsData.shouldRenderAsCTA&&t.formatsData.isAppInstall&&function(t,e,a){t.formatsData.sendAbTestEvent("renderedAppInstall");var r=function(t){var e=document.createElement("span");if(e.classList.add("video-branding-flex-cta-rating"),t.formatsData.price){var a=document.createElement("span");a.innerText=t.formatsData.price,a.classList.add("video-branding-flex-cta-price-wrapper"),e.appendChild(a)}if(t.formatsData.price&&t.formatsData.rating){var r=document.createElement("span");r.classList.add("video-branding-flex-cta-oval-wrapper");var n='<svg class="cta-rating-oval"  width="3px" height="3px" viewBox="0 0 3 3" version="1.1" xmlns="http://www.w3.org/2000/svg">    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        <g transform="translate(-172.000000, -485.000000)" fill="#666666" fill-rule="nonzero">            <circle cx="173.5" cy="486.5" r="1.5"></circle>        </g>    </g></svg>';r.insertAdjacentHTML("beforeend",n),e.appendChild(r)}if(t.formatsData.rating){for(var i=t.formatsData.cardIndex,o=document.createElement("span"),s=0;s<5;s++){var l=Math.min(Math.max(t.formatsData.rating-s,0),1),d=g(i,s,l);o.insertAdjacentHTML("beforeend",d)}o.classList.add("video-branding-flex-cta-stars-wrapper"),e.appendChild(o)}return e}(t);e.insertBefore(r,a)}(t,o,l),a.shouldAdjustAllItemsHeight&&(m=Math.max(m,b(t,o,l))),!l)return void t.formatsData.sendAbTestEvent("filtered_no_branding_list_suffix");var f=l.getBoundingClientRect();if(f&&f.width>0){if(parseFloat(T(l,"margin-left",0))/f.width>s)return void t.formatsData.sendAbTestEvent("filtered_high_margin_left_list_suffix");if(parseFloat(T(l,"margin-right",0))/f.width>s)return void t.formatsData.sendAbTestEvent("filtered_high_margin_right_list_suffix")}var u=T(o,"height"),c=T(o,"max-height");if(m>c)return void t.formatsData.sendAbTestEvent("filtered_videoLabelBox_smaller_than_max_height_list_suffix");if(u){var h=x(o);if(u+n<h)return void t.formatsData.sendAbTestEvent("filtered_videoLabelBox_smaller_than_children_list_suffix")}if(t.formatsData.shouldRenderAsCTA){var p=T(l,"position");if(p&&"absolute"===p)return void t.formatsData.sendAbTestEvent("filtered_branding_absolute_position_list_suffix");var D=l.querySelector("div.logoDiv");if(D){var w=T(D,"position");if(w&&"absolute"===w)return void t.formatsData.sendAbTestEvent("filtered_branding_logo_div_inner_absolute_position_list_suffix")}var E=function(t,e){return T(function(t,e){if(t.rbox.formatsData.isStream)return e.querySelector(".video-label")||e;return e}(t,e),"width")-r}(t,o)||0;if(function(t,e){var a=T(t,"font-weight"),r=e.formatsData.style.fontSize||T(t,"font-size"),n=T(t,"font-family"),i=v(t,":before",e),o=v(t,":after",e),s=_(e,e.video_data["branding-text"],a,r,n)||0;return i+s+o}(l,t)>=E)return void t.formatsData.sendAbTestEvent("filtered_large_branding_width_list_suffix");if((function(t){var e=t.querySelector(".branding-inner"),a=t.querySelector(".branding-separator"),r=t.querySelector(".logoDiv"),n=e&&TRC.dom.getOuterWidth(e)||0,i=a&&TRC.dom.getOuterWidth(a)||0,o=r&&TRC.dom.getOuterWidth(r)||0;return n+i+o}(l)||0)>=E)return void t.formatsData.sendAbTestEvent("filtered_large_branding_parts_width_list_suffix");var C=T(o,"boxSizing",null);if(!C||"border-box"!==C){var R=o.getBoundingClientRect();if(R&&R.width>0)if(parseFloat(T(o,"width",0))/R.width>i){var S=T(o,"paddingLeft",0),I=T(o,"paddingRight",0);if(S>0||I>0)return void t.formatsData.sendAbTestEvent("filtered_padding_on_full_width_list_suffix")}}d=!0,function(t,e,a){t.formatsData.sendAbTestEvent("rendered");var r=function(t,e){var a=document.createElement("a"),r=function(t,e){var a=document.createElement("Button");return a.type="button",a.classList.add("video-cta-button","video-cta-style"),a.innerText=t.formatsData.actionText,y(e,a,"color"),y(e,a,"font-family"),a}(t,e);return a.classList.add("video-cta-href"),a.target="_blank",a.href=function(t){var e,a=t.link,r=t.rbox;if(r.shiftRedirOnclick)e=a.logger_url;else{var n=r.attachHeatMapDataToLink(a.logger_url,null);e=n}return e+="&cta=true"}(t),a.ctaButton=r,function(t,e){if(Object.keys(t.formatsData.style).forEach(function(a){t.formatsData.style[a]&&(e.style[a]=t.formatsData.style[a])}),t.formatsData.isInheritTitleColor){var a=t.querySelector(".video-title"),r=T(a,"color");r.indexOf("rgb(0, 0, 0)")<0&&(y(a,e,"color"),window.TRCImpl.sendAbTestEvent("CTA_Title_Not_Black",t.formatsData.itemId))}}(t,r),a.appendChild(r),a}(t,a);(function(t,e,a,r){var n=function(t){var e=A(t);return!e||!t.link||t.link===e}(e)?e.link:A(e);n&&n.classList.add("video-cta-style"),!e.rbox.isFeedCard&&n&&n.classList.add("non-feed-cta-item"),a&&a.classList.add("video-label-box-cta"),a&&!TRC.Browser.ie&&a.classList.add("video-label-box-cta-non-ie");var i=a.querySelectorAll(".video-label");if(i)for(var o=0;o<i.length;o++){var s=i[o];s.classList.add("video-label-flex-cta-item")}r&&function(t,e,a){if(e.classList.add("video-branding-flex-cta-item"),t.rbox.formatsData.isStream){var r=T(e,"margin-top");r?a.style.marginTop=r+1+"px":e.classList.add("video-branding-flex-cta-item-no-stream")}else e.classList.add("video-branding-flex-cta-item-no-stream");e.style.order=1}(e,r,t),a.appendChild(t)})(r,t,e,a),function(t,e){e.onclick=function(){t.formatsData.sendAbTestEvent("cta_button_clicked")}}(t,r.ctaButton),t.formatsData.renderedCtaButton=!0}(t,o,l),o.classList.contains("video-label-box-cta")&&function(t,e){if(t.fixResponsiveBoxTitleAndDesc(e),window.TRC.dom.on(window,"resize",function(){t.fixResponsiveBoxTitleAndDesc(e)}),e.video_data){var a=t.getDetailSpansFromLabelsBoxes("branding",e);a.length&&setTimeout(function(){for(var r=0;r<a.length;r++)t.fixBoxOverflow(a[r],e.video_data["branding-text"],!0,!0)},0)}}(e,t)}}catch(e){throw t.formatsData.sendAbTestEvent(e.message,"error",e.stack.split("\n",2)[1].trim()),e}}),d&&l.forEach(function(t){!function(t,e){var a=t.querySelector(".video-label-box");if(t.rbox.formatsData.shouldAdjustAllItemsHeight){if(e<=0)return;return void(a.style.height=e+"px")}var r=a.querySelector(".branding"),n=b(t,a,r);if(n<=0)return;a.style.height=n+"px";var i=T(a,"max-height",0);i>0&&i<n&&(a.style.maxHeight=n+"px")}(t,m)}),function(t){if(!f)return;var e=[];if(t.forEach(function(t){t.formatsData.renderedCtaButton&&e.push(t)}),e.length<=0)return;var a=!1;window.TRC.dom.on(window,"scroll",function(){if(!a)try{var t=!1;if(e.forEach(function(e){var r,n,i,o;t||(n=(r=e).getBoundingClientRect(),i=r.ownerDocument,o=i.defaultView||i.parentWindow,n.top>=0&&n.left>=0&&n.bottom<=(o.innerHeight||i.clientHeight)&&n.right<=(o.innerWidth||i.clientWidth)&&(t=!0,a=!0))}),!t)return;e.forEach(function(t){t.formatsData.sendAbTestEvent("visible","report");var e=t.querySelector(".video-label-box"),a=t.querySelector(".video-cta-href"),r=a.querySelector(".video-cta-button"),n=e.querySelector(".branding"),i=h(a,"ctaAnchor")||h(r,"ctaButton")||w(a,t,"ctaAnchor","videoCube")||w(a,e,"ctaAnchor","videoLabelBox")||w(r,a,"ctaButton","ctaAnchor")||p(a,n,"ctaAnchor","branding");i&&t.formatsData.sendAbTestEvent(i,"report")})}catch(t){}})}(l)}function v(t,e,a){var r=0,n=window.getComputedStyle(t,e,a);return n&&"none"!==n.content&&(a.formatsData.sendAbTestEvent("has_pseudo_el"),r=function(t,e){var a=parseInt(t.width),r=t.content;isNaN(a)&&r.length>0&&(a=_(e,r,t.fontWeight,t.fontSize,t.fontFamily),e.formatsData.sendAbTestEvent("has_text_pseudo_el"));return a}(n,a)),r}function _(t,e,a,r,n){try{if(null==e||""===e)return null;if(null==r&&(null==n||""===n))return null;if(null==c)return t.formatsData.sendAbTestEvent("measureText_no_canvas"),null;var i=c.getContext("2d");if(null==i)return t.formatsData.sendAbTestEvent("measureText_no_canvas_context"),null;var o=[];if(null!=a&&o.push(a.toString()),null!=r&&o.push(parseInt(r)+"px"),null!=n&&o.push(n),0===o.length)return t.formatsData.sendAbTestEvent("measureText_no_font_parts"),null;var s=o.join(" ");if(null==s||""===s)return t.formatsData.sendAbTestEvent("measureText_empty_font_value"),null;i.font=s;var l=i.measureText(e);return null==l?(t.formatsData.sendAbTestEvent("measureText_no_metrics"),null):l.width}catch(e){return t.formatsData.sendAbTestEvent("filtered_error_measure_text_list_suffix"),null}}function g(t,e,a){return'<svg class="cta-rating-star" height="9px" version="1.1" viewBox="0 0 9 9" width="9px" xmlns="http://www.w3.org/2000/svg">    <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">        <linearGradient id="lg'+e+"-"+t+'" x1="0" x2="1" y1="0.5" y2="0.5">            <stop offset="0" stop-color="#737373" stop-opacity="1"/>            <stop offset="'+a+'" stop-color="#737373" stop-opacity="1"/>            <stop offset="'+a+'" stop-color="#737373" stop-opacity="0.5"/>            <stop offset="1" stop-color="#737373" stop-opacity="0.5"/>        </linearGradient>        <g fill="url(#lg'+e+"-"+t+')" fill-rule="nonzero" transform="translate(-21.000000, -19.000000)">            <polygon points="25.5 26.4626165 22.7188471 28 23.25 24.7437694 21 22.4376941 24.1094235 21.9626165 25.5 19 26.8905765 21.9626165 30 22.4376941 27.75 24.7437694 28.2811529 28"></polygon>        </g>    </g></svg>'}function b(t,e,r){var n=x(e);if((!n||0===n)&&(n=T(e,"height"))<=0)return 0;if(!t.formatsData.shouldRenderAsCTA||!r)return t.rbox.formatsData.shouldAdjustAllItemsHeight?n:0;var i=t.formatsData.isAppInstall?o:0,s=D(r),l=n+i-s+Math.max(a,s);return l<=n?t.rbox.formatsData.shouldAdjustAllItemsHeight?n:0:l}function h(t,e){return"none"===T(t,"display","unknown")?e+"_display_none":null}function p(t,e,a,r){var n=t.getBoundingClientRect(),i=e.getBoundingClientRect();return n.top>i.bottom?a+"_below_"+r:n.bottom<i.top?a+"_above_"+r:null}function w(t,e,a,r){var n=p(t,e,a,r);if(n)return n;var i=t.getBoundingClientRect(),o=e.getBoundingClientRect();return i.left<o.left?a+"_left_border_outside_of_"+r:i.right>o.right?a+"_right_border_outside_of_"+r:i.bottom>o.bottom?a+"_bottom_border_outside_of_"+r:i.top<o.top?a+"_top_border_outside_of_"+r:null}function A(t){return t.querySelector(".item-label-href")}function y(t,e,a){if(e&&t){var r=T(t,a);r&&(e.style[a]=r)}}}},window.TRC.customHooks[e]=l}catch(t){window.__trcError("Error in CTA module: "+t.message)}}();