(function () {
	console.log("setting up signalr methods inside the self executing method");

	var app = {};
	app.signalr = {
		connection: {},
		configure: function ()
		{
			console.log("app.signalr.configure was called");

			var connection = new signalR.HubConnectionBuilder().withUrl("/notificationHub").build();
			this.connection = connection;

			connection.start()
				.then(function () {
					console.log('[signal-r] connected');

					//below should be anything that needs to get done right after connecting to the signal-r
					//example: automatically connect to signal-r groups 


				})
				.catch(function(err) {
					return console.error(err.toString());
				});


			//define the methods that the server can invoke
			connection.on('ReceiveServerMessage', function(serverMessage) {
				console.log('[server message received] ', serverMessage);

				$("#incoming-messages").prepend("<li>" + serverMessage + "</li>");
			});
		},
		sendNewMessage: function (newMessageText) {
			console.log("sending out new message to server. Message: ", newMessageText);

			var connection = this.connection;

			connection.invoke("ClientMessageReceived", newMessageText).catch(err => console.error(err.toString()));

		}
	};

	//set the app to a window variable
	window.app = app;
})();


$(document).ready(function () {
	console.log("document.ready called");

	var app = window.app;
	app.signalr.configure();

	//app.signalr = {
	//	configure: function () {
	//		console.log("app.signalr.congfigure was called");

	//		/*var connection = new signalR.HubConnectionBuilder().withUrl("/notificationHub").build();

	//		connection.start()
	//			.then(function () {
	//				console.log('[signal-r] connected');

	//				//below should be anything that needs to get done right after connecting to the signal-r
	//				//example: automatically connect to signal-r groups 


	//			})
	//			.catch(function(err) {
	//				return console.error(err.toString());
	//			});


	//		//define the methods that the server can invoke
	//		connection.on('ReceiveServerMessage', function(serverMessage) {
	//			console.log('[server message received] ', serverMessage);
	//		});*/
	//	}

	//};
});


$(document).on("click", "#send-button", function() {
	var newText = $("#new-message").val();

	//call the method to send out the message
	window.app.signalr.sendNewMessage(newText);

	//reset input
	$("#new-message").val('');
});