(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{91:function(e,t,n){"use strict";n.r(t);var s=n(6),a=n(0),o=n.n(a),c=n(23),r=n.n(c),i=n(49),u=n(13),l=(n(57),n(19));function m(e){return{type:"SET_HOST",data:e}}function d(e){return{type:"SET_JOIN",data:e}}function j(e){return{type:"SET_GAME_ID",data:e}}var b=n(92),O=n(95),p=n(4);var f={setHost:m,setJoin:d,setGameId:j},h=Object(u.b)((function(e){return{socket:e.socket,host:e.host,join:e.join,gameId:e.gameId,openGames:e.openGames}}),f)((function(e){return Object(a.useEffect)((function(){e.socket&&(e.socket.on("connect",(function(){e.socket.emit("sendUsername",e.username)})),e.socket.on("gameUpdate",(function(t){e.join||e.host||e.setOpenGames(t)})),e.socket.on("onlineCount",(function(t){e.join||e.host||e.setOnlineCount(t)})))}),[e.socket]),Object(p.jsxs)(b.a,{style:{minHeight:"100vh"},children:[Object(p.jsxs)("div",{className:"card float-right mt-5 border-primary ",children:[Object(p.jsx)("div",{className:"card-header bg-primary pr-5 pl-5 text-white",children:"Players in this lobby:"}),Object(p.jsx)("div",{className:"list-group list-group-flush m-3",children:Object.keys(e.openGames).map((function(t,n){var s=e.openGames[t];if((null===s||void 0===s?void 0:s.name)==e.gameId)return s.players.map((function(e,t){var n=s.players[t];return n.socketID==s.hostSocketID?Object(p.jsxs)("div",{className:"mb-3",children:[null===n||void 0===n?void 0:n.name," ",Object(p.jsx)("span",{className:"ml-4 badge badge-secondary p-2",style:{position:"relative",right:"0.5rem"},children:"Host "})," "]}):Object(p.jsxs)("div",{className:"mb-3",children:[" ",null===n||void 0===n?void 0:n.name," "]})}))}))})]}),Object(p.jsx)("h1",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},onClick:function(){e.socket.emit("leaveGame",e.gameId),e.setJoin(0),e.setHost(0),e.setGameId("")},children:"Lobby"})]})}));var E={setSocket:function(e){return{type:"SET_SOCKET",data:e}},setHost:m,setJoin:d,setOpenGames:function(e){return{type:"SET_OPEN_GAMES",data:e}},setOnlineCount:function(e){return{type:"SET_ONLINE_COUNT",data:e}},setGameId:j},y=Object(u.b)((function(e){return{username:e.username,socketURL:e.socketURL,socket:e.socket,host:e.host,join:e.join,openGames:e.openGames,onlineCount:e.onlineCount}}),E)((function(e){return Object(a.useEffect)((function(){e.setSocket(Object(l.io)(e.socketURL))}),[e.socketURL]),Object(a.useEffect)((function(){e.socket&&(e.socket.on("connect",(function(){e.socket.emit("sendUsername",e.username)})),e.socket.on("gameUpdate",(function(t){e.join||e.host||e.setOpenGames(t)})),e.socket.on("onlineCount",(function(t){e.join||e.host||e.setOnlineCount(t)})),e.socket.on("setJoinHost",(function(t){"join"==t?(e.setJoin(!0),e.setHost(!1)):"host"==t&&(e.setHost(!0),e.setJoin(!1),console.log("now host"))})))}),[e.socket]),e.host||e.join?Object(p.jsx)(h,{}):Object(p.jsx)(b.a,{style:{minHeight:"100vh"},children:Object(p.jsxs)("div",{className:"text-center",children:[Object(p.jsxs)(O.a,{variant:"outline-primary",className:"my-4 btn-lg w-50 position-relative",onClick:function(){return e.socket.emit("createGame",e.username),e.setGameId(e.username),void e.setHost(1)},children:["HOST GAME",Object(p.jsxs)("span",{className:"ml-4 badge badge-primary p-2",style:{position:"absolute",top:"50%",right:"0.5rem",transform:"translate(0, -50%)"},children:["Online Players: ",e.onlineCount]})]}),Object(p.jsx)("div",{className:"gameList d-flex flex-column align-items-center",children:Object.keys(e.openGames).map((function(t,n){var s=e.openGames[t];if(s.players.length<s.maxPlayers)return Object(p.jsxs)("div",{className:"w-50 btn btn-outline-secondary my-1 position-relative",onClick:function(){return t=s.name,e.socket.emit("joinGame",t),void e.socket.once("response",(function(n){"200"===n?(e.setGameId(t),e.setJoin(1)):console.log(n)}));var t},children:[s.name,"'s Game",Object(p.jsxs)("span",{className:"ml-4 badge badge-secondary p-2",style:{position:"absolute",top:"50%",right:"0.5rem",transform:"translate(0, -50%)"},children:["Players: ",s.players.length]})," "]},s.socketID)}))})]})})})),g=n(93),v=n(48),k=n(94);var x={setUsername:function(e){return{type:"SET_USERNAME",data:e}}},S=Object(u.b)(null,x)((function(e){return Object(a.useEffect)((function(){var e=function(e){"Enter"!==e.code&&"NumpadEnter"!==e.code||(console.log("Enter key was pressed. Run your function."),e.preventDefault(),document.getElementById("confirmButton").click())};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]),Object(p.jsxs)(b.a,{className:"d-flex justify-content-center align-items-center flex-column",style:{minHeight:"100vh"},children:[Object(p.jsxs)(g.a,{className:"mb-1 w-50",children:[Object(p.jsx)(v.a,{id:"username",placeholder:"Username","aria-label":"Username","aria-describedby":"basic-addon2",autoFocus:!0}),Object(p.jsx)(g.a.Append,{children:Object(p.jsx)(O.a,{id:"confirmButton",variant:"outline-secondary",onClick:function(){var t=document.getElementById("username").value,n=document.getElementById("error");t.length<=0?n.textContent="Please enter a username!":t.length>16?n.textContent="Character limit for your username is 16!":function(){var t=document.getElementById("username").value;t.length>0&&e.setUsername(t)}()},children:"CONFIRM USERNAME"})})]}),Object(p.jsx)(k.a.Label,{className:"text-danger",id:"error"})]})}));var N=Object(u.b)((function(e){return{username:e.username}}),null)((function(e){return e.username?Object(p.jsx)(y,{}):Object(p.jsx)(S,{})})),G={username:"",socketURL:"http://127.0.0.1:80",socket:Object(l.io)(),onlineCount:0,grid:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],host:0,join:0,gameId:"",openGames:{}};var I=Object(i.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USERNAME":return Object(s.a)(Object(s.a)({},e),{},{username:t.data});case"SET_SOCKET":return Object(s.a)(Object(s.a)({},e),{},{socket:t.data});case"SET_CELL":return Object(s.a)(Object(s.a)({},e),{},{grid:e.grid.map((function(e,n){return n!==t.row?e:e.map((function(e,n){return n!==t.col?e:t.state}))}))});case"SET_GRID":return Object(s.a)(Object(s.a)({},e),{},{grid:t.data});case"SET_HOST":return Object(s.a)(Object(s.a)({},e),{},{host:t.data});case"SET_JOIN":return Object(s.a)(Object(s.a)({},e),{},{join:t.data});case"SET_SOCKET_URL":return Object(s.a)(Object(s.a)({},e),{},{socketURL:t.data});case"SET_GAME_ID":return Object(s.a)(Object(s.a)({},e),{},{gameId:t.data});case"SET_OPEN_GAMES":return Object(s.a)(Object(s.a)({},e),{},{openGames:t.data});case"SET_ONLINE_COUNT":return Object(s.a)(Object(s.a)({},e),{},{onlineCount:t.data});default:return e}}));r.a.render(Object(p.jsx)(u.a,{store:I,children:Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(N,{})})}),document.getElementById("root"))}},[[91,1,2]]]);
//# sourceMappingURL=main.987cb494.chunk.js.map