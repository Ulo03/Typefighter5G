(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{91:function(e,t,n){},93:function(e,t,n){"use strict";n.r(t);var a=n(7),s=n(0),c=n.n(s),o=n(23),r=n.n(o),i=n(50),l=n(8),d=(n(58),n(24));function m(e){return{type:"SET_HOST",data:e}}function u(e){return{type:"SET_JOIN",data:e}}function j(e){return{type:"SET_GAME_ID",data:e}}function b(e){return{type:"SET_OPEN_GAMES",data:e}}var O=n(94),p=n(96),h=n(49),g=n(98),v=n(95),f=n(48),x=n(1);var y=Object(l.b)((function(e){return{openGames:e.openGames,gameId:e.gameId}}),{})((function(e){return Object(x.jsxs)(O.a,{style:{minWidth:"50vw"},className:"d-flex align-items-center flex-column text-center mt-5",children:[Object(x.jsx)("h3",{children:"Last Game"}),Object(x.jsx)("div",{className:"",children:e.openGames[e.gameId].grid.map((function(e,t){return Object(x.jsx)(v.a,{children:e.map((function(e,t){var n;return Object(x.jsx)(f.a,{className:"rescol ".concat(null===(n=e.player)||void 0===n?void 0:n.color),children:"\xa0"})}))})}))})]})}));var E={setHost:m,setJoin:u,setGameId:j},N=Object(l.b)((function(e){return{socket:e.socket,host:e.host,join:e.join,gameId:e.gameId,openGames:e.openGames}}),E)((function(e){var t,n,a;return Object(x.jsxs)(O.a,{className:"d-flex flex-column align-items-center mt-3",children:[Object(x.jsx)("h1",{children:e.gameId}),Object(x.jsxs)("div",{className:"card mt-4 border-primary w-25 mb-2",children:[Object(x.jsx)("div",{className:"card-header bg-primary text-white text-center py-2",children:"Players in this lobby:"}),Object(x.jsx)("div",{className:"list-group ml-2 my-1",children:null===(t=e.openGames[e.gameId])||void 0===t?void 0:t.players.map((function(t,n){var a,s=null===(a=e.openGames[e.gameId])||void 0===a?void 0:a.players[n];return s.socketID==e.openGames[e.gameId].hostSocketID?Object(x.jsxs)("div",{className:"my-1",children:[Object(x.jsx)("span",{className:"badge badge-light p-2 ".concat(s.color),children:s.name}),Object(x.jsx)("span",{className:"badge badge-secondary p-2 float-right",style:{position:"relative",right:"0.5rem"},children:"Host"})]}):Object(x.jsx)("div",{className:"my-1",children:Object(x.jsx)("span",{className:"badge badge-light p-2 ".concat(s.color),children:s.name})})}))})]}),e.host&&(null===(n=e.openGames[e.gameId])||void 0===n?void 0:n.players.length)>=2?Object(x.jsx)(g.a,{onClick:function(){e.socket.emit("startGame",e.gameId)},id:"startButton",variant:"outline-success",className:"w-25 mt-2",children:"Start Game"}):"",Object(x.jsx)(g.a,{variant:"outline-danger",onClick:function(){e.socket.emit("leaveGame",e.gameId),e.setJoin(0),e.setHost(0),e.setGameId("")},className:"w-25 mt-2",children:"Leave Game"}),(null===(a=e.openGames[e.gameId])||void 0===a?void 0:a.ended)?Object(x.jsx)(y,{}):""]})}));n(91);var I={setOpenGames:b},k=Object(l.b)((function(e){return{openGames:e.openGames,gameId:e.gameId,socket:e.socket}}),I)((function(e){return Object(s.useEffect)((function(){e.socket.on("objects",(function(t){e.setOpenGames(t)}))})),Object(x.jsxs)(O.a,{style:{minHeight:"100vh",minWidth:"100vw"},className:"m-0 d-flex align-items-center justify-content-between",children:[Object(x.jsx)("div",{className:"w-85 mx-5",children:e.openGames[e.gameId].grid.map((function(e,t){return Object(x.jsx)(v.a,{children:e.map((function(e,t){var n;return Object(x.jsx)(f.a,{className:"gamecol ".concat(null===(n=e.player)||void 0===n?void 0:n.color),children:e.word})}))})}))}),Object(x.jsxs)("div",{className:"chat mx-5",children:[Object(x.jsxs)("div",{className:"scores",children:[Object(x.jsx)("div",{className:"mb-2",children:"SCORES"}),Object(x.jsx)("div",{children:e.openGames[e.gameId].players.map((function(e,t){return Object(x.jsxs)("div",{className:"text-left my-1 p-3 badge w-100 ".concat(e.color),children:[Object(x.jsx)("span",{children:e.name}),Object(x.jsxs)("span",{className:"float-right",children:[e.score," / 5"]})]})}))})]}),Object(x.jsx)("div",{className:"control",children:Object(x.jsx)("input",{onKeyUp:function(t){"Enter"===t.key&&(e.socket.emit(e.gameId+":words",document.getElementById("wordInput").value),console.log(document.getElementById("wordInput").value),document.getElementById("wordInput").value="",console.log(document.getElementById("wordInput").value))}.bind(this),id:"wordInput",autoFocus:!0,placeholder:"Enter a word...",type:"text",className:"w-100"})})]})]})}));var G={setSocket:function(e){return{type:"SET_SOCKET",data:e}},setHost:m,setJoin:u,setOpenGames:b,setOnlineCount:function(e){return{type:"SET_ONLINE_COUNT",data:e}},setGameId:j},S=Object(l.b)((function(e){return{username:e.username,socketURL:e.socketURL,socket:e.socket,host:e.host,join:e.join,openGames:e.openGames,onlineCount:e.onlineCount,gameId:e.gameId}}),G)((function(e){var t;return Object(s.useEffect)((function(){e.setSocket(Object(d.io)(e.socketURL))}),[e.socketURL]),Object(s.useEffect)((function(){e.socket&&(e.socket.on("connect",(function(){e.socket.emit("sendUsername",e.username)})),e.socket.on("gameUpdate",(function(t){e.join||e.host||e.setOpenGames(t)})),e.socket.on("onlineCount",(function(t){e.join||e.host||e.setOnlineCount(t)})),e.socket.on("setJoinHost",(function(t){"join"==t?(e.setJoin(!0),e.setHost(!1)):"host"==t&&(e.setHost(!0),e.setJoin(!1),console.log("now host"))})))}),[e.socket]),e.host||e.join?(null===(t=e.openGames[e.gameId])||void 0===t?void 0:t.started)?Object(x.jsx)(k,{}):Object(x.jsx)(N,{}):Object(x.jsx)(O.a,{style:{minHeight:"100vh"},children:Object(x.jsxs)("div",{className:"text-center",children:[Object(x.jsx)("div",{className:"d-flex flex-column align-items-center",children:Object(x.jsxs)(p.a,{className:"w-50 d-flex align-items-center",children:[Object(x.jsx)(h.a,{id:"gameName",placeholder:"Name your Lobby...","aria-label":"Name your Lobby...","aria-describedby":"basic-addon2",autoFocus:!0}),Object(x.jsx)(p.a.Append,{children:Object(x.jsxs)(g.a,{id:"createGameBtn",variant:"outline-primary",className:"my-4 position-relative",onClick:function(){return function(){var t=document.getElementById("gameName");if(t.value){var n=t.value;e.socket.emit("createGame",n),e.socket.once("response",(function(t){"200"===t?(e.setGameId(n),e.setHost(1)):alert(t)}))}}()},children:["HOST GAME",Object(x.jsxs)("span",{className:"ml-4 badge badge-primary p-1",children:["Online Players: ",e.onlineCount]})]})})]})}),Object(x.jsx)("div",{className:"gameList d-flex flex-column align-items-center",children:Object.keys(e.openGames).map((function(t,n){var a=e.openGames[t];if(a.players.length<a.maxPlayers)return Object(x.jsxs)("div",{className:"w-50 btn btn-outline-secondary my-1 position-relative",onClick:function(){return t=a.name,e.socket.emit("joinGame",t),void e.socket.once("response",(function(n){"200"===n?(e.setGameId(t),e.setJoin(1)):alert(n)}));var t},children:[a.name,Object(x.jsxs)("span",{className:"ml-4 badge badge-secondary p-2",style:{position:"absolute",top:"50%",right:"0.5rem",transform:"translate(0, -50%)"},children:["Players: ",a.players.length]})," "]},a.socketID)}))})]})})})),w=n(97);var C={setUsername:function(e){return{type:"SET_USERNAME",data:e}}},T=Object(l.b)(null,C)((function(e){return Object(s.useEffect)((function(){console.log("login");var e=function(e){console.log("enterListener event"),"Enter"!==e.code&&"NumpadEnter"!==e.code||(console.log("Enter key was pressed. Run your function."),e.preventDefault(),document.getElementById("confirmButton").click())};return document.addEventListener("keydown",e),console.log("enterListener added"),function(){document.removeEventListener("keydown",e),console.log("enterListener removed")}}),[]),Object(x.jsxs)(O.a,{className:"d-flex justify-content-center align-items-center flex-column",style:{minHeight:"100vh"},children:[Object(x.jsxs)(p.a,{className:"mb-1 w-50",children:[Object(x.jsx)(h.a,{id:"username",placeholder:"Username","aria-label":"Username","aria-describedby":"basic-addon2",autoFocus:!0}),Object(x.jsx)(p.a.Append,{children:Object(x.jsx)(g.a,{id:"confirmButton",variant:"outline-secondary",onClick:function(){var t=document.getElementById("username").value,n=document.getElementById("error");t.length<=0?n.textContent="Please enter a username!":t.length>16?n.textContent="Character limit for your username is 16!":function(){var t=document.getElementById("username").value;t.length>0&&e.setUsername(t)}()},children:"CONFIRM USERNAME"})})]}),Object(x.jsx)(w.a.Label,{className:"text-danger",id:"error"})]})}));var _=Object(l.b)((function(e){return{username:e.username}}),null)((function(e){return e.username?Object(x.jsx)(S,{}):Object(x.jsx)(T,{})})),L={username:"",socketURL:"http://127.0.0.1",socket:Object(d.io)(),onlineCount:0,host:0,join:0,gameId:"",openGames:{}};var U=Object(i.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USERNAME":return Object(a.a)(Object(a.a)({},e),{},{username:t.data});case"SET_SOCKET":return Object(a.a)(Object(a.a)({},e),{},{socket:t.data});case"SET_HOST":return Object(a.a)(Object(a.a)({},e),{},{host:t.data});case"SET_JOIN":return Object(a.a)(Object(a.a)({},e),{},{join:t.data});case"SET_SOCKET_URL":return Object(a.a)(Object(a.a)({},e),{},{socketURL:t.data});case"SET_GAME_ID":return Object(a.a)(Object(a.a)({},e),{},{gameId:t.data});case"SET_OPEN_GAMES":return Object(a.a)(Object(a.a)({},e),{},{openGames:t.data});case"SET_ONLINE_COUNT":return Object(a.a)(Object(a.a)({},e),{},{onlineCount:t.data});default:return e}}));r.a.render(Object(x.jsx)(l.a,{store:U,children:Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(_,{})})}),document.getElementById("root"))}},[[93,1,2]]]);
//# sourceMappingURL=main.12846e2c.chunk.js.map