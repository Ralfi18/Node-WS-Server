const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const options = { cors: { origin: "*" } };
const io = new Server(server, options);
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = "someHash";
// const yourPassword = "someRandomPasswordHere";

app.use(cors({
	origin: [
		"http://localhost:3001", 
		"http://localhost:3000"
	] 	
}));

app.get("/", (req, res) => {
	res.send("<h1>TEST SERVER</h1>");
});

app.get("/create-pass", (req, res) => {
	return false;
	const yourPassword  = req.query.password;

	if(yourPassword) {
		bcrypt.genSalt(saltRounds, (err, salt) => {
		    bcrypt.hash(yourPassword, salt, (err, hash) => {
		        // Now we can store the password hash in db.
		        res.send("<p>password: "+hash+"</p>");
		    });
		});
	}
});


app.get("/get-user", (req, res) => {
	let user = null;
	if(req.query.username && req.query.password) {
		const con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "cr00n",
		  	database: "react-sockets"	
		});
		con.connect(function(err) {
			if (err) {
				// console.error('error connecting: ' + err.stack);
				return null;
			}	
			// console.log("Connected!");
			con.query("SELECT * FROM users WHERE email = ?", [req.query.username.trim()], function (err, result, fields) {
				if (err) throw err;
				// console.log(result.length)
				if(result && result.length) {
					
					// console.log(result)
					bcrypt.compare(req.query.password, result[0].password, function(err, response) {
						// console.log(response)
			  			if(response == true) {
			  				const token = jwt.sign({
							  exp: Math.floor(Date.now() / 1000) + (60 * 60),
							  data: 'foobar'
							}, secret);
							con.query("UPDATE users SET token = ? WHERE id= ? LIMIT 1", [token, result[0].id], function (err, result, fields) {
								console.log(err, result)
							})	
			  				user = {
								loggedIn: true,
								data: {
									id: result[0].id,
									name: result[0].first_name + " " + result[0].last_name,
									email: result[0].email,
									token
								}
							}
							console.log( user )
							res.json(user);
			  			} else {
			  				res.json(user);
			  			}
					})
				} else {
					res.json(user);
				}
			});
		});
	} 
	// res.json(user);
});

io.on("connection", (socket) => {
	console.log("new connection");
  	socket.on("disconnect", (reason) => {
  		console.log(reason)
  	});	

  	socket.on("message", function(data) {
  		console.log("data: ", data)
  		// verify a token symmetric - synchronous
		var decoded = jwt.verify(data.token, secret);

		console.log(decoded) // bar

  		console.log(socket.id + ": " + data.msg);

	    //io.emit("message", msg); // Send message to sender
	    socket.broadcast.emit("message", data.msg); // Send message to everyone BUT sender
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
