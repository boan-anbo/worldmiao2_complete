(function(e){function t(t){for(var r,i,c=t[0],a=t[1],u=t[2],h=0,b=[];h<c.length;h++)i=c[h],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&b.push(o[i][0]),o[i]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);l&&l(t);while(b.length)b.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,c=1;c<n.length;c++){var a=n[c];0!==o[a]&&(r=!1)}r&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},s=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],a=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=a;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"142d":function(e,t,n){},"1c53":function(e,t,n){"use strict";n("142d")},"3a60":function(e,t,n){},"49e9":function(e,t,n){"use strict";n("f194")},"4fe2":function(e,t,n){},"5ea6":function(e,t,n){"use strict";n("b7d7")},"5fc5":function(e,t,n){e.exports=n("3d15").wrap(n("f2a2")()),e.exports.__esModule=!0},"6b30":function(e,t){},"7ba0":function(e,t){},"8cdd":function(e,t,n){"use strict";n("9729")},9729:function(e,t,n){},a766:function(e,t,n){},b7d7:function(e,t,n){},cbe8:function(e,t){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o=Object(r["f"])("div",{class:"bg-gray-700 px-4 truncate text-white text-lg text-center sm:text-right pr-8",style:{"font-family":"'Iceland', sans-serif","background-color":"#5D8D89"}},[Object(r["f"])("span",{class:"sm:inline hidden"}," worldmiao.two | "),Object(r["f"])("span",{class:"text-xs"}," 世界喵兔 "),Object(r["f"])("span",{class:"inline"},"| ebook search engine")],-1),s={id:"main-panel-layout",class:"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 4xl:grid-cols-8"},i={class:" bg-gray-700  text-white text-lg px-4",style:{"font-family":"'Iceland', sans-serif","background-color":"#5D8D89"}},c={class:" w-full"},a=Object(r["f"])("div",{class:"text-center text-base  sm:inline sm:col-span-1"}," (bo an 2020)",-1);function u(e,t,n,u,l,h){var b=Object(r["m"])("SearchBox"),d=Object(r["m"])("SearchStatusPanel"),f=Object(r["m"])("Library");return Object(r["h"])(),Object(r["c"])(r["a"],null,[o,Object(r["f"])("div",s,[(Object(r["h"])(!0),Object(r["c"])(r["a"],null,Object(r["k"])(e.bookProviderList,(function(n,o){return Object(r["h"])(),Object(r["c"])("div",{key:o},[Object(r["f"])(f,{bookStore:e.bookStore[n.providerEnum],"library-name":n.providerName,colIsEven:o%2===0,"book-provider":n.providerEnum,"library-url":n.url,"being-maintained":n.beingMaintained,showAllLibraryBoxes:e.showAllLibraryBoxes,holdings:n.holdings,"library-index":o},{"search-box":Object(r["q"])((function(){return[Object(r["f"])(b,{class:"static",searchInputMinLength:e.searchInputMinLength,"book-provider":n.providerEnum,onSearchRequest:e.onSearchRequest,"search-all":e.state.searchAll,onOnSearchAll:e.onSearchAll,searchTerm:e.state.searchTerm,"onUpdate:searchTerm":t[1]||(t[1]=function(t){return e.state.searchTerm=t})},null,8,["searchInputMinLength","book-provider","onSearchRequest","search-all","onOnSearchAll","searchTerm"])]})),"search-status":Object(r["q"])((function(t){var o=t.closeBookshelfHandler,s=t.shelfIsEmpty;return[Object(r["f"])(d,{onCloseBookshelf:o,shelfIsEmpty:s,"book-provider":n.providerEnum,bookStore:e.bookStore,searchStore:e.searchStore,onReuseSearchTerm:e.onReuseSearchTerm},null,8,["onCloseBookshelf","shelfIsEmpty","book-provider","bookStore","searchStore","onReuseSearchTerm"])]})),_:2},1032,["bookStore","library-name","colIsEven","book-provider","library-url","being-maintained","showAllLibraryBoxes","holdings","library-index"])])})),128))]),Object(r["f"])("div",i,[Object(r["f"])("div",c,[Object(r["r"])(Object(r["f"])("input",{type:"text",maxlength:"300","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.suggestionContent=t}),onFocus:t[3]||(t[3]=function(){return e.onSuggestionInputFocused&&e.onSuggestionInputFocused.apply(e,arguments)}),onBlur:t[4]||(t[4]=function(t){return e.suggestionFocused=!1}),class:[{"hover:underline":!1===this.suggestionFocused&&!1===this.suggestionSent&&0===this.suggestionContent.length,"text-center":0===this.suggestionContent.length,"cursor-pointer":!1===this.suggestionFocused,"border-b":!0===this.suggestionFocused},"text-base px-1 outline-none   placeholder-gray-100 text-center "],style:{background:"#5D8D89","min-width":"100px",width:"250px"},placeholder:this.suggestionFocused?"":this.suggestionSent?"thank you for contributing.":"click to add links, bugs, & suggestions."},null,42,["placeholder"]),[[r["o"],e.suggestionContent]]),e.suggestionFocused||e.suggestionContent.length>0?(Object(r["h"])(),Object(r["c"])("span",{key:0,onClick:t[5]||(t[5]=function(t){return e.makeSuggestion()}),onKeyup:t[6]||(t[6]=Object(r["s"])((function(t){return e.makeSuggestion()}),["enter"])),class:"  pl-2"},[Object(r["f"])("span",{class:[{"text-gray-400":0===e.suggestionContent.length},"cursor-pointer hover:underline"]},"submit",2)],32)):Object(r["d"])("",!0)]),a])],64)}n("99af"),n("4160"),n("d81d"),n("159b");var l,h=n("5530"),b=(n("96cf"),n("1da1")),d=n("668b"),f=(n("a4d3"),n("e01a"),n("b0c0"),n("9911"),n("d4ec"));(function(e){e["LIBRARY_GENESIS"]="LIBRARY_GENESIS",e["OPEN_LIBRARY"]="OPEN_LIBRARY",e["GOOGLE_BOOKS"]="GOOGLE_BOOKS",e["WORLD_CAT"]="WORLD_CAT",e["MEMORY_OF_THE_WORLD"]="MEMORY_OF_THE_WORLD",e["ZLIBRARY"]="ZLIBRARY",e["PROLETARIAT"]="PROLETARIAT",e["GUTENBERG"]="GUTENBERG"})(l||(l={}));var p,g,v=[{providerName:"Z Library",providerEnum:l.ZLIBRARY,url:"https://z-lib.org/",beingMaintained:null},{providerName:"eBook Databases",providerEnum:l.WORLD_CAT,url:"",beingMaintained:null,holdings:"320,000 +"},{providerName:"Google Books",providerEnum:l.GOOGLE_BOOKS,url:"https://books.google.com/",beingMaintained:null},{providerName:"Project Gutenberg",providerEnum:l.GUTENBERG,url:"http://www.gutenberg.org",beingMaintained:null,holdings:"60,000 +"},{providerName:"Library Genesis",providerEnum:l.LIBRARY_GENESIS,url:"http://gen.lib.rus.ec/",beingMaintained:null},{providerName:"Proletariat Library",providerEnum:l.PROLETARIAT,url:"https://library.proletarian.me/",beingMaintained:null,holdings:"10,000 +"},{providerName:"Memory of the World",providerEnum:l.MEMORY_OF_THE_WORLD,url:"https://library.memoryoftheworld.org/",beingMaintained:null,holdings:"150,000 +"},{providerName:"Open Library",providerEnum:l.OPEN_LIBRARY,url:"http://openlibrary.org/",beingMaintained:null,holdings:"1,400,000 +"}];(function(e){e["BOOKS"]="BOOKS",e["BOOK_ACCESS"]="BOOK_ACCESS"})(p||(p={})),function(e){e["DOWNLOAD"]="DOWNLOAD",e["BORROW"]="BORROW",e["PURCHASE"]="PURCHASE",e["EBOOK"]="EBOOK",e["DATABASE"]="DATABASE"}(g||(g={}));var O=function e(t,n,r){Object(f["a"])(this,e),this.id="",this.title="",this.pages="",this.subtitle="",this.description="",this.author=" ",this.publicationYear=0,this.isbns=[],this.publisher="",this.format="",this.thumbnail="",this.emptyBook=!1,this.access=[],this.provider=t,null===t&&(this.emptyBook=!0),this.uniqueIdentifier=null!==n&&void 0!==n?n:{id:"",idNote:""},this.title=null!==r&&void 0!==r?r:""},S={style:{"max-width":"100%","max-height":"200px",height:"200px"},class:"search-panel border grid grid-cols-1 content-between"},m={class:"search-header  mt-4 "},k={key:0,class:"hover:no-underline text-xs text-gray-600"},j={class:"hover:no-underline text-xs cursor-default text-gray-600"},R={key:0},x={key:1},y=Object(r["f"])("div",{class:"row-3"},null,-1),w={key:0},E={key:1,class:"white"};function I(e,t,n,o,s,i){var c=Object(r["m"])("VueBook");return Object(r["h"])(),Object(r["c"])(r["a"],null,[Object(r["f"])("div",S,[Object(r["f"])("div",m,[Object(r["f"])("span",{onClick:t[1]||(t[1]=Object(r["t"])((function(e){return i.openLink(n.libraryUrl)}),["stop","prevent"])),class:"text-lg  text-black ",style:{color:"#668885"}},[Object(r["f"])("span",{class:"hover:underline cursor-pointer",title:n.libraryUrl},Object(r["n"])(n.libraryName),9,["title"]),null!==n.beingMaintained?(Object(r["h"])(),Object(r["c"])("p",k,"("+Object(r["n"])(n.beingMaintained)+")",1)):Object(r["d"])("",!0),Object(r["f"])("p",j,[null===n.beingMaintained&&n.holdings?(Object(r["h"])(),Object(r["c"])("span",R,"("+Object(r["n"])(n.holdings)+")",1)):Object(r["d"])("",!0),null===n.beingMaintained&&n.holdings?Object(r["d"])("",!0):(Object(r["h"])(),Object(r["c"])("span",x," "))])])]),y,Object(r["f"])("div",{onClick:t[2]||(t[2]=function(){return i.showBoxes&&i.showBoxes.apply(i,arguments)})},[Object(r["l"])(e.$slots,"search-box")]),s.searchStatusShown?(Object(r["h"])(),Object(r["c"])("div",w,[Object(r["l"])(e.$slots,"search-status",{closeBookshelfHandler:i.hideBoxes,shelfIsEmpty:o.shelfIsEmpty()})])):Object(r["d"])("",!0),s.searchStatusShown?Object(r["d"])("",!0):(Object(r["h"])(),Object(r["c"])("div",E," "))]),(Object(r["h"])(!0),Object(r["c"])(r["a"],null,Object(r["k"])(o.bookShelfRef[n.bookProvider],(function(e,t){return Object(r["h"])(),Object(r["c"])("div",{id:"book-shelf",class:"\r\n      bg-gray-200\r\n      bg-opacity-25\r\n      overflow-hidden\r\n\r\n      ",key:t},[Object(r["f"])(c,{class:["bookBox",{moveUpOutOfView:!s.boxesShown}],fetchResultRepository:s.fetchResultRepository,bookCoverShown:e.bookCoverShown,book:e.book,"library-name":n.libraryName,index:t,beingMaintained:n.beingMaintained,onFetchRequest:i.onReceiveFetchRequest},null,8,["fetchResultRepository","class","bookCoverShown","book","library-name","index","beingMaintained","onFetchRequest"])])})),128))],64)}n("c740"),n("fb6a"),n("a9e3"),n("6b30");var T,A={style:{"max-width":"100%","min-width":"200px","max-height":"200px",height:"200px","background-color":"#b7d4d2"},class:"overflow-hidden border "},B=Object(r["f"])("div",{class:"cover-header"},null,-1),C={class:"library-name-cover cover-content text-lg"},L=Object(r["f"])("div",{class:"cover-footer"},null,-1),N={class:"font-base"},q={class:"ml-2 "},_={class:"book-info-description grid grid-col-1"},P={class:"text-xs my px-4 truncate my-1  text-gray-600"},F={key:0},M={key:1},D={key:2},G={style:{"max-height":"90px","text-overflow":"ellipsis","word-wrap":"break-word"},class:"description text-left text-xs text-gray-600  py-2 px-6 mx-4 overflow-y-scroll select-none"},H={style:{color:"#668885"},class:"boot-info-footer pb-2\r\n\r\n\r\n    text-xs"};function W(e,t){var n,o,s,i,c,a,u=this,l=Object(r["m"])("BookAccesses");return Object(r["h"])(),Object(r["c"])("div",A,[Object(r["f"])("div",{style:{"min-height":"200px",height:"200px","background-color":"#5D8D89"},class:[{moveUpOutOfView:!e.bookCoverShown},"bookCover font-bold grid grid-cols-1 content-between"]},[B,Object(r["f"])("div",C,Object(r["n"])(e.libraryName),1),L],2),Object(r["f"])("div",{onClick:t[1]||(t[1]=function(e){return u.toggleBookInfo()}),style:{"min-height":"200px","background-color":"#c9dedd"},class:[{moveUpOutOfView:!this.state.showInfo,moveIntoViewFromBelow:!e.bookCoverShown,"cursor-pointer":null===this.beingMaintained,"cursor-not-allowed":null!==this.beingMaintained},"bookInfo grid grid-cols-1 content-between "]},[Object(r["f"])("div",{style:{"max-height":"55px","min-height":"60px"},title:e.book.title,class:"\r\n         overflow-truncate\r\n         overflow-y-hidden\r\n\r\n         book-info-title\r\n         text-base\r\n         pl-8  pt-4 pr-6  text-black text-left "},[Object(r["f"])("span",N,Object(r["n"])(e.index+1+"."),1),Object(r["f"])("span",q,Object(r["n"])(e.book.title),1)],8,["title"]),Object(r["f"])("div",_,[Object(r["f"])("div",P,[null!==(n=e.book)&&void 0!==n&&n.author?(Object(r["h"])(),Object(r["c"])("span",F,Object(r["n"])((null===(o=e.book)||void 0===o?void 0:o.author)+", "),1)):Object(r["d"])("",!0),0!==(null===(s=e.book)||void 0===s?void 0:s.publicationYear)?(Object(r["h"])(),Object(r["c"])("span",M,Object(r["n"])(null===(i=e.book)||void 0===i?void 0:i.publicationYear),1)):Object(r["d"])("",!0),null!==(c=e.book)&&void 0!==c&&c.publisher?(Object(r["h"])(),Object(r["c"])("span",D,Object(r["n"])("; "+(null===(a=e.book)||void 0===a?void 0:a.publisher)),1)):Object(r["d"])("",!0)]),Object(r["f"])("div",G,Object(r["n"])(e.book.description),1)]),Object(r["f"])("div",H,Object(r["n"])(e.libraryName),1)],2),Object(r["f"])("div",{onClick:t[2]||(t[2]=function(t){return e.toggleBookInfo()}),class:[{moveIntoViewFromBelow:!this.state.showInfo&&!e.bookCoverShown},"bookLinks "],style:{"background-color":"#b7d4d2"}},[Object(r["f"])(l,{book:e.book,fetchStatus:this.fetchStatus,accesses:e.accesses,libraryName:e.libraryName,links:e.state.links},null,8,["book","fetchStatus","accesses","libraryName","links"])],2)])}(function(e){e["IDLE"]="IDLE",e["FETCHING"]="FETCHING",e["QUEUING"]="QUEUING",e["FETCHED"]="FETCHED",e["ERROR"]="ERROR"})(T||(T={}));var Y=function(e,t){t.bookAccess=T.FETCHING,console.log("fetching id ",e);var n=setInterval((function(){t.timer++,console.log(t.timer)}),1e3);setTimeout((function(){t.bookAccess=T.FETCHED,clearInterval(n)}),5e3)},U={style:{height:"200px","background-color":"#fffffc !important"},class:"grid  grid-cols-12 content-between cursor-pointer"},V={class:"displaygrid space-y-2 col-span-12 content-between overflow-y-scroll  grid-cols-12"},K={key:0,class:"text-xs col-span-12 cursor-wait "},Q={key:1,class:"text-xs col-span-12  h-full"},$=Object(r["f"])("span",{class:"cursor-not-allowed"},"no links found.",-1),Z={class:"truncate"},J={id:"access-footer",style:{color:"#668885"},class:"  col-span-12 pb-2 text-xs"};function z(e,t){var n;return Object(r["h"])(),Object(r["c"])("div",U,[Object(r["f"])("div",{title:e.book.title,id:"access-header",style:{"max-height":"60px","min-height":"60px",color:"#668885"},class:" overflow-y-hidden col-span-12 pt-4 px-4"},[Object(r["f"])("span",{onClick:t[1]||(t[1]=Object(r["t"])((function(){}),["stop"])),class:"cursor-text"},Object(r["n"])(e.book.title),1)],8,["title"]),Object(r["f"])("div",V,["FETCHING"===e.fetchStatus||"QUEUING"===e.fetchStatus?(Object(r["h"])(),Object(r["c"])("div",K,[Object(r["f"])("span",null,Object(r["n"])(e.getStatusString),1)])):Object(r["d"])("",!0),"FETCHED"!==e.fetchStatus&&"ERROR"!==e.fetchStatus||0!==(null===(n=e.accesses)||void 0===n?void 0:n.length)?Object(r["d"])("",!0):(Object(r["h"])(),Object(r["c"])("div",Q,[$])),(Object(r["h"])(!0),Object(r["c"])(r["a"],null,Object(r["k"])(e.accesses,(function(t,n){return Object(r["h"])(),Object(r["c"])("div",{key:n,class:"col-span-12 grid grid-cols-12 pl-2 "},[t.type?(Object(r["h"])(),Object(r["c"])("div",{key:0,title:"".concat(t.type,". some might require login"),id:"data-access-type",class:"\r\n              col-span-3\r\n              text-xs\r\n              access-type\r\n              truncate\r\n              text-right\r\n              cursor-pointer\r\n              "},Object(r["n"])(n+1)+": "+Object(r["n"])(e.getAccessTypeString(t.type))+": ",9,["title"])):Object(r["d"])("",!0),Object(r["f"])("div",{title:t.link,class:"text-xs   truncate pl-2 pr-4 col-span-9  text-center"},[Object(r["f"])("div",Z,[Object(r["f"])("span",{onClick:Object(r["t"])((function(n){return e.openWindow(t.link)}),["stop","prevent"]),class:"cursor-pointer hover:underline"},Object(r["n"])(e.getDisplayString(t)),9,["onClick"])])],8,["title"])])})),128))]),Object(r["f"])("div",J,[Object(r["f"])("span",null,Object(r["n"])(e.libraryName),1)])])}var X={name:"BookAccesses",props:{links:Array,book:Object,accesses:Array,fetchStatus:T,libraryName:String},methods:{openWindow:function(e){return window.open(e)},getAccessTypeString:function(e){if(e){var t="";switch(e){case g.DATABASE:t="database";break;default:t=e.toLowerCase();break}return t}},getDisplayString:function(e){return e?e.name.length>0?e.name:e.link:""}},computed:{getStatusString:function(){var e="";switch(this.fetchStatus){case T.FETCHING:e="fetching links ...";break;case T.QUEUING:e="queuing ..";break}return e}},data:function(){return{dataType:g}}};n("1c53");X.render=z;var ee=X,te=(n("7ba0"),{name:"VueBook",components:{BookAccesses:ee},emits:["fetch-request"],setup:function(e){var t,n=Object(r["i"])({bookAccess:T.IDLE,timer:0,links:null===(t=e.book)||void 0===t?void 0:t.access,showInfo:!0}),o=function(){var e=Object(b["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.timer=0,n.bookAccess=T.FETCHING,Y(t,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{fetch:o,state:n}},props:{book:Object,index:Number,bookCoverShown:Boolean,libraryName:String,fetchResultRepository:Object,beingMaintained:String},data:function(){return{accesses:[],fetchStatus:T.IDLE,fetchTimer:0,fetchResultRepositorySub:void 0}},methods:{resetAllProperties:function(){this.fetchStatus.BookAccessFetchingState.IDLE},hasNeedToFetch:function(){return 0===this.accesses.length},onFetchAccess:function(){var e=Object(b["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t&&n){e.next=2;break}throw new Error("invalid fetch");case 2:if(this.hasNeedToFetch()){e.next=5;break}return console.log("no need to fetch has ",this.accesses.length),e.abrupt("return");case 5:console.log("need to fetch check",this.hasNeedToFetch()),console.log("Fetch Access"),this.makeFetchRequest(t,n);case 8:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),makeFetchRequest:function(e,t,n){this.fetchStatus=T.QUEUING,this.$emit("fetch-request",{index:e,uniqueId:t,bookId:n})},toggleBookInfo:function(){if(console.log("Checking maintainance status",this.beingMaintained),null===this.beingMaintained){if(this.state.showInfo=!this.state.showInfo,!this.state.showInfo&&this.fetchStatus===T.IDLE){if(!this.hasNeedToFetch())return void console.log("no need to fetch has ",this.accesses.length);this.makeFetchRequest(this.index,this.book.uniqueIdentifier.id,this.book.id)}}else console.log(this.beingMaintained)}},mounted:function(){var e=this;this.fetchResultRepositorySub=this.fetchResultRepository.subscribe((function(t){var n,r=t.index,o=t.result,s=t.operation,i=t.status;if(r===e.index)switch(s){case"status":e.fetchStatus=i;break;case"result":console.log("Child",e.index,"received repo update",o),e.fetchStatus=T.FETCHED,null!==o&&void 0!==o&&null!==(n=o.data)&&void 0!==n&&n.data&&(e.accesses=o.data.data);break}}))},unmounted:function(){var e;null===(e=this.fetchResultRepositorySub)||void 0===e||e.unsubscribe()},watch:{book:function(){this.state.showInfo=!0,this.accesses=this.book.access,this.fetchStatus=T.IDLE}}});n("49e9");te.render=W;var ne,re=te,oe=(n("b680"),n("bee2")),se=function e(){Object(f["a"])(this,e),this.bookCoverShown=!0,this.book=new O(null)},ie=function(){function e(t){Object(f["a"])(this,e),this.searchedTerm="",this.searchResultCount=null,this._searchingStatus=ne.IDLE,this.intervalTimer=0,this.searchTimer=0,this.provider=t}return Object(oe["a"])(e,[{key:"setSearchedTerm",value:function(e){this.searchedTerm=e}},{key:"getSearchedTerm",value:function(){return this.searchedTerm}},{key:"getTimerValue",value:function(){return(this.searchTimer/10).toFixed(1)}},{key:"getCurrentStatus",value:function(){return this._searchingStatus}},{key:"setSearchResultCount",value:function(e){console.log("hit",e),"number"===typeof e&&(this.searchResultCount=e)}},{key:"getSearchResultCount",value:function(){if(void 0!==this.searchResultCount)return this.searchResultCount}},{key:"setSearchStatus",value:function(e){this.searchingStatus=e}},{key:"startTimer",value:function(){var e=this;this.intervalTimer=setInterval((function(){e.searchTimer++}),100)}},{key:"stopTimer",value:function(){clearInterval(this.intervalTimer)}},{key:"resetTimer",value:function(){this.stopTimer(),this.searchTimer=0}},{key:"searchingStatus",set:function(e){switch(e){case ne.ERROR:this.stopTimer();break;case ne.SEARCHING:this.resetTimer(),this.startTimer();break;case ne.SEARCH_FINISHED:this.stopTimer();break}this._searchingStatus=e}}]),e}();(function(e){e["SEARCH_FINISHED"]="done.",e["IDLE"]="ready.",e["SEARCHING"]="searching...",e["ERROR"]="error."})(ne||(ne={}));var ce=n("2bd2"),ae=n("bee6"),ue=n("3e18"),le=n("ec26"),he=n("5670"),be=(n("5fc5"),{name:"Library",components:{VueBook:re},setup:function(e){var t=Object(r["j"])(new Array(20)),n={},o=Object(r["j"])(n),s=function(){console.log("filling empty boxes");for(var t=[],n=0;n<20;n++)t.push(new se);o.value[e.bookProvider]=t},i=function(e){setTimeout((function(){return a()[e].bookCoverShown=!0}),80*e)},c=function(e){setTimeout((function(){return a()[e].bookCoverShown=!1}),80*e)},a=function(){return o.value[e.bookProvider]},u=function(){o.value[e.bookProvider]=[]},l=function(){var t;return 0===(null===(t=o.value[e.bookProvider])||void 0===t?void 0:t.length)},h=function(e){var t;s();var n=null===(t=e)||void 0===t?void 0:t.length;n>20&&(e=e.slice(0,20)),e.forEach((function(e,t){a()[t].book=e,a()[t].book.id=Object(le["a"])(),c(t)}))},b=function(){for(var t=0;t<o.value[e.bookProvider].length;t++)i(t)},d=function(){for(var t=0;t<o.value[e.bookProvider].length;t++)c(t)};return{books:t,showBookCover:b,hideBookCover:d,bookShelfRef:o,upshelfBooks:h,unshelfBooks:u,getThisShelf:a,fillBookShelfWithEmptyBoxes:s,shelfIsEmpty:l}},props:{libraryName:String,bookProvider:l,colIsEven:Boolean,bookStore:Object,libraryUrl:String,beingMaintained:String,holdings:String,showAllLibraryBoxes:Object,libraryIndex:Number},mounted:function(){var e,t=this;this.searchAllRequestSub=null===(e=this.showAllLibraryBoxes)||void 0===e?void 0:e.pipe(Object(ae["a"])(100)).subscribe((function(e){e===t.bookProvider&&t.showBoxes()})),this.fetchRequestQueueSub=this.fetchRequestQueue.pipe(Object(ue["a"])(function(){var e=Object(b["a"])(regeneratorRuntime.mark((function e(n){var r,o,s,i,c,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=n.index,o=n.uniqueId,s=n.bookId,console.log("Checking is BookId Is Valid",t.isBookIdValid(s)),t.isBookIdValid(s)){e.next=5;break}return console.log("bookId",s,"no longer existed, drop the request"),e.abrupt("return",null);case 5:return t.updateFetchResultRepoWithStatus({index:r,result:i,status:T.FETCHING}),c="./api/scraper/access",a={uniqueId:o,provider:t.bookProvider},console.log("Sending Request",{index:r,uniqueId:o,payload:a,bookId:s}),e.prev=9,e.next=12,t.axios.post(c,a);case 12:return i=e.sent,console.log("inner response received",r,i),e.abrupt("return",{index:r,result:i});case 17:return e.prev=17,e.t0=e["catch"](9),console.log("catched!"),e.abrupt("return",{index:r,result:null});case 21:case"end":return e.stop()}}),e,null,[[9,17]])})));return function(t){return e.apply(this,arguments)}}()),Object(he["a"])((function(e){return null!==e}))).subscribe((function(e){if("number"===typeof(null===e||void 0===e?void 0:e.index)){var n=e.index,r=e.result;console.log("outter response received",n,r),console.log("Received loaded for index,",n,r),t.updateFetchResultRepoWithResult({index:n,result:r})}}),(function(){console.log("error")}),(function(){console.log("completed"),t.updateFetchResultRepoWithResult(null)}))},unmounted:function(){var e,t;null===(e=this.fetchRequestQueueSub)||void 0===e||e.unsubscribe(),null===(t=this.searchAllRequestSub)||void 0===t||t.unsubscribe()},data:function(){return{boxesShown:!1,searchStatusShown:!1,fetchRequestQueue:new ce["a"],fetchResultRepository:new ce["a"],fetchRequestQueueSub:void 0,searchAllRequestSub:void 0}},methods:{isBookIdValid:function(e){return console.log(this.bookShelfRef[this.bookProvider]),this.bookShelfRef[this.bookProvider].findIndex((function(t){return t.book.id===e}))>-1},updateFetchResultRepoWithResult:function(e){e.operation="result",this.fetchResultRepository.next(e)},updateFetchResultRepoWithStatus:function(e){e.operation="status",this.fetchResultRepository.next(e)},showBoxes:function(){var e=this;this.boxesShown||(setTimeout((function(){return e.boxesShown=!0}),0),setTimeout((function(){return e.searchStatusShown=!0}),.8),this.fillBookShelfWithEmptyBoxes(),this.boxesShown=!0,this.searchStatusShown=!0)},hideBoxes:function(){console.log("called"),this.unshelfBooks(),this.boxesShown=!1},openLink:function(e){(null===e||void 0===e?void 0:e.length)<1||window.open(e)},onReceiveFetchRequest:function(e){var t=e.index,n=e.uniqueId,r=e.bookId;console.log("Library put on queue a new fetch request",{index:t,uniqueId:n,bookId:r}),this.fetchRequestQueue.next({index:t,uniqueId:n,bookId:r})}},watch:{bookStore:function(){console.log("Found Book Store Change",this.bookStore),void 0!==this.bookStore&&this.upshelfBooks(this.bookStore.data)}}});n("8cdd");be.render=I;var de=be,fe={class:"grid grid-cols-1"},pe={class:"text-center"},ge=Object(r["e"])(" "),ve={key:0,class:"text-red-400 text-xs"},Oe={class:"checkbox-div  select-none"},Se=Object(r["f"])("div",{style:{width:"205px"},class:" inline-block"}," ",-1),me={class:"inline-block"},ke={class:"checkbox hover:underline",title:"check to search all libraries"};function je(e,t){return Object(r["h"])(),Object(r["c"])("div",fe,[Object(r["f"])("div",null,[Object(r["f"])("label",null,[Object(r["f"])("input",{style:{"background-color":"transparent","min-width":"100px",width:"200px"},maxlength:"90",class:"search-input px-1 outline-none text-black border-b text-xs",type:"search",value:e.searchTerm,onKeyup:t[1]||(t[1]=Object(r["s"])((function(){return e.makeSearchRequest&&e.makeSearchRequest.apply(e,arguments)}),["enter"])),onInput:t[2]||(t[2]=function(t){return e.emitSearchTermChanges(t.target.value)})},null,40,["value"]),Object(r["f"])("span",{class:[{"text-gray-200":this.searchTerm.length<=this.searchInputMinLength,"hover:underline":this.searchTerm>this.searchInputMinLength},"pl-2 cursor-pointer text-black hover:underline outline-none select-none"],style:{color:"#5d8d89"},onClick:t[3]||(t[3]=function(){return e.makeSearchRequest&&e.makeSearchRequest.apply(e,arguments)})},"search...",2)])]),Object(r["r"])(Object(r["f"])("div",pe,[ge,e.isInputTooShort()?(Object(r["h"])(),Object(r["c"])("span",ve,"* too short")):Object(r["d"])("",!0)],512),[[r["p"],!e.isRequestValid()]]),Object(r["r"])(Object(r["f"])("div",Oe,[Se,Object(r["f"])("div",me,[Object(r["f"])("label",ke,[Object(r["f"])("input",{type:"checkbox",checked:e.searchAll,onChange:t[4]||(t[4]=function(t){return e.toggleSearchAll(t.target.checked)})},null,40,["checked"]),Object(r["f"])("div",{class:[" inline-block pl-2 cursor-pointer  text-base mr-4",{searchall_active:e.searchAll,"text-gray-400":!e.searchAll}]},"all",2)])])],512),[[r["p"],e.isRequestValid()]])])}n("498a");var Re=n("a748"),xe=n("c575"),ye=n("3fab"),we=n("d263"),Ee=n("6d6a"),Ie={name:"SearchBox",emits:["update:searchTerm","searchRequest","onSearchAll"],props:{searchTerm:String,hideSearchButton:Boolean,libraryName:String,bookProvider:String,searchAll:Boolean,searchInputMinLength:Number},mounted:function(){var e=this;this.searchDeboucerSub=Object(Re["a"])(this.requestEmitter.pipe(Object(ye["a"])()),this.requestEmitter.pipe(Object(we["a"])(1),Object(Ee["a"])((function(){return Object(xe["a"])(800)})))).subscribe((function(t){console.log("Emiting a request after interval"),e.$emit("searchRequest",t),e.grayOutSearch=!1}))},unmounted:function(){var e;null===(e=this.searchDeboucerSub)||void 0===e||e.unsubscribe()},methods:{emitSearchTermChanges:function(e){this.localSearchString=e,console.log("Emitting Change"),this.$emit("update:searchTerm",e)},makeSearchRequest:function(){this.searchTerm.length<=this.searchInputMinLength||(this.grayOutSearch=!0,this.requestEmitter.next(this.bookProvider))},isRequestValid:function(){var e,t;return(null===(e=this.localSearchString)||void 0===e?void 0:e.trim().length)>this.searchInputMinLength||(null===(t=this.searchTerm)||void 0===t?void 0:t.trim().length)>this.searchInputMinLength},isInputTooShort:function(){var e,t,n,r;return(null===(e=this.localSearchString)||void 0===e?void 0:e.trim().length)>0&&(null===(t=this.localSearchString)||void 0===t?void 0:t.trim().length)<=this.searchInputMinLength||(null===(n=this.searchTerm)||void 0===n?void 0:n.trim().length)>0&&(null===(r=this.searchTerm)||void 0===r?void 0:r.trim().length)<=this.searchInputMinLength},clearInput:function(){this.localSearchString="",this.emitSearchTermChanges("")},inputIsEmpty:function(){return!this.localSearchString&&!this.searchTerm},toggleSearchAll:function(e){this.$emit("onSearchAll",e)}},data:function(){return{requestEmitter:new ce["a"],requestWatcher:null,localSearchString:"",searchDeboucerSub:void 0}}};n("5ea6");Ie.render=je;var Te=Ie,Ae={class:"grid grid-cols-8 text-xs "},Be={class:" text-center col-span-8  truncate px-4"},Ce={key:1,class:"cursor-default"},Le={key:0,class:"result-count col-span-2 text-center text-gray-700"},Ne={key:1,class:"result-count col-span-2 text-center text-gray-700"},qe={class:"text-center col-span-1 overflow-visible text-gray-700 ",id:"search-timer"},_e=Object(r["f"])("span",{class:"cursor-pointer hover:underline"},"[ x ]",-1);function Pe(e,t){return Object(r["h"])(),Object(r["c"])("div",Ae,[Object(r["f"])("div",Be,[e.getSearchTerm.length>0?(Object(r["h"])(),Object(r["c"])("span",{key:0,title:"reuse this search term",onClick:t[1]||(t[1]=function(t){return e.reuseSearchTerm()}),class:"cursor-pointer hover:underline "},Object(r["n"])(e.getSearchTerm),1)):Object(r["d"])("",!0),e.getSearchTerm.length>0?Object(r["d"])("",!0):(Object(r["h"])(),Object(r["c"])("span",Ce,"   "))]),Object(r["f"])("div",{class:["status col-span-3 text-right text-gray-700",{"done greendone":e.searchStore[e.bookProvider].getCurrentStatus()===e.librarySearchStatus.SEARCH_FINISHED,"text-red-400":e.searchStore[e.bookProvider].getCurrentStatus()===e.librarySearchStatus.SEARCHING}]},"  "+Object(r["n"])(e.searchStore[e.bookProvider].getCurrentStatus()),3),e.searchStore[e.bookProvider].getCurrentStatus()!==e.librarySearchStatus.SEARCH_FINISHED?(Object(r["h"])(),Object(r["c"])("div",Le,"   ")):Object(r["d"])("",!0),e.searchStore[e.bookProvider].getCurrentStatus()===e.librarySearchStatus.SEARCH_FINISHED?(Object(r["h"])(),Object(r["c"])("div",Ne,Object(r["n"])(e.getSearchResultCount),1)):Object(r["d"])("",!0),Object(r["f"])("div",qe,Object(r["n"])(e.getSearchTime),1),e.shelfIsEmpty?Object(r["d"])("",!0):(Object(r["h"])(),Object(r["c"])("div",{key:2,title:"close results",onClick:t[2]||(t[2]=function(t){return e.closeBookShelf()}),class:" col-span-2 text-right pr-2 "},[_e]))])}n("ac1f"),n("5319"),n("cbe8");var Fe={name:"SearchStatusPanel",props:["bookStore","searchStore","bookProvider","closeBookshelfHandler","shelfIsEmpty"],emits:["close-bookshelf","reuse-search-term"],setup:function(e){console.log(e);var t=e.searchStore[e.bookProvider].getTimerValue(),n=e.searchStore[e.bookProvider].getCurrentStatus(),r=e.bookProvider+t;return{statusString:r,timer:t,status:n}},data:function(){return{librarySearchStatus:ne}},computed:{getSearchTerm:function(){return this.searchStore[this.bookProvider].getSearchedTerm()?'"'.concat(this.searchStore[this.bookProvider].getSearchedTerm(),'"'):""},getSearchTime:function(){return this.searchStore[this.bookProvider].getTimerValue()+"s"},getSearchResultCount:function(){return 0===this.searchStore[this.bookProvider].getSearchResultCount()?"(0 hits.)":"(".concat(this.searchStore[this.bookProvider].getSearchResultCount()," hits.)")}},methods:{closeBookShelf:function(){console.log("emitted"),this.$emit("close-bookshelf",!0)},reuseSearchTerm:function(){var e;this.$emit("reuse-search-term",this.bookProvider,null===(e=this.getSearchTerm)||void 0===e?void 0:e.replace(/"/g,""))}}};n("f152");Fe.render=Pe;var Me=Fe,De=Object(r["g"])({name:"App",setup:function(){var e=Object(r["i"])({searchTerm:"",searchAll:!1}),t=v;return{bookProviderList:t,state:e}},data:function(){return{suggestionContent:"",suggestionSent:!1,suggestionFocused:!1,bookProvider:l,libraryOrder:[],searchStore:{GOOGLE_BOOKS:new ie(l.GOOGLE_BOOKS),MEMORY_OF_THE_WORLD:new ie(l.MEMORY_OF_THE_WORLD),LIBRARY_GENESIS:new ie(l.LIBRARY_GENESIS),OPEN_LIBRARY:new ie(l.OPEN_LIBRARY),WORLD_CAT:new ie(l.WORLD_CAT),ZLIBRARY:new ie(l.ZLIBRARY),GUTENBERG:new ie(l.GUTENBERG),PROLETARIAT:new ie(l.PROLETARIAT)},bookStore:{GOOGLE_BOOKS:{},MEMORY_OF_THE_WORLD:{},LIBRARY_GENESIS:{},OPEN_LIBRARY:{},WORLD_CAT:{},ZLIBRARY:{},PROLETARIAT:{},GUTENBERG:{}},showAllLibraryBoxes:new ce["a"],currentSearchAllRequestId:"",searchInputMinLength:1}},methods:{test:function(){console.log("app.vue received close bookshelf")},onSearchRequest:function(){var e=Object(b["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.state.searchAll?this.searchAll():this.sendSearchRequest(t);case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),searchAll:function(){var e=Object(b["a"])(regeneratorRuntime.mark((function e(){var t,n,r,o,s,i,c,a,u=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.bookProviderList.forEach((function(e){u.showAllLibraryBoxes.next(e.providerEnum)})),t=Object(le["a"])(),this.currentSearchAllRequestId=t,n=!0,r=!1,e.prev=5,s=Object(d["a"])(this.bookProviderList);case 7:return e.next=9,s.next();case 9:return i=e.sent,n=i.done,e.next=13,i.value;case 13:if(c=e.sent,n){e.next=23;break}if(a=c,this.currentSearchAllRequestId===t){e.next=18;break}return e.abrupt("break",23);case 18:return e.next=20,this.sendSearchRequest(a.providerEnum,t);case 20:n=!0,e.next=7;break;case 23:e.next=29;break;case 25:e.prev=25,e.t0=e["catch"](5),r=!0,o=e.t0;case 29:if(e.prev=29,e.prev=30,n||null==s.return){e.next=34;break}return e.next=34,s.return();case 34:if(e.prev=34,!r){e.next=37;break}throw o;case 37:return e.finish(34);case 38:return e.finish(29);case 39:case"end":return e.stop()}}),e,this,[[5,25,29,39],[30,,34,38]])})));function t(){return e.apply(this,arguments)}return t}(),sendSearchRequest:function(){var e=Object(b["a"])(regeneratorRuntime.mark((function e(t,n){var r,o,s,i,c,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return o=this.state.searchTerm,s="./api/scraper",console.log("Posting your request for ",t,"for term",o," to",s),this.setSearchStatus(t,ne.SEARCHING),this.setSearchTerm(t,o),e.next=7,this.axios.post(s,{title:o,provider:t});case 7:if(i=e.sent,c=i.data,c||this.setSearchStatus(t,ne.ERROR),console.log("Received Response From Server for ".concat(t,", for term ").concat(o,", data:"),c),!n||this.currentSearchAllRequestId===n){e.next=14;break}return console.log("batch search request dropped, drop the fetched data"),e.abrupt("return");case 14:return a=c.data.map((function(e){return Object.assign(new O(t),e)})),c.data=a,this.bookStore[t]=Object(h["a"])({},c),this.setSearchStatus(t,ne.SEARCH_FINISHED),this.setSearchResultCount(t,null===c||void 0===c||null===(r=c.data)||void 0===r?void 0:r.length),e.abrupt("return");case 20:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),setSearchStatus:function(e,t){this.getSearchStatus(e).setSearchStatus(t)},setSearchTerm:function(e,t){this.getSearchStatus(e).setSearchedTerm(t)},getSearchStatus:function(e){return this.searchStore[e]},setSearchResultCount:function(e,t){this.getSearchStatus(e).setSearchResultCount(t)},onReuseSearchTerm:function(e,t){console.log("On Reuse Search Term",e,t),this.state.searchTerm=t},onSearchAll:function(e){console.log("parent received isSearchALl Checked",e),this.state.searchAll=e},makeSuggestion:function(){var e=Object(b["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(this.suggestionContent.length>this.searchInputMinLength)){e.next=9;break}return t="./api/suggestion",console.log("sending suggestion to back end",this.suggestionContent,t),this.suggestionSent=!1,e.next=6,this.axios.post(t,{content:this.suggestionContent});case 6:n=e.sent,console.log(n),201===n.status&&(this.suggestionSent=!0,this.suggestionContent="");case 9:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),onSuggestionInputFocused:function(){this.suggestionFocused=!0,this.suggestionSent=!1}},components:{Library:de,SearchBox:Te,SearchStatusPanel:Me}});n("d9eb");De.render=u;var Ge=De,He=n("bc3a"),We=(n("a766"),n("2106")),Ye=n.n(We);Object(r["b"])(Ge).use(Ye.a,He).mount("#app"),console.log=function(){}},d9eb:function(e,t,n){"use strict";n("3a60")},f152:function(e,t,n){"use strict";n("4fe2")},f194:function(e,t,n){},f2a2:function(e,t,n){e.exports=function(){return new Worker(n.p+"b8cfef10690317b01a13.worker.js")}}});
//# sourceMappingURL=app.bda643fa.js.map