"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function requestAnimationFrameLong(e){requestAnimationFrame(function(){requestAnimationFrame(e)})}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),Folder=function(){function e(){_classCallCheck(this,e),this.element=document.querySelector("#folder"),this.folderObject=this.element.querySelector(".folder-object"),this.page=document.querySelector("#page"),this.pageScale={X:1,Y:1},this.folderState="OPEN",this.folderAnimating=!1,this.pageState="OPEN",this._addEventListeners=this._addEventListeners.bind(this),this._folderTransition=this._folderTransition.bind(this),this._pageTransition=this._pageTransition.bind(this),this.resize=this.resize.bind(this),this._addEventListeners()}return _createClass(e,[{key:"_addEventListeners",value:function(){var e=this,t=this.page.getBoundingClientRect();this.pageScale.X=54/t.width,this.pageScale.Y=38/t.height,this.element.addEventListener("click",function(){e.folderAnimating||("OPEN"===e.folderState?(e.page.style.transform="translate3d(0,-20px,0) scale("+e.pageScale.X+", "+e.pageScale.Y+")",e.page.classList.remove("__page-open"),setTimeout(function(){e.element.classList.add("__folder-move-up"),e.element.classList.add("__folder-closed")},100)):"CLOSED"===e.folderState&&(e.page.style.transform="translate3d(0,40px,0) scale("+e.pageScale.X+", "+e.pageScale.Y+")",e.element.classList.remove("__folder-move-up"),e.element.classList.remove("__folder-closed"),setTimeout(function(){e.page.style.display="block",requestAnimationFrameLong(function(){e.page.classList.add("__page-open")})},150)),e.page.addEventListener("transitionend",e._pageTransition),e.folderObject.addEventListener("transitionend",e._folderTransition))})}},{key:"_folderTransition",value:function(e){var t=e.target.className;switch(t){case"folder-front":"OPEN"===this.folderState?(this.folderState="CLOSED",this.folderAnimating=!1):"CLOSED"===this.folderState&&(this.folderState="OPEN",this.folderAnimating=!1);break;case"folder-object":}}},{key:"_pageTransition",value:function(e){"OPEN"===this.pageState?(this.page.style.display="none",this.pageState="CLOSED"):"CLOSED"===this.pageState&&(this.pageState="OPEN")}},{key:"resize",value:function(e,t){console.log("resizing folder element",e,t),this.element.style.width=e,this.element.style.height=t}}]),e}(),folder=new Folder;window.addEventListener("DOMContentLoaded",function(){});