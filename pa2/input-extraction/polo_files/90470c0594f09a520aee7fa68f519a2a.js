(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';var n=this||self;function p(a,b){function c(){}c.prototype=b.prototype;a.I=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.F=function(d,f,h){for(var e=Array(arguments.length-2),g=2;g<arguments.length;g++)e[g-2]=arguments[g];return b.prototype[f].apply(d,e)}};var u=class{constructor(a,b){this.g=b===r?a:""}};u.prototype.i=!0;u.prototype.h=function(){return this.g.toString()};u.prototype.toString=function(){return this.g.toString()};function aa(a){return a instanceof u&&a.constructor===u?a.g:"type_error:SafeUrl"}var ba=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,r={};function v(a,b){b instanceof u||b instanceof u||(b="object"==typeof b&&b.i?b.h():String(b),ba.test(b)||(b="about:invalid#zClosurez"),b=new u(b,r));a.href=aa(b)};function w(a){w[" "](a);return a}w[" "]=function(){};var ca={},x=null;function A(){}var da="function"==typeof Uint8Array;function B(a,b,c){a.g=null;b||(b=[]);a.G=void 0;a.j=-1;a.h=b;a:{if(b=a.h.length){--b;var d=a.h[b];if(!(null===d||"object"!=typeof d||Array.isArray(d)||da&&d instanceof Uint8Array)){a.l=b-a.j;a.i=d;break a}}a.l=Number.MAX_VALUE}a.m={};if(c)for(b=0;b<c.length;b++)d=c[b],d<a.l?(d+=a.j,a.h[d]=a.h[d]||C):(D(a),a.i[d]=a.i[d]||C)}const C=[];function D(a){let b=a.l+a.j;a.h[b]||(a.i=a.h[b]={})}
function E(a,b){if(b<a.l){b+=a.j;var c=a.h[b];return c!==C?c:a.h[b]=[]}if(a.i)return c=a.i[b],c===C?a.i[b]=[]:c}function F(a,b,c){a=E(a,b);return null==a?c:a}function G(a,b){a=E(a,b);a=null==a?a:!!a;return null==a?!1:a}function ea(a,b){""!==b?2<a.l?a.h[2+a.j]=b:(D(a),a.i[2]=b):2<a.l?a.h[2+a.j]=null:(D(a),delete a.i[2])}function fa(a,b,c){a.g||(a.g={});if(!a.g[c]){var d=E(a,c);d&&(a.g[c]=new b(d))}return a.g[c]}
function H(a,b,c){a.g||(a.g={});if(!a.g[c]){var d=E(a,c);for(var f=[],h=0;h<d.length;h++)f[h]=new b(d[h]);a.g[c]=f}b=a.g[c];b==C&&(b=a.g[c]=[]);return b}function I(a){if(a.g)for(var b in a.g){var c=a.g[b];if(Array.isArray(c))for(var d=0;d<c.length;d++)c[d]&&I(c[d]);else c&&I(c)}return a.h}
A.prototype.D=da?function(){var a=Uint8Array.prototype.toJSON;Uint8Array.prototype.toJSON=function(){var b;void 0===b&&(b=0);if(!x){x={};for(var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),d=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var h=c.concat(d[f].split(""));ca[f]=h;for(var e=0;e<h.length;e++){var g=h[e];void 0===x[g]&&(x[g]=e)}}}b=ca[b];c=[];for(d=0;d<this.length;d+=3){var k=this[d],l=(f=d+1<this.length)?this[d+1]:0;g=(h=d+2<this.length)?this[d+2]:0;e=k>>2;
k=(k&3)<<4|l>>4;l=(l&15)<<2|g>>6;g&=63;h||(g=64,f||(l=64));c.push(b[e],b[k],b[l]||"",b[g]||"")}return c.join("")};try{return JSON.stringify(this.h&&I(this),ha)}finally{Uint8Array.prototype.toJSON=a}}:function(){return JSON.stringify(this.h&&I(this),ha)};function ha(a,b){return"number"!==typeof b||!isNaN(b)&&Infinity!==b&&-Infinity!==b?b:String(b)}A.prototype.toString=function(){return I(this).toString()};function ia(a){B(this,a,null)}p(ia,A);function ma(a,b){if(!a||/[?&]dsh=1(&|$)/.test(a))return null;if(/[?&]ae=1(&|$)/.test(a)){var c=/[?&]adurl=([^&]+)/.exec(a);if(!c)return null;b=b?c.index:a.length;try{return{u:a.slice(0,b)+"&act=1"+a.slice(b),v:decodeURIComponent(c[1])}}catch(d){return null}}if(/[?&]ae=2(&|$)/.test(a)){c=a;let d="";b&&(b=a.indexOf("&adurl="),0<b&&(c=a.slice(0,b),d=a.slice(b)));return{u:`${c}&act=1${d}`,v:`${c}&dct=1${d}`}}return null};class na{constructor(a,b){this.error=a;this.context=b.context;this.msg=b.message||"";this.id=b.id||"jserror";this.meta={}}};var oa=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function pa(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)pa(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function qa(a,b){var c=[];for(d in b)pa(d,b[d],c);b=c.join("&");if(b){c=a.indexOf("#");0>c&&(c=a.length);var d=a.indexOf("?");if(0>d||d>c){d=c;var f=""}else f=a.substring(d+1,c);a=[a.substr(0,d),f,a.substr(c)];c=a[1];a[1]=b?c?c+"&"+b:b:c;a=a[0]+(a[1]?"?"+a[1]:"")+a[2]}return a};function J(a){try{var b;if(b=!!a&&null!=a.location.href)a:{try{w(a.foo);b=!0;break a}catch(c){}b=!1}return b}catch(c){return!1}}function ra(a,b){if(a)for(const c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.call(void 0,a[c],c,a)};function sa(a,b){a.google_image_requests||(a.google_image_requests=[]);const c=a.document.createElement("img");c.src=b;a.google_image_requests.push(c)}var ta=a=>{var b;if(b=n.navigator)b=n.navigator.userAgent,b=/Chrome/.test(b)&&!/Edge/.test(b)?!0:!1;b&&n.navigator.sendBeacon?n.navigator.sendBeacon(a):sa(n,a)};var ua=document,va=window;var wa={};var xa=class{};class K extends xa{constructor(a){super();if(wa!==wa)throw Error("Bad secret");this.g=a}toString(){return this.g}}var N=new K("about:invalid#zTSz");function ya(a){if(a instanceof xa)if(a instanceof K)a=a.g;else throw Error("wrong type");else a=aa(a);return a};class za{constructor(a){this.C=a}}function O(a){return new za(b=>b.substr(0,a.length+1).toLowerCase()===a+":")}const Aa=new za(a=>/^[^:]*([/?#]|$)/.test(a));var Ba=O("http"),Ca=O("https"),Da=O("ftp"),Ea=O("mailto"),Fa=O("intent"),Ga=O("market"),Ha=O("itms"),Ia=O("itms-appss");const Ja=[O("data"),Ba,Ca,Ea,Da,Aa];function Ka(a,b=Ja){for(let c=0;c<b.length;++c){const d=b[c];if(d instanceof za&&d.C(a))return new K(a)}}function La(a,b=Ja){return Ka(a,b)||N};const Ma=[Ba,Ca,Ea,Da,Aa,Ga,Ha,Fa,Ia];function Na(a,b){if(a instanceof u)return a;const c=La(a,Ma);c===N&&b(a);return new u(ya(c),r)}var Oa=()=>{var a=`${"http:"===va.location.protocol?"http:":"https:"}//${"pagead2.googlesyndication.com"}/pagead/gen_204`;return b=>{b=qa(a,{id:"unsafeurl",ctx:599,url:b});navigator.sendBeacon&&navigator.sendBeacon(b,"")}};var Pa=!!window.google_async_iframe_id;let P=Pa&&window.parent||window;const Qa=/^https?:\/\/(\w|-)+\.cdn\.ampproject\.(net|org)(\?|\/|$)/;var Ra=class{constructor(a,b){this.g=a;this.h=b}},Sa=class{constructor(a,b){this.url=a;this.A=!!b;this.depth=null}};function Q(a,b){const c={};c[a]=b;return[c]}function Ta(a,b,c,d,f){const h=[];ra(a,function(e,g){(e=Ua(e,b,c,d,f))&&h.push(g+"="+e)});return h.join(b)}
function Ua(a,b,c,d,f){if(null==a)return"";b=b||"&";c=c||",$";"string"==typeof c&&(c=c.split(""));if(a instanceof Array){if(d=d||0,d<c.length){const h=[];for(let e=0;e<a.length;e++)h.push(Ua(a[e],b,c,d+1,f));return h.join(c[d])}}else if("object"==typeof a)return f=f||0,2>f?encodeURIComponent(Ta(a,b,c,d,f+1)):"...";return encodeURIComponent(String(a))}function Va(a){let b=1;for(const c in a.h)b=c.length>b?c.length:b;return 3997-b-a.i.length-1}
function Wa(a){let b="https://pagead2.googlesyndication.com/pagead/gen_204unsafeurl&",c=Va(a)-25;if(0>c)return"";a.g.sort(function(h,e){return h-e});let d=null,f="";for(let h=0;h<a.g.length;h++){const e=a.g[h],g=a.h[e];for(let k=0;k<g.length;k++){if(!c){d=null==d?e:d;break}let l=Ta(g[k],a.i,",$");if(l){l=f+l;if(c>=l.length){c-=l.length;b+=l;f=a.i;break}d=null==d?e:d}}}a="";null!=d&&(a=f+"trn="+d);return b+a}class Xa{constructor(){this.i="&";this.h={};this.j=0;this.g=[]}};function Ya(a){if(1>Math.random())try{let b;a instanceof Xa?b=a:(b=new Xa,ra(a,(d,f)=>{var h=b,e=h.j++;d=Q(f,d);h.g.push(e);h.h[e]=d}));const c=Wa(b);c&&ta(c)}catch(b){}};let R=null;var Za=()=>{const a=n.performance;return a&&a.now&&a.timing?Math.floor(a.now()+a.timing.navigationStart):Date.now()},$a=()=>{const a=n.performance;return a&&a.now?a.now():null};class ab{constructor(a,b){var c=$a()||Za();this.label=a;this.type=b;this.value=c;this.duration=0;this.uniqueId=Math.random();this.slotId=void 0}};const T=n.performance,bb=!!(T&&T.mark&&T.measure&&T.clearMarks),U=function(a){let b=!1,c;return function(){b||(c=a(),b=!0);return c}}(()=>{var a;if(a=bb){var b;if(null===R){R="";try{a="";try{a=n.top.location.hash}catch(c){a=n.location.hash}a&&(R=(b=a.match(/\bdeid=([\d,]+)/))?b[1]:"")}catch(c){}}b=R;a=!!b.indexOf&&0<=b.indexOf("1337")}return a});function cb(a){a&&T&&U()&&(T.clearMarks(`goog_${a.label}_${a.uniqueId}_start`),T.clearMarks(`goog_${a.label}_${a.uniqueId}_end`))}
class ib{constructor(){var a=V;this.events=[];this.h=a||n;let b=null;a&&(a.google_js_reporting_queue=a.google_js_reporting_queue||[],this.events=a.google_js_reporting_queue,b=a.google_measure_js_timing);this.g=U()||(null!=b?b:1>Math.random())}start(a,b){if(!this.g)return null;a=new ab(a,b);b=`goog_${a.label}_${a.uniqueId}_start`;T&&U()&&T.mark(b);return a}end(a){if(this.g&&"number"===typeof a.value){a.duration=($a()||Za())-a.value;var b=`goog_${a.label}_${a.uniqueId}_end`;T&&U()&&T.mark(b);!this.g||
2048<this.events.length||this.events.push(a)}}};function jb(a){let b=a.toString();a.name&&-1==b.indexOf(a.name)&&(b+=": "+a.name);a.message&&-1==b.indexOf(a.message)&&(b+=": "+a.message);if(a.stack){a=a.stack;try{-1==a.indexOf(b)&&(a=b+"\n"+a);let c;for(;a!=c;)c=a,a=a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,"$1");b=a.replace(/\n */g,"\n")}catch(c){}}return b};if(Pa&&!J(P)){let a="."+ua.domain;try{for(;2<a.split(".").length&&!J(P);)ua.domain=a=a.substr(a.indexOf(".")+1),P=window.parent}catch(b){}J(P)||(P=window)}const V=P,W=new ib;var kb=()=>{V.google_measure_js_timing||(W.g=!1,W.events!=W.h.google_js_reporting_queue&&(U()&&Array.prototype.forEach.call(W.events,cb,void 0),W.events.length=0))};"number"!==typeof V.google_srt&&(V.google_srt=Math.random());
if("complete"==V.document.readyState)kb();else if(W.g){var lb=()=>{kb()},nb=V;nb.addEventListener&&nb.addEventListener("load",lb,!1)};function ob(a){const {s:b,o:c}=pb(a.href);v(a,Na(b,Oa()));return c}function qb(a,b,c=-1){if(b)if(300>Date.now()-c)a=!1;else if(b=a.getAttribute("data-orig-async-clicktrack-url")){const {s:d,o:f}=pb(b);v(a,Na(d,Oa()));a=f}else a.setAttribute("data-orig-async-clicktrack-url",a.href),a=ob(a);else a=ob(a);return a}function pb(a){const b=ma(a,!0);return b?navigator.sendBeacon?navigator.sendBeacon(rb(b.u,"&ri=1"),"")?{s:b.v,o:!0}:{s:rb(a,"&ri=2"),o:!1}:{s:rb(a,"&ri=16"),o:!1}:{s:a,o:!1}}
function rb(a,b){const c=a.search(/&adurl=/);return 0>c?a+b:a.slice(0,c)+b+a.slice(c)}function sb(a){return null!=a&&-1===a.indexOf("dbm/clk")&&null!==ma(a)};function tb(a,b,c=!1){if(!isNaN(b)&&0<b){var d=a.dataset.onReadyTs;d=d?parseInt(d,10):NaN;!c&&!isNaN(d)&&0<d||(a.dataset.onReadyTs=String(b))}};var ub=class{j(){}};function vb(a){B(this,a,null)}p(vb,A);function wb(a){B(this,a,xb)}p(wb,A);var xb=[1];function yb(a){B(this,a,zb)}p(yb,A);var zb=[1,2];function Ab(a){B(this,a,null)}p(Ab,A);function Bb(a,b){(a=F(a,5,""))&&sa(va,a+"&label="+b)}function Cb(a,b){!isNaN(b)&&0<b&&(isNaN(a.g)||a.g<b)&&(a.g=b)}
function Db(a,b,c){const d=fa(b,yb,4);if(!d)return!0;for(var f of H(d,wb,1)){a:{var h=f;var e=c,g=F(h,2,"");g=g?document.querySelectorAll(g):[e.currentTarget];for(let q=0;q<g.length;++q){const t=g[q].getBoundingClientRect();var k=h,l=E(k,1);k.m||(k.m={});if(!k.m[1]){for(var m=0;m<l.length;m++)l[m]=+l[m];k.m[1]=!0}k=l;m=e.clientX;l=e.clientY;if(m>=t.left&&m<=t.right&&l>=t.top&&l<=t.bottom&&(l-k[0]<t.top||m+k[1]>t.right||l+k[2]>t.bottom||m-k[3]<t.left)){h=!1;break a}}h=!0}if(!h)return Bb(b,"blocked_border_click"),
!1}for(const q of H(d,vb,2))if(f=a,h=q,e=c.currentTarget,g=e.dataset.onReadyTs,Cb(f,g?parseInt(g,10):NaN),e=e.dataset.onShowTs,Cb(f,e?parseInt(e,10):NaN),e=f.g,isNaN(e)||!(0<e)||Date.now()<f.g+F(h,1,0))return Bb(b,"blocked_fast_click"),!1;return G(d,3)&&"function"==typeof n.copfcChm?(n.copfcChm(c),Bb(b,"onepointfiveclick_first_click"),!1):!0}class Eb{constructor(){this.g=NaN}};function Fb(){return a=>{a=qa("https://pagead2.googlesyndication.com/pagead/gen_204",{id:"unsafeurl",ctx:620,url:a});navigator.sendBeacon&&navigator.sendBeacon(a,"")}};function Gb(a,b){const c=La(a,Hb);if(c===N){a=Error("URL not recognized as safe: "+a);let y;try{const z=new Xa;var d=z;d.g.push(1);d.h[1]=Q("context",b);a.error&&a.meta&&a.id||(a=new na(a,{message:jb(a)}));if(a.msg){d=z;var f=a.msg.substring(0,512);d.g.push(2);d.h[2]=Q("msg",f)}f=z;var h=[a.meta||{}];f.g.push(3);f.h[3]=h;a=n;h=[];f=null;do{var e=a;if(J(e)){var g=e.location.href;f=e.document&&e.document.referrer||null}else g=f,f=null;h.push(new Sa(g||""));try{a=e.parent}catch(L){a=null}}while(a&&e!=
a);for(let L=0,db=h.length-1;L<=db;++L)h[L].depth=db-L;e=n;if(e.location&&e.location.ancestorOrigins&&e.location.ancestorOrigins.length==h.length-1)for(g=1;g<h.length;++g){var k=h[g];k.url||(k.url=e.location.ancestorOrigins[g-1]||"",k.A=!0)}var l=h;let S=new Sa(n.location.href,!1);e=null;const ka=l.length-1;for(k=ka;0<=k;--k){var m=l[k];!e&&Qa.test(m.url)&&(e=m);if(m.url&&!m.A){S=m;break}}m=null;const Kb=l.length&&l[ka].url;0!=S.depth&&Kb&&(m=l[ka]);y=new Ra(S,m);if(y.h){l=z;var q=y.h.url||"";l.g.push(4);
l.h[4]=Q("top",q)}var t={url:y.g.url||""};if(y.g.url){var la=y.g.url.match(oa),M=la[1],eb=la[3],fb=la[4];q="";M&&(q+=M+":");eb&&(q+="//",q+=eb,fb&&(q+=":"+fb));var gb=q}else gb="";M=z;t=[t,{url:gb}];M.g.push(5);M.h[5]=t;Ya(z)}catch(z){try{Ya({context:"ecmserr",rctx:b,msg:jb(z),url:y&&y.g.url})}catch(S){}}}return c}var Hb=[Ca,Fa,Ga,Ha,Ia];function X(a,b){a.dispatchEvent(new CustomEvent("customError",{detail:{message:b}}))}
function Y(a){const b=a.currentTarget;let c=a.type;null!=a.clientX&&null!=a.clientY&&(c+=` [${a.clientX},${a.clientY}]`);a=a.target;let d=!1,f=!1,h=!1;for(;a!==b;){var e=a.attributes;for(var g=0;g<e.length;++g){var k=e[g];!d&&k.name.match(/^x-.+-l$/)?(c="[l="+k.value+"]"+c,d=!0):!f&&k.name.match(/^x-.+-v$/)?(c="[v="+k.value+"]"+c,f=!0):!h&&k.name.match(/^x-.+-e$/)&&(c="[e="+k.value+"]"+c,h=!0)}e=a.parentElement||b;if(!h)for(g=e.children,k=0;k<g.length;k++)if(g[k]===a){c=`>${k}`+c;break}a=e}return c}
;function Ib(a,b){a.g=b}function Jb(a){for(;!a.id;){const b="goog-js-util-"+Math.random().toString(36).substr(2,5);if(!document.getElementById(b)){a.id=b;break}}return a.id}var Lb=class{constructor(){this.g=!1}};function Mb(a){B(this,a,Nb)}p(Mb,A);var Nb=[1];function Ob(a,b,c){Ib(a.l,G(b,2));G(b,4)&&(c.dataset.useCustomTabsInSdk="true");if(F(b,5,""))for(a=c.querySelectorAll(F(b,5,"")),b=0;b<a.length;++b)a[b].addEventListener("click",()=>{})}
function Pb(a,b){let c=null,d=null;b.addEventListener("mousedown",f=>{for(var h=f.currentTarget,e=f.target;null!==e&&e!==h.parentElement&&"A"!==e.tagName;)e=e.parentElement;c=e===h.parentElement?null:e;a:{if(null!=a.g){h=f.currentTarget;e=f.target;if(G(a.g,2)&&1==e.children.length&&"SPAN"==e.children[0].tagName){var g=e.children[0],k=g.getBoundingClientRect();k.left<=f.clientX&&f.clientX<=k.right&&k.top<=f.clientY&&f.clientY<=k.bottom&&(e=g)}for(g=H(a.g,Ab,1);e!=h.parentElement;){e.matches=e.matches||
e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector;for(k=0;k<g.length;++k){const l=g[k];if(e.matches(F(l,1,""))){d=l;break a}}e=e.parentElement}}d=null}if(c&&d&&F(d,2,"")){e=d;h=c;if(g=F(e,2,""))v(h,new u(ya(Gb(g,618)),r)),h.target=F(e,3,"")||"_top";delete h.dataset.u2FinalUrl;delete h.dataset.u2TrackingUrl;(g=F(e,6,""))&&(h.dataset.u2FinalUrl=g);(g=F(e,7,""))&&(h.dataset.u2TrackingUrl=g);delete h.dataset.appClickInfo;(e=fa(e,ia,9))&&(h.dataset.appClickInfo=e.D());
h=f.currentTarget;"function"===typeof window.st?window.st(Jb(c)):X(h,`js-util: st() missing: ${Y(f)}`);G(a.g,6)&&c.dispatchEvent(new CustomEvent("CUSTOM_MOUSE_DOWN",{bubbles:!0}))}});b.addEventListener("click",f=>{if(c&&d&&F(d,2,"")&&Db(a.m,d,f)&&!f.defaultPrevented){var h=c,e=f.currentTarget;a:{var g=f.currentTarget;var k=f.target;if(a.l.g&&1==k.children.length&&"SPAN"==k.children[0].tagName){var l=k.children[0];const m=l.getBoundingClientRect();m.left<=f.clientX&&f.clientX<=m.right&&m.top<=f.clientY&&
f.clientY<=m.bottom&&(k=l)}for(;k!=g;){l=k.getAttribute("x-code");if(null!=l){g=parseInt(l,10);break a}k=k.parentElement}g=17}k=g;"function"===typeof window.ja?window.ja(Jb(h),k):X(e,`js-util: ja() missing: ${Y(f)}`);e=f.currentTarget;(g=h.href)?(l=[],0==/&nb=[^&]+/i.test(g)&&l.push("&nb="+k),0==/&nx=[^&]+/i.test(g)&&l.push("&nx="+Math.round(f.clientX-e.offsetLeft)),0==/&ny=[^&]+/i.test(g)&&l.push("&ny="+Math.round(f.clientY-e.offsetTop)),0<l.length&&(k=l.join(""),l=g.indexOf("&adurl="),g=0>l?g+k:
g.substring(0,l)+k+g.substring(l),v(h,Na(g,Fb())),X(e,`js-util: ja() filling: ${k} ${Y(f)}`))):X(e,`js-util: href is empty: ${Y(f)}`);h=c;e=F(d,2,"");g=e.indexOf("&adurl=");0>g||(e=e.slice(g),g=h.href||"",k=g.indexOf(e),0>k||(l=g.slice(k+e.length))&&v(h,new u(ya(Gb(g.slice(0,k)+l+e,619)),r)));G(a.g,6)?(c.dispatchEvent(new CustomEvent("CUSTOM_CLICK",{bubbles:!0})),f.stopImmediatePropagation(),f.preventDefault()):(f=c,(sb(f.href)||f.getAttribute("data-orig-async-clicktrack-url")&&sb(f.getAttribute("data-orig-async-clicktrack-url")))&&
G(d,8)&&qb(c,G(d,10),a.i)&&(a.i=Date.now()))}else f.stopImmediatePropagation(),f.preventDefault()})}function Qb(a,b){if(b instanceof CustomEvent&&b.detail.B instanceof Set)for(const c of b.detail.B)b=H(a.g,Ab,1).find(d=>F(d,1,"")===c.H),void 0!==b&&ea(b,c.href)}
var Rb=class extends ub{constructor(){super();this.g=null;this.m=new Eb;this.l=new Lb;this.h=!1;this.i=-1}j(a){a:{var b=a.getElementsByTagName("META");for(let c=0;c<b.length;++c)if("exit"===b[c].getAttribute("name")){b=b[c].getAttribute("content")||"";break a}b=""}if(this.g=b?new Mb(b?JSON.parse(b):null):null)tb(a,Date.now(),G(this.g,7)),Ob(this,this.g,a),this.h||(this.h=!0,Pb(this,a))}};const Z=document.getElementById("mys-content");if(Z){const a=new Rb;Z.addEventListener("browserReady",()=>{a.j(Z)});Z.addEventListener("changeExitConfig",b=>void Qb(a,b))};}).call(this);
