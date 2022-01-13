const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const options = { cors: { origin: "*" } };
const io = new Server(server, options);
const cors = require("cors");
const mysql = require("mysql");

app.use(cors({
	origin: [
		"http://localhost:3001", 
		"http://localhost:3000"
	] 	
}));

app.get("/", (req, res) => {
	res.send("<h1>TEST SERVER</h1>");
});

app.get("/get-user", (req, res) => {
	let user = null;
	if(req.query.username && req.query.password) {
		const con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "cr00n",
		  	database: "mydb"	
		});
		con.connect(function(err) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}	
			console.log("Connected!");
			con.query("SELECT * FROM users", function (err, result, fields) {
				if (err) throw err;
				console.log(result);
			});
		});
		if(req.query.username == "rali" && req.query.password == "123") {
			user = {
				loggedIn: true,
				data: {
					id: "1",
					name: "Rali Dimitrov",
					email: "rali@mail.com"
				}
			}
		}
		if(req.query.username == "magi" && req.query.password == "123") {
			user = {
				loggedIn: true,
				data: {
					id: "1",
					name: "Magi Dimitrova",
					email: "magi@mail.com"
				}
			}
		}
	} 
	res.json(user);
});

io.on("connection", (socket) => {
	console.log("new connection");
  	socket.on("disconnect", (reason) => {
  		console.log(reason)
  	});	

  	socket.on("message", function(msg) {
  		console.log(socket.id + ": " + msg);
	    //io.emit("message", msg); // Send message to sender
	    socket.broadcast.emit("message", msg); // Send message to everyone BUT sender
  	});
});


server.listen(8080, () => {
	console.log( "listen on port *:8080" );
});

// const options = { cors: { origin: "*" } };
// const io = require("socket.io")(options);
// io.on("connection", (socket) => {
// 	console.log("connection", socket.id)
// });
// io.listen(8080);


// const httpServer = require("http").createServer();
// const options = { /* ... */ };
// const io = require("socket.io")(httpServer, options);
// io.on("connection", socket => { /* ... */ });
// httpServer.listen(3000);
