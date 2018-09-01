"no use strict"
!function(e){if(!(void 0!==e.window&&e.document||e.require&&e.define)){e.console||(e.console=function(){var e=Array.prototype.slice.call(arguments,0)
postMessage({type:"log",data:e})},e.console.error=e.console.warn=e.console.log=e.console.trace=e.console),e.window=e,e.ace=e,e.onerror=function(e,t,n,r,i){postMessage({type:"error",data:{message:e,data:i.data,file:t,line:n,col:r,stack:i.stack}})},e.normalizeModule=function(t,n){if(-1!==n.indexOf("!")){var r=n.split("!")
return e.normalizeModule(t,r[0])+"!"+e.normalizeModule(t,r[1])}if("."==n.charAt(0)){var i=t.split("/").slice(0,-1).join("/")
for(n=(i?i+"/":"")+n;-1!==n.indexOf(".")&&o!=n;){var o=n
n=n.replace(/^\.\//,"").replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}}return n},e.require=function(t,n){if(n||(n=t,t=null),!n.charAt)throw new Error("worker.js require() accepts only (parentId, id) as arguments")
n=e.normalizeModule(t,n)
var r=e.require.modules[n]
if(r)return r.initialized||(r.initialized=!0,r.exports=r.factory().exports),r.exports
if(!e.require.tlns)return console.log("unable to load "+n)
var i=function(e,t){for(var n=e,r="";n;){var i=t[n]
if("string"==typeof i)return i+r
if(i)return i.location.replace(/\/*$/,"/")+(r||i.main||i.name)
if(!1===i)return""
var o=n.lastIndexOf("/")
if(-1===o)break
r=n.substr(o)+r,n=n.slice(0,o)}return e}(n,e.require.tlns)
return".js"!=i.slice(-3)&&(i+=".js"),e.require.id=n,e.require.modules[n]={},importScripts(i),e.require(t,n)},e.require.modules={},e.require.tlns={},e.define=function(t,n,r){if(2==arguments.length?(r=n,"string"!=typeof t&&(n=t,t=e.require.id)):1==arguments.length&&(r=t,n=[],t=e.require.id),"function"==typeof r){n.length||(n=["require","exports","module"])
var i=function(n){return e.require(t,n)}
e.require.modules[t]={exports:{},factory:function(){var e=this,t=r.apply(this,n.map(function(t){switch(t){case"require":return i
case"exports":return e.exports
case"module":return e
default:return i(t)}}))
return t&&(e.exports=t),e}}}else e.require.modules[t]={exports:r,initialized:!0}},e.define.amd={},require.tlns={},e.initBaseUrls=function(e){for(var t in e)require.tlns[t]=e[t]},e.initSender=function(){var t=e.require("ace/lib/event_emitter").EventEmitter,n=e.require("ace/lib/oop"),r=function(){}
return function(){n.implement(this,t),this.callback=function(e,t){postMessage({type:"call",id:t,data:e})},this.emit=function(e,t){postMessage({type:"event",name:e,data:t})}}.call(r.prototype),new r}
var t=e.main=null,n=e.sender=null
e.onmessage=function(r){var i=r.data
if(i.event&&n)n._signal(i.event,i.data)
else if(i.command)if(t[i.command])t[i.command].apply(t,i.args)
else{if(!e[i.command])throw new Error("Unknown command:"+i.command)
e[i.command].apply(e,i.args)}else if(i.init){e.initBaseUrls(i.tlns),require("ace/lib/es5-shim"),n=e.sender=e.initSender()
var o=require(i.module)[i.classname]
t=e.main=new o(n)}}}}(this),ace.define("ace/lib/oop",["require","exports","module"],function(e,t,n){"use strict"
t.inherits=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})},t.mixin=function(e,t){for(var n in t)e[n]=t[n]
return e},t.implement=function(e,n){t.mixin(e,n)}}),ace.define("ace/range",["require","exports","module"],function(e,t,n){"use strict"
var r=function(e,t,n,r){this.start={row:e,column:t},this.end={row:n,column:r}};(function(){this.isEqual=function(e){return this.start.row===e.start.row&&this.end.row===e.end.row&&this.start.column===e.start.column&&this.end.column===e.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(e,t){return 0==this.compare(e,t)},this.compareRange=function(e){var t,n=e.end,r=e.start
return 1==(t=this.compare(n.row,n.column))?1==(t=this.compare(r.row,r.column))?2:0==t?1:0:-1==t?-2:-1==(t=this.compare(r.row,r.column))?-1:1==t?42:0},this.comparePoint=function(e){return this.compare(e.row,e.column)},this.containsRange=function(e){return 0==this.comparePoint(e.start)&&0==this.comparePoint(e.end)},this.intersects=function(e){var t=this.compareRange(e)
return-1==t||0==t||1==t},this.isEnd=function(e,t){return this.end.row==e&&this.end.column==t},this.isStart=function(e,t){return this.start.row==e&&this.start.column==t},this.setStart=function(e,t){"object"==typeof e?(this.start.column=e.column,this.start.row=e.row):(this.start.row=e,this.start.column=t)},this.setEnd=function(e,t){"object"==typeof e?(this.end.column=e.column,this.end.row=e.row):(this.end.row=e,this.end.column=t)},this.inside=function(e,t){return 0==this.compare(e,t)&&(!this.isEnd(e,t)&&!this.isStart(e,t))},this.insideStart=function(e,t){return 0==this.compare(e,t)&&!this.isEnd(e,t)},this.insideEnd=function(e,t){return 0==this.compare(e,t)&&!this.isStart(e,t)},this.compare=function(e,t){return this.isMultiLine()||e!==this.start.row?e<this.start.row?-1:e>this.end.row?1:this.start.row===e?t>=this.start.column?0:-1:this.end.row===e?t<=this.end.column?0:1:0:t<this.start.column?-1:t>this.end.column?1:0},this.compareStart=function(e,t){return this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.compareEnd=function(e,t){return this.end.row==e&&this.end.column==t?1:this.compare(e,t)},this.compareInside=function(e,t){return this.end.row==e&&this.end.column==t?1:this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.clipRows=function(e,t){if(this.end.row>t)var n={row:t+1,column:0}
else if(this.end.row<e)n={row:e,column:0}
if(this.start.row>t)var i={row:t+1,column:0}
else if(this.start.row<e)i={row:e,column:0}
return r.fromPoints(i||this.start,n||this.end)},this.extend=function(e,t){var n=this.compare(e,t)
if(0==n)return this
if(-1==n)var i={row:e,column:t}
else var o={row:e,column:t}
return r.fromPoints(i||this.start,o||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return r.fromPoints(this.start,this.end)},this.collapseRows=function(){return 0==this.end.column?new r(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new r(this.start.row,0,this.end.row,0)},this.toScreenRange=function(e){var t=e.documentToScreenPosition(this.start),n=e.documentToScreenPosition(this.end)
return new r(t.row,t.column,n.row,n.column)},this.moveBy=function(e,t){this.start.row+=e,this.start.column+=t,this.end.row+=e,this.end.column+=t}}).call(r.prototype),r.fromPoints=function(e,t){return new r(e.row,e.column,t.row,t.column)},r.comparePoints=function(e,t){return e.row-t.row||e.column-t.column},r.comparePoints=function(e,t){return e.row-t.row||e.column-t.column},t.Range=r}),ace.define("ace/apply_delta",["require","exports","module"],function(e,t,n){"use strict"
t.applyDelta=function(e,t,n){var r=t.start.row,i=t.start.column,o=e[r]||""
switch(t.action){case"insert":if(1===t.lines.length)e[r]=o.substring(0,i)+t.lines[0]+o.substring(i)
else{var s=[r,1].concat(t.lines)
e.splice.apply(e,s),e[r]=o.substring(0,i)+e[r],e[r+t.lines.length-1]+=o.substring(i)}break
case"remove":var a=t.end.column,c=t.end.row
r===c?e[r]=o.substring(0,i)+o.substring(a):e.splice(r,c-r+1,o.substring(0,i)+e[c].substring(a))}}}),ace.define("ace/lib/event_emitter",["require","exports","module"],function(e,t,n){"use strict"
var r={},i=function(){this.propagationStopped=!0},o=function(){this.defaultPrevented=!0}
r._emit=r._dispatchEvent=function(e,t){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={})
var n=this._eventRegistry[e]||[],r=this._defaultHandlers[e]
if(n.length||r){"object"==typeof t&&t||(t={}),t.type||(t.type=e),t.stopPropagation||(t.stopPropagation=i),t.preventDefault||(t.preventDefault=o),n=n.slice()
for(var s=0;s<n.length&&(n[s](t,this),!t.propagationStopped);s++);return r&&!t.defaultPrevented?r(t,this):void 0}},r._signal=function(e,t){var n=(this._eventRegistry||{})[e]
if(n){n=n.slice()
for(var r=0;r<n.length;r++)n[r](t,this)}},r.once=function(e,t){var n=this
t&&this.addEventListener(e,function r(){n.removeEventListener(e,r),t.apply(null,arguments)})},r.setDefaultHandler=function(e,t){var n=this._defaultHandlers
if(n||(n=this._defaultHandlers={_disabled_:{}}),n[e]){var r=n[e],i=n._disabled_[e]
i||(n._disabled_[e]=i=[]),i.push(r)
var o=i.indexOf(t);-1!=o&&i.splice(o,1)}n[e]=t},r.removeDefaultHandler=function(e,t){var n=this._defaultHandlers
if(n){var r=n._disabled_[e]
if(n[e]==t){n[e]
r&&this.setDefaultHandler(e,r.pop())}else if(r){var i=r.indexOf(t);-1!=i&&r.splice(i,1)}}},r.on=r.addEventListener=function(e,t,n){this._eventRegistry=this._eventRegistry||{}
var r=this._eventRegistry[e]
return r||(r=this._eventRegistry[e]=[]),-1==r.indexOf(t)&&r[n?"unshift":"push"](t),t},r.off=r.removeListener=r.removeEventListener=function(e,t){this._eventRegistry=this._eventRegistry||{}
var n=this._eventRegistry[e]
if(n){var r=n.indexOf(t);-1!==r&&n.splice(r,1)}},r.removeAllListeners=function(e){this._eventRegistry&&(this._eventRegistry[e]=[])},t.EventEmitter=r}),ace.define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(e,t,n){"use strict"
var r=e("./lib/oop"),i=e("./lib/event_emitter").EventEmitter,o=t.Anchor=function(e,t,n){this.$onChange=this.onChange.bind(this),this.attach(e),void 0===n?this.setPosition(t.row,t.column):this.setPosition(t,n)};(function(){function e(e,t,n){var r=n?e.column<=t.column:e.column<t.column
return e.row<t.row||e.row==t.row&&r}r.implement(this,i),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.$insertRight=!1,this.onChange=function(t){if(!(t.start.row==t.end.row&&t.start.row!=this.row||t.start.row>this.row)){var n=function(t,n,r){var i="insert"==t.action,o=(i?1:-1)*(t.end.row-t.start.row),s=(i?1:-1)*(t.end.column-t.start.column),a=t.start,c=i?a:t.end
return e(n,a,r)?{row:n.row,column:n.column}:e(c,n,!r)?{row:n.row+o,column:n.column+(n.row==c.row?s:0)}:{row:a.row,column:a.column}}(t,{row:this.row,column:this.column},this.$insertRight)
this.setPosition(n.row,n.column,!0)}},this.setPosition=function(e,t,n){var r
if(r=n?{row:e,column:t}:this.$clipPositionToDocument(e,t),this.row!=r.row||this.column!=r.column){var i={row:this.row,column:this.column}
this.row=r.row,this.column=r.column,this._signal("change",{old:i,value:r})}},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.attach=function(e){this.document=e||this.document,this.document.on("change",this.$onChange)},this.$clipPositionToDocument=function(e,t){var n={}
return e>=this.document.getLength()?(n.row=Math.max(0,this.document.getLength()-1),n.column=this.document.getLine(n.row).length):e<0?(n.row=0,n.column=0):(n.row=e,n.column=Math.min(this.document.getLine(n.row).length,Math.max(0,t))),t<0&&(n.column=0),n}}).call(o.prototype)}),ace.define("ace/document",["require","exports","module","ace/lib/oop","ace/apply_delta","ace/lib/event_emitter","ace/range","ace/anchor"],function(e,t,n){"use strict"
var r=e("./lib/oop"),i=e("./apply_delta").applyDelta,o=e("./lib/event_emitter").EventEmitter,s=e("./range").Range,a=e("./anchor").Anchor,c=function(e){this.$lines=[""],0===e.length?this.$lines=[""]:Array.isArray(e)?this.insertMergedLines({row:0,column:0},e):this.insert({row:0,column:0},e)};(function(){r.implement(this,o),this.setValue=function(e){var t=this.getLength()-1
this.remove(new s(0,0,t,this.getLine(t).length)),this.insert({row:0,column:0},e)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(e,t){return new a(this,e,t)},0==="aaa".split(/a/).length?this.$split=function(e){return e.replace(/\r\n|\r/g,"\n").split("\n")}:this.$split=function(e){return e.split(/\r\n|\r|\n/)},this.$detectNewLine=function(e){var t=e.match(/^.*?(\r\n|\r|\n)/m)
this.$autoNewLine=t?t[1]:"\n",this._signal("changeNewLineMode")},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n"
case"unix":return"\n"
default:return this.$autoNewLine||"\n"}},this.$autoNewLine="",this.$newLineMode="auto",this.setNewLineMode=function(e){this.$newLineMode!==e&&(this.$newLineMode=e,this._signal("changeNewLineMode"))},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(e){return"\r\n"==e||"\r"==e||"\n"==e},this.getLine=function(e){return this.$lines[e]||""},this.getLines=function(e,t){return this.$lines.slice(e,t+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(e){return this.getLinesForRange(e).join(this.getNewLineCharacter())},this.getLinesForRange=function(e){var t
if(e.start.row===e.end.row)t=[this.getLine(e.start.row).substring(e.start.column,e.end.column)]
else{(t=this.getLines(e.start.row,e.end.row))[0]=(t[0]||"").substring(e.start.column)
var n=t.length-1
e.end.row-e.start.row==n&&(t[n]=t[n].substring(0,e.end.column))}return t},this.insertLines=function(e,t){return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."),this.insertFullLines(e,t)},this.removeLines=function(e,t){return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."),this.removeFullLines(e,t)},this.insertNewLine=function(e){return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."),this.insertMergedLines(e,["",""])},this.insert=function(e,t){return this.getLength()<=1&&this.$detectNewLine(t),this.insertMergedLines(e,this.$split(t))},this.insertInLine=function(e,t){var n=this.clippedPos(e.row,e.column),r=this.pos(e.row,e.column+t.length)
return this.applyDelta({start:n,end:r,action:"insert",lines:[t]},!0),this.clonePos(r)},this.clippedPos=function(e,t){var n=this.getLength()
void 0===e?e=n:e<0?e=0:e>=n&&(e=n-1,t=void 0)
var r=this.getLine(e)
return void 0==t&&(t=r.length),t=Math.min(Math.max(t,0),r.length),{row:e,column:t}},this.clonePos=function(e){return{row:e.row,column:e.column}},this.pos=function(e,t){return{row:e,column:t}},this.$clipPosition=function(e){var t=this.getLength()
return e.row>=t?(e.row=Math.max(0,t-1),e.column=this.getLine(t-1).length):(e.row=Math.max(0,e.row),e.column=Math.min(Math.max(e.column,0),this.getLine(e.row).length)),e},this.insertFullLines=function(e,t){var n=0;(e=Math.min(Math.max(e,0),this.getLength()))<this.getLength()?(t=t.concat([""]),n=0):(t=[""].concat(t),e--,n=this.$lines[e].length),this.insertMergedLines({row:e,column:n},t)},this.insertMergedLines=function(e,t){var n=this.clippedPos(e.row,e.column),r={row:n.row+t.length-1,column:(1==t.length?n.column:0)+t[t.length-1].length}
return this.applyDelta({start:n,end:r,action:"insert",lines:t}),this.clonePos(r)},this.remove=function(e){var t=this.clippedPos(e.start.row,e.start.column),n=this.clippedPos(e.end.row,e.end.column)
return this.applyDelta({start:t,end:n,action:"remove",lines:this.getLinesForRange({start:t,end:n})}),this.clonePos(t)}
this.removeInLine=function(e,t,n){var r=this.clippedPos(e,t),i=this.clippedPos(e,n)
return this.applyDelta({start:r,end:i,action:"remove",lines:this.getLinesForRange({start:r,end:i})},!0),this.clonePos(r)},this.removeFullLines=function(e,t){e=Math.min(Math.max(0,e),this.getLength()-1)
var n=(t=Math.min(Math.max(0,t),this.getLength()-1))==this.getLength()-1&&e>0,r=t<this.getLength()-1,i=n?e-1:e,o=n?this.getLine(i).length:0,a=r?t+1:t,c=r?0:this.getLine(a).length,u=new s(i,o,a,c),l=this.$lines.slice(e,t+1)
return this.applyDelta({start:u.start,end:u.end,action:"remove",lines:this.getLinesForRange(u)}),l},this.removeNewLine=function(e){e<this.getLength()-1&&e>=0&&this.applyDelta({start:this.pos(e,this.getLine(e).length),end:this.pos(e+1,0),action:"remove",lines:["",""]})},this.replace=function(e,t){if(e instanceof s||(e=s.fromPoints(e.start,e.end)),0===t.length&&e.isEmpty())return e.start
if(t==this.getTextRange(e))return e.end
this.remove(e)
return t?this.insert(e.start,t):e.start},this.applyDeltas=function(e){for(var t=0;t<e.length;t++)this.applyDelta(e[t])},this.revertDeltas=function(e){for(var t=e.length-1;t>=0;t--)this.revertDelta(e[t])},this.applyDelta=function(e,t){var n="insert"==e.action;(n?e.lines.length<=1&&!e.lines[0]:!s.comparePoints(e.start,e.end))||(n&&e.lines.length>2e4&&this.$splitAndapplyLargeDelta(e,2e4),i(this.$lines,e,t),this._signal("change",e))},this.$splitAndapplyLargeDelta=function(e,t){for(var n=e.lines,r=n.length,i=e.start.row,o=e.start.column,s=0,a=0;;){s=a,a+=t-1
var c=n.slice(s,a)
if(a>r){e.lines=c,e.start.row=i+s,e.start.column=o
break}c.push(""),this.applyDelta({start:this.pos(i+s,o),end:this.pos(i+a,o=0),action:e.action,lines:c},!0)}},this.revertDelta=function(e){this.applyDelta({start:this.clonePos(e.start),end:this.clonePos(e.end),action:"insert"==e.action?"remove":"insert",lines:e.lines.slice()})},this.indexToPosition=function(e,t){for(var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length,i=t||0,o=n.length;i<o;i++)if((e-=n[i].length+r)<0)return{row:i,column:e+n[i].length+r}
return{row:o-1,column:n[o-1].length}},this.positionToIndex=function(e,t){for(var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length,i=0,o=Math.min(e.row,n.length),s=t||0;s<o;++s)i+=n[s].length+r
return i+e.column}}).call(c.prototype),t.Document=c}),ace.define("ace/lib/lang",["require","exports","module"],function(e,t,n){"use strict"
t.last=function(e){return e[e.length-1]},t.stringReverse=function(e){return e.split("").reverse().join("")},t.stringRepeat=function(e,t){for(var n="";t>0;)1&t&&(n+=e),(t>>=1)&&(e+=e)
return n}
var r=/^\s\s*/,i=/\s\s*$/
t.stringTrimLeft=function(e){return e.replace(r,"")},t.stringTrimRight=function(e){return e.replace(i,"")},t.copyObject=function(e){var t={}
for(var n in e)t[n]=e[n]
return t},t.copyArray=function(e){for(var t=[],n=0,r=e.length;n<r;n++)e[n]&&"object"==typeof e[n]?t[n]=this.copyObject(e[n]):t[n]=e[n]
return t},t.deepCopy=function e(t){if("object"!=typeof t||!t)return t
var n
if(Array.isArray(t)){n=[]
for(var r=0;r<t.length;r++)n[r]=e(t[r])
return n}if("[object Object]"!==Object.prototype.toString.call(t))return t
n={}
for(var r in t)n[r]=e(t[r])
return n},t.arrayToMap=function(e){for(var t={},n=0;n<e.length;n++)t[e[n]]=1
return t},t.createMap=function(e){var t=Object.create(null)
for(var n in e)t[n]=e[n]
return t},t.arrayRemove=function(e,t){for(var n=0;n<=e.length;n++)t===e[n]&&e.splice(n,1)},t.escapeRegExp=function(e){return e.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},t.escapeHTML=function(e){return e.replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},t.getMatchOffsets=function(e,t){var n=[]
return e.replace(t,function(e){n.push({offset:arguments[arguments.length-2],length:e.length})}),n},t.deferredCall=function(e){var t=null,n=function(){t=null,e()},r=function(e){return r.cancel(),t=setTimeout(n,e||0),r}
return r.schedule=r,r.call=function(){return this.cancel(),e(),r},r.cancel=function(){return clearTimeout(t),t=null,r},r.isPending=function(){return t},r},t.delayedCall=function(e,t){var n=null,r=function(){n=null,e()},i=function(e){null==n&&(n=setTimeout(r,e||t))}
return i.delay=function(e){n&&clearTimeout(n),n=setTimeout(r,e||t)},i.schedule=i,i.call=function(){this.cancel(),e()},i.cancel=function(){n&&clearTimeout(n),n=null},i.isPending=function(){return n},i}}),ace.define("ace/worker/mirror",["require","exports","module","ace/range","ace/document","ace/lib/lang"],function(e,t,n){"use strict"
e("../range").Range
var r=e("../document").Document,i=e("../lib/lang"),o=t.Mirror=function(e){this.sender=e
var t=this.doc=new r(""),n=this.deferredUpdate=i.delayedCall(this.onUpdate.bind(this)),o=this
e.on("change",function(e){var r=e.data
if(r[0].start)t.applyDeltas(r)
else for(var i=0;i<r.length;i+=2){if(Array.isArray(r[i+1]))var s={action:"insert",start:r[i],lines:r[i+1]}
else s={action:"remove",start:r[i],end:r[i+1]}
t.applyDelta(s,!0)}if(o.$timeout)return n.schedule(o.$timeout)
o.onUpdate()})};(function(){this.$timeout=500,this.setTimeout=function(e){this.$timeout=e},this.setValue=function(e){this.doc.setValue(e),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(e){this.sender.callback(this.doc.getValue(),e)},this.onUpdate=function(){},this.isPending=function(){return this.deferredUpdate.isPending()}}).call(o.prototype)}),ace.define("ace/mode/javascript/jshint",["require","exports","module"],function(e,t,n){n.exports=function t(n,r,i){function o(a,c){if(!r[a]){if(!n[a]){var u="function"==typeof e&&e
if(!c&&u)return u(a,!0)
if(s)return s(a,!0)
var l=new Error("Cannot find module '"+a+"'")
throw l.code="MODULE_NOT_FOUND",l}var f=r[a]={exports:{}}
n[a][0].call(f.exports,function(e){var t=n[a][1][e]
return o(t||e)},f,f.exports,t,n,r,i)}return r[a].exports}for(var s="function"==typeof e&&e,a=0;a<i.length;a++)o(i[a])
return o(i[0])}({"/node_modules/browserify/node_modules/events/events.js":[function(e,t,n){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(e){return"function"==typeof e}function o(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!function(e){return"number"==typeof e}(e)||e<0||isNaN(e))throw TypeError("n must be a positive number")
return this._maxListeners=e,this},r.prototype.emit=function(e){var t,n,r,a,c,u
if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t
throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],s(n))return!1
if(i(n))switch(arguments.length){case 1:n.call(this)
break
case 2:n.call(this,arguments[1])
break
case 3:n.call(this,arguments[1],arguments[2])
break
default:for(r=arguments.length,a=new Array(r-1),c=1;c<r;c++)a[c-1]=arguments[c]
n.apply(this,a)}else if(o(n)){for(r=arguments.length,a=new Array(r-1),c=1;c<r;c++)a[c-1]=arguments[c]
for(r=(u=n.slice()).length,c=0;c<r;c++)u[c].apply(this,a)}return!0},r.prototype.addListener=function(e,t){if(!i(t))throw TypeError("listener must be a function")
if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned){var n;(n=s(this._maxListeners)?r.defaultMaxListeners:this._maxListeners)&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!i(t))throw TypeError("listener must be a function")
var r=!1
return n.listener=t,this.on(e,n),this},r.prototype.removeListener=function(e,t){var n,r,s,a
if(!i(t))throw TypeError("listener must be a function")
if(!this._events||!this._events[e])return this
if(n=this._events[e],s=n.length,r=-1,n===t||i(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t)
else if(o(n)){for(a=s;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){r=a
break}if(r<0)return this
1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,n
if(!this._events)return this
if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this
if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t)
return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],i(n))this.removeListener(e,n)
else for(;n.length;)this.removeListener(e,n[n.length-1])
return delete this._events[e],this},r.prototype.listeners=function(e){return this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.listenerCount=function(e,t){return e._events&&e._events[t]?i(e._events[t])?1:e._events[t].length:0}},{}],"/node_modules/jshint/data/ascii-identifier-data.js":[function(e,t,n){for(var r=[],i=0;i<128;i++)r[i]=36===i||i>=65&&i<=90||95===i||i>=97&&i<=122
var o=[]
for(i=0;i<128;i++)o[i]=r[i]||i>=48&&i<=57
t.exports={asciiIdentifierStartTable:r,asciiIdentifierPartTable:o}},{}],"/node_modules/jshint/lodash.js":[function(e,t,n){(function(e){(function(){function r(e,t,n){if(t!=t)return function(e,t,n){var r=e.length,i=t+(n?0:-1)
for(;n?i--:++i<r;){var o=e[i]
if(o!=o)return i}return-1}(e,n)
for(var r=n-1,i=e.length;++r<i;)if(e[r]===t)return r
return-1}function i(e){return"function"==typeof e||!1}function o(e){return"string"==typeof e?e:null==e?"":e+""}function s(e){return!!e&&"object"==typeof e}function a(){}function c(e,t){var n=-1,r=e.length
for(t||(t=Array(r));++n<r;)t[n]=e[n]
return t}function u(e,t){for(var n=-1,r=e.length;++n<r&&!1!==t(e[n],n,e););return e}function l(e,t){for(var n=-1,r=e.length,i=-1,o=[];++n<r;){var s=e[n]
t(s,n,e)&&(o[++i]=s)}return o}function f(e,t){for(var n=-1,r=e.length,i=Array(r);++n<r;)i[n]=t(e[n],n,e)
return i}function h(e,t){for(var n=-1,r=e.length;++n<r;)if(t(e[n],n,e))return!0
return!1}function p(e,t,n){n||(n={})
for(var r=-1,i=t.length;++r<i;){var o=t[r]
n[o]=e[o]}return n}function d(e,t,n){var r=typeof e
return"function"==r?t===re?e:W(e,t,n):null==e?te:"object"==r?function(e){var t=Mt(e),n=t.length
if(!n)return ee(!0)
if(1==n){var r=t[0],i=e[r]
if(P(i))return function(e){return null!=e&&(e[r]===i&&(i!==re||r in C(e)))}}var o=Array(n),s=Array(n)
for(;n--;)i=e[t[n]],o[n]=i,s[n]=P(i)
return function(e){return null!=e&&function(e,t,n,r,i){var o=-1,s=t.length,a=!i
for(;++o<s;)if(a&&r[o]?n[o]!==e[t[o]]:!(t[o]in e))return!1
o=-1
for(;++o<s;){var c=t[o],u=e[c],l=n[o]
if(a&&r[o])var f=u!==re||c in e
else(f=i?i(u,l,c):re)===re&&(f=b(l,u,i,!0))
if(!f)return!1}return!0}(C(e),t,o,s)}}(e):t===re?ne(e):function(e,t){var n=jt(e),r=O(e)&&P(t),i=e+""
return e=F(e),function(o){if(null==o)return!1
var s=i
if(o=C(o),(n||!r)&&!(s in o)){if(null==(o=1==e.length?o:k(o,E(e,0,-1))))return!1
s=I(e),o=C(o)}return o[s]===t?t!==re||s in o:b(t,o[s],null,!0)}}(e,t)}function m(e,t,n,r,i,o,s){var a
if(n&&(a=i?n(e,r,i):n(e)),a!==re)return a
if(!B(e))return e
var l=jt(e)
if(l){if(a=function(e){var t=e.length,n=new e.constructor(t)
t&&"string"==typeof e[0]&&ze.call(e,"index")&&(n.index=e.index,n.input=e.input)
return n}(e),!t)return c(e,a)}else{var f=Je.call(e),h=f==le
if(f!=he&&f!=oe&&(!h||i))return Ve[f]?function(e,t,n){var r=e.constructor
switch(t){case ve:return j(e)
case ae:case ce:return new r(+e)
case ge:case ke:case be:case ye:case xe:case Ee:case we:case Se:case We:var i=e.buffer
return new r(n?j(i):i,e.byteOffset,e.length)
case fe:case de:return new r(e)
case pe:var o=new r(e.source,Te.exec(e))
o.lastIndex=e.lastIndex}return o}(e,f,t):i?e:{}
if(a=function(e){var t=e.constructor
"function"==typeof t&&t instanceof t||(t=Object)
return new t}(h?{}:e),!t)return kt(a,e)}o||(o=[]),s||(s=[])
for(var p=o.length;p--;)if(o[p]==e)return s[p]
return o.push(e),s.push(a),(l?u:g)(e,function(r,i){a[i]=m(r,t,n,i,e,o,s)}),a}function v(e,t){var n=[]
return bt(e,function(e,r,i){t(e,r,i)&&n.push(e)}),n}function g(e,t){return yt(e,t,Mt)}function k(e,t,n){if(null!=e){n!==re&&n in C(e)&&(t=[n])
for(var r=-1,i=t.length;null!=e&&++r<i;)var o=e=e[t[r]]
return o}}function b(e,t,n,r,i,o){if(e===t)return 0!==e||1/e==1/t
var s=typeof e,a=typeof t
return"function"!=s&&"object"!=s&&"function"!=a&&"object"!=a||null==e||null==t?e!=e&&t!=t:function(e,t,n,r,i,o,s){var a=jt(e),c=jt(t),u=se,l=se
a||((u=Je.call(e))==oe?u=he:u!=he&&(a=J(e)))
c||((l=Je.call(t))==oe?l=he:l!=he&&(c=J(t)))
var f=u==he,h=l==he,p=u==l
if(p&&!a&&!f)return function(e,t,n){switch(n){case ae:case ce:return+e==+t
case ue:return e.name==t.name&&e.message==t.message
case fe:return e!=+e?t!=+t:0==e?1/e==1/t:e==+t
case pe:case de:return e==t+""}return!1}(e,t,u)
if(!i){var d=f&&ze.call(e,"__wrapped__"),m=h&&ze.call(t,"__wrapped__")
if(d||m)return n(d?e.value():e,m?t.value():t,r,i,o,s)}if(!p)return!1
o||(o=[]),s||(s=[])
var v=o.length
for(;v--;)if(o[v]==e)return s[v]==t
o.push(e),s.push(t)
var g=(a?function(e,t,n,r,i,o,s){var a=-1,c=e.length,u=t.length,l=!0
if(c!=u&&!(i&&u>c))return!1
for(;l&&++a<c;){var f=e[a],h=t[a]
if(l=re,r&&(l=i?r(h,f,a):r(f,h,a)),l===re)if(i)for(var p=u;p--&&(h=t[p],!(l=f&&f===h||n(f,h,r,i,o,s))););else l=f&&f===h||n(f,h,r,i,o,s)}return!!l}:function(e,t,n,r,i,o,s){var a=Mt(e),c=a.length,u=Mt(t).length
if(c!=u&&!i)return!1
var l=i,f=-1
for(;++f<c;){var h=a[f],p=i?h in t:ze.call(t,h)
if(p){var d=e[h],m=t[h]
p=re,r&&(p=i?r(m,d,h):r(d,m,h)),p===re&&(p=d&&d===m||n(d,m,r,i,o,s))}if(!p)return!1
l||(l="constructor"==h)}if(!l){var v=e.constructor,g=t.constructor
if(v!=g&&"constructor"in e&&"constructor"in t&&!("function"==typeof v&&v instanceof v&&"function"==typeof g&&g instanceof g))return!1}return!0})(e,t,n,r,i,o,s)
return o.pop(),s.pop(),g}(e,t,b,n,r,i,o)}function y(e,t,n,r,i){if(!B(e))return e
var o=T(t.length)&&(jt(t)||J(t))
if(!o){var a=Mt(t)
tt.apply(a,Et(t))}return u(a||t,function(u,l){if(a&&(u=t[l=u]),s(u))r||(r=[]),i||(i=[]),function(e,t,n,r,i,o,s){var a=o.length,u=t[n]
for(;a--;)if(o[a]==u)return void(e[n]=s[a])
var l=e[n],f=i?i(l,u,n,e,t):re,h=f===re
h&&(f=u,T(u.length)&&(jt(u)||J(u))?f=jt(l)?l:xt(l)?c(l):[]:_t(u)||$(u)?f=$(l)?X(l):_t(l)?l:{}:h=!1)
o.push(u),s.push(f),h?e[n]=r(f,u,i,o,s):(f==f?f!==l:l==l)&&(e[n]=f)}(e,t,l,y,n,r,i)
else{var f=e[l],h=n?n(f,u,l,e,t):re,p=h===re
p&&(h=u),!o&&h===re||!p&&(h==h?h===f:f!=f)||(e[l]=h)}}),e}function x(e){return function(t){return null==t?re:t[e]}}function E(e,t,n){var r=-1,i=e.length;(t=null==t?0:+t||0)<0&&(t=-t>i?0:i+t),(n=n===re||n>i?i:+n||0)<0&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0
for(var o=Array(i);++r<i;)o[r]=e[r+t]
return o}function w(e,t){var n
return bt(e,function(e,r,i){return!(n=t(e,r,i))}),!!n}function S(e,t,n){var r=0,i=e?e.length:r
if("number"==typeof t&&t==t&&i<=dt){for(;r<i;){var o=r+i>>>1,s=e[o];(n?s<=t:s<t)?r=o+1:i=o}return i}return function(e,t,n,r){t=n(t)
var i=0,o=e?e.length:0,s=t!=t,a=t===re
for(;i<o;){var c=Qe((i+o)/2),u=n(e[c]),l=u==u
if(s)var f=l||r
else f=a?l&&(r||u!==re):r?u<=t:u<t
f?i=c+1:o=c}return lt(o,pt)}(e,t,te,n)}function W(e,t,n){if("function"!=typeof e)return te
if(t===re)return e
switch(n){case 1:return function(n){return e.call(t,n)}
case 3:return function(n,r,i){return e.call(t,n,r,i)}
case 4:return function(n,r,i,o){return e.call(t,n,r,i,o)}
case 5:return function(n,r,i,o,s){return e.call(t,n,r,i,o,s)}}return function(){return e.apply(t,arguments)}}function j(e){return Ke.call(e,0)}function L(e){return N(function(t,n){var r=-1,i=null==t?0:n.length,o=i>2&&n[i-2],s=i>2&&n[2],a=i>1&&n[i-1]
for("function"==typeof o?(o=W(o,a,5),i-=2):i-=(o="function"==typeof a?a:null)?1:0,s&&M(n[0],n[1],s)&&(o=i<3?null:o,i=1);++r<i;){var c=n[r]
c&&e(t,c,o)}return t})}function _(e,t,n){var r=a.callback||Y
return r=r===Y?d:r,n?r(e,t,n):r}function A(e,t){return e=+e,t=null==t?vt:t,e>-1&&e%1==0&&e<t}function M(e,t,n){if(!B(n))return!1
var r=typeof t
if("number"==r)var i=xt(n),o=T(i)&&A(t,i)
else o="string"==r&&t in n
if(o){var s=n[t]
return e==e?e===s:s!=s}return!1}function O(e,t){var n=typeof e
if("string"==n&&Le.test(e)||"number"==n)return!0
if(jt(e))return!1
return!je.test(e)||null!=t&&e in C(t)}function T(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=vt}function P(e){return e==e&&(0===e?1/e>0:!B(e))}function G(e){var t
if(!s(e)||Je.call(e)!=he||!ze.call(e,"constructor")&&"function"==typeof(t=e.constructor)&&!(t instanceof t))return!1
var n
return function(e,t){yt(e,t,Z)}(e,function(e,t){n=t}),n===re||ze.call(e,n)}function V(e){for(var t=Z(e),n=t.length,r=n&&e.length,i=a.support,o=r&&T(r)&&(jt(e)||i.nonEnumArgs&&$(e)),s=-1,c=[];++s<n;){var u=t[s];(o&&A(u,r)||ze.call(e,u))&&c.push(u)}return c}function C(e){return B(e)?e:Object(e)}function F(e){if(jt(e))return e
var t=[]
return o(e).replace(_e,function(e,n,r,i){t.push(r?i.replace(Oe,"$1"):n||e)}),t}function R(e,t,n){var i=e?e.length:0
if(!i)return-1
if("number"==typeof n)n=n<0?ut(i+n,0):n
else if(n){var o=S(e,t),s=e[o]
return(t==t?t===s:s!=s)?o:-1}return r(e,t,n||0)}function I(e){var t=e?e.length:0
return t?e[t-1]:re}function U(e){for(var t=-1,n=(e&&e.length&&function(e){for(var t=-1,n=e.length,r=ft;++t<n;){var i=e[t]
i>r&&(r=i)}return r}(f(e,xt)))>>>0,r=Array(n);++t<n;)r[t]=f(e,x(t))
return r}function q(e,t,n,i){var o=e?xt(e):0
return T(o)||(o=(e=K(e)).length),!!o&&(n="number"!=typeof n||i&&M(t,n,i)?0:n<0?ut(o+n,0):n||0,"string"==typeof e||!jt(e)&&z(e)?n<o&&e.indexOf(t,n)>-1:function(e,t,n){var i=a.indexOf||R
return i=i===R?r:i,e?i(e,t,n):i}(e,t,n)>-1)}function D(e,t,n){var r=jt(e)?h:w
return n&&M(e,t,n)&&(t=null),"function"==typeof t&&n===re||(t=_(t,n,3)),r(e,t)}function N(e,t){if("function"!=typeof e)throw new TypeError(ie)
return t=ut(t===re?e.length-1:+t||0,0),function(){for(var n=arguments,r=-1,i=ut(n.length-t,0),o=Array(i);++r<i;)o[r]=n[t+r]
switch(t){case 0:return e.call(this,o)
case 1:return e.call(this,n[0],o)
case 2:return e.call(this,n[0],n[1],o)}var s=Array(t+1)
for(r=-1;++r<t;)s[r]=n[r]
return s[t]=o,e.apply(this,s)}}function $(e){return T(s(e)?e.length:re)&&Je.call(e)==oe}function B(e){var t=typeof e
return"function"==t||!!e&&"object"==t}function H(e){return null!=e&&(Je.call(e)==le?Xe.test(He.call(e)):s(e)&&Pe.test(e))}function z(e){return"string"==typeof e||s(e)&&Je.call(e)==de}function J(e){return s(e)&&T(e.length)&&!!Ge[Je.call(e)]}function X(e){return p(e,Z(e))}function Z(e){if(null==e)return[]
B(e)||(e=Object(e))
var t=e.length
t=t&&T(t)&&(jt(e)||gt.nonEnumArgs&&$(e))&&t||0
for(var n=e.constructor,r=-1,i="function"==typeof n&&n.prototype===e,o=Array(t),s=t>0;++r<t;)o[r]=r+""
for(var a in e)s&&A(a,t)||"constructor"==a&&(i||!ze.call(e,a))||o.push(a)
return o}function K(e){return function(e,t){for(var n=-1,r=t.length,i=Array(r);++n<r;)i[n]=e[t[n]]
return i}(e,Mt(e))}function Q(e){return(e=o(e))&&Me.test(e)?e.replace(Ae,"\\$&"):e}function Y(e,t,n){return n&&M(e,t,n)&&(t=null),d(e,t)}function ee(e){return function(){return e}}function te(e){return e}function ne(e){return O(e)?x(e):function(e){var t=e+""
return e=F(e),function(n){return k(n,e,t)}}(e)}var re,ie="Expected a function",oe="[object Arguments]",se="[object Array]",ae="[object Boolean]",ce="[object Date]",ue="[object Error]",le="[object Function]",fe="[object Number]",he="[object Object]",pe="[object RegExp]",de="[object String]",me="[object WeakMap]",ve="[object ArrayBuffer]",ge="[object Float32Array]",ke="[object Float64Array]",be="[object Int8Array]",ye="[object Int16Array]",xe="[object Int32Array]",Ee="[object Uint8Array]",we="[object Uint8ClampedArray]",Se="[object Uint16Array]",We="[object Uint32Array]",je=/\.|\[(?:[^[\]]+|(["'])(?:(?!\1)[^\n\\]|\\.)*?)\1\]/,Le=/^\w*$/,_e=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,Ae=/[.*+?^${}()|[\]\/\\]/g,Me=RegExp(Ae.source),Oe=/\\(\\)?/g,Te=/\w*$/,Pe=/^\[object .+?Constructor\]$/,Ge={}
Ge[ge]=Ge[ke]=Ge[be]=Ge[ye]=Ge[xe]=Ge[Ee]=Ge[we]=Ge[Se]=Ge[We]=!0,Ge[oe]=Ge[se]=Ge[ve]=Ge[ae]=Ge[ce]=Ge[ue]=Ge[le]=Ge["[object Map]"]=Ge[fe]=Ge[he]=Ge[pe]=Ge["[object Set]"]=Ge[de]=Ge[me]=!1
var Ve={}
Ve[oe]=Ve[se]=Ve[ve]=Ve[ae]=Ve[ce]=Ve[ge]=Ve[ke]=Ve[be]=Ve[ye]=Ve[xe]=Ve[fe]=Ve[he]=Ve[pe]=Ve[de]=Ve[Ee]=Ve[we]=Ve[Se]=Ve[We]=!0,Ve[ue]=Ve[le]=Ve["[object Map]"]=Ve["[object Set]"]=Ve[me]=!1
var Ce={function:!0,object:!0},Fe=Ce[typeof n]&&n&&!n.nodeType&&n,Re=Ce[typeof t]&&t&&!t.nodeType&&t,Ie=Fe&&Re&&"object"==typeof e&&e&&e.Object&&e,Ue=Ce[typeof self]&&self&&self.Object&&self,qe=Ce[typeof window]&&window&&window.Object&&window,De=Re&&Re.exports===Fe&&Fe,Ne=Ie||qe!==(this&&this.window)&&qe||Ue||this,$e=Array.prototype,Be=Object.prototype,He=Function.prototype.toString,ze=Be.hasOwnProperty,Je=Be.toString,Xe=RegExp("^"+Q(Je).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Ze=H(Ze=Ne.ArrayBuffer)&&Ze,Ke=H(Ke=Ze&&new Ze(0).slice)&&Ke,Qe=Math.floor,Ye=H(Ye=Object.getOwnPropertySymbols)&&Ye,et=H(et=Object.getPrototypeOf)&&et,tt=$e.push,nt=H(Object.preventExtensions=Object.preventExtensions)&&nt,rt=Be.propertyIsEnumerable,it=H(it=Ne.Uint8Array)&&it,ot=function(){try{var e=H(e=Ne.Float64Array)&&e,t=new e(new Ze(10),0,1)&&e}catch(e){}return t}(),st=function(){var e={1:0},t=nt&&H(t=Object.assign)&&t
try{t(nt(e),"xo")}catch(e){}return!e[1]&&t}(),at=H(at=Array.isArray)&&at,ct=H(ct=Object.keys)&&ct,ut=Math.max,lt=Math.min,ft=Number.NEGATIVE_INFINITY,ht=Math.pow(2,32)-1,pt=ht-1,dt=ht>>>1,mt=ot?ot.BYTES_PER_ELEMENT:0,vt=Math.pow(2,53)-1,gt=a.support={};(function(e){var t=function(){this.x=e},n=[]
t.prototype={valueOf:e,y:e}
for(var r in new t)n.push(r)
gt.funcDecomp=/\bthis\b/.test(function(){return this}),gt.funcNames="string"==typeof Function.name
try{gt.nonEnumArgs=!rt.call(arguments,1)}catch(e){gt.nonEnumArgs=!0}})(1,0)
var kt=st||function(e,t){return null==t?e:p(t,Et(t),p(t,Mt(t),e))},bt=function(e,t){return function(n,r){var i=n?xt(n):0
if(!T(i))return e(n,r)
for(var o=t?i:-1,s=C(n);(t?o--:++o<i)&&!1!==r(s[o],o,s););return n}}(g),yt=function(e){return function(t,n,r){for(var i=C(t),o=r(t),s=o.length,a=e?s:-1;e?a--:++a<s;){var c=o[a]
if(!1===n(i[c],c,i))break}return t}}()
Ke||(j=Ze&&it?function(e){var t=e.byteLength,n=ot?Qe(t/mt):0,r=n*mt,i=new Ze(t)
if(n){var o=new ot(i,0,n)
o.set(new ot(e,0,n))}return t!=r&&(o=new it(i,r)).set(new it(e,r)),i}:ee(null))
var xt=x("length"),Et=Ye?function(e){return Ye(C(e))}:ee([]),wt=function(e){return function(t,n,r){return t&&t.length?(n=_(n,r,3),function(e,t,n){for(var r=e.length,i=n?r:-1;n?i--:++i<r;)if(t(e[i],i,e))return i
return-1}(t,n,e)):-1}}(!0),St=N(U),Wt=function(e,t){return function(n,r,i){return"function"==typeof r&&i===re&&jt(n)?e(n,r):t(n,W(r,i,3))}}(u,bt),jt=at||function(e){return s(e)&&T(e.length)&&Je.call(e)==se},Lt=i(/x/)||it&&!i(it)?function(e){return Je.call(e)==le}:i,_t=et?function(e){if(!e||Je.call(e)!=he)return!1
var t=e.valueOf,n=H(t)&&(n=et(t))&&et(n)
return n?e==n||et(e)==n:G(e)}:G,At=L(function(e,t,n){return n?function(e,t,n){var r=Mt(t)
tt.apply(r,Et(t))
for(var i=-1,o=r.length;++i<o;){var s=r[i],a=e[s],c=n(a,t[s],s,e,t);(c==c?c===a:a!=a)&&(a!==re||s in e)||(e[s]=c)}return e}(e,t,n):kt(e,t)}),Mt=ct?function(e){if(e)var t=e.constructor,n=e.length
return"function"==typeof t&&t.prototype===e||"function"!=typeof e&&T(n)?V(e):B(e)?ct(e):[]}:V,Ot=L(y)
a.assign=At,a.callback=Y,a.constant=ee,a.forEach=Wt,a.keys=Mt,a.keysIn=Z,a.merge=Ot,a.property=ne,a.reject=function(e,t,n){var r=jt(e)?l:v
return t=_(t,n,3),r(e,function(e,n,r){return!t(e,n,r)})},a.restParam=N,a.slice=function(e,t,n){var r=e?e.length:0
return r?(n&&"number"!=typeof n&&M(e,t,n)&&(t=0,n=r),E(e,t,n)):[]},a.toPlainObject=X,a.unzip=U,a.values=K,a.zip=St,a.each=Wt,a.extend=At,a.iteratee=Y,a.clone=function(e,t,n,r){return t&&"boolean"!=typeof t&&M(e,t,n)?t=!1:"function"==typeof t&&(r=n,n=t,t=!1),n="function"==typeof n&&W(n,r,1),m(e,t,n)},a.escapeRegExp=Q,a.findLastIndex=wt,a.has=function(e,t){if(null==e)return!1
var n=ze.call(e,t)
return n||O(t)||(e=1==(t=F(t)).length?e:k(e,E(t,0,-1)),t=I(t),n=null!=e&&ze.call(e,t)),n},a.identity=te,a.includes=q,a.indexOf=R,a.isArguments=$,a.isArray=jt,a.isEmpty=function(e){if(null==e)return!0
var t=xt(e)
return T(t)&&(jt(e)||z(e)||$(e)||s(e)&&Lt(e.splice))?!t:!Mt(e).length},a.isFunction=Lt,a.isNative=H
a.isNumber=function(e){return"number"==typeof e||s(e)&&Je.call(e)==fe},a.isObject=B,a.isPlainObject=_t,a.isString=z,a.isTypedArray=J,a.last=I,a.some=D,a.any=D,a.contains=q,a.include=q,a.VERSION="3.7.0",Fe&&Re?De?(Re.exports=a)._=a:Fe._=a:Ne._=a}).call(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/node_modules/jshint/src/jshint.js":[function(e,t,n){var r=e("../lodash"),i=e("events"),o=e("./vars.js"),s=e("./messages.js"),a=e("./lex.js").Lexer,c=e("./reg.js"),u=e("./state.js").state,l=e("./style.js"),f=e("./options.js"),h=e("./scope-manager.js"),p=function(){"use strict"
function e(e,t){return e=e.trim(),!!/^[+-]W\d{3}$/g.test(e)||(!(-1===f.validNames.indexOf(e)&&"jslint"!==t.type&&!r.has(f.removed,e))||(y("E001",t,e),!1))}function t(e,t){return!!e&&!(!e.identifier||e.value!==t)}function n(e){if(!e.reserved)return!1
var t=e.meta
if(t&&t.isFutureReservedWord&&u.inES5()){if(!t.es5)return!1
if(t.strictOnly&&!u.option.strict&&!u.isStrict())return!1
if(e.isProperty)return!1}return!0}function d(e,t){Object.keys(t).forEach(function(n){r.has(p.blacklist,n)||(e[n]=t[n])})}function m(){(function(){if(u.option.enforceall){for(var e in f.bool.enforcing)void 0!==u.option[e]||f.noenforceall[e]||(u.option[e]=!0)
for(var t in f.bool.relaxing)void 0===u.option[t]&&(u.option[t]=!1)}})(),u.option.esversion||u.option.moz||(u.option.es3?u.option.esversion=3:u.option.esnext?u.option.esversion=6:u.option.esversion=5),u.inES5()&&d(Ue,o.ecmaIdentifiers[5]),u.inES6()&&d(Ue,o.ecmaIdentifiers[6]),u.option.module&&(!0===u.option.strict&&(u.option.strict="global"),u.inES6()||k("W134",u.tokens.next,"module",6)),u.option.couch&&d(Ue,o.couch),u.option.qunit&&d(Ue,o.qunit),u.option.rhino&&d(Ue,o.rhino),u.option.shelljs&&(d(Ue,o.shelljs),d(Ue,o.node)),u.option.typed&&d(Ue,o.typed),u.option.phantom&&(d(Ue,o.phantom),!0===u.option.strict&&(u.option.strict="global")),u.option.prototypejs&&d(Ue,o.prototypejs),u.option.node&&(d(Ue,o.node),d(Ue,o.typed),!0===u.option.strict&&(u.option.strict="global")),u.option.devel&&d(Ue,o.devel),u.option.dojo&&d(Ue,o.dojo),u.option.browser&&(d(Ue,o.browser),d(Ue,o.typed)),u.option.browserify&&(d(Ue,o.browser),d(Ue,o.typed),d(Ue,o.browserify),!0===u.option.strict&&(u.option.strict="global")),u.option.nonstandard&&d(Ue,o.nonstandard),u.option.jasmine&&d(Ue,o.jasmine),u.option.jquery&&d(Ue,o.jquery),u.option.mootools&&d(Ue,o.mootools),u.option.worker&&d(Ue,o.worker),u.option.wsh&&d(Ue,o.wsh),u.option.globalstrict&&!1!==u.option.strict&&(u.option.strict="global"),u.option.yui&&d(Ue,o.yui),u.option.mocha&&d(Ue,o.mocha)}function v(e,t,n){var r=Math.floor(t/u.lines.length*100),i=s.errors[e].desc
throw{name:"JSHintError",line:t,character:n,message:i+" ("+r+"% scanned).",raw:i,code:e}}function g(){var e=u.ignoredLines
r.isEmpty(e)||(p.errors=r.reject(p.errors,function(t){return e[t.line]}))}function k(e,t,n,r,i,o){var a,c,l,f
if(/^W\d{3}$/.test(e)){if(u.ignored[e])return
f=s.warnings[e]}else/E\d{3}/.test(e)?f=s.errors[e]:/I\d{3}/.test(e)&&(f=s.info[e])
return"(end)"===(t=t||u.tokens.next||{}).id&&(t=u.tokens.curr),c=t.line||0,a=t.from||0,l={id:"(error)",raw:f.desc,code:f.code,evidence:u.lines[c-1]||"",line:c,character:a,scope:p.scope,a:n,b:r,c:i,d:o},l.reason=function(e,t){return e.replace(/\{([^{}]*)\}/g,function(e,n){var r=t[n]
return"string"==typeof r||"number"==typeof r?r:e})}(f.desc,l),p.errors.push(l),g(),p.errors.length>=u.option.maxerr&&v("E043",c,a),l}function b(e,t,n,r,i,o,s){return k(e,{line:t,from:n},r,i,o,s)}function y(e,t,n,r,i,o){k(e,t,n,r,i,o)}function x(e,t,n,r,i,o,s){return y(e,{line:t,from:n},r,i,o,s)}function E(e,t){var n
return n={id:"(internal)",elem:e,value:t},p.internals.push(n),n}function w(){var t=u.tokens.next,n=t.body.match(/(-\s+)?[^\s,:]+(?:\s*:\s*(-\s+)?[^\s,]+)?/g)||[],i={}
if("globals"===t.type){n.forEach(function(e,r){var o=((e=e.split(":"))[0]||"").trim(),s=(e[1]||"").trim()
if("-"!==o&&o.length)"-"===o.charAt(0)?(o=o.slice(1),s=!1,p.blacklist[o]=o,delete Ue[o]):i[o]="true"===s
else{if(r>0&&r===n.length-1)return
y("E002",t)}}),d(Ue,i)
for(var o in i)r.has(i,o)&&(Te[o]=t)}"exported"===t.type&&n.forEach(function(e,r){if(e.length)u.funct["(scope)"].addExported(e)
else{if(r>0&&r===n.length-1)return
y("E002",t)}}),"members"===t.type&&(Ie=Ie||{},n.forEach(function(e){var t=e.charAt(0)
t!==e.charAt(e.length-1)||'"'!==t&&"'"!==t||(e=e.substr(1,e.length-2).replace('\\"','"')),Ie[e]=!1}))
var s=["maxstatements","maxparams","maxdepth","maxcomplexity","maxerr","maxlen","indent"]
"jshint"!==t.type&&"jslint"!==t.type||(n.forEach(function(n){var i=((n=n.split(":"))[0]||"").trim(),o=(n[1]||"").trim()
if(e(i,t))if(s.indexOf(i)>=0)if("false"!==o){if("number"!=typeof(o=+o)||!isFinite(o)||o<=0||Math.floor(o)!==o)return void y("E032",t,n[1].trim())
u.option[i]=o}else u.option[i]="indent"===i&&4
else{if("validthis"===i)return u.funct["(global)"]?void y("E009"):"true"!==o&&"false"!==o?void y("E002",t):void(u.option.validthis="true"===o)
if("quotmark"!==i)if("shadow"!==i)if("unused"!==i)if("latedef"!==i)if("ignore"!==i)if("strict"!==i){"module"===i&&(pe(u.funct)||y("E055",u.tokens.next,"module"))
var a={es3:3,es5:5,esnext:6}
if(r.has(a,i))switch(o){case"true":u.option.moz=!1,u.option.esversion=a[i]
break
case"false":u.option.moz||(u.option.esversion=5)
break
default:y("E002",t)}else if("esversion"!==i){var c=/^([+-])(W\d{3})$/g.exec(i)
if(c)u.ignored[c[2]]="-"===c[1]
else{var l
if("true"===o||"false"===o)return"jslint"===t.type?(l=f.renamed[i]||i,u.option[l]="true"===o,void 0!==f.inverted[l]&&(u.option[l]=!u.option[l])):u.option[i]="true"===o,void("newcap"===i&&(u.option["(explicitNewcap)"]=!0))
y("E002",t)}}else{switch(o){case"5":u.inES5(!0)&&k("I003")
case"3":case"6":u.option.moz=!1,u.option.esversion=+o
break
case"2015":u.option.moz=!1,u.option.esversion=6
break
default:y("E002",t)}pe(u.funct)||y("E055",u.tokens.next,"esversion")}}else switch(o){case"true":u.option.strict=!0
break
case"false":u.option.strict=!1
break
case"func":case"global":case"implied":u.option.strict=o
break
default:y("E002",t)}else switch(o){case"line":u.ignoredLines[t.line]=!0,g()
break
default:y("E002",t)}else switch(o){case"true":u.option.latedef=!0
break
case"false":u.option.latedef=!1
break
case"nofunc":u.option.latedef="nofunc"
break
default:y("E002",t)}else switch(o){case"true":u.option.unused=!0
break
case"false":u.option.unused=!1
break
case"vars":case"strict":u.option.unused=o
break
default:y("E002",t)}else switch(o){case"true":u.option.shadow=!0
break
case"outer":u.option.shadow="outer"
break
case"false":case"inner":u.option.shadow="inner"
break
default:y("E002",t)}else switch(o){case"true":case"false":u.option.quotmark="true"===o
break
case"double":case"single":u.option.quotmark=o
break
default:y("E002",t)}}}),m())}function S(e){var t,n=e||0,r=Ce.length
if(n<r)return Ce[n]
for(;r<=n;)(t=Ce[r])||(t=Ce[r]=Fe.token()),r+=1
return t||"(end)"!==u.tokens.next.id?t:u.tokens.next}function W(){var e,t=0
do{e=S(t++)}while("(endline)"===e.id)
return e}function j(e,t){switch(u.tokens.curr.id){case"(number)":"."===u.tokens.next.id&&k("W005",u.tokens.curr)
break
case"-":"-"!==u.tokens.next.id&&"--"!==u.tokens.next.id||k("W006")
break
case"+":"+"!==u.tokens.next.id&&"++"!==u.tokens.next.id||k("W007")}for(e&&u.tokens.next.id!==e&&(t?"(end)"===u.tokens.next.id?y("E019",t,t.id):y("E020",u.tokens.next,e,t.id,t.line,u.tokens.next.value):"(identifier)"===u.tokens.next.type&&u.tokens.next.value===e||k("W116",u.tokens.next,e,u.tokens.next.value)),u.tokens.prev=u.tokens.curr,u.tokens.curr=u.tokens.next;;){if(u.tokens.next=Ce.shift()||Fe.token(),u.tokens.next||v("E041",u.tokens.curr.line),"(end)"===u.tokens.next.id||"(error)"===u.tokens.next.id)return
if(u.tokens.next.check&&u.tokens.next.check(),u.tokens.next.isSpecial)"falls through"===u.tokens.next.type?u.tokens.curr.caseFallsThrough=!0:w()
else if("(endline)"!==u.tokens.next.id)break}}function L(e){return e.infix||!e.identifier&&!e.template&&!!e.led}function _(){var e=u.tokens.curr,t=u.tokens.next
return";"===t.id||"}"===t.id||":"===t.id||!!(L(t)===L(e)||"yield"===e.id&&u.inMoz())&&e.line!==M(t)}function A(e,t){var n,i=!1,o=!1,s=!1
u.nameStack.push(),t||"let"!==u.tokens.next.value||"("!==S(0).value||(u.inMoz()||k("W118",u.tokens.next,"let expressions"),s=!0,u.funct["(scope)"].stack(),j("let"),j("("),u.tokens.prev.fud(),j(")")),"(end)"===u.tokens.next.id&&y("E006",u.tokens.curr)
if(u.option.asi&&u.tokens.prev.line!==M(u.tokens.curr)&&r.contains(["]",")"],u.tokens.prev.id)&&r.contains(["[","("],u.tokens.curr.id)&&k("W014",u.tokens.curr,u.tokens.curr.id),j(),t&&(u.funct["(verb)"]=u.tokens.curr.value,u.tokens.curr.beginsStmt=!0),!0===t&&u.tokens.curr.fud)n=u.tokens.curr.fud()
else for(u.tokens.curr.nud?n=u.tokens.curr.nud():y("E030",u.tokens.curr,u.tokens.curr.id);(e<u.tokens.next.lbp||"(template)"===u.tokens.next.type)&&!_();)i="Array"===u.tokens.curr.value,o="Object"===u.tokens.curr.value,n&&(n.value||n.first&&n.first.value)&&("new"!==n.value||n.first&&n.first.value&&"."===n.first.value)&&(i=!1,n.value!==u.tokens.curr.value&&(o=!1)),j(),i&&"("===u.tokens.curr.id&&")"===u.tokens.next.id&&k("W009",u.tokens.curr),o&&"("===u.tokens.curr.id&&")"===u.tokens.next.id&&k("W010",u.tokens.curr),n&&u.tokens.curr.led?n=u.tokens.curr.led(n):y("E033",u.tokens.curr,u.tokens.curr.id)
return s&&u.funct["(scope)"].unstack(),u.nameStack.pop(),n}function M(e){return e.startLine||e.line}function O(e,t){e=e||u.tokens.curr,t=t||u.tokens.next,u.option.laxbreak||e.line===M(t)||k("W014",t,t.value)}function T(e){(e=e||u.tokens.curr).line!==M(u.tokens.next)&&k("E022",e,e.value)}function P(e,t){e.line!==M(t)&&(u.option.laxcomma||(G.first&&(k("I001"),G.first=!1),k("W014",e,t.value)))}function G(e){if((e=e||{}).peek?P(u.tokens.prev,u.tokens.curr):(P(u.tokens.curr,u.tokens.next),j(",")),u.tokens.next.identifier&&(!e.property||!u.inES5()))switch(u.tokens.next.value){case"break":case"case":case"catch":case"continue":case"default":case"do":case"else":case"finally":case"for":case"if":case"in":case"instanceof":case"return":case"switch":case"throw":case"try":case"var":case"let":case"while":case"with":return y("E024",u.tokens.next,u.tokens.next.value),!1}if("(punctuator)"===u.tokens.next.type)switch(u.tokens.next.value){case"}":case"]":case",":if(e.allowTrailing)return!0
case")":return y("E024",u.tokens.next,u.tokens.next.value),!1}return!0}function V(e,t){var n=u.syntax[e]
return n&&"object"==typeof n||(u.syntax[e]=n={id:e,lbp:t,value:e}),n}function C(e){var t=V(e,0)
return t.delim=!0,t}function F(e,t){var n=C(e)
return n.identifier=n.reserved=!0,n.fud=t,n}function R(e,t){var n=F(e,t)
return n.block=!0,n}function I(e){var t=e.id.charAt(0)
return(t>="a"&&t<="z"||t>="A"&&t<="Z")&&(e.identifier=e.reserved=!0),e}function U(e,t){var r=V(e,150)
return I(r),r.nud="function"==typeof t?t:function(){return this.arity="unary",this.right=A(150),"++"!==this.id&&"--"!==this.id||(u.option.plusplus?k("W016",this,this.id):!this.right||this.right.identifier&&!n(this.right)||"."===this.right.id||"["===this.right.id||k("W017",this),this.right&&this.right.isMetaProperty?y("E031",this):this.right&&this.right.identifier&&u.funct["(scope)"].block.modify(this.right.value,this)),this},r}function q(e,t){var n=C(e)
return n.type=e,n.nud=t,n}function D(e,t){var n=q(e,t)
return n.identifier=!0,n.reserved=!0,n}function N(e,t){var n=q(e,t&&t.nud||function(){return this})
return t=t||{},t.isFutureReservedWord=!0,n.value=e,n.identifier=!0,n.reserved=!0,n.meta=t,n}function $(e,t){return D(e,function(){return"function"==typeof t&&t(this),this})}function B(e,t,n,r){var i=V(e,n)
return I(i),i.infix=!0,i.led=function(i){return r||O(u.tokens.prev,u.tokens.curr),"in"!==e&&"instanceof"!==e||"!"!==i.id||k("W018",i,"!"),"function"==typeof t?t(i,this):(this.left=i,this.right=A(n),this)},i}function H(e,n){var r=V(e,100)
return r.led=function(e){O(u.tokens.prev,u.tokens.curr),this.left=e
var r=this.right=A(100)
return t(e,"NaN")||t(r,"NaN")?k("W019",this):n&&n.apply(this,[e,r]),e&&r||v("E041",u.tokens.curr.line),"!"===e.id&&k("W018",e,"!"),"!"===r.id&&k("W018",r,"!"),this},r}function z(e){return e&&("(number)"===e.type&&0==+e.value||"(string)"===e.type&&""===e.value||"null"===e.type&&!u.option.eqnull||"true"===e.type||"false"===e.type||"undefined"===e.type)}function J(e,t,n){var i
return!n.option.notypeof&&(!(!e||!t)&&(i=n.inES6()?He.es6:He.es3,"(identifier)"===t.type&&"typeof"===t.value&&"(string)"===e.type&&!r.contains(i,e.value)))}function X(e,t){var n=!1
return"this"===e.type&&null===t.funct["(context)"]?n=!0:"(identifier)"===e.type&&(t.option.node&&"global"===e.value?n=!0:!t.option.browser||"window"!==e.value&&"document"!==e.value||(n=!0)),n}function Z(e,t,r){var i=r&&r.allowDestructuring
if(t=t||e,u.option.freeze){var o=function(e){function t(e){if("object"==typeof e)return"prototype"===e.right?e:t(e.left)}var n=["Array","ArrayBuffer","Boolean","Collator","DataView","Date","DateTimeFormat","Error","EvalError","Float32Array","Float64Array","Function","Infinity","Intl","Int16Array","Int32Array","Int8Array","Iterator","Number","NumberFormat","Object","RangeError","ReferenceError","RegExp","StopIteration","String","SyntaxError","TypeError","Uint16Array","Uint32Array","Uint8Array","Uint8ClampedArray","URIError"],r=t(e)
if(r)return function(e){for(;!e.identifier&&"object"==typeof e.left;)e=e.left
if(e.identifier&&n.indexOf(e.value)>=0)return e.value}(r)}(e)
o&&k("W121",e,o)}return e.identifier&&!e.isMetaProperty&&u.funct["(scope)"].block.reassign(e.value,e),"."===e.id?(e.left&&("arguments"!==e.left.value||u.isStrict())||k("E031",t),u.nameStack.set(u.tokens.prev),!0):"{"===e.id||"["===e.id?(i&&u.tokens.curr.left.destructAssign?u.tokens.curr.left.destructAssign.forEach(function(e){e.id&&u.funct["(scope)"].block.modify(e.id,e.token)}):"{"!==e.id&&e.left?"arguments"!==e.left.value||u.isStrict()||k("E031",t):k("E031",t),"["===e.id&&u.nameStack.set(e.right),!0):e.isMetaProperty?(y("E031",t),!0):e.identifier&&!n(e)?("exception"===u.funct["(scope)"].labeltype(e.value)&&k("W022",e),u.nameStack.set(e),!0):(e===u.syntax.function&&k("W023",u.tokens.curr),!1)}function K(e,t,n){var r=B(e,"function"==typeof t?t:function(e,t){if(t.left=e,e&&Z(e,t,{allowDestructuring:!0}))return t.right=A(10),t
y("E031",t)},n)
return r.exps=!0,r.assign=!0,r}function Q(e,t,n){var r=V(e,n)
return I(r),r.led="function"==typeof t?t:function(e){return u.option.bitwise&&k("W016",this,this.id),this.left=e,this.right=A(n),this},r}function Y(e){return K(e,function(e,t){if(u.option.bitwise&&k("W016",t,t.id),e&&Z(e,t))return t.right=A(10),t
y("E031",t)},20)}function ee(e){var t=V(e,150)
return t.led=function(e){return u.option.plusplus?k("W016",this,this.id):e.identifier&&!n(e)||"."===e.id||"["===e.id||k("W017",this),e.isMetaProperty?y("E031",this):e&&e.identifier&&u.funct["(scope)"].block.modify(e.value,e),this.left=e,this},t}function te(e,t,r){if(u.tokens.next.identifier){r||j()
var i=u.tokens.curr,o=u.tokens.curr.value
return n(i)?t&&u.inES5()?o:e&&"undefined"===o?o:(k("W024",u.tokens.curr,u.tokens.curr.id),o):o}}function ne(e,t){var n=te(e,t,!1)
if(n)return n
if("..."===u.tokens.next.value){if(u.inES6(!0)||k("W119",u.tokens.next,"spread/rest operator","6"),j(),Ae(u.tokens.next,"..."))for(k("E024",u.tokens.next,"...");Ae(u.tokens.next,"...");)j()
return u.tokens.next.identifier?ne(e,t):void k("E024",u.tokens.curr,"...")}y("E030",u.tokens.next,u.tokens.next.value),";"!==u.tokens.next.id&&j()}function re(e){var t,n=0
if(";"===u.tokens.next.id&&!e.inBracelessBlock)for(;;){do{t=S(n),n+=1}while("(end)"!==t.id&&"(comment)"===t.id)
if(t.reach)return
if("(endline)"!==t.id){if("function"===t.id){!0===u.option.latedef&&k("W026",t)
break}k("W027",t,t.value,e.value)
break}}}function ie(){var e,t=Ve,r=u.tokens.next,i=!1
if(";"!==r.id){var o=n(r)
if(o&&r.meta&&r.meta.isFutureReservedWord&&":"===S().id&&(k("W024",r,r.id),o=!1),r.identifier&&!o&&":"===S().id&&(j(),j(":"),i=!0,u.funct["(scope)"].stack(),u.funct["(scope)"].block.addBreakLabel(r.value,{token:u.tokens.curr}),u.tokens.next.labelled||"{"===u.tokens.next.value||k("W028",u.tokens.next,r.value,u.tokens.next.value),u.tokens.next.label=r.value,r=u.tokens.next),"{"!==r.id)return!(e=A(0,!0))||e.identifier&&"function"===e.value||"(punctuator)"===e.type&&e.left&&e.left.identifier&&"function"===e.left.value||u.isStrict()||"global"!==u.option.strict||k("E007"),r.block||(u.option.expr||e&&e.exps?u.option.nonew&&e&&e.left&&"("===e.id&&"new"===e.left.id&&k("W031",r):k("W030",u.tokens.curr),function(){if(";"!==u.tokens.next.id){if(u.tokens.next.isUnclosed)return j()
var e=M(u.tokens.next)===u.tokens.curr.line&&"(end)"!==u.tokens.next.id,t=Ae(u.tokens.next,"}")
e&&!t?x("E058",u.tokens.curr.line,u.tokens.curr.character):u.option.asi||(t&&!u.option.lastsemic||!e)&&b("W033",u.tokens.curr.line,u.tokens.curr.character)}else j(";")}()),Ve=t,i&&u.funct["(scope)"].unstack(),e
ae(!0,!0,!1,!1,"case"===u.funct["(verb)"]&&":"===u.tokens.curr.value)}else j(";")}function oe(){for(var e,t=[];!u.tokens.next.reach&&"(end)"!==u.tokens.next.id;)";"===u.tokens.next.id?((!(e=S())||"("!==e.id&&"["!==e.id)&&k("W032"),j(";")):t.push(ie())
return t}function se(){for(var e,t,n;"(string)"===u.tokens.next.id;){if("(endline)"===(t=S(0)).id){e=1
do{n=S(e++)}while("(endline)"===n.id)
if(";"===n.id)t=n
else{if("["===n.value||"."===n.value)break
u.option.asi&&"("!==n.value||k("W033",u.tokens.next)}}else{if("."===t.id||"["===t.id)break
";"!==t.id&&k("W033",t)}j()
var r=u.tokens.curr.value;(u.directive[r]||"use strict"===r&&"implied"===u.option.strict)&&k("W034",u.tokens.curr,r),u.directive[r]=!0,";"===t.id&&j(";")}u.isStrict()&&(u.option["(explicitNewcap)"]||(u.option.newcap=!0),u.option.undef=!0)}function ae(e,t,n,i,o){var s,a,c,l,f=Ge,h=Ve
Ge=e,c=u.tokens.next
var p=u.funct["(metrics)"]
if(p.nestedBlockDepth+=1,p.verifyMaxNestedBlockDepthPerFunction(),"{"===u.tokens.next.id){if(j("{"),u.funct["(scope)"].stack(),u.tokens.curr.line,"}"!==u.tokens.next.id){for(Ve+=u.option.indent;!e&&u.tokens.next.from>Ve;)Ve+=u.option.indent
if(n){a={}
for(l in u.directive)r.has(u.directive,l)&&(a[l]=u.directive[l])
se(),u.option.strict&&u.funct["(context)"]["(global)"]&&(a["use strict"]||u.isStrict()||k("E007"))}s=oe(),p.statementCount+=s.length,Ve-=u.option.indent}j("}",c),n&&(u.funct["(scope)"].validateParams(),a&&(u.directive=a)),u.funct["(scope)"].unstack(),Ve=h}else if(e)u.funct["(noblockscopedvar)"]="for"!==u.tokens.next.id,u.funct["(scope)"].stack(),t&&!u.option.curly||k("W116",u.tokens.next,"{",u.tokens.next.value),u.tokens.next.inBracelessBlock=!0,Ve+=u.option.indent,s=[ie()],Ve-=u.option.indent,u.funct["(scope)"].unstack(),delete u.funct["(noblockscopedvar)"]
else if(n){if(u.funct["(scope)"].stack(),a={},!t||i||u.inMoz()||y("W118",u.tokens.curr,"function closure expressions"),!t)for(l in u.directive)r.has(u.directive,l)&&(a[l]=u.directive[l])
A(10),u.option.strict&&u.funct["(context)"]["(global)"]&&(a["use strict"]||u.isStrict()||k("E007")),u.funct["(scope)"].unstack()}else y("E021",u.tokens.next,"{",u.tokens.next.value)
switch(u.funct["(verb)"]){case"break":case"continue":case"return":case"throw":if(o)break
default:u.funct["(verb)"]=null}return Ge=f,!e||!u.option.noempty||s&&0!==s.length||k("W035",u.tokens.prev),p.nestedBlockDepth-=1,s}function ce(e){Ie&&"boolean"!=typeof Ie[e]&&k("W036",u.tokens.curr,e),"number"==typeof Re[e]?Re[e]+=1:Re[e]=1}function ue(e){return e.identifier||"(string)"===e.id||"(number)"===e.id}function le(e){var t,n=!0
return(t="object"==typeof e?e:te(!1,!0,n=e))?"object"==typeof t&&("(string)"===t.id||"(identifier)"===t.id?t=t.value:"(number)"===t.id&&(t=t.value.toString())):"(string)"===u.tokens.next.id?(t=u.tokens.next.value,n||j()):"(number)"===u.tokens.next.id&&(t=u.tokens.next.value.toString(),n||j()),"hasOwnProperty"===t&&k("W001"),t}function fe(e,t,n){var i={"(name)":e,"(breakage)":0,"(loopage)":0,"(tokens)":{},"(properties)":{},"(catch)":!1,"(global)":!1,"(line)":null,"(character)":null,"(metrics)":null,"(statement)":null,"(context)":null,"(scope)":null,"(comparray)":null,"(generator)":null,"(arrow)":null,"(params)":null}
return t&&r.extend(i,{"(line)":t.line,"(character)":t.character,"(metrics)":ve(t)}),r.extend(i,n),i["(context)"]&&(i["(scope)"]=i["(context)"]["(scope)"],i["(comparray)"]=i["(context)"]["(comparray)"]),i}function he(e){return"(scope)"in e}function pe(e){return e["(global)"]&&!e["(verb)"]}function de(e){var t=this.context,n=this.noSubst,r=this.depth
if(!n)for(;!function(){if(u.tokens.curr.template&&u.tokens.curr.tail&&u.tokens.curr.context===t)return!0
var e=u.tokens.next.template&&u.tokens.next.tail&&u.tokens.next.context===t
return e&&j(),e||u.tokens.next.isUnclosed}();)!u.tokens.next.template||u.tokens.next.depth>r?A(0):j()
return{id:"(template)",type:"(template)",tag:e}}function me(e){var t,n,i,o,s,a,c,l,f=u.option,h=u.ignored
e&&(i=e.name,o=e.statement,s=e.classExprBinding,a="generator"===e.type,c="arrow"===e.type,l=e.ignoreLoopFunc),u.option=Object.create(u.option),u.ignored=Object.create(u.ignored),u.funct=fe(i||u.nameStack.infer(),u.tokens.next,{"(statement)":o,"(context)":u.funct,"(arrow)":c,"(generator)":a}),t=u.funct,(n=u.tokens.curr).funct=u.funct,Pe.push(u.funct),u.funct["(scope)"].stack("functionouter")
var p=i||s
p&&u.funct["(scope)"].block.add(p,s?"class":"function",u.tokens.curr,!1),u.funct["(scope)"].stack("functionparams")
var d=function(e){function t(e){u.funct["(scope)"].addParam.apply(u.funct["(scope)"],e)}var n,i,o,s=[],a=[],c=!1,l=!1,f=0,h=e&&e.loneArg
if(h&&!0===h.identifier)return u.funct["(scope)"].addParam(h.value,h),{arity:1,params:[h.value]}
if(n=u.tokens.next,e&&e.parsedOpening||j("("),")"!==u.tokens.next.id)for(;;){f++
var p=[]
if(r.contains(["{","["],u.tokens.next.id)){a=ye()
for(o in a)(o=a[o]).id&&(s.push(o.id),p.push([o.id,o.token]))}else if(Ae(u.tokens.next,"...")&&(l=!0),i=ne(!0))s.push(i),p.push([i,u.tokens.curr])
else for(;!_e(u.tokens.next,[",",")"]);)j()
if(c&&"="!==u.tokens.next.id&&y("W138",u.tokens.current),"="===u.tokens.next.id&&(u.inES6()||k("W119",u.tokens.next,"default parameters","6"),j("="),c=!0,A(10)),p.forEach(t),","!==u.tokens.next.id)return j(")",n),{arity:f,params:s}
l&&k("W131",u.tokens.next),G()}else j(")")}(e)
return d?(u.funct["(params)"]=d.params,u.funct["(metrics)"].arity=d.arity,u.funct["(metrics)"].verifyMaxParametersPerFunction()):u.funct["(metrics)"].arity=0,c&&(u.inES6(!0)||k("W119",u.tokens.curr,"arrow function syntax (=>)","6"),e.loneArg||j("=>")),ae(!1,!0,!0,c),!u.option.noyield&&a&&"yielded"!==u.funct["(generator)"]&&k("W124",u.tokens.curr),u.funct["(metrics)"].verifyMaxStatementsPerFunction(),u.funct["(metrics)"].verifyMaxComplexityPerFunction(),u.funct["(unusedOption)"]=u.option.unused,u.option=f,u.ignored=h,u.funct["(last)"]=u.tokens.curr.line,u.funct["(lastcharacter)"]=u.tokens.curr.character,u.funct["(scope)"].unstack(),u.funct["(scope)"].unstack(),u.funct=u.funct["(context)"],l||u.option.loopfunc||!u.funct["(loopage)"]||t["(isCapturing)"]&&k("W083",n),t}function ve(e){return{statementCount:0,nestedBlockDepth:-1,ComplexityCount:1,arity:0,verifyMaxStatementsPerFunction:function(){u.option.maxstatements&&this.statementCount>u.option.maxstatements&&k("W071",e,this.statementCount)},verifyMaxParametersPerFunction:function(){r.isNumber(u.option.maxparams)&&this.arity>u.option.maxparams&&k("W072",e,this.arity)},verifyMaxNestedBlockDepthPerFunction:function(){u.option.maxdepth&&this.nestedBlockDepth>0&&this.nestedBlockDepth===u.option.maxdepth+1&&k("W073",null,this.nestedBlockDepth)},verifyMaxComplexityPerFunction:function(){var t=u.option.maxcomplexity,n=this.ComplexityCount
t&&n>t&&k("W074",e,n)}}}function ge(){u.funct["(metrics)"].ComplexityCount+=1}function ke(e){var t,n
switch(e&&(t=e.id,n=e.paren,","===t&&(e=e.exprs[e.exprs.length-1])&&(t=e.id,n=n||e.paren)),t){case"=":case"+=":case"-=":case"*=":case"%=":case"&=":case"|=":case"^=":case"/=":n||u.option.boss||k("W084")}}function be(e){if(u.inES5())for(var t in e)e[t]&&e[t].setterToken&&!e[t].getterToken&&k("W078",e[t].setterToken)}function ye(e){var t=e&&e.assignment
return u.inES6()||k("W104",u.tokens.curr,t?"destructuring assignment":"destructuring binding","6"),xe(e)}function xe(e){var t,n=[],r=e&&e.openingParsed,i=e&&e.assignment,o=i?{assignment:i}:null,s=r?u.tokens.curr:u.tokens.next,a=function(){var e
if(_e(u.tokens.next,["[","{"])){t=xe(o)
for(var r in t)r=t[r],n.push({id:r.id,token:r.token})}else if(Ae(u.tokens.next,","))n.push({id:null,token:u.tokens.curr})
else{if(!Ae(u.tokens.next,"(")){var s=Ae(u.tokens.next,"...")
if(i){var c=s?S(0):u.tokens.next
c.identifier||k("E030",c,c.value)
var l=A(155)
l&&(Z(l),l.identifier&&(e=l.value))}else e=ne()
return e&&n.push({id:e,token:u.tokens.curr}),s}j("("),a(),j(")")}return!1},c=function(){var e
Ae(u.tokens.next,"[")?(j("["),A(10),j("]"),j(":"),a()):"(string)"===u.tokens.next.id||"(number)"===u.tokens.next.id?(j(),j(":"),a()):(e=ne(),Ae(u.tokens.next,":")?(j(":"),a()):e&&(i&&Z(u.tokens.curr),n.push({id:e,token:u.tokens.curr})))}
if(Ae(s,"[")){r||j("["),Ae(u.tokens.next,"]")&&k("W137",u.tokens.curr)
for(var l=!1;!Ae(u.tokens.next,"]");)a()&&!l&&Ae(u.tokens.next,",")&&(k("W130",u.tokens.next),l=!0),Ae(u.tokens.next,"=")&&(Ae(u.tokens.prev,"...")?j("]"):j("="),"undefined"===u.tokens.next.id&&k("W080",u.tokens.prev,u.tokens.prev.value),A(10)),Ae(u.tokens.next,"]")||j(",")
j("]")}else if(Ae(s,"{")){for(r||j("{"),Ae(u.tokens.next,"}")&&k("W137",u.tokens.curr);!Ae(u.tokens.next,"}")&&(c(),Ae(u.tokens.next,"=")&&(j("="),"undefined"===u.tokens.next.id&&k("W080",u.tokens.prev,u.tokens.prev.value),A(10)),Ae(u.tokens.next,"}")||(j(","),!Ae(u.tokens.next,"}"))););j("}")}return n}function Ee(e,t){var n=t.first
n&&r.zip(e,Array.isArray(n)?n:[n]).forEach(function(e){var t=e[0],n=e[1]
t&&n?t.first=n:t&&t.first&&!n&&k("W080",t.first,t.first.value)})}function we(e,t,n){var i,o,s,a,c=n&&n.prefix,l=n&&n.inexport,f="let"===e,h="const"===e
for(u.inES6()||k("W104",u.tokens.curr,e,"6"),f&&"("===u.tokens.next.value?(u.inMoz()||k("W118",u.tokens.next,"let block"),j("("),u.funct["(scope)"].stack(),a=!0):u.funct["(noblockscopedvar)"]&&y("E048",u.tokens.curr,h?"Const":"Let"),t.first=[];;){var p=[]
r.contains(["{","["],u.tokens.next.value)?(i=ye(),o=!1):(i=[{id:ne(),token:u.tokens.curr}],o=!0),!c&&h&&"="!==u.tokens.next.id&&k("E012",u.tokens.curr,u.tokens.curr.value)
for(var d in i)i.hasOwnProperty(d)&&(d=i[d],u.funct["(scope)"].block.isGlobal()&&!1===Ue[d.id]&&k("W079",d.token,d.id),d.id&&!u.funct["(noblockscopedvar)"]&&(u.funct["(scope)"].addlabel(d.id,{type:e,token:d.token}),p.push(d.token),o&&l&&u.funct["(scope)"].setExported(d.token.value,d.token)))
if("="===u.tokens.next.id&&(j("="),c||"undefined"!==u.tokens.next.id||k("W080",u.tokens.prev,u.tokens.prev.value),!c&&"="===S(0).id&&u.tokens.next.identifier&&k("W120",u.tokens.next,u.tokens.next.value),s=A(c?120:10),o?i[0].first=s:Ee(p,s)),t.first=t.first.concat(p),","!==u.tokens.next.id)break
G()}return a&&(j(")"),ae(!0,!0),t.block=!0,u.funct["(scope)"].unstack()),t}function Se(e){return u.inES6()||k("W104",u.tokens.curr,"class","6"),e?(this.name=ne(),u.funct["(scope)"].addlabel(this.name,{type:"class",token:u.tokens.curr})):u.tokens.next.identifier&&"extends"!==u.tokens.next.value?(this.name=ne(),this.namedExpr=!0):this.name=u.nameStack.infer(),function(e){var t=u.inClassBody
"extends"===u.tokens.next.value&&(j("extends"),e.heritage=A(10))
u.inClassBody=!0,j("{"),e.body=function(e){for(var t,n,r,i,o,s=Object.create(null),a=Object.create(null),c=0;"}"!==u.tokens.next.id;++c)if(t=u.tokens.next,n=!1,r=!1,i=null,";"!==t.id){if("*"===t.id&&(r=!0,j("*"),t=u.tokens.next),"["===t.id)t=Le(),o=!0
else{if(!ue(t)){k("W052",u.tokens.next,u.tokens.next.value||u.tokens.next.type),j()
continue}j(),o=!1,t.identifier&&"static"===t.value&&(Ae(u.tokens.next,"*")&&(r=!0,j("*")),(ue(u.tokens.next)||"["===u.tokens.next.id)&&(o="["===u.tokens.next.id,n=!0,t=u.tokens.next,"["===u.tokens.next.id?t=Le():j())),!t.identifier||"get"!==t.value&&"set"!==t.value||(ue(u.tokens.next)||"["===u.tokens.next.id)&&(o="["===u.tokens.next.id,i=t,t=u.tokens.next,"["===u.tokens.next.id?t=Le():j())}if(!Ae(u.tokens.next,"(")){for(y("E054",u.tokens.next,u.tokens.next.value);"}"!==u.tokens.next.id&&!Ae(u.tokens.next,"(");)j()
"("!==u.tokens.next.value&&me({statement:e})}if(o||(i?je(i.value,n?a:s,t.value,t,!0,n):("constructor"===t.value?u.nameStack.set(e):u.nameStack.set(t),We(n?a:s,t.value,t,!0,n))),i&&"constructor"===t.value){var l="get"===i.value?"class getter method":"class setter method"
y("E049",t,l,"constructor")}else"prototype"===t.value&&y("E049",t,"class method","prototype")
le(t),me({statement:e,type:r?"generator":null,classExprBinding:e.namedExpr?e.name:null})}else k("W032"),j(";")
be(s)}(e),j("}"),u.inClassBody=t}(this),this}function We(e,t,n,r,i){var o=["key","class method","static class method"]
o=o[(r||!1)+(i||!1)],n.identifier&&(t=n.value),e[t]&&"__proto__"!==t?k("W075",u.tokens.next,o,t):e[t]=Object.create(null),e[t].basic=!0,e[t].basictkn=n}function je(e,t,n,r,i,o){var s="get"===e?"getterToken":"setterToken",a=""
i?(o&&(a+="static "),a+=e+"ter method"):a="key",u.tokens.curr.accessorType=e,u.nameStack.set(r),t[n]?(t[n].basic||t[n][s])&&"__proto__"!==n&&k("W075",u.tokens.next,a,n):t[n]=Object.create(null),t[n][s]=r}function Le(){j("["),u.inES6()||k("W119",u.tokens.curr,"computed property names","6")
var e=A(10)
return j("]"),e}function _e(e,t){return"(punctuator)"===e.type&&r.contains(t,e.value)}function Ae(e,t){return"(punctuator)"===e.type&&e.value===t}function Me(){switch(u.tokens.next.id){case"{":(function(){var e={},t=u.tokens.next
if(j("{"),"}"!==u.tokens.next.id)for(;;){if("(end)"===u.tokens.next.id)y("E026",u.tokens.next,t.line)
else{if("}"===u.tokens.next.id){k("W094",u.tokens.curr)
break}","===u.tokens.next.id?y("E028",u.tokens.next):"(string)"!==u.tokens.next.id&&k("W095",u.tokens.next,u.tokens.next.value)}if(!0===e[u.tokens.next.value]?k("W075",u.tokens.next,"key",u.tokens.next.value):"__proto__"===u.tokens.next.value&&!u.option.proto||"__iterator__"===u.tokens.next.value&&!u.option.iterator?k("W096",u.tokens.next,u.tokens.next.value):e[u.tokens.next.value]=!0,j(),j(":"),Me(),","!==u.tokens.next.id)break
j(",")}j("}")})()
break
case"[":(function(){var e=u.tokens.next
if(j("["),"]"!==u.tokens.next.id)for(;;){if("(end)"===u.tokens.next.id)y("E027",u.tokens.next,e.line)
else{if("]"===u.tokens.next.id){k("W094",u.tokens.curr)
break}","===u.tokens.next.id&&y("E028",u.tokens.next)}if(Me(),","!==u.tokens.next.id)break
j(",")}j("]")})()
break
case"true":case"false":case"null":case"(number)":case"(string)":j()
break
case"-":j("-"),j("(number)")
break
default:y("E003",u.tokens.next)}}var Oe,Te,Pe,Ge,Ve,Ce,Fe,Re,Ie,Ue,qe,De={"<":!0,"<=":!0,"==":!0,"===":!0,"!==":!0,"!=":!0,">":!0,">=":!0,"+":!0,"-":!0,"*":!0,"/":!0,"%":!0},Ne=["closure","exception","global","label","outer","unused","var"],$e=[],Be=new i.EventEmitter,He={}
He.legacy=["xml","unknown"],He.es3=["undefined","boolean","number","string","function","object"],He.es3=He.es3.concat(He.legacy),He.es6=He.es3.concat("symbol"),q("(number)",function(){return this}),q("(string)",function(){return this}),u.syntax["(identifier)"]={type:"(identifier)",lbp:0,identifier:!0,nud:function(){var e=this.value
return"=>"===u.tokens.next.id?this:(u.funct["(comparray)"].check(e)||u.funct["(scope)"].block.use(e,u.tokens.curr),this)},led:function(){y("E033",u.tokens.next,u.tokens.next.value)}}
var ze={lbp:0,identifier:!1,template:!0}
u.syntax["(template)"]=r.extend({type:"(template)",nud:de,led:de,noSubst:!1},ze),u.syntax["(template middle)"]=r.extend({type:"(template middle)",middle:!0,noSubst:!1},ze),u.syntax["(template tail)"]=r.extend({type:"(template tail)",tail:!0,noSubst:!1},ze),u.syntax["(no subst template)"]=r.extend({type:"(template)",nud:de,led:de,noSubst:!0,tail:!0},ze),q("(regexp)",function(){return this}),C("(endline)"),C("(begin)"),C("(end)").reach=!0,C("(error)").reach=!0,C("}").reach=!0,C(")"),C("]"),C('"').reach=!0,C("'").reach=!0,C(";"),C(":").reach=!0,C("#"),D("else"),D("case").reach=!0,D("catch"),D("default").reach=!0,D("finally"),$("arguments",function(e){u.isStrict()&&u.funct["(global)"]&&k("E008",e)}),$("eval"),$("false"),$("Infinity"),$("null"),$("this",function(e){u.isStrict()&&!(u.funct["(statement)"]&&"class"===u.funct["(statement)"].type||u.funct["(context)"]&&"class"===u.funct["(context)"]["(verb)"])&&!u.option.validthis&&(u.funct["(statement)"]&&u.funct["(name)"].charAt(0)>"Z"||u.funct["(global)"])&&k("W040",e)}),$("true"),$("undefined")
K("=","assign",20),K("+=","assignadd",20),K("-=","assignsub",20),K("*=","assignmult",20),K("/=","assigndiv",20).nud=function(){y("E014")},K("%=","assignmod",20),Y("&="),Y("|="),Y("^="),Y("<<="),Y(">>="),Y(">>>="),B(",",function(e,t){var n
if(t.exprs=[e],u.option.nocomma&&k("W127"),!G({peek:!0}))return t
for(;(n=A(10))&&(t.exprs.push(n),","===u.tokens.next.value&&G()););return t},10,!0),B("?",function(e,t){return ge(),t.left=e,t.right=A(10),j(":"),t.else=A(10),t},30)
B("||",function(e,t){return ge(),t.left=e,t.right=A(40),t},40),B("&&","and",50),Q("|","bitor",70),Q("^","bitxor",80),Q("&","bitand",90),H("==",function(e,t){switch(!0){case!(u.option.eqnull&&("null"===(e&&e.value)||"null"===(t&&t.value)))&&u.option.eqeqeq:this.from=this.character,k("W116",this,"===","==")
break
case z(e):k("W041",this,"===",e.value)
break
case z(t):k("W041",this,"===",t.value)
break
case J(t,e,u):k("W122",this,t.value)
break
case J(e,t,u):k("W122",this,e.value)}return this}),H("===",function(e,t){return J(t,e,u)?k("W122",this,t.value):J(e,t,u)&&k("W122",this,e.value),this}),H("!=",function(e,t){return!(u.option.eqnull&&("null"===(e&&e.value)||"null"===(t&&t.value)))&&u.option.eqeqeq?(this.from=this.character,k("W116",this,"!==","!=")):z(e)?k("W041",this,"!==",e.value):z(t)?k("W041",this,"!==",t.value):J(t,e,u)?k("W122",this,t.value):J(e,t,u)&&k("W122",this,e.value),this}),H("!==",function(e,t){return J(t,e,u)?k("W122",this,t.value):J(e,t,u)&&k("W122",this,e.value),this}),H("<"),H(">"),H("<="),H(">="),Q("<<","shiftleft",120),Q(">>","shiftright",120),Q(">>>","shiftrightunsigned",120),B("in","in",120),B("instanceof","instanceof",120),B("+",function(e,t){var n
return t.left=e,t.right=n=A(130),e&&n&&"(string)"===e.id&&"(string)"===n.id?(e.value+=n.value,e.character=n.character,!u.option.scripturl&&c.javascriptURL.test(e.value)&&k("W050",e),e):t},130),U("+","num"),U("+++",function(){return k("W007"),this.arity="unary",this.right=A(150),this}),B("+++",function(e){return k("W007"),this.left=e,this.right=A(130),this},130),B("-","sub",130),U("-","neg"),U("---",function(){return k("W006"),this.arity="unary",this.right=A(150),this}),B("---",function(e){return k("W006"),this.left=e,this.right=A(130),this},130),B("*","mult",140),B("/","div",140),B("%","mod",140),ee("++")
U("++","preinc"),u.syntax["++"].exps=!0,ee("--"),U("--","predec"),u.syntax["--"].exps=!0,U("delete",function(){var e=A(10)
return e?("."!==e.id&&"["!==e.id&&k("W051"),this.first=e,e.identifier&&!u.isStrict()&&(e.forgiveUndef=!0),this):this}).exps=!0,U("~",function(){return u.option.bitwise&&k("W016",this,"~"),this.arity="unary",this.right=A(150),this}),U("...",function(){return u.inES6(!0)||k("W119",this,"spread/rest operator","6"),u.tokens.next.identifier||"(string)"===u.tokens.next.type||_e(u.tokens.next,["[","("])||y("E030",u.tokens.next,u.tokens.next.value),A(150),this}),U("!",function(){return this.arity="unary",this.right=A(150),this.right||v("E041",this.line||0),!0===De[this.right.id]&&k("W018",this,"!"),this}),U("typeof",function(){var e=A(150)
return this.first=this.right=e,e||v("E041",this.line||0,this.character||0),e.identifier&&(e.forgiveUndef=!0),this}),U("new",function(){var e=function(e,t){if(Ae(u.tokens.next,".")){var n=u.tokens.curr.id
j(".")
var r=ne()
return u.tokens.curr.isMetaProperty=!0,e!==r?y("E057",u.tokens.prev,n,r):t(),u.tokens.curr}}("target",function(){u.inES6(!0)||k("W119",u.tokens.prev,"new.target","6")
for(var e,t=u.funct;t&&(e=!t["(global)"],t["(arrow)"]);)t=t["(context)"]
e||k("W136",u.tokens.prev,"new.target")})
if(e)return e
var t,n=A(155)
if(n&&"function"!==n.id)if(n.identifier)switch(n.new=!0,n.value){case"Number":case"String":case"Boolean":case"Math":case"JSON":k("W053",u.tokens.prev,n.value)
break
case"Symbol":u.inES6()&&k("W053",u.tokens.prev,n.value)
break
case"Function":u.option.evil||k("W054")
break
case"Date":case"RegExp":case"this":break
default:"function"!==n.id&&(t=n.value.substr(0,1),u.option.newcap&&(t<"A"||t>"Z")&&!u.funct["(scope)"].isPredefined(n.value)&&k("W055",u.tokens.curr))}else"."!==n.id&&"["!==n.id&&"("!==n.id&&k("W056",u.tokens.curr)
else u.option.supernew||k("W057",this)
return"("===u.tokens.next.id||u.option.supernew||k("W058",u.tokens.curr,u.tokens.curr.value),this.first=this.right=n,this}),u.syntax.new.exps=!0,U("void").exps=!0,B(".",function(e,t){var n=ne(!1,!0)
return"string"==typeof n&&ce(n),t.left=e,t.right=n,n&&"hasOwnProperty"===n&&"="===u.tokens.next.value&&k("W001"),!e||"arguments"!==e.value||"callee"!==n&&"caller"!==n?u.option.evil||!e||"document"!==e.value||"write"!==n&&"writeln"!==n||k("W060",e):u.option.noarg?k("W059",e,n):u.isStrict()&&y("E008"),u.option.evil||"eval"!==n&&"execScript"!==n||X(e,u)&&k("W061"),t},160,!0),B("(",function(e,t){u.option.immed&&e&&!e.immed&&"function"===e.id&&k("W062")
var n=0,r=[]
if(e&&"(identifier)"===e.type&&e.value.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/)&&-1==="Array Number String Boolean Date Object Error Symbol".indexOf(e.value)&&("Math"===e.value?k("W063",e):u.option.newcap&&k("W064",e)),")"!==u.tokens.next.id)for(;r[r.length]=A(10),n+=1,","===u.tokens.next.id;)G()
return j(")"),"object"==typeof e&&(u.inES5()||"parseInt"!==e.value||1!==n||k("W065",u.tokens.curr),u.option.evil||("eval"===e.value||"Function"===e.value||"execScript"===e.value?(k("W061",e),r[0]&&"(string)"===[0].id&&E(e,r[0].value)):!r[0]||"(string)"!==r[0].id||"setTimeout"!==e.value&&"setInterval"!==e.value?!r[0]||"(string)"!==r[0].id||"."!==e.value||"window"!==e.left.value||"setTimeout"!==e.right&&"setInterval"!==e.right||(k("W066",e),E(e,r[0].value)):(k("W066",e),E(e,r[0].value))),e.identifier||"."===e.id||"["===e.id||"=>"===e.id||"("===e.id||"&&"===e.id||"||"===e.id||"?"===e.id||u.inES6()&&e["(name)"]||k("W067",t)),t.left=e,t},155,!0).exps=!0,U("(",function(){var e,t,n,r,i,o=u.tokens.next,s=-1,a=1,c=u.tokens.curr,l=u.tokens.prev,f=!u.option.singleGroups
do{"("===o.value?a+=1:")"===o.value&&(a-=1),e=o,o=S(s+=1)}while((0!==a||")"!==e.value)&&";"!==o.value&&"(end)"!==o.type)
if("function"===u.tokens.next.id&&(n=u.tokens.next.immed=!0),"=>"===o.value)return me({type:"arrow",parsedOpening:!0})
var h=[]
if(")"!==u.tokens.next.id)for(;h.push(A(10)),","===u.tokens.next.id;)u.option.nocomma&&k("W127"),G()
return j(")",this),u.option.immed&&h[0]&&"function"===h[0].id&&"("!==u.tokens.next.id&&"."!==u.tokens.next.id&&"["!==u.tokens.next.id&&k("W068",this),h.length?(h.length>1?((t=Object.create(u.syntax[","])).exprs=h,r=h[0],i=h[h.length-1],f||(f=l.assign||l.delim)):(t=r=i=h[0],f||(f=c.beginsStmt&&("{"===t.id||n||he(t))||n&&(!_()||"}"!==u.tokens.prev.id)||he(t)&&!_()||"{"===t.id&&"=>"===l.id||"(number)"===t.type&&Ae(o,".")&&/^\d+$/.test(t.value))),t&&(!f&&(r.left||r.right||t.exprs)&&(f=!function(e){return!e.left&&"unary"!==e.arity}(l)&&r.lbp<=l.lbp||!_()&&i.lbp<u.tokens.next.lbp),f||k("W126",c),t.paren=!0),t):void 0}),function(e){var t=V(e,42)
t.led=function(e){return O(u.tokens.prev,u.tokens.curr),this.left=e,this.right=me({type:"arrow",loneArg:e}),this}}("=>"),B("[",function(e,t){var r,i=A(10)
return i&&"(string)"===i.type&&(u.option.evil||"eval"!==i.value&&"execScript"!==i.value||X(e,u)&&k("W061"),ce(i.value),!u.option.sub&&c.identifier.test(i.value)&&((r=u.syntax[i.value])&&n(r)||k("W069",u.tokens.prev,i.value))),j("]",t),i&&"hasOwnProperty"===i.value&&"="===u.tokens.next.value&&k("W001"),t.left=e,t.right=i,t},160,!0),U("[",function(){var e=Xe()
if(e.isCompArray)return u.option.esnext||u.inMoz()||k("W118",u.tokens.curr,"array comprehension"),function(){var e={}
e.exps=!0,u.funct["(comparray)"].stack()
var t=!1
return"for"!==u.tokens.next.value&&(t=!0,u.inMoz()||k("W116",u.tokens.next,"for",u.tokens.next.value),u.funct["(comparray)"].setState("use"),e.right=A(10)),j("for"),"each"===u.tokens.next.value&&(j("each"),u.inMoz()||k("W118",u.tokens.curr,"for each")),j("("),u.funct["(comparray)"].setState("define"),e.left=A(130),r.contains(["in","of"],u.tokens.next.value)?j():y("E045",u.tokens.curr),u.funct["(comparray)"].setState("generate"),A(10),j(")"),"if"===u.tokens.next.value&&(j("if"),j("("),u.funct["(comparray)"].setState("filter"),e.filter=A(10),j(")")),t||(u.funct["(comparray)"].setState("use"),e.right=A(10)),j("]"),u.funct["(comparray)"].unstack(),e}()
if(e.isDestAssign)return this.destructAssign=ye({openingParsed:!0,assignment:!0}),this
var t=u.tokens.curr.line!==M(u.tokens.next)
for(this.first=[],t&&(Ve+=u.option.indent,u.tokens.next.from===Ve+u.option.indent&&(Ve+=u.option.indent));"(end)"!==u.tokens.next.id;){for(;","===u.tokens.next.id;){if(!u.option.elision){if(u.inES5()){k("W128")
do{j(",")}while(","===u.tokens.next.id)
continue}k("W070")}j(",")}if("]"===u.tokens.next.id)break
if(this.first.push(A(10)),","!==u.tokens.next.id)break
if(G({allowTrailing:!0}),"]"===u.tokens.next.id&&!u.inES5()){k("W070",u.tokens.curr)
break}}return t&&(Ve-=u.option.indent),j("]",this),this}),function(e){e.nud=function(){var e,t,n,r,i,o=!1,s=Object.create(null);(e=u.tokens.curr.line!==M(u.tokens.next))&&(Ve+=u.option.indent,u.tokens.next.from===Ve+u.option.indent&&(Ve+=u.option.indent))
if(Xe().isDestAssign)return this.destructAssign=ye({openingParsed:!0,assignment:!0}),this
for(;"}"!==u.tokens.next.id;){if(i=u.tokens.next.value,!u.tokens.next.identifier||","!==W().id&&"}"!==W().id)if(":"===S().id||"get"!==i&&"set"!==i){if("*"===u.tokens.next.value&&"(punctuator)"===u.tokens.next.type?(u.inES6()||k("W104",u.tokens.next,"generator functions","6"),j("*"),o=!0):o=!1,"["===u.tokens.next.id)t=Le(),u.nameStack.set(t)
else if(u.nameStack.set(u.tokens.next),t=le(),We(s,t,u.tokens.next),"string"!=typeof t)break
"("===u.tokens.next.value?(u.inES6()||k("W104",u.tokens.curr,"concise methods","6"),me({type:o?"generator":null})):(j(":"),A(10))}else j(i),u.inES5()||y("E034"),(t=le())||u.inES6()||y("E035"),t&&je(i,s,t,u.tokens.curr),r=u.tokens.next,n=me()["(params)"],"get"===i&&t&&n?k("W076",r,n[0],t):"set"!==i||!t||n&&1===n.length||k("W077",r,t)
else u.inES6()||k("W104",u.tokens.next,"object short notation","6"),We(s,t=le(!0),u.tokens.next),A(10)
if(ce(t),","!==u.tokens.next.id)break
G({allowTrailing:!0,property:!0}),","===u.tokens.next.id?k("W070",u.tokens.curr):"}"!==u.tokens.next.id||u.inES5()||k("W070",u.tokens.curr)}return e&&(Ve-=u.option.indent),j("}",this),be(s),this},e.fud=function(){y("E036",u.tokens.curr)}}(C("{"))
F("const",function(e){return we("const",this,e)}).exps=!0
F("let",function(e){return we("let",this,e)}).exps=!0
var Je=F("var",function(e){var t,n,i,s=e&&e.prefix,a=e&&e.inexport,c=e&&e.implied,l=!(e&&e.ignore)
for(this.first=[];;){var f=[]
r.contains(["{","["],u.tokens.next.value)?(t=ye(),n=!1):(t=[{id:ne(),token:u.tokens.curr}],n=!0),s&&c||!l||!u.option.varstmt||k("W132",this),this.first=this.first.concat(f)
for(var h in t)t.hasOwnProperty(h)&&(h=t[h],!c&&u.funct["(global)"]&&(!1===Ue[h.id]?k("W079",h.token,h.id):!1===u.option.futurehostile&&(!u.inES5()&&!1===o.ecmaIdentifiers[5][h.id]||!u.inES6()&&!1===o.ecmaIdentifiers[6][h.id])&&k("W129",h.token,h.id)),h.id&&("for"===c?(u.funct["(scope)"].has(h.id)||l&&k("W088",h.token,h.id),u.funct["(scope)"].block.use(h.id,h.token)):(u.funct["(scope)"].addlabel(h.id,{type:"var",token:h.token}),n&&a&&u.funct["(scope)"].setExported(h.id,h.token)),f.push(h.token)))
if("="===u.tokens.next.id&&(u.nameStack.set(u.tokens.curr),j("="),s||!l||u.funct["(loopage)"]||"undefined"!==u.tokens.next.id||k("W080",u.tokens.prev,u.tokens.prev.value),"="===S(0).id&&u.tokens.next.identifier&&(!s&&l&&!u.funct["(params)"]||-1===u.funct["(params)"].indexOf(u.tokens.next.value))&&k("W120",u.tokens.next,u.tokens.next.value),i=A(s?120:10),n?t[0].first=i:Ee(f,i)),","!==u.tokens.next.id)break
G()}return this})
Je.exps=!0,R("class",function(){return Se.call(this,!0)}),R("function",function(e){var t=e&&e.inexport,n=!1
"*"===u.tokens.next.value&&(j("*"),u.inES6({strict:!0})?n=!0:k("W119",u.tokens.curr,"function*","6")),Ge&&k("W082",u.tokens.curr)
var r=te()
return u.funct["(scope)"].addlabel(r,{type:"function",token:u.tokens.curr}),void 0===r?k("W025"):t&&u.funct["(scope)"].setExported(r,u.tokens.prev),me({name:r,statement:this,type:n?"generator":null,ignoreLoopFunc:Ge}),"("===u.tokens.next.id&&u.tokens.next.line===u.tokens.curr.line&&y("E039"),this}),U("function",function(){var e=!1
"*"===u.tokens.next.value&&(u.inES6()||k("W119",u.tokens.curr,"function*","6"),j("*"),e=!0)
return me({name:te(),type:e?"generator":null}),this}),R("if",function(){var e=u.tokens.next
ge(),u.condition=!0,j("(")
var t=A(0)
ke(t)
var n=null
u.option.forin&&u.forinifcheckneeded&&(u.forinifcheckneeded=!1,n=u.forinifchecks[u.forinifchecks.length-1],"(punctuator)"===t.type&&"!"===t.value?n.type="(negative)":n.type="(positive)"),j(")",e),u.condition=!1
var r=ae(!0,!0)
return n&&"(negative)"===n.type&&r&&r[0]&&"(identifier)"===r[0].type&&"continue"===r[0].value&&(n.type="(negative-with-continue)"),"else"===u.tokens.next.id&&(j("else"),"if"===u.tokens.next.id||"switch"===u.tokens.next.id?ie():ae(!0,!0)),this}),R("try",function(){function e(){if(j("catch"),j("("),u.funct["(scope)"].stack("catchparams"),_e(u.tokens.next,["[","{"])){var e=ye()
r.each(e,function(e){e.id&&u.funct["(scope)"].addParam(e.id,e,"exception")})}else"(identifier)"!==u.tokens.next.type?k("E030",u.tokens.next,u.tokens.next.value):u.funct["(scope)"].addParam(ne(),u.tokens.curr,"exception")
"if"===u.tokens.next.value&&(u.inMoz()||k("W118",u.tokens.curr,"catch filter"),j("if"),A(0)),j(")"),ae(!1),u.funct["(scope)"].unstack()}var t
for(ae(!0);"catch"===u.tokens.next.id;)ge(),t&&!u.inMoz()&&k("W118",u.tokens.next,"multiple catch blocks"),e(),t=!0
return"finally"===u.tokens.next.id?(j("finally"),void ae(!0)):(t||y("E021",u.tokens.next,"catch",u.tokens.next.value),this)}),R("while",function(){var e=u.tokens.next
return u.funct["(breakage)"]+=1,u.funct["(loopage)"]+=1,ge(),j("("),ke(A(0)),j(")",e),ae(!0,!0),u.funct["(breakage)"]-=1,u.funct["(loopage)"]-=1,this}).labelled=!0,R("with",function(){var e=u.tokens.next
return u.isStrict()?y("E010",u.tokens.curr):u.option.withstmt||k("W085",u.tokens.curr),j("("),A(0),j(")",e),ae(!0,!0),this}),R("switch",function(){var e=u.tokens.next,t=!1,n=!1
for(u.funct["(breakage)"]+=1,j("("),ke(A(0)),j(")",e),e=u.tokens.next,j("{"),u.tokens.next.from===Ve&&(n=!0),n||(Ve+=u.option.indent),this.cases=[];;)switch(u.tokens.next.id){case"case":switch(u.funct["(verb)"]){case"yield":case"break":case"case":case"continue":case"return":case"switch":case"throw":break
default:u.tokens.curr.caseFallsThrough||k("W086",u.tokens.curr,"case")}j("case"),this.cases.push(A(0)),ge(),t=!0,j(":"),u.funct["(verb)"]="case"
break
case"default":switch(u.funct["(verb)"]){case"yield":case"break":case"continue":case"return":case"throw":break
default:this.cases.length&&(u.tokens.curr.caseFallsThrough||k("W086",u.tokens.curr,"default"))}j("default"),t=!0,j(":")
break
case"}":return n||(Ve-=u.option.indent),j("}",e),u.funct["(breakage)"]-=1,void(u.funct["(verb)"]=void 0)
case"(end)":return void y("E023",u.tokens.next,"}")
default:if(Ve+=u.option.indent,t)switch(u.tokens.curr.id){case",":return void y("E040")
case":":t=!1,oe()
break
default:return void y("E025",u.tokens.curr)}else{if(":"!==u.tokens.curr.id)return void y("E021",u.tokens.next,"case",u.tokens.next.value)
j(":"),y("E024",u.tokens.curr,":"),oe()}Ve-=u.option.indent}return this}).labelled=!0,F("debugger",function(){return u.option.debug||k("W087",this),this}).exps=!0,function(){var e=F("do",function(){u.funct["(breakage)"]+=1,u.funct["(loopage)"]+=1,ge(),this.first=ae(!0,!0),j("while")
var e=u.tokens.next
return j("("),ke(A(0)),j(")",e),u.funct["(breakage)"]-=1,u.funct["(loopage)"]-=1,this})
e.labelled=!0,e.exps=!0}(),R("for",function(){var e,t=u.tokens.next,n=!1,i=null
"each"===t.value&&(i=t,j("each"),u.inMoz()||k("W118",u.tokens.curr,"for each")),ge(),j("(")
var o,s,a,c=0,l=["in","of"],f=0
_e(u.tokens.next,["{","["])&&++f
do{if(o=S(c),++c,_e(o,["{","["])?++f:_e(o,["}","]"])&&--f,f<0)break
0===f&&(!s&&Ae(o,",")?s=o:!a&&Ae(o,"=")&&(a=o))}while(f>0||!r.contains(l,o.value)&&";"!==o.value&&"(end)"!==o.type)
if(r.contains(l,o.value)){u.inES6()||"of"!==o.value||k("W104",o,"for of","6")
var h=!(a||s)
if(a&&y("W133",s,o.value,"initializer is forbidden"),s&&y("W133",s,o.value,"more than one ForBinding"),"var"===u.tokens.next.id?(j("var"),u.tokens.curr.fud({prefix:!0})):"let"===u.tokens.next.id||"const"===u.tokens.next.id?(j(u.tokens.next.id),n=!0,u.funct["(scope)"].stack(),u.tokens.curr.fud({prefix:!0})):Object.create(Je).fud({prefix:!0,implied:"for",ignore:!h}),j(o.value),A(20),j(")",t),"in"===o.value&&u.option.forin&&(u.forinifcheckneeded=!0,void 0===u.forinifchecks&&(u.forinifchecks=[]),u.forinifchecks.push({type:"(none)"})),u.funct["(breakage)"]+=1,u.funct["(loopage)"]+=1,e=ae(!0,!0),"in"===o.value&&u.option.forin){if(u.forinifchecks&&u.forinifchecks.length>0){var p=u.forinifchecks.pop();(e&&e.length>0&&("object"!=typeof e[0]||"if"!==e[0].value)||"(positive)"===p.type&&e.length>1||"(negative)"===p.type)&&k("W089",this)}u.forinifcheckneeded=!1}u.funct["(breakage)"]-=1,u.funct["(loopage)"]-=1}else{if(i&&y("E045",i),";"!==u.tokens.next.id)if("var"===u.tokens.next.id)j("var"),u.tokens.curr.fud()
else if("let"===u.tokens.next.id)j("let"),n=!0,u.funct["(scope)"].stack(),u.tokens.curr.fud()
else for(;A(0,"for"),","===u.tokens.next.id;)s()
if(T(u.tokens.curr),j(";"),u.funct["(loopage)"]+=1,";"!==u.tokens.next.id&&ke(A(0)),T(u.tokens.curr),j(";"),";"===u.tokens.next.id&&y("E021",u.tokens.next,")",";"),")"!==u.tokens.next.id)for(;A(0,"for"),","===u.tokens.next.id;)s()
j(")",t),u.funct["(breakage)"]+=1,ae(!0,!0),u.funct["(breakage)"]-=1,u.funct["(loopage)"]-=1}return n&&u.funct["(scope)"].unstack(),this}).labelled=!0,F("break",function(){var e=u.tokens.next.value
return u.option.asi||T(this),";"===u.tokens.next.id||u.tokens.next.reach||u.tokens.curr.line!==M(u.tokens.next)?0===u.funct["(breakage)"]&&k("W052",u.tokens.next,this.value):(u.funct["(scope)"].funct.hasBreakLabel(e)||k("W090",u.tokens.next,e),this.first=u.tokens.next,j()),re(this),this}).exps=!0,F("continue",function(){var e=u.tokens.next.value
return 0===u.funct["(breakage)"]&&k("W052",u.tokens.next,this.value),u.funct["(loopage)"]||k("W052",u.tokens.next,this.value),u.option.asi||T(this),";"===u.tokens.next.id||u.tokens.next.reach||u.tokens.curr.line===M(u.tokens.next)&&(u.funct["(scope)"].funct.hasBreakLabel(e)||k("W090",u.tokens.next,e),this.first=u.tokens.next,j()),re(this),this}).exps=!0,F("return",function(){return this.line===M(u.tokens.next)?";"===u.tokens.next.id||u.tokens.next.reach||(this.first=A(0),!this.first||"(punctuator)"!==this.first.type||"="!==this.first.value||this.first.paren||u.option.boss||b("W093",this.first.line,this.first.character)):"(punctuator)"===u.tokens.next.type&&["[","{","+","-"].indexOf(u.tokens.next.value)>-1&&T(this),re(this),this}).exps=!0,function(e){e.exps=!0,e.lbp=25}(U("yield",function(){var e=u.tokens.prev
u.inES6(!0)&&!u.funct["(generator)"]?"(catch)"===u.funct["(name)"]&&u.funct["(context)"]["(generator)"]||y("E046",u.tokens.curr,"yield"):u.inES6()||k("W104",u.tokens.curr,"yield","6"),u.funct["(generator)"]="yielded"
var t=!1
return"*"===u.tokens.next.value&&(t=!0,j("*")),this.line!==M(u.tokens.next)&&u.inMoz()?u.option.asi||T(this):((t||";"!==u.tokens.next.id&&!u.option.asi&&!u.tokens.next.reach&&u.tokens.next.nud)&&(O(u.tokens.curr,u.tokens.next),this.first=A(10),"(punctuator)"!==this.first.type||"="!==this.first.value||this.first.paren||u.option.boss||b("W093",this.first.line,this.first.character)),u.inMoz()&&")"!==u.tokens.next.id&&(e.lbp>30||!e.assign&&!_()||"yield"===e.id)&&y("E050",this)),this})),F("throw",function(){return T(this),this.first=A(20),re(this),this}).exps=!0,F("import",function(){if(u.inES6()||k("W119",u.tokens.curr,"import","6"),"(string)"===u.tokens.next.type)return j("(string)"),this
if(u.tokens.next.identifier){if(this.name=ne(),u.funct["(scope)"].addlabel(this.name,{type:"const",token:u.tokens.curr}),","!==u.tokens.next.value)return j("from"),j("(string)"),this
j(",")}if("*"===u.tokens.next.id)j("*"),j("as"),u.tokens.next.identifier&&(this.name=ne(),u.funct["(scope)"].addlabel(this.name,{type:"const",token:u.tokens.curr}))
else for(j("{");;){if("}"===u.tokens.next.value){j("}")
break}var e
if("default"===u.tokens.next.type?(e="default",j("default")):e=ne(),"as"===u.tokens.next.value&&(j("as"),e=ne()),u.funct["(scope)"].addlabel(e,{type:"const",token:u.tokens.curr}),","!==u.tokens.next.value){if("}"===u.tokens.next.value){j("}")
break}y("E024",u.tokens.next,u.tokens.next.value)
break}j(",")}return j("from"),j("(string)"),this}).exps=!0,F("export",function(){var e,t,n=!0
if(u.inES6()||(k("W119",u.tokens.curr,"export","6"),n=!1),u.funct["(scope)"].block.isGlobal()||(y("E053",u.tokens.curr),n=!1),"*"===u.tokens.next.value)return j("*"),j("from"),j("(string)"),this
if("default"===u.tokens.next.type){u.nameStack.set(u.tokens.next),j("default")
var r=u.tokens.next.id
return"function"!==r&&"class"!==r||(this.block=!0),e=S(),A(10),t=e.value,this.block&&(u.funct["(scope)"].addlabel(t,{type:r,token:e}),u.funct["(scope)"].setExported(t,e)),this}if("{"===u.tokens.next.value){j("{")
for(var i=[];;){if(u.tokens.next.identifier||y("E030",u.tokens.next,u.tokens.next.value),j(),i.push(u.tokens.curr),"as"===u.tokens.next.value&&(j("as"),u.tokens.next.identifier||y("E030",u.tokens.next,u.tokens.next.value),j()),","!==u.tokens.next.value){if("}"===u.tokens.next.value){j("}")
break}y("E024",u.tokens.next,u.tokens.next.value)
break}j(",")}return"from"===u.tokens.next.value?(j("from"),j("(string)")):n&&i.forEach(function(e){u.funct["(scope)"].setExported(e.value,e)}),this}if("var"===u.tokens.next.id)j("var"),u.tokens.curr.fud({inexport:!0})
else if("let"===u.tokens.next.id)j("let"),u.tokens.curr.fud({inexport:!0})
else if("const"===u.tokens.next.id)j("const"),u.tokens.curr.fud({inexport:!0})
else if("function"===u.tokens.next.id)this.block=!0,j("function"),u.syntax.function.fud({inexport:!0})
else if("class"===u.tokens.next.id){this.block=!0,j("class")
var o=u.tokens.next
u.syntax.class.fud(),u.funct["(scope)"].setExported(o.value,o)}else y("E024",u.tokens.next,u.tokens.next.value)
return this}).exps=!0,N("abstract"),N("boolean"),N("byte"),N("char"),N("class",{es5:!0,nud:Se}),N("double"),N("enum",{es5:!0}),N("export",{es5:!0}),N("extends",{es5:!0}),N("final"),N("float")
N("goto"),N("implements",{es5:!0,strictOnly:!0}),N("import",{es5:!0}),N("int"),N("interface",{es5:!0,strictOnly:!0}),N("long"),N("native"),N("package",{es5:!0,strictOnly:!0}),N("private",{es5:!0,strictOnly:!0}),N("protected",{es5:!0,strictOnly:!0}),N("public",{es5:!0,strictOnly:!0}),N("short"),N("static",{es5:!0,strictOnly:!0}),N("super",{es5:!0}),N("synchronized"),N("transient"),N("volatile")
var Xe=function(){var e,t,n,r=-1,i=0,o={}
_e(u.tokens.curr,["[","{"])&&(i+=1)
do{if(n=-1===r?u.tokens.curr:e,e=-1===r?u.tokens.next:S(r),t=S(r+1),r+=1,_e(e,["[","{"])?i+=1:_e(e,["]","}"])&&(i-=1),1===i&&e.identifier&&"for"===e.value&&!Ae(n,".")){o.isCompArray=!0,o.notJson=!0
break}if(0===i&&_e(e,["}","]"])){if("="===t.value){o.isDestAssign=!0,o.notJson=!0
break}if("."===t.value){o.notJson=!0
break}}Ae(e,";")&&(o.isBlock=!0,o.notJson=!0)}while(i>0&&"(end)"!==e.id)
return o},Ze=function(){function e(e){return 0===t.variables.filter(function(t){if(t.value===e&&!t.undef)return!0===t.unused&&(t.unused=!1),e}).length}var t,n=[]
return{stack:function(){t=new function(){this.mode="use",this.variables=[]},n.push(t)},unstack:function(){t.variables.filter(function(e){e.unused&&k("W098",e.token,e.raw_text||e.value),e.undef&&u.funct["(scope)"].block.use(e.value,e.token)}),n.splice(-1,1),t=n[n.length-1]},setState:function(e){r.contains(["use","define","generate","filter"],e)&&(t.mode=e)},check:function(n){if(t)return t&&"use"===t.mode?(e(n)&&t.variables.push({funct:u.funct,token:u.tokens.curr,value:n,undef:!0,unused:!1}),!0):t&&"define"===t.mode?(function(e){return 0!==t.variables.filter(function(t){if(t.value===e)return t.undef=!1,e}).length}(n)||t.variables.push({funct:u.funct,token:u.tokens.curr,value:n,undef:!1,unused:!0}),!0):t&&"generate"===t.mode?(u.funct["(scope)"].block.use(n,u.tokens.curr),!0):!(!t||"filter"!==t.mode)&&(e(n)&&u.funct["(scope)"].block.use(n,u.tokens.curr),!0)}}},Ke=function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},Qe=function(t,n,i){function s(e,t){e&&(Array.isArray(e)||"object"!=typeof e||(e=Object.keys(e)),e.forEach(t))}var c,l,f,g,E,w,S={},W={}
n=r.clone(n),u.reset(),n&&n.scope?p.scope=n.scope:(p.errors=[],p.undefs=[],p.internals=[],p.blacklist={},p.scope="(main)"),d(Ue=Object.create(null),o.ecmaIdentifiers[3]),d(Ue,o.reservedVars),d(Ue,i||{}),Te=Object.create(null)
var L=Object.create(null)
if(n)for(s(n.predef||null,function(e){var t,r
"-"===e[0]?(t=e.slice(1),p.blacklist[t]=t,delete Ue[t]):(r=Object.getOwnPropertyDescriptor(n.predef,e),Ue[e]=!!r&&r.value)}),s(n.exported||null,function(e){L[e]=!0}),delete n.predef,delete n.exported,w=Object.keys(n),f=0;f<w.length;f++)if(/^-W\d{3}$/g.test(w[f]))W[w[f].slice(1)]=!0
else{var _=w[f]
S[_]=n[_],("esversion"===_&&5===n[_]||"es5"===_&&n[_])&&k("I003"),"newcap"===w[f]&&!1===n[_]&&(S["(explicitNewcap)"]=!0)}u.option=S,u.ignored=W,u.option.indent=u.option.indent||4,u.option.maxerr=u.option.maxerr||50,Ve=1
var A=h(u,Ue,L,Te)
if(A.on("warning",function(e){k.apply(null,[e.code,e.token].concat(e.data))}),A.on("error",function(e){y.apply(null,[e.code,e.token].concat(e.data))}),u.funct=fe("(global)",null,{"(global)":!0,"(scope)":A,"(comparray)":Ze(),"(metrics)":ve(u.tokens.next)}),Pe=[u.funct],qe=[],null,Re={},Ie=null,Ge=!1,Ce=[],!function(e){return"[object String]"===Object.prototype.toString.call(e)}(t)&&!Array.isArray(t))return x("E004",0),!1
Oe={get isJSON(){return u.jsonMode},getOption:function(e){return u.option[e]||null},getCache:function(e){return u.cache[e]},setCache:function(e,t){u.cache[e]=t},warn:function(e,t){b.apply(null,[e,t.line,t.char].concat(t.data))},on:function(e,t){e.split(" ").forEach(function(e){Be.on(e,t)}.bind(this))}},Be.removeAllListeners(),($e||[]).forEach(function(e){e(Oe)}),u.tokens.prev=u.tokens.curr=u.tokens.next=u.syntax["(begin)"],n&&n.ignoreDelimiters&&(Array.isArray(n.ignoreDelimiters)||(n.ignoreDelimiters=[n.ignoreDelimiters]),n.ignoreDelimiters.forEach(function(e){e.start&&e.end&&(g=Ke(e.start)+"[\\s\\S]*?"+Ke(e.end),E=new RegExp(g,"ig"),t=t.replace(E,function(e){return e.replace(/./g," ")}))})),(Fe=new a(t)).on("warning",function(e){b.apply(null,[e.code,e.line,e.character].concat(e.data))}),Fe.on("error",function(e){x.apply(null,[e.code,e.line,e.character].concat(e.data))}),Fe.on("fatal",function(e){v("E041",e.line,e.from)}),Fe.on("Identifier",function(e){Be.emit("Identifier",e)}),Fe.on("String",function(e){Be.emit("String",e)}),Fe.on("Number",function(e){Be.emit("Number",e)}),Fe.start()
for(var M in n)r.has(n,M)&&e(M,u.tokens.curr)
m(),d(Ue,i||{}),G.first=!0
try{switch(j(),u.tokens.next.id){case"{":case"[":(function(){var e=Xe()
e.notJson?(!u.inES6()&&e.isDestAssign&&k("W104",u.tokens.curr,"destructuring assignment","6"),oe()):(u.option.laxbreak=!0,u.jsonMode=!0,Me())})()
break
default:se(),u.directive["use strict"]&&"global"!==u.option.strict&&k("W097",u.tokens.prev),oe()}"(end)"!==u.tokens.next.id&&v("E041",u.tokens.curr.line),u.funct["(scope)"].unstack()}catch(e){if(!e||"JSHintError"!==e.name)throw e
var O=u.tokens.next||{}
p.errors.push({scope:"(main)",raw:e.raw,code:e.code,reason:e.message,line:e.line||O.line,character:e.character||O.from},null)}if("(main)"===p.scope)for(n=n||{},c=0;c<p.internals.length;c+=1)l=p.internals[c],n.scope=l.elem,Qe(l.value,n,i)
return 0===p.errors.length}
return Qe.addModule=function(e){$e.push(e)},Qe.addModule(l.register),Qe.data=function(){var e,t,n,r,i,o,s={functions:[],options:u.option}
Qe.errors.length&&(s.errors=Qe.errors),u.jsonMode&&(s.json=!0)
var a=u.funct["(scope)"].getImpliedGlobals()
for(a.length>0&&(s.implieds=a),qe.length>0&&(s.urls=qe),(o=u.funct["(scope)"].getUsedOrDefinedGlobals()).length>0&&(s.globals=o),n=1;n<Pe.length;n+=1){for(t=Pe[n],e={},r=0;r<Ne.length;r+=1)e[Ne[r]]=[]
for(r=0;r<Ne.length;r+=1)0===e[Ne[r]].length&&delete e[Ne[r]]
e.name=t["(name)"],e.param=t["(params)"],e.line=t["(line)"],e.character=t["(character)"],e.last=t["(last)"],e.lastcharacter=t["(lastcharacter)"],e.metrics={complexity:t["(metrics)"].ComplexityCount,parameters:t["(metrics)"].arity,statements:t["(metrics)"].statementCount},s.functions.push(e)}var c=u.funct["(scope)"].getUnuseds()
c.length>0&&(s.unused=c)
for(i in Re)if("number"==typeof Re[i]){s.member=Re
break}return s},Qe.jshint=Qe,Qe}()
"object"==typeof n&&n&&(n.JSHINT=p)},{"../lodash":"/node_modules/jshint/lodash.js","./lex.js":"/node_modules/jshint/src/lex.js","./messages.js":"/node_modules/jshint/src/messages.js","./options.js":"/node_modules/jshint/src/options.js","./reg.js":"/node_modules/jshint/src/reg.js","./scope-manager.js":"/node_modules/jshint/src/scope-manager.js","./state.js":"/node_modules/jshint/src/state.js","./style.js":"/node_modules/jshint/src/style.js","./vars.js":"/node_modules/jshint/src/vars.js",events:"/node_modules/browserify/node_modules/events/events.js"}],"/node_modules/jshint/src/lex.js":[function(e,t,n){"use strict"
function r(e){var t=e
"string"==typeof t&&(t=t.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n")),t[0]&&"#!"===t[0].substr(0,2)&&(-1!==t[0].indexOf("node")&&(a.option.node=!0),t[0]=""),this.emitter=new o.EventEmitter,this.source=e,this.setLines(t),this.prereg=!0,this.line=0,this.char=1,this.from=1,this.input="",this.inComment=!1,this.context=[],this.templateStarts=[]
for(var n=0;n<a.option.indent;n+=1)a.tab+=" "
this.ignoreLinterErrors=!1}var i=e("../lodash"),o=e("events"),s=e("./reg.js"),a=e("./state.js").state,c=e("../data/ascii-identifier-data.js"),u=c.asciiIdentifierStartTable,l=c.asciiIdentifierPartTable,f={Identifier:1,Punctuator:2,NumericLiteral:3,StringLiteral:4,Comment:5,Keyword:6,NullLiteral:7,BooleanLiteral:8,RegExp:9,TemplateHead:10,TemplateMiddle:11,TemplateTail:12,NoSubstTemplate:13},h={Block:1,Template:2}
r.prototype={_lines:[],inContext:function(e){return this.context.length>0&&this.context[this.context.length-1].type===e},pushContext:function(e){this.context.push({type:e})},popContext:function(){return this.context.pop()},isContext:function(e){return this.context.length>0&&this.context[this.context.length-1]===e},currentContext:function(){return this.context.length>0&&this.context[this.context.length-1]},getLines:function(){return this._lines=a.lines,this._lines},setLines:function(e){this._lines=e,a.lines=this._lines},peek:function(e){return this.input.charAt(e||0)},skip:function(e){e=e||1,this.char+=e,this.input=this.input.slice(e)},on:function(e,t){e.split(" ").forEach(function(e){this.emitter.on(e,t)}.bind(this))},trigger:function(){this.emitter.emit.apply(this.emitter,Array.prototype.slice.call(arguments))},triggerAsync:function(e,t,n,r){n.push(function(){r()&&this.trigger(e,t)}.bind(this))},scanPunctuator:function(){var e,t,n,r=this.peek()
switch(r){case".":if(/^[0-9]$/.test(this.peek(1)))return null
if("."===this.peek(1)&&"."===this.peek(2))return{type:f.Punctuator,value:"..."}
case"(":case")":case";":case",":case"[":case"]":case":":case"~":case"?":return{type:f.Punctuator,value:r}
case"{":return this.pushContext(h.Block),{type:f.Punctuator,value:r}
case"}":return this.inContext(h.Block)&&this.popContext(),{type:f.Punctuator,value:r}
case"#":return{type:f.Punctuator,value:r}
case"":return null}return e=this.peek(1),t=this.peek(2),n=this.peek(3),">"===r&&">"===e&&">"===t&&"="===n?{type:f.Punctuator,value:">>>="}:"="===r&&"="===e&&"="===t?{type:f.Punctuator,value:"==="}:"!"===r&&"="===e&&"="===t?{type:f.Punctuator,value:"!=="}:">"===r&&">"===e&&">"===t?{type:f.Punctuator,value:">>>"}:"<"===r&&"<"===e&&"="===t?{type:f.Punctuator,value:"<<="}:">"===r&&">"===e&&"="===t?{type:f.Punctuator,value:">>="}:"="===r&&">"===e?{type:f.Punctuator,value:r+e}:r===e&&"+-<>&|".indexOf(r)>=0?{type:f.Punctuator,value:r+e}:"<>=!+-*%&|^".indexOf(r)>=0?"="===e?{type:f.Punctuator,value:r+e}:{type:f.Punctuator,value:r}:"/"===r?"="===e?{type:f.Punctuator,value:"/="}:{type:f.Punctuator,value:"/"}:null},scanComments:function(){function e(e,t,n){var r=!1,i=e+t,o="plain"
return(n=n||{}).isMultiline&&(i+="*/"),t=t.replace(/\n/g," "),"/*"===e&&s.fallsThrough.test(t)&&(r=!0,o="falls through"),["jshint","jslint","members","member","globals","global","exported"].forEach(function(n){if(!r&&("//"!==e||"jshint"===n)&&(" "===t.charAt(n.length)&&t.substr(0,n.length)===n&&(r=!0,e+=n,t=t.substr(n.length)),r||" "!==t.charAt(0)||" "!==t.charAt(n.length+1)||t.substr(1,n.length)!==n||(r=!0,e=e+" "+n,t=t.substr(n.length+1)),r))switch(n){case"member":o="members"
break
case"global":o="globals"
break
default:var i=t.split(":").map(function(e){return e.replace(/^\s+/,"").replace(/\s+$/,"")})
if(2===i.length)switch(i[0]){case"ignore":switch(i[1]){case"start":a.ignoringLinterErrors=!0,r=!1
break
case"end":a.ignoringLinterErrors=!1,r=!1}}o=n}}),{type:f.Comment,commentType:o,value:i,body:t,isSpecial:r,isMultiline:n.isMultiline||!1,isMalformed:n.isMalformed||!1}}var t=this.peek(),n=this.peek(1),r=this.input.substr(2),i=this.line,o=this.char,a=this
if("*"===t&&"/"===n)return this.trigger("error",{code:"E018",line:i,character:o}),this.skip(2),null
if("/"!==t||"*"!==n&&"/"!==n)return null
if("/"===n)return this.skip(this.input.length),e("//",r)
var c=""
if("*"===n){for(this.inComment=!0,this.skip(2);"*"!==this.peek()||"/"!==this.peek(1);)if(""===this.peek()){if(c+="\n",!this.nextLine())return this.trigger("error",{code:"E017",line:i,character:o}),this.inComment=!1,e("/*",c,{isMultiline:!0,isMalformed:!0})}else c+=this.peek(),this.skip()
return this.skip(2),this.inComment=!1,e("/*",c,{isMultiline:!0})}},scanKeyword:function(){var e=/^[a-zA-Z_$][a-zA-Z0-9_$]*/.exec(this.input)
return e&&["if","in","do","var","for","new","try","let","this","else","case","void","with","enum","while","break","catch","throw","const","yield","class","super","return","typeof","delete","switch","export","import","default","finally","extends","function","continue","debugger","instanceof"].indexOf(e[0])>=0?{type:f.Keyword,value:e[0]}:null},scanIdentifier:function(){function e(e){return e>256}function t(e){return/^[0-9a-fA-F]$/.test(e)}var n,r,i="",o=0,s=function(){if(o+=1,"u"!==this.peek(o))return null
var n,r=this.peek(o+1),i=this.peek(o+2),s=this.peek(o+3),a=this.peek(o+4)
return t(r)&&t(i)&&t(s)&&t(a)?(n=parseInt(r+i+s+a,16),l[n]||e(n)?(o+=5,"\\u"+r+i+s+a):null):null}.bind(this),a=function(){var e=this.peek(o),t=e.charCodeAt(0)
return 92===t?s():t<128?u[t]?(o+=1,e):null:function(e){return e>256}(t)?(o+=1,e):null}.bind(this),c=function(){var t=this.peek(o),n=t.charCodeAt(0)
return 92===n?s():n<128?l[n]?(o+=1,t):null:e(n)?(o+=1,t):null}.bind(this)
if(null===(r=a()))return null
for(i=r;null!==(r=c());)i+=r
switch(i){case"true":case"false":n=f.BooleanLiteral
break
case"null":n=f.NullLiteral
break
default:n=f.Identifier}return{type:n,value:function(e){return e.replace(/\\u([0-9a-fA-F]{4})/g,function(e,t){return String.fromCharCode(parseInt(t,16))})}(i),text:i,tokenLength:i.length}},scanNumericLiteral:function(){function e(e){return/^[0-9]$/.test(e)}function t(e){return/^[0-7]$/.test(e)}function n(e){return/^[01]$/.test(e)}function r(e){return/^[0-9a-fA-F]$/.test(e)}function i(e){return"$"===e||"_"===e||"\\"===e||e>="a"&&e<="z"||e>="A"&&e<="Z"}var o=0,s="",c=this.input.length,u=this.peek(o),l=e,h=10,p=!1
if("."!==u&&!e(u))return null
if("."!==u){for(s=this.peek(o),o+=1,u=this.peek(o),"0"===s&&("x"!==u&&"X"!==u||(l=r,h=16,o+=1,s+=u),"o"!==u&&"O"!==u||(l=t,h=8,a.inES6(!0)||this.trigger("warning",{code:"W119",line:this.line,character:this.char,data:["Octal integer literal","6"]}),o+=1,s+=u),"b"!==u&&"B"!==u||(l=n,h=2,a.inES6(!0)||this.trigger("warning",{code:"W119",line:this.line,character:this.char,data:["Binary integer literal","6"]}),o+=1,s+=u),t(u)&&(l=t,h=8,p=!0,!1,o+=1,s+=u),!t(u)&&e(u)&&(o+=1,s+=u));o<c;){if(u=this.peek(o),p&&e(u))!0
else if(!l(u))break
s+=u,o+=1}if(l!==e)return!p&&s.length<=2?{type:f.NumericLiteral,value:s,isMalformed:!0}:o<c&&(u=this.peek(o),i(u))?null:{type:f.NumericLiteral,value:s,base:h,isLegacy:p,isMalformed:!1}}if("."===u)for(s+=u,o+=1;o<c&&(u=this.peek(o),e(u));)s+=u,o+=1
if("e"===u||"E"===u){if(s+=u,o+=1,"+"!==(u=this.peek(o))&&"-"!==u||(s+=this.peek(o),o+=1),u=this.peek(o),!e(u))return null
for(s+=u,o+=1;o<c&&(u=this.peek(o),e(u));)s+=u,o+=1}return o<c&&(u=this.peek(o),i(u))?null:{type:f.NumericLiteral,value:s,base:h,isMalformed:!isFinite(s)}},scanEscapeSequence:function(e){var t=!1,n=1
this.skip()
var r=this.peek()
switch(r){case"'":this.triggerAsync("warning",{code:"W114",line:this.line,character:this.char,data:["\\'"]},e,function(){return a.jsonMode})
break
case"b":r="\\b"
break
case"f":r="\\f"
break
case"n":r="\\n"
break
case"r":r="\\r"
break
case"t":r="\\t"
break
case"0":r="\\0"
var i=parseInt(this.peek(1),10)
this.triggerAsync("warning",{code:"W115",line:this.line,character:this.char},e,function(){return i>=0&&i<=7&&a.isStrict()})
break
case"u":var o=this.input.substr(1,4),s=parseInt(o,16)
isNaN(s)&&this.trigger("warning",{code:"W052",line:this.line,character:this.char,data:["u"+o]}),r=String.fromCharCode(s),n=5
break
case"v":this.triggerAsync("warning",{code:"W114",line:this.line,character:this.char,data:["\\v"]},e,function(){return a.jsonMode}),r="\v"
break
case"x":var c=parseInt(this.input.substr(1,2),16)
this.triggerAsync("warning",{code:"W114",line:this.line,character:this.char,data:["\\x-"]},e,function(){return a.jsonMode}),r=String.fromCharCode(c),n=3
break
case"\\":r="\\\\"
break
case'"':r='\\"'
break
case"/":break
case"":t=!0,r=""}return{char:r,jump:n,allowNewLine:t}},scanTemplateLiteral:function(e){var t,n,r="",i=this.line,o=this.char,s=this.templateStarts.length
if(!a.inES6(!0))return null
if("`"===this.peek())t=f.TemplateHead,this.templateStarts.push({line:this.line,char:this.char}),s=this.templateStarts.length,this.skip(1),this.pushContext(h.Template)
else{if(!this.inContext(h.Template)||"}"!==this.peek())return null
t=f.TemplateMiddle}for(;"`"!==this.peek();){for(;""===(n=this.peek());)if(r+="\n",!this.nextLine()){var c=this.templateStarts.pop()
return this.trigger("error",{code:"E052",line:c.line,character:c.char}),{type:t,value:r,startLine:i,startChar:o,isUnclosed:!0,depth:s,context:this.popContext()}}if("$"===n&&"{"===this.peek(1))return r+="${",this.skip(2),{type:t,value:r,startLine:i,startChar:o,isUnclosed:!1,depth:s,context:this.currentContext()}
if("\\"===n){var u=this.scanEscapeSequence(e)
r+=u.char,this.skip(u.jump)}else"`"!==n&&(r+=n,this.skip(1))}return t=t===f.TemplateHead?f.NoSubstTemplate:f.TemplateTail,this.skip(1),this.templateStarts.pop(),{type:t,value:r,startLine:i,startChar:o,isUnclosed:!1,depth:s,context:this.popContext()}},scanStringLiteral:function(e){var t=this.peek()
if('"'!==t&&"'"!==t)return null
this.triggerAsync("warning",{code:"W108",line:this.line,character:this.char},e,function(){return a.jsonMode&&'"'!==t})
var n="",r=this.line,i=this.char,o=!1
for(this.skip();this.peek()!==t;)if(""===this.peek()){if(o?(o=!1,this.triggerAsync("warning",{code:"W043",line:this.line,character:this.char},e,function(){return!a.option.multistr}),this.triggerAsync("warning",{code:"W042",line:this.line,character:this.char},e,function(){return a.jsonMode&&a.option.multistr})):this.trigger("warning",{code:"W112",line:this.line,character:this.char}),!this.nextLine())return this.trigger("error",{code:"E029",line:r,character:i}),{type:f.StringLiteral,value:n,startLine:r,startChar:i,isUnclosed:!0,quote:t}}else{o=!1
var s=this.peek(),c=1
if(s<" "&&this.trigger("warning",{code:"W113",line:this.line,character:this.char,data:["<non-printable>"]}),"\\"===s){var u=this.scanEscapeSequence(e)
s=u.char,c=u.jump,o=u.allowNewLine}n+=s,this.skip(c)}return this.skip(),{type:f.StringLiteral,value:n,startLine:r,startChar:i,isUnclosed:!1,quote:t}},scanRegExp:function(){var e,t=0,n=this.input.length,r=this.peek(),i=r,o="",s=[],a=!1,c=!1,u=function(){r<" "&&(a=!0,this.trigger("warning",{code:"W048",line:this.line,character:this.char})),"<"===r&&(a=!0,this.trigger("warning",{code:"W049",line:this.line,character:this.char,data:[r]}))}.bind(this)
if(!this.prereg||"/"!==r)return null
for(t+=1,e=!1;t<n;)if(r=this.peek(t),i+=r,o+=r,c)"]"===r&&("\\"===this.peek(t-1)&&"\\"!==this.peek(t-2)||(c=!1)),"\\"===r&&(t+=1,o+=r=this.peek(t),i+=r,u()),t+=1
else{if("\\"===r){if(t+=1,r=this.peek(t),o+=r,i+=r,u(),"/"===r){t+=1
continue}if("["===r){t+=1
continue}}if("["!==r){if("/"===r){o=o.substr(0,o.length-1),e=!0,t+=1
break}t+=1}else c=!0,t+=1}if(!e)return this.trigger("error",{code:"E015",line:this.line,character:this.from}),void this.trigger("fatal",{line:this.line,from:this.from})
for(;t<n&&(r=this.peek(t),/[gim]/.test(r));)s.push(r),i+=r,t+=1
try{new RegExp(o,s.join(""))}catch(e){a=!0,this.trigger("error",{code:"E016",line:this.line,character:this.char,data:[e.message]})}return{type:f.RegExp,value:i,flags:s,isMalformed:a}},scanNonBreakingSpaces:function(){return a.option.nonbsp?this.input.search(/(\u00A0)/):-1},scanUnsafeChars:function(){return this.input.search(s.unsafeChars)},next:function(e){this.from=this.char
if(/\s/.test(this.peek()))for(this.char;/\s/.test(this.peek());)this.from+=1,this.skip()
var t=this.scanComments()||this.scanStringLiteral(e)||this.scanTemplateLiteral(e)
return t||((t=this.scanRegExp()||this.scanPunctuator()||this.scanKeyword()||this.scanIdentifier()||this.scanNumericLiteral())?(this.skip(t.tokenLength||t.value.length),t):null)},nextLine:function(){var e
if(this.line>=this.getLines().length)return!1
this.input=this.getLines()[this.line],this.line+=1,this.char=1,this.from=1
var t=this.input.trim(),n=function(){return i.some(arguments,function(e){return 0===t.indexOf(e)})}
if(!0===this.ignoringLinterErrors&&(n("/*","//")||this.inComment&&function(){return i.some(arguments,function(e){return-1!==t.indexOf(e,t.length-e.length)})}("*/")||(this.input="")),(e=this.scanNonBreakingSpaces())>=0&&this.trigger("warning",{code:"W125",line:this.line,character:e+1}),this.input=this.input.replace(/\t/g,a.tab),(e=this.scanUnsafeChars())>=0&&this.trigger("warning",{code:"W100",line:this.line,character:e}),!this.ignoringLinterErrors&&a.option.maxlen&&a.option.maxlen<this.input.length){(!(this.inComment||n.call(t,"//")||n.call(t,"/*"))||!s.maxlenException.test(t))&&this.trigger("warning",{code:"W101",line:this.line,character:this.input.length})}return!0},start:function(){this.nextLine()},token:function(){for(var e,t=function(){var e=[]
return{push:function(t){e.push(t)},check:function(){for(var t=0;t<e.length;++t)e[t]()
e.splice(0,e.length)}}}(),n=function(e,n,r,o){var s
if("(endline)"!==e&&"(end)"!==e&&(this.prereg=!1),"(punctuator)"===e){switch(n){case".":case")":case"~":case"#":case"]":case"++":case"--":this.prereg=!1
break
default:this.prereg=!0}s=Object.create(a.syntax[n]||a.syntax["(error)"])}return"(identifier)"===e&&("return"!==n&&"case"!==n&&"typeof"!==n||(this.prereg=!0),i.has(a.syntax,n)&&(function(e,t){if(!e.reserved)return!1
var n=e.meta
if(n&&n.isFutureReservedWord&&a.inES5()){if(!n.es5)return!1
if(n.strictOnly&&!a.option.strict&&!a.isStrict())return!1
if(t)return!1}return!0}(s=Object.create(a.syntax[n]||a.syntax["(error)"]),r&&"(identifier)"===e)||(s=null))),s||(s=Object.create(a.syntax[e])),s.identifier="(identifier)"===e,s.type=s.type||e,s.value=n,s.line=this.line,s.character=this.char,s.from=this.from,s.identifier&&o&&(s.raw_text=o.text||o.value),o&&o.startLine&&o.startLine!==this.line&&(s.startLine=o.startLine),o&&o.context&&(s.context=o.context),o&&o.depth&&(s.depth=o.depth),o&&o.isUnclosed&&(s.isUnclosed=o.isUnclosed),r&&s.identifier&&(s.isProperty=r),s.check=t.check,s}.bind(this);;){if(!this.input.length)return this.nextLine()?n("(endline)",""):this.exhausted?null:(this.exhausted=!0,n("(end)",""))
if(e=this.next(t))switch(e.type){case f.StringLiteral:return this.triggerAsync("String",{line:this.line,char:this.char,from:this.from,startLine:e.startLine,startChar:e.startChar,value:e.value,quote:e.quote},t,function(){return!0}),n("(string)",e.value,null,e)
case f.TemplateHead:return this.trigger("TemplateHead",{line:this.line,char:this.char,from:this.from,startLine:e.startLine,startChar:e.startChar,value:e.value}),n("(template)",e.value,null,e)
case f.TemplateMiddle:return this.trigger("TemplateMiddle",{line:this.line,char:this.char,from:this.from,startLine:e.startLine,startChar:e.startChar,value:e.value}),n("(template middle)",e.value,null,e)
case f.TemplateTail:return this.trigger("TemplateTail",{line:this.line,char:this.char,from:this.from,startLine:e.startLine,startChar:e.startChar,value:e.value}),n("(template tail)",e.value,null,e)
case f.NoSubstTemplate:return this.trigger("NoSubstTemplate",{line:this.line,char:this.char,from:this.from,startLine:e.startLine,startChar:e.startChar,value:e.value}),n("(no subst template)",e.value,null,e)
case f.Identifier:this.triggerAsync("Identifier",{line:this.line,char:this.char,from:this.form,name:e.value,raw_name:e.text,isProperty:"."===a.tokens.curr.id},t,function(){return!0})
case f.Keyword:case f.NullLiteral:case f.BooleanLiteral:return n("(identifier)",e.value,"."===a.tokens.curr.id,e)
case f.NumericLiteral:return e.isMalformed&&this.trigger("warning",{code:"W045",line:this.line,character:this.char,data:[e.value]}),this.triggerAsync("warning",{code:"W114",line:this.line,character:this.char,data:["0x-"]},t,function(){return 16===e.base&&a.jsonMode}),this.triggerAsync("warning",{code:"W115",line:this.line,character:this.char},t,function(){return a.isStrict()&&8===e.base&&e.isLegacy}),this.trigger("Number",{line:this.line,char:this.char,from:this.from,value:e.value,base:e.base,isMalformed:e.malformed}),n("(number)",e.value)
case f.RegExp:return n("(regexp)",e.value)
case f.Comment:if(a.tokens.curr.comment=!0,e.isSpecial)return{id:"(comment)",value:e.value,body:e.body,type:e.commentType,isSpecial:e.isSpecial,line:this.line,character:this.char,from:this.from}
break
case"":break
default:return n("(punctuator)",e.value)}else this.input.length&&(this.trigger("error",{code:"E024",line:this.line,character:this.char,data:[this.peek()]}),this.input="")}}},n.Lexer=r,n.Context=h},{"../data/ascii-identifier-data.js":"/node_modules/jshint/data/ascii-identifier-data.js","../lodash":"/node_modules/jshint/lodash.js","./reg.js":"/node_modules/jshint/src/reg.js","./state.js":"/node_modules/jshint/src/state.js",events:"/node_modules/browserify/node_modules/events/events.js"}],"/node_modules/jshint/src/messages.js":[function(e,t,n){"use strict"
var r=e("../lodash")
n.errors={},n.warnings={},n.info={},r.each({E001:"Bad option: '{a}'.",E002:"Bad option value.",E003:"Expected a JSON value.",E004:"Input is neither a string nor an array of strings.",E005:"Input is empty.",E006:"Unexpected early end of program.",E007:'Missing "use strict" statement.',E008:"Strict violation.",E009:"Option 'validthis' can't be used in a global scope.",E010:"'with' is not allowed in strict mode.",E011:"'{a}' has already been declared.",E012:"const '{a}' is initialized to 'undefined'.",E013:"Attempting to override '{a}' which is a constant.",E014:"A regular expression literal can be confused with '/='.",E015:"Unclosed regular expression.",E016:"Invalid regular expression.",E017:"Unclosed comment.",E018:"Unbegun comment.",E019:"Unmatched '{a}'.",E020:"Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'.",E021:"Expected '{a}' and instead saw '{b}'.",E022:"Line breaking error '{a}'.",E023:"Missing '{a}'.",E024:"Unexpected '{a}'.",E025:"Missing ':' on a case clause.",E026:"Missing '}' to match '{' from line {a}.",E027:"Missing ']' to match '[' from line {a}.",E028:"Illegal comma.",E029:"Unclosed string.",E030:"Expected an identifier and instead saw '{a}'.",E031:"Bad assignment.",E032:"Expected a small integer or 'false' and instead saw '{a}'.",E033:"Expected an operator and instead saw '{a}'.",E034:"get/set are ES5 features.",E035:"Missing property name.",E036:"Expected to see a statement and instead saw a block.",E037:null,E038:null,E039:"Function declarations are not invocable. Wrap the whole function invocation in parens.",E040:"Each value should have its own case label.",E041:"Unrecoverable syntax error.",E042:"Stopping.",E043:"Too many errors.",E044:null,E045:"Invalid for each loop.",E046:"A yield statement shall be within a generator function (with syntax: `function*`)",E047:null,E048:"{a} declaration not directly within block.",E049:"A {a} cannot be named '{b}'.",E050:"Mozilla requires the yield expression to be parenthesized here.",E051:null,E052:"Unclosed template literal.",E053:"Export declaration must be in global scope.",E054:"Class properties must be methods. Expected '(' but instead saw '{a}'.",E055:"The '{a}' option cannot be set after any executable code.",E056:"'{a}' was used before it was declared, which is illegal for '{b}' variables.",E057:"Invalid meta property: '{a}.{b}'.",E058:"Missing semicolon."},function(e,t){n.errors[t]={code:t,desc:e}}),r.each({W001:"'hasOwnProperty' is a really bad name.",W002:"Value of '{a}' may be overwritten in IE 8 and earlier.",W003:"'{a}' was used before it was defined.",W004:"'{a}' is already defined.",W005:"A dot following a number can be confused with a decimal point.",W006:"Confusing minuses.",W007:"Confusing plusses.",W008:"A leading decimal point can be confused with a dot: '{a}'.",W009:"The array literal notation [] is preferable.",W010:"The object literal notation {} is preferable.",W011:null,W012:null,W013:null,W014:"Bad line breaking before '{a}'.",W015:null,W016:"Unexpected use of '{a}'.",W017:"Bad operand.",W018:"Confusing use of '{a}'.",W019:"Use the isNaN function to compare with NaN.",W020:"Read only.",W021:"Reassignment of '{a}', which is is a {b}. Use 'var' or 'let' to declare bindings that may change.",W022:"Do not assign to the exception parameter.",W023:"Expected an identifier in an assignment and instead saw a function invocation.",W024:"Expected an identifier and instead saw '{a}' (a reserved word).",W025:"Missing name in function declaration.",W026:"Inner functions should be listed at the top of the outer function.",W027:"Unreachable '{a}' after '{b}'.",W028:"Label '{a}' on {b} statement.",W030:"Expected an assignment or function call and instead saw an expression.",W031:"Do not use 'new' for side effects.",W032:"Unnecessary semicolon.",W033:"Missing semicolon.",W034:'Unnecessary directive "{a}".',W035:"Empty block.",W036:"Unexpected /*member '{a}'.",W037:"'{a}' is a statement label.",W038:"'{a}' used out of scope.",W039:"'{a}' is not allowed.",W040:"Possible strict violation.",W041:"Use '{a}' to compare with '{b}'.",W042:"Avoid EOL escaping.",W043:"Bad escaping of EOL. Use option multistr if needed.",W044:"Bad or unnecessary escaping.",W045:"Bad number '{a}'.",W046:"Don't use extra leading zeros '{a}'.",W047:"A trailing decimal point can be confused with a dot: '{a}'.",W048:"Unexpected control character in regular expression.",W049:"Unexpected escaped character '{a}' in regular expression.",W050:"JavaScript URL.",W051:"Variables should not be deleted.",W052:"Unexpected '{a}'.",W053:"Do not use {a} as a constructor.",W054:"The Function constructor is a form of eval.",W055:"A constructor name should start with an uppercase letter.",W056:"Bad constructor.",W057:"Weird construction. Is 'new' necessary?",W058:"Missing '()' invoking a constructor.",W059:"Avoid arguments.{a}.",W060:"document.write can be a form of eval.",W061:"eval can be harmful.",W062:"Wrap an immediate function invocation in parens to assist the reader in understanding that the expression is the result of a function, and not the function itself.",W063:"Math is not a function.",W064:"Missing 'new' prefix when invoking a constructor.",W065:"Missing radix parameter.",W066:"Implied eval. Consider passing a function instead of a string.",W067:"Bad invocation.",W068:"Wrapping non-IIFE function literals in parens is unnecessary.",W069:"['{a}'] is better written in dot notation.",W070:"Extra comma. (it breaks older versions of IE)",W071:"This function has too many statements. ({a})",W072:"This function has too many parameters. ({a})",W073:"Blocks are nested too deeply. ({a})",W074:"This function's cyclomatic complexity is too high. ({a})",W075:"Duplicate {a} '{b}'.",W076:"Unexpected parameter '{a}' in get {b} function.",W077:"Expected a single parameter in set {a} function.",W078:"Setter is defined without getter.",W079:"Redefinition of '{a}'.",W080:"It's not necessary to initialize '{a}' to 'undefined'.",W081:null,W082:"Function declarations should not be placed in blocks. Use a function expression or move the statement to the top of the outer function.",W083:"Don't make functions within a loop.",W084:"Assignment in conditional expression",W085:"Don't use 'with'.",W086:"Expected a 'break' statement before '{a}'.",W087:"Forgotten 'debugger' statement?",W088:"Creating global 'for' variable. Should be 'for (var {a} ...'.",W089:"The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.",W090:"'{a}' is not a statement label.",W091:null,W093:"Did you mean to return a conditional instead of an assignment?",W094:"Unexpected comma.",W095:"Expected a string and instead saw {a}.",W096:"The '{a}' key may produce unexpected results.",W097:'Use the function form of "use strict".',W098:"'{a}' is defined but never used.",W099:null,W100:"This character may get silently deleted by one or more browsers.",W101:"Line is too long.",W102:null,W103:"The '{a}' property is deprecated.",W104:"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz).",W105:"Unexpected {a} in '{b}'.",W106:"Identifier '{a}' is not in camel case.",W107:"Script URL.",W108:"Strings must use doublequote.",W109:"Strings must use singlequote.",W110:"Mixed double and single quotes.",W112:"Unclosed string.",W113:"Control character in string: {a}.",W114:"Avoid {a}.",W115:"Octal literals are not allowed in strict mode.",W116:"Expected '{a}' and instead saw '{b}'.",W117:"'{a}' is not defined.",W118:"'{a}' is only available in Mozilla JavaScript extensions (use moz option).",W119:"'{a}' is only available in ES{b} (use 'esversion: {b}').",W120:"You might be leaking a variable ({a}) here.",W121:"Extending prototype of native object: '{a}'.",W122:"Invalid typeof value '{a}'",W123:"'{a}' is already defined in outer scope.",W124:"A generator function shall contain a yield statement.",W125:"This line contains non-breaking spaces: http://jshint.com/doc/options/#nonbsp",W126:"Unnecessary grouping operator.",W127:"Unexpected use of a comma operator.",W128:"Empty array elements require elision=true.",W129:"'{a}' is defined in a future version of JavaScript. Use a different variable name to avoid migration issues.",W130:"Invalid element after rest element.",W131:"Invalid parameter after rest parameter.",W132:"`var` declarations are forbidden. Use `let` or `const` instead.",W133:"Invalid for-{a} loop left-hand-side: {b}.",W134:"The '{a}' option is only available when linting ECMAScript {b} code.",W135:"{a} may not be supported by non-browser environments.",W136:"'{a}' must be in function scope.",W137:"Empty destructuring.",W138:"Regular parameters should not come after default parameters."},function(e,t){n.warnings[t]={code:t,desc:e}}),r.each({I001:"Comma warnings can be turned off with 'laxcomma'.",I002:null,I003:"ES5 option is now set per default"},function(e,t){n.info[t]={code:t,desc:e}})},{"../lodash":"/node_modules/jshint/lodash.js"}],"/node_modules/jshint/src/name-stack.js":[function(e,t,n){"use strict"
function r(){this._stack=[]}Object.defineProperty(r.prototype,"length",{get:function(){return this._stack.length}}),r.prototype.push=function(){this._stack.push(null)},r.prototype.pop=function(){this._stack.pop()},r.prototype.set=function(e){this._stack[this.length-1]=e},r.prototype.infer=function(){var e,t=this._stack[this.length-1],n=""
return t&&"class"!==t.type||(t=this._stack[this.length-2]),t?"(string)"!==(e=t.type)&&"(number)"!==e&&"(identifier)"!==e&&"default"!==e?"(expression)":(t.accessorType&&(n=t.accessorType+" "),n+t.value):"(empty)"},t.exports=r},{}],"/node_modules/jshint/src/options.js":[function(e,t,n){"use strict"
n.bool={enforcing:{bitwise:!0,freeze:!0,camelcase:!0,curly:!0,eqeqeq:!0,futurehostile:!0,notypeof:!0,es3:!0,es5:!0,forin:!0,funcscope:!0,immed:!0,iterator:!0,newcap:!0,noarg:!0,nocomma:!0,noempty:!0,nonbsp:!0,nonew:!0,undef:!0,singleGroups:!1,varstmt:!1,enforceall:!1},relaxing:{asi:!0,multistr:!0,debug:!0,boss:!0,evil:!0,globalstrict:!0,plusplus:!0,proto:!0,scripturl:!0,sub:!0,supernew:!0,laxbreak:!0,laxcomma:!0,validthis:!0,withstmt:!0,moz:!0,noyield:!0,eqnull:!0,lastsemic:!0,loopfunc:!0,expr:!0,esnext:!0,elision:!0},environments:{mootools:!0,couch:!0,jasmine:!0,jquery:!0,node:!0,qunit:!0,rhino:!0,shelljs:!0,prototypejs:!0,yui:!0,mocha:!0,module:!0,wsh:!0,worker:!0,nonstandard:!0,browser:!0,browserify:!0,devel:!0,dojo:!0,typed:!0,phantom:!0},obsolete:{onecase:!0,regexp:!0,regexdash:!0}},n.val={maxlen:!1,indent:!1,maxerr:!1,predef:!1,globals:!1,quotmark:!1,scope:!1,maxstatements:!1,maxdepth:!1,maxparams:!1,maxcomplexity:!1,shadow:!1,strict:!0,unused:!0,latedef:!1,ignore:!1,ignoreDelimiters:!1,esversion:5},n.inverted={bitwise:!0,forin:!0,newcap:!0,plusplus:!0,regexp:!0,undef:!0,eqeqeq:!0,strict:!0},n.validNames=Object.keys(n.val).concat(Object.keys(n.bool.relaxing)).concat(Object.keys(n.bool.enforcing)).concat(Object.keys(n.bool.obsolete)).concat(Object.keys(n.bool.environments)),n.renamed={eqeq:"eqeqeq",windows:"wsh",sloppy:"strict"},n.removed={nomen:!0,onevar:!0,passfail:!0,white:!0,gcl:!0,smarttabs:!0,trailing:!0},n.noenforceall={varstmt:!0,strict:!0}},{}],"/node_modules/jshint/src/reg.js":[function(e,t,n){"use strict"
n.unsafeString=/@cc|<\/?|script|\]\s*\]|<\s*!|&lt/i,n.unsafeChars=/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,n.needEsc=/[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,n.needEscGlobal=/[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n.starSlash=/\*\//,n.identifier=/^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,n.javascriptURL=/^(?:javascript|jscript|ecmascript|vbscript|livescript)\s*:/i,n.fallsThrough=/^\s*falls?\sthrough\s*$/,n.maxlenException=/^(?:(?:\/\/|\/\*|\*) ?)?[^ ]+$/},{}],"/node_modules/jshint/src/scope-manager.js":[function(e,t,n){"use strict"
var r=e("../lodash"),i=e("events"),o={}
t.exports=function(e,t,n,s){function a(e){m={"(labels)":Object.create(null),"(usages)":Object.create(null),"(breakLabels)":Object.create(null),"(parent)":m,"(type)":e,"(params)":"functionparams"===e||"catchparams"===e?[]:null},v.push(m)}function c(e,t){x.emit("warning",{code:e,token:t,data:r.slice(arguments,2)})}function u(e,t){x.emit("warning",{code:e,token:t,data:r.slice(arguments,2)})}function l(e){m["(usages)"][e]||(m["(usages)"][e]={"(modified)":[],"(reassigned)":[],"(tokens)":[]})}function f(){if("functionparams"!==m["(type)"]){var t=m["(labels)"]
for(var n in t)t[n]&&"exception"!==t[n]["(type)"]&&t[n]["(unused)"]&&w(n,t[n]["(token)"],"var")}else(function(){var t=m["(params)"]
if(t)for(var n,r=t.pop();r;){var i=m["(labels)"][r]
if(n=E(e.funct["(unusedOption)"]),"undefined"===r)return
if(i["(unused)"])w(r,i["(token)"],"param",e.funct["(unusedOption)"])
else if("last-param"===n)return
r=t.pop()}})()}function h(e){for(var t=v.length-1;t>=0;--t){var n=v[t]["(labels)"]
if(n[e])return n}}function p(t,n){if("outer"===e.option.shadow)for(var r="global"===g["(type)"],i="functionparams"===m["(type)"],o=!r,s=0;s<v.length;s++){var a=v[s]
i||v[s+1]!==g||(o=!1),o&&a["(labels)"][t]&&c("W123",n,t),a["(breakLabels)"][t]&&c("W123",n,t)}}function d(t,n,r){e.option.latedef&&(!0===e.option.latedef&&"function"===t||"function"!==t)&&c("W003",r,n)}var m,v=[]
a("global"),m["(predefined)"]=t
var g=m,k=Object.create(null),b=Object.create(null),y=[],x=new i.EventEmitter,E=function(t){return void 0===t&&(t=e.option.unused),!0===t&&(t="last-param"),t},w=function(e,t,n,r){var i=t.line,o=t.from,s=t.raw_text||e,a={vars:["var"],"last-param":["var","param"],strict:["var","param","last-param"]};(r=E(r))&&a[r]&&-1!==a[r].indexOf(n)&&c("W098",{line:i,from:o},s),(r||"var"===n)&&y.push({name:e,line:i,character:o})},S={on:function(e,t){e.split(" ").forEach(function(e){x.on(e,t)})},isPredefined:function(e){return!this.has(e)&&r.has(v[0]["(predefined)"],e)},stack:function(e){var t=m
a(e),e||"functionparams"!==t["(type)"]||(m["(isFuncBody)"]=!0,m["(context)"]=g,g=m)},unstack:function(){var t,n,i=v.length>1?v[v.length-2]:null,a=m===g,l="functionparams"===m["(type)"],h="functionouter"===m["(type)"],p=m["(usages)"],d=m["(labels)"],y=Object.keys(p)
for(p.__proto__&&-1===y.indexOf("__proto__")&&y.push("__proto__"),t=0;t<y.length;t++){var x=y[t],E=p[x],S=d[x]
if(S){var W=S["(type)"]
if(S["(useOutsideOfScope)"]&&!e.option.funcscope){var j=E["(tokens)"]
if(j)for(n=0;n<j.length;n++)S["(function)"]===j[n]["(function)"]&&u("W038",j[n],x)}if(m["(labels)"][x]["(unused)"]=!1,"const"===W&&E["(modified)"])for(n=0;n<E["(modified)"].length;n++)u("E013",E["(modified)"][n],x)
if(("function"===W||"class"===W)&&E["(reassigned)"])for(n=0;n<E["(reassigned)"].length;n++)u("W021",E["(reassigned)"][n],x,W)}else if(h&&(e.funct["(isCapturing)"]=!0),i)if(i["(usages)"][x]){var L=i["(usages)"][x]
L["(modified)"]=L["(modified)"].concat(E["(modified)"]),L["(tokens)"]=L["(tokens)"].concat(E["(tokens)"]),L["(reassigned)"]=L["(reassigned)"].concat(E["(reassigned)"]),L["(onlyUsedSubFunction)"]=!1}else i["(usages)"][x]=E,a&&(i["(usages)"][x]["(onlyUsedSubFunction)"]=!0)
else if("boolean"==typeof m["(predefined)"][x]){if(delete s[x],k[x]=o,!1===m["(predefined)"][x]&&E["(reassigned)"])for(n=0;n<E["(reassigned)"].length;n++)c("W020",E["(reassigned)"][n])}else if(E["(tokens)"])for(n=0;n<E["(tokens)"].length;n++){var _=E["(tokens)"][n]
_.forgiveUndef||(e.option.undef&&!_.ignoreUndef&&c("W117",_,x),b[x]?b[x].line.push(_.line):b[x]={name:x,line:[_.line]})}}if(i||Object.keys(s).forEach(function(e){w(e,s[e],"var")}),i&&!a&&!l&&!h){var A=Object.keys(d)
for(t=0;t<A.length;t++){var M=A[t]
d[M]["(blockscoped)"]||"exception"===d[M]["(type)"]||this.funct.has(M,{excludeCurrent:!0})||(i["(labels)"][M]=d[M],"global"!==g["(type)"]&&(i["(labels)"][M]["(useOutsideOfScope)"]=!0),delete d[M])}}f(),v.pop(),a&&(g=v[r.findLastIndex(v,function(e){return e["(isFuncBody)"]||"global"===e["(type)"]})]),m=i},addParam:function(t,n,i){if("exception"===(i=i||"param")){var o=this.funct.labeltype(t)
o&&"exception"!==o&&(e.option.node||c("W002",e.tokens.next,t))}r.has(m["(labels)"],t)?m["(labels)"][t].duplicated=!0:(p(t,n),m["(labels)"][t]={"(type)":i,"(token)":n,"(unused)":!0},m["(params)"].push(t)),r.has(m["(usages)"],t)&&(m["(usages)"][t]["(onlyUsedSubFunction)"]?d(i,t,n):c("E056",n,t,i))},validateParams:function(){if("global"!==g["(type)"]){var t=e.isStrict(),n=g["(parent)"]
n["(params)"]&&n["(params)"].forEach(function(r){var i=n["(labels)"][r]
i&&i.duplicated&&(t?c("E011",i["(token)"],r):!0!==e.option.shadow&&c("W004",i["(token)"],r))})}},getUsedOrDefinedGlobals:function(){var e=Object.keys(k)
return k.__proto__===o&&-1===e.indexOf("__proto__")&&e.push("__proto__"),e},getImpliedGlobals:function(){var e=r.values(b)
return b.__proto__&&(e.some(function(e){return"__proto__"===e.name})||e.push(b.__proto__)),e},getUnuseds:function(){return y},has:function(e){return Boolean(h(e))},labeltype:function(e){var t=h(e)
return t?t[e]["(type)"]:null},addExported:function(e){var t=v[0]["(labels)"]
if(r.has(s,e))delete s[e]
else if(r.has(t,e))t[e]["(unused)"]=!1
else{for(var i=1;i<v.length;i++){var o=v[i]
if(o["(type)"])break
if(r.has(o["(labels)"],e)&&!o["(labels)"][e]["(blockscoped)"])return void(o["(labels)"][e]["(unused)"]=!1)}n[e]=!0}},setExported:function(e,t){this.block.use(e,t)},addlabel:function(t,i){var s=i.type,a=i.token,u="let"===s||"const"===s||"class"===s,l="global"===(u?m:g)["(type)"]&&r.has(n,t)
if(p(t,a),u){var f=m["(labels)"][t]
f||m!==g||"global"===m["(type)"]||(f=!!g["(parent)"]["(labels)"][t]),!f&&m["(usages)"][t]&&(m["(usages)"][t]["(onlyUsedSubFunction)"]?d(s,t,a):c("E056",a,t,s)),f?c("E011",a,t):"outer"===e.option.shadow&&S.funct.has(t)&&c("W004",a,t),S.block.add(t,s,a,!l)}else{var h=S.funct.has(t)
!h&&function(e){for(var t=v.length-1;t>=0;t--){var n=v[t]
if(n["(usages)"][e])return n["(usages)"][e]
if(n===g)break}return!1}(t)&&d(s,t,a),S.funct.has(t,{onlyBlockscoped:!0})?c("E011",a,t):!0!==e.option.shadow&&h&&"__proto__"!==t&&"global"!==g["(type)"]&&c("W004",a,t),S.funct.add(t,s,a,!l),"global"===g["(type)"]&&(k[t]=o)}},funct:{labeltype:function(e,t){for(var n=t&&t.onlyBlockscoped,r=t&&t.excludeParams,i=v.length-(t&&t.excludeCurrent?2:1);i>=0;i--){var o=v[i]
if(o["(labels)"][e]&&(!n||o["(labels)"][e]["(blockscoped)"]))return o["(labels)"][e]["(type)"]
var s=r?v[i-1]:o
if(s&&"functionparams"===s["(type)"])return null}return null},hasBreakLabel:function(e){for(var t=v.length-1;t>=0;t--){var n=v[t]
if(n["(breakLabels)"][e])return!0
if("functionparams"===n["(type)"])return!1}return!1},has:function(e,t){return Boolean(this.labeltype(e,t))},add:function(e,t,n,r){m["(labels)"][e]={"(type)":t,"(token)":n,"(blockscoped)":!1,"(function)":g,"(unused)":r}}},block:{isGlobal:function(){return"global"===m["(type)"]},use:function(t,n){var r=g["(parent)"]
r&&r["(labels)"][t]&&"param"===r["(labels)"][t]["(type)"]&&(S.funct.has(t,{excludeParams:!0,onlyBlockscoped:!0})||(r["(labels)"][t]["(unused)"]=!1)),n&&(e.ignored.W117||!1===e.option.undef)&&(n.ignoreUndef=!0),l(t),n&&(n["(function)"]=g,m["(usages)"][t]["(tokens)"].push(n))},reassign:function(e,t){this.modify(e,t),m["(usages)"][e]["(reassigned)"].push(t)},modify:function(e,t){l(e),m["(usages)"][e]["(modified)"].push(t)},add:function(e,t,n,r){m["(labels)"][e]={"(type)":t,"(token)":n,"(blockscoped)":!0,"(unused)":r}},addBreakLabel:function(t,n){var r=n.token
S.funct.hasBreakLabel(t)?c("E011",r,t):"outer"===e.option.shadow&&(S.funct.has(t)?c("W004",r,t):p(t,r)),m["(breakLabels)"][t]=r}}}
return S}},{"../lodash":"/node_modules/jshint/lodash.js",events:"/node_modules/browserify/node_modules/events/events.js"}],"/node_modules/jshint/src/state.js":[function(e,t,n){"use strict"
var r=e("./name-stack.js"),i={syntax:{},isStrict:function(){return this.directive["use strict"]||this.inClassBody||this.option.module||"implied"===this.option.strict},inMoz:function(){return this.option.moz},inES6:function(){return this.option.moz||this.option.esversion>=6},inES5:function(e){return e?!(this.option.esversion&&5!==this.option.esversion||this.option.moz):!this.option.esversion||this.option.esversion>=5||this.option.moz},reset:function(){this.tokens={prev:null,next:null,curr:null},this.option={},this.funct=null,this.ignored={},this.directive={},this.jsonMode=!1,this.jsonWarnings=[],this.lines=[],this.tab="",this.cache={},this.ignoredLines={},this.forinifcheckneeded=!1,this.nameStack=new r,this.inClassBody=!1}}
n.state=i},{"./name-stack.js":"/node_modules/jshint/src/name-stack.js"}],"/node_modules/jshint/src/style.js":[function(e,t,n){"use strict"
n.register=function(e){e.on("Identifier",function(t){e.getOption("proto")||"__proto__"===t.name&&e.warn("W103",{line:t.line,char:t.char,data:[t.name,"6"]})}),e.on("Identifier",function(t){e.getOption("iterator")||"__iterator__"===t.name&&e.warn("W103",{line:t.line,char:t.char,data:[t.name]})}),e.on("Identifier",function(t){e.getOption("camelcase")&&t.name.replace(/^_+|_+$/g,"").indexOf("_")>-1&&!t.name.match(/^[A-Z0-9_]*$/)&&e.warn("W106",{line:t.line,char:t.from,data:[t.name]})}),e.on("String",function(t){var n,r=e.getOption("quotmark")
r&&("single"===r&&"'"!==t.quote&&(n="W109"),"double"===r&&'"'!==t.quote&&(n="W108"),!0===r&&(e.getCache("quotmark")||e.setCache("quotmark",t.quote),e.getCache("quotmark")!==t.quote&&(n="W110")),n&&e.warn(n,{line:t.line,char:t.char}))}),e.on("Number",function(t){"."===t.value.charAt(0)&&e.warn("W008",{line:t.line,char:t.char,data:[t.value]}),"."===t.value.substr(t.value.length-1)&&e.warn("W047",{line:t.line,char:t.char,data:[t.value]}),/^00+/.test(t.value)&&e.warn("W046",{line:t.line,char:t.char,data:[t.value]})}),e.on("String",function(t){e.getOption("scripturl")||/^(?:javascript|jscript|ecmascript|vbscript|livescript)\s*:/i.test(t.value)&&e.warn("W107",{line:t.line,char:t.char})})}},{}],"/node_modules/jshint/src/vars.js":[function(e,t,n){"use strict"
n.reservedVars={arguments:!1,NaN:!1},n.ecmaIdentifiers={3:{Array:!1,Boolean:!1,Date:!1,decodeURI:!1,decodeURIComponent:!1,encodeURI:!1,encodeURIComponent:!1,Error:!1,eval:!1,EvalError:!1,Function:!1,hasOwnProperty:!1,isFinite:!1,isNaN:!1,Math:!1,Number:!1,Object:!1,parseInt:!1,parseFloat:!1,RangeError:!1,ReferenceError:!1,RegExp:!1,String:!1,SyntaxError:!1,TypeError:!1,URIError:!1},5:{JSON:!1},6:{Map:!1,Promise:!1,Proxy:!1,Reflect:!1,Set:!1,Symbol:!1,WeakMap:!1,WeakSet:!1}},n.browser={Audio:!1,Blob:!1,addEventListener:!1,applicationCache:!1,atob:!1,blur:!1,btoa:!1,cancelAnimationFrame:!1,CanvasGradient:!1,CanvasPattern:!1,CanvasRenderingContext2D:!1,CSS:!1,clearInterval:!1,clearTimeout:!1,close:!1,closed:!1,Comment:!1,CustomEvent:!1,DOMParser:!1,defaultStatus:!1,Document:!1,document:!1,DocumentFragment:!1,Element:!1,ElementTimeControl:!1,Event:!1,event:!1,fetch:!1,FileReader:!1,FormData:!1,focus:!1,frames:!1,getComputedStyle:!1,HTMLElement:!1,HTMLAnchorElement:!1,HTMLBaseElement:!1,HTMLBlockquoteElement:!1,HTMLBodyElement:!1,HTMLBRElement:!1,HTMLButtonElement:!1,HTMLCanvasElement:!1,HTMLCollection:!1,HTMLDirectoryElement:!1,HTMLDivElement:!1,HTMLDListElement:!1,HTMLFieldSetElement:!1,HTMLFontElement:!1,HTMLFormElement:!1,HTMLFrameElement:!1,HTMLFrameSetElement:!1,HTMLHeadElement:!1,HTMLHeadingElement:!1,HTMLHRElement:!1,HTMLHtmlElement:!1,HTMLIFrameElement:!1,HTMLImageElement:!1,HTMLInputElement:!1,HTMLIsIndexElement:!1,HTMLLabelElement:!1,HTMLLayerElement:!1,HTMLLegendElement:!1,HTMLLIElement:!1,HTMLLinkElement:!1,HTMLMapElement:!1,HTMLMenuElement:!1,HTMLMetaElement:!1,HTMLModElement:!1,HTMLObjectElement:!1,HTMLOListElement:!1,HTMLOptGroupElement:!1,HTMLOptionElement:!1,HTMLParagraphElement:!1,HTMLParamElement:!1,HTMLPreElement:!1,HTMLQuoteElement:!1,HTMLScriptElement:!1,HTMLSelectElement:!1,HTMLStyleElement:!1,HTMLTableCaptionElement:!1,HTMLTableCellElement:!1,HTMLTableColElement:!1,HTMLTableElement:!1,HTMLTableRowElement:!1,HTMLTableSectionElement:!1,HTMLTemplateElement:!1,HTMLTextAreaElement:!1,HTMLTitleElement:!1,HTMLUListElement:!1,HTMLVideoElement:!1,history:!1,Image:!1,Intl:!1,length:!1,localStorage:!1,location:!1,matchMedia:!1,MessageChannel:!1,MessageEvent:!1,MessagePort:!1,MouseEvent:!1,moveBy:!1,moveTo:!1,MutationObserver:!1,name:!1,Node:!1,NodeFilter:!1,NodeList:!1,Notification:!1,navigator:!1,onbeforeunload:!0,onblur:!0,onerror:!0,onfocus:!0,onload:!0,onresize:!0,onunload:!0,open:!1,openDatabase:!1,opener:!1,Option:!1,parent:!1,performance:!1,print:!1,Range:!1,requestAnimationFrame:!1,removeEventListener:!1,resizeBy:!1,resizeTo:!1,screen:!1,scroll:!1,scrollBy:!1,scrollTo:!1,sessionStorage:!1,setInterval:!1,setTimeout:!1,SharedWorker:!1,status:!1,SVGAElement:!1,SVGAltGlyphDefElement:!1,SVGAltGlyphElement:!1,SVGAltGlyphItemElement:!1,SVGAngle:!1,SVGAnimateColorElement:!1,SVGAnimateElement:!1,SVGAnimateMotionElement:!1,SVGAnimateTransformElement:!1,SVGAnimatedAngle:!1,SVGAnimatedBoolean:!1,SVGAnimatedEnumeration:!1,SVGAnimatedInteger:!1,SVGAnimatedLength:!1,SVGAnimatedLengthList:!1,SVGAnimatedNumber:!1,SVGAnimatedNumberList:!1,SVGAnimatedPathData:!1,SVGAnimatedPoints:!1,SVGAnimatedPreserveAspectRatio:!1,SVGAnimatedRect:!1,SVGAnimatedString:!1,SVGAnimatedTransformList:!1,SVGAnimationElement:!1,SVGCSSRule:!1,SVGCircleElement:!1,SVGClipPathElement:!1,SVGColor:!1,SVGColorProfileElement:!1,SVGColorProfileRule:!1,SVGComponentTransferFunctionElement:!1,SVGCursorElement:!1,SVGDefsElement:!1,SVGDescElement:!1,SVGDocument:!1,SVGElement:!1,SVGElementInstance:!1,SVGElementInstanceList:!1,SVGEllipseElement:!1,SVGExternalResourcesRequired:!1,SVGFEBlendElement:!1,SVGFEColorMatrixElement:!1,SVGFEComponentTransferElement:!1,SVGFECompositeElement:!1,SVGFEConvolveMatrixElement:!1,SVGFEDiffuseLightingElement:!1,SVGFEDisplacementMapElement:!1,SVGFEDistantLightElement:!1,SVGFEFloodElement:!1,SVGFEFuncAElement:!1,SVGFEFuncBElement:!1,SVGFEFuncGElement:!1,SVGFEFuncRElement:!1,SVGFEGaussianBlurElement:!1,SVGFEImageElement:!1,SVGFEMergeElement:!1,SVGFEMergeNodeElement:!1,SVGFEMorphologyElement:!1,SVGFEOffsetElement:!1,SVGFEPointLightElement:!1,SVGFESpecularLightingElement:!1,SVGFESpotLightElement:!1,SVGFETileElement:!1,SVGFETurbulenceElement:!1,SVGFilterElement:!1,SVGFilterPrimitiveStandardAttributes:!1,SVGFitToViewBox:!1,SVGFontElement:!1,SVGFontFaceElement:!1,SVGFontFaceFormatElement:!1,SVGFontFaceNameElement:!1,SVGFontFaceSrcElement:!1,SVGFontFaceUriElement:!1,SVGForeignObjectElement:!1,SVGGElement:!1,SVGGlyphElement:!1,SVGGlyphRefElement:!1,SVGGradientElement:!1,SVGHKernElement:!1,SVGICCColor:!1,SVGImageElement:!1,SVGLangSpace:!1,SVGLength:!1,SVGLengthList:!1,SVGLineElement:!1,SVGLinearGradientElement:!1,SVGLocatable:!1,SVGMPathElement:!1,SVGMarkerElement:!1,SVGMaskElement:!1,SVGMatrix:!1,SVGMetadataElement:!1,SVGMissingGlyphElement:!1,SVGNumber:!1,SVGNumberList:!1,SVGPaint:!1,SVGPathElement:!1,SVGPathSeg:!1,SVGPathSegArcAbs:!1,SVGPathSegArcRel:!1,SVGPathSegClosePath:!1,SVGPathSegCurvetoCubicAbs:!1,SVGPathSegCurvetoCubicRel:!1,SVGPathSegCurvetoCubicSmoothAbs:!1,SVGPathSegCurvetoCubicSmoothRel:!1,SVGPathSegCurvetoQuadraticAbs:!1,SVGPathSegCurvetoQuadraticRel:!1,SVGPathSegCurvetoQuadraticSmoothAbs:!1,SVGPathSegCurvetoQuadraticSmoothRel:!1,SVGPathSegLinetoAbs:!1,SVGPathSegLinetoHorizontalAbs:!1,SVGPathSegLinetoHorizontalRel:!1,SVGPathSegLinetoRel:!1,SVGPathSegLinetoVerticalAbs:!1,SVGPathSegLinetoVerticalRel:!1,SVGPathSegList:!1,SVGPathSegMovetoAbs:!1,SVGPathSegMovetoRel:!1,SVGPatternElement:!1,SVGPoint:!1,SVGPointList:!1,SVGPolygonElement:!1,SVGPolylineElement:!1,SVGPreserveAspectRatio:!1,SVGRadialGradientElement:!1,SVGRect:!1,SVGRectElement:!1,SVGRenderingIntent:!1,SVGSVGElement:!1,SVGScriptElement:!1,SVGSetElement:!1,SVGStopElement:!1,SVGStringList:!1,SVGStylable:!1,SVGStyleElement:!1,SVGSwitchElement:!1,SVGSymbolElement:!1,SVGTRefElement:!1,SVGTSpanElement:!1,SVGTests:!1,SVGTextContentElement:!1,SVGTextElement:!1,SVGTextPathElement:!1,SVGTextPositioningElement:!1,SVGTitleElement:!1,SVGTransform:!1,SVGTransformList:!1,SVGTransformable:!1,SVGURIReference:!1,SVGUnitTypes:!1,SVGUseElement:!1,SVGVKernElement:!1,SVGViewElement:!1,SVGViewSpec:!1,SVGZoomAndPan:!1,Text:!1,TextDecoder:!1,TextEncoder:!1,TimeEvent:!1,top:!1,URL:!1,WebGLActiveInfo:!1,WebGLBuffer:!1,WebGLContextEvent:!1,WebGLFramebuffer:!1,WebGLProgram:!1,WebGLRenderbuffer:!1,WebGLRenderingContext:!1,WebGLShader:!1,WebGLShaderPrecisionFormat:!1,WebGLTexture:!1,WebGLUniformLocation:!1,WebSocket:!1,window:!1,Window:!1,Worker:!1,XDomainRequest:!1,XMLHttpRequest:!1,XMLSerializer:!1,XPathEvaluator:!1,XPathException:!1,XPathExpression:!1,XPathNamespace:!1,XPathNSResolver:!1,XPathResult:!1},n.devel={alert:!1,confirm:!1,console:!1,Debug:!1,opera:!1,prompt:!1},n.worker={importScripts:!0,postMessage:!0,self:!0,FileReaderSync:!0},n.nonstandard={escape:!1,unescape:!1},n.couch={require:!1,respond:!1,getRow:!1,emit:!1,send:!1,start:!1,sum:!1,log:!1,exports:!1,module:!1,provides:!1},n.node={__filename:!1,__dirname:!1,GLOBAL:!1,global:!1,module:!1,require:!1,Buffer:!0,console:!0,exports:!0,process:!0,setTimeout:!0,clearTimeout:!0,setInterval:!0,clearInterval:!0,setImmediate:!0,clearImmediate:!0},n.browserify={__filename:!1,__dirname:!1,global:!1,module:!1,require:!1,Buffer:!0,exports:!0,process:!0},n.phantom={phantom:!0,require:!0,WebPage:!0,console:!0,exports:!0},n.qunit={asyncTest:!1,deepEqual:!1,equal:!1,expect:!1,module:!1,notDeepEqual:!1,notEqual:!1,notPropEqual:!1,notStrictEqual:!1,ok:!1,propEqual:!1,QUnit:!1,raises:!1,start:!1,stop:!1,strictEqual:!1,test:!1,throws:!1},n.rhino={defineClass:!1,deserialize:!1,gc:!1,help:!1,importClass:!1,importPackage:!1,java:!1,load:!1,loadClass:!1,Packages:!1,print:!1,quit:!1,readFile:!1,readUrl:!1,runCommand:!1,seal:!1,serialize:!1,spawn:!1,sync:!1,toint32:!1,version:!1},n.shelljs={target:!1,echo:!1,exit:!1,cd:!1,pwd:!1,ls:!1,find:!1,cp:!1,rm:!1,mv:!1,mkdir:!1,test:!1,cat:!1,sed:!1,grep:!1,which:!1,dirs:!1,pushd:!1,popd:!1,env:!1,exec:!1,chmod:!1,config:!1,error:!1,tempdir:!1},n.typed={ArrayBuffer:!1,ArrayBufferView:!1,DataView:!1,Float32Array:!1,Float64Array:!1,Int16Array:!1,Int32Array:!1,Int8Array:!1,Uint16Array:!1,Uint32Array:!1,Uint8Array:!1,Uint8ClampedArray:!1},n.wsh={ActiveXObject:!0,Enumerator:!0,GetObject:!0,ScriptEngine:!0,ScriptEngineBuildVersion:!0,ScriptEngineMajorVersion:!0,ScriptEngineMinorVersion:!0,VBArray:!0,WSH:!0,WScript:!0,XDomainRequest:!0},n.dojo={dojo:!1,dijit:!1,dojox:!1,define:!1,require:!1},n.jquery={$:!1,jQuery:!1},n.mootools={$:!1,$$:!1,Asset:!1,Browser:!1,Chain:!1,Class:!1,Color:!1,Cookie:!1,Core:!1,Document:!1,DomReady:!1,DOMEvent:!1,DOMReady:!1,Drag:!1,Element:!1,Elements:!1,Event:!1,Events:!1,Fx:!1,Group:!1,Hash:!1,HtmlTable:!1,IFrame:!1,IframeShim:!1,InputValidator:!1,instanceOf:!1,Keyboard:!1,Locale:!1,Mask:!1,MooTools:!1,Native:!1,Options:!1,OverText:!1,Request:!1,Scroller:!1,Slick:!1,Slider:!1,Sortables:!1,Spinner:!1,Swiff:!1,Tips:!1,Type:!1,typeOf:!1,URI:!1,Window:!1},n.prototypejs={$:!1,$$:!1,$A:!1,$F:!1,$H:!1,$R:!1,$break:!1,$continue:!1,$w:!1,Abstract:!1,Ajax:!1,Class:!1,Enumerable:!1,Element:!1,Event:!1,Field:!1,Form:!1,Hash:!1,Insertion:!1,ObjectRange:!1,PeriodicalExecuter:!1,Position:!1,Prototype:!1,Selector:!1,Template:!1,Toggle:!1,Try:!1,Autocompleter:!1,Builder:!1,Control:!1,Draggable:!1,Draggables:!1,Droppables:!1,Effect:!1,Sortable:!1,SortableObserver:!1,Sound:!1,Scriptaculous:!1},n.yui={YUI:!1,Y:!1,YUI_config:!1},n.mocha={mocha:!1,describe:!1,xdescribe:!1,it:!1,xit:!1,context:!1,xcontext:!1,before:!1,after:!1,beforeEach:!1,afterEach:!1,suite:!1,test:!1,setup:!1,teardown:!1,suiteSetup:!1,suiteTeardown:!1},n.jasmine={jasmine:!1,describe:!1,xdescribe:!1,it:!1,xit:!1,beforeEach:!1,afterEach:!1,setFixtures:!1,loadFixtures:!1,spyOn:!1,expect:!1,runs:!1,waitsFor:!1,waits:!1,beforeAll:!1,afterAll:!1,fail:!1,fdescribe:!1,fit:!1,pending:!1}},{}]},{},["/node_modules/jshint/src/jshint.js"])}),ace.define("ace/mode/javascript_worker",["require","exports","module","ace/lib/oop","ace/worker/mirror","ace/mode/javascript/jshint"],function(require,exports,module){"use strict"
function startRegex(e){return RegExp("^("+e.join("|")+")")}var oop=require("../lib/oop"),Mirror=require("../worker/mirror").Mirror,lint=require("./javascript/jshint").JSHINT,disabledWarningsRe=startRegex(["Bad for in variable '(.+)'.",'Missing "use strict"']),errorsRe=startRegex(["Unexpected","Expected ","Confusing (plus|minus)","\\{a\\} unterminated regular expression","Unclosed ","Unmatched ","Unbegun comment","Bad invocation","Missing space after","Missing operator at"]),infoRe=startRegex(["Expected an assignment","Bad escapement of EOL","Unexpected comma","Unexpected space","Missing radix parameter.","A leading decimal point can","\\['{a}'\\] is better written in dot notation.","'{a}' used out of scope"]),JavaScriptWorker=exports.JavaScriptWorker=function(e){Mirror.call(this,e),this.setTimeout(500),this.setOptions()}
oop.inherits(JavaScriptWorker,Mirror),function(){this.setOptions=function(e){this.options=e||{esnext:!0,moz:!0,devel:!0,browser:!0,node:!0,laxcomma:!0,laxbreak:!0,lastsemic:!0,onevar:!1,passfail:!1,maxerr:100,expr:!0,multistr:!0,globalstrict:!0},this.doc.getValue()&&this.deferredUpdate.schedule(100)},this.changeOptions=function(e){oop.mixin(this.options,e),this.doc.getValue()&&this.deferredUpdate.schedule(100)},this.isValidJS=function(str){try{eval("throw 0;"+str)}catch(e){if(0===e)return!0}return!1},this.onUpdate=function(){var e=this.doc.getValue()
if(!(e=e.replace(/^#!.*\n/,"\n")))return this.sender.emit("annotate",[])
var t=[],n=this.isValidJS(e)?"warning":"error"
lint(e,this.options,this.options.globals)
for(var r=lint.errors,i=0;i<r.length;i++){var o=r[i]
if(o){var s=o.raw,a="warning"
if("Missing semicolon."==s){var c=o.evidence.substr(o.character)
c=c.charAt(c.search(/\S/)),"error"==n&&c&&/[\w\d{(['"]/.test(c)?(o.reason='Missing ";" before statement',a="error"):a="info"}else{if(disabledWarningsRe.test(s))continue
infoRe.test(s)?a="info":errorsRe.test(s)?(!0,a=n):"'{a}' is not defined."==s?a="warning":"'{a}' is defined but never used."==s&&(a="info")}t.push({row:o.line-1,column:o.character-1,text:o.reason,type:a,raw:s})}}this.sender.emit("annotate",t)}}.call(JavaScriptWorker.prototype)}),ace.define("ace/lib/es5-shim",["require","exports","module"],function(e,t,n){function r(){}function i(e){try{return Object.defineProperty(e,"sentinel",{}),"sentinel"in e}catch(e){}}function o(e){return(e=+e)!=e?e=0:0!==e&&e!==1/0&&e!==-1/0&&(e=(e>0||-1)*Math.floor(Math.abs(e))),e}Function.prototype.bind||(Function.prototype.bind=function(e){var t=this
if("function"!=typeof t)throw new TypeError("Function.prototype.bind called on incompatible "+t)
var n=d.call(arguments,1),i=function(){if(this instanceof i){var r=t.apply(this,n.concat(d.call(arguments)))
return Object(r)===r?r:this}return t.apply(e,n.concat(d.call(arguments)))}
return t.prototype&&(r.prototype=t.prototype,i.prototype=new r,r.prototype=null),i})
var s,a,c,u,l,f=Function.prototype.call,h=Array.prototype,p=Object.prototype,d=h.slice,m=f.bind(p.toString),v=f.bind(p.hasOwnProperty)
if((l=v(p,"__defineGetter__"))&&(s=f.bind(p.__defineGetter__),a=f.bind(p.__defineSetter__),c=f.bind(p.__lookupGetter__),u=f.bind(p.__lookupSetter__)),2!=[1,2].splice(0).length)if(function(){function e(e){var t=new Array(e+2)
return t[0]=t[1]=0,t}var t,n=[]
if(n.splice.apply(n,e(20)),n.splice.apply(n,e(26)),t=n.length,n.splice(5,0,"XXX"),n.length,t+1==n.length)return!0}()){var g=Array.prototype.splice
Array.prototype.splice=function(e,t){return arguments.length?g.apply(this,[void 0===e?0:e,void 0===t?this.length-e:t].concat(d.call(arguments,2))):[]}}else Array.prototype.splice=function(e,t){var n=this.length
e>0?e>n&&(e=n):void 0==e?e=0:e<0&&(e=Math.max(n+e,0)),e+t<n||(t=n-e)
var r=this.slice(e,e+t),i=d.call(arguments,2),o=i.length
if(e===n)o&&this.push.apply(this,i)
else{var s=Math.min(t,n-e),a=e+s,c=a+o-s,u=n-a,l=n-s
if(c<a)for(var f=0;f<u;++f)this[c+f]=this[a+f]
else if(c>a)for(f=u;f--;)this[c+f]=this[a+f]
if(o&&e===l)this.length=l,this.push.apply(this,i)
else for(this.length=l+o,f=0;f<o;++f)this[e+f]=i[f]}return r}
Array.isArray||(Array.isArray=function(e){return"[object Array]"==m(e)})
var k=Object("a"),b="a"!=k[0]||!(0 in k)
if(Array.prototype.forEach||(Array.prototype.forEach=function(e){var t=O(this),n=b&&"[object String]"==m(this)?this.split(""):t,r=arguments[1],i=-1,o=n.length>>>0
if("[object Function]"!=m(e))throw new TypeError
for(;++i<o;)i in n&&e.call(r,n[i],i,t)}),Array.prototype.map||(Array.prototype.map=function(e){var t=O(this),n=b&&"[object String]"==m(this)?this.split(""):t,r=n.length>>>0,i=Array(r),o=arguments[1]
if("[object Function]"!=m(e))throw new TypeError(e+" is not a function")
for(var s=0;s<r;s++)s in n&&(i[s]=e.call(o,n[s],s,t))
return i}),Array.prototype.filter||(Array.prototype.filter=function(e){var t,n=O(this),r=b&&"[object String]"==m(this)?this.split(""):n,i=r.length>>>0,o=[],s=arguments[1]
if("[object Function]"!=m(e))throw new TypeError(e+" is not a function")
for(var a=0;a<i;a++)a in r&&(t=r[a],e.call(s,t,a,n)&&o.push(t))
return o}),Array.prototype.every||(Array.prototype.every=function(e){var t=O(this),n=b&&"[object String]"==m(this)?this.split(""):t,r=n.length>>>0,i=arguments[1]
if("[object Function]"!=m(e))throw new TypeError(e+" is not a function")
for(var o=0;o<r;o++)if(o in n&&!e.call(i,n[o],o,t))return!1
return!0}),Array.prototype.some||(Array.prototype.some=function(e){var t=O(this),n=b&&"[object String]"==m(this)?this.split(""):t,r=n.length>>>0,i=arguments[1]
if("[object Function]"!=m(e))throw new TypeError(e+" is not a function")
for(var o=0;o<r;o++)if(o in n&&e.call(i,n[o],o,t))return!0
return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(e){var t=O(this),n=b&&"[object String]"==m(this)?this.split(""):t,r=n.length>>>0
if("[object Function]"!=m(e))throw new TypeError(e+" is not a function")
if(!r&&1==arguments.length)throw new TypeError("reduce of empty array with no initial value")
var i,o=0
if(arguments.length>=2)i=arguments[1]
else for(;;){if(o in n){i=n[o++]
break}if(++o>=r)throw new TypeError("reduce of empty array with no initial value")}for(;o<r;o++)o in n&&(i=e.call(void 0,i,n[o],o,t))
return i}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(e){var t=O(this),n=b&&"[object String]"==m(this)?this.split(""):t,r=n.length>>>0
if("[object Function]"!=m(e))throw new TypeError(e+" is not a function")
if(!r&&1==arguments.length)throw new TypeError("reduceRight of empty array with no initial value")
var i,o=r-1
if(arguments.length>=2)i=arguments[1]
else for(;;){if(o in n){i=n[o--]
break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}do{o in this&&(i=e.call(void 0,i,n[o],o,t))}while(o--)
return i}),Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)||(Array.prototype.indexOf=function(e){var t=b&&"[object String]"==m(this)?this.split(""):O(this),n=t.length>>>0
if(!n)return-1
var r=0
for(arguments.length>1&&(r=o(arguments[1])),r=r>=0?r:Math.max(0,n+r);r<n;r++)if(r in t&&t[r]===e)return r
return-1}),Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)||(Array.prototype.lastIndexOf=function(e){var t=b&&"[object String]"==m(this)?this.split(""):O(this),n=t.length>>>0
if(!n)return-1
var r=n-1
for(arguments.length>1&&(r=Math.min(r,o(arguments[1]))),r=r>=0?r:n-Math.abs(r);r>=0;r--)if(r in t&&e===t[r])return r
return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(e){return e.__proto__||(e.constructor?e.constructor.prototype:p)}),!Object.getOwnPropertyDescriptor){Object.getOwnPropertyDescriptor=function(e,t){if("object"!=typeof e&&"function"!=typeof e||null===e)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+e)
if(v(e,t)){var n
if(n={enumerable:!0,configurable:!0},l){var r=e.__proto__
e.__proto__=p
var i=c(e,t),o=u(e,t)
if(e.__proto__=r,i||o)return i&&(n.get=i),o&&(n.set=o),n}return n.value=e[t],n}}}if(Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(e){return Object.keys(e)}),!Object.create){var y
y=null===Object.prototype.__proto__?function(){return{__proto__:null}}:function(){var e={}
for(var t in e)e[t]=null
return e.constructor=e.hasOwnProperty=e.propertyIsEnumerable=e.isPrototypeOf=e.toLocaleString=e.toString=e.valueOf=e.__proto__=null,e},Object.create=function(e,t){var n
if(null===e)n=y()
else{if("object"!=typeof e)throw new TypeError("typeof prototype["+typeof e+"] != 'object'")
var r=function(){}
r.prototype=e,(n=new r).__proto__=e}return void 0!==t&&Object.defineProperties(n,t),n}}if(Object.defineProperty){var x=i({}),E="undefined"==typeof document||i(document.createElement("div"))
if(!x||!E)var w=Object.defineProperty}if(!Object.defineProperty||w){Object.defineProperty=function(e,t,n){if("object"!=typeof e&&"function"!=typeof e||null===e)throw new TypeError("Object.defineProperty called on non-object: "+e)
if("object"!=typeof n&&"function"!=typeof n||null===n)throw new TypeError("Property description must be an object: "+n)
if(w)try{return w.call(Object,e,t,n)}catch(e){}if(v(n,"value"))if(l&&(c(e,t)||u(e,t))){var r=e.__proto__
e.__proto__=p,delete e[t],e[t]=n.value,e.__proto__=r}else e[t]=n.value
else{if(!l)throw new TypeError("getters & setters can not be defined on this javascript engine")
v(n,"get")&&s(e,t,n.get),v(n,"set")&&a(e,t,n.set)}return e}}Object.defineProperties||(Object.defineProperties=function(e,t){for(var n in t)v(t,n)&&Object.defineProperty(e,n,t[n])
return e}),Object.seal||(Object.seal=function(e){return e}),Object.freeze||(Object.freeze=function(e){return e})
try{Object.freeze(function(){})}catch(e){Object.freeze=function(e){return function(t){return"function"==typeof t?t:e(t)}}(Object.freeze)}if(Object.preventExtensions||(Object.preventExtensions=function(e){return e}),Object.isSealed||(Object.isSealed=function(e){return!1}),Object.isFrozen||(Object.isFrozen=function(e){return!1}),Object.isExtensible||(Object.isExtensible=function(e){if(Object(e)===e)throw new TypeError
for(var t="";v(e,t);)t+="?"
e[t]=!0
var n=v(e,t)
return delete e[t],n}),!Object.keys){var S=!0,W=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],j=W.length
for(var L in{toString:null})S=!1
Object.keys=function(e){if("object"!=typeof e&&"function"!=typeof e||null===e)throw new TypeError("Object.keys called on a non-object")
var t=[]
for(var n in e)v(e,n)&&t.push(n)
if(S)for(var r=0,i=j;r<i;r++){var o=W[r]
v(e,o)&&t.push(o)}return t}}Date.now||(Date.now=function(){return(new Date).getTime()})
var _="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"
if(!String.prototype.trim||_.trim()){_="["+_+"]"
var A=new RegExp("^"+_+_+"*"),M=new RegExp(_+_+"*$")
String.prototype.trim=function(){return String(this).replace(A,"").replace(M,"")}}var O=function(e){if(null==e)throw new TypeError("can't convert "+e+" to object")
return Object(e)}})
