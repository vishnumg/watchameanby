var config = {
	channels : [ "#bot" ],
	server : "irc.freenode.net",
	botName : "watchameanby"
};

var LIMIT = 3;

var irc = require("irc");
var http = require("http");

var bot = new irc.Client(config.server, config.botName, {
	channels : config.channels
});

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
			var defenitions = apiResponse.list;
			for(int i = 0, i<defenitions.length|| i< LIMIT;i++)
			{
				bot.say(from, defenitions[i].definition);
			} 
		});
	}).on('error', function(e) {
		bot.say(from, "Am so dumb");
	});
});
