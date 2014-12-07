var config = {
	channels : [ "#snowcircles" ],
	server : "irc.freenode.net",
	botName : "watchameanby"
};
// Get the lib
var irc = require("irc");
var http = require("http");

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
	channels : config.channels
});
// Listen for any message, PM said user when he posts
bot.addListener("message", function(from, to, text, message) {
	var url = 'http://api.urbandictionary.com/v0/define?term=' + text;
	console.log(message);
	console.log(text);

	http.get(url, function(res) {
		var body = '';

		res.on('data', function(chunk) {
			body += chunk;
		});

		res.on('end', function() {
			var apiResponse = JSON.parse(body)
			console.log(body);
			try {
				bot.say(from, apiResponse.list[0].definition);
				bot.say(from, apiResponse.list[1].definition);
			} catch (err) {

			}

		});
	}).on('error', function(e) {
		bot.say(from, "Am so dumb");
	});
});