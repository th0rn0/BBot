const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid')

const adapter = new FileSync('db.json');
const db = low(adapter);

var capitalize = require('capitalize')
var array = {};

// TODO - Th0rn0's ID for admin
var adminId = '119054162016206848';


var nextEvent = 'none';
var nextEventAttendees = [];

array['salt'] = 0;

client.on('ready', () => {
	console.log('I am ready!');
	client.user.setActivity('Yorkshire Tea');
});

// Database Defaults
db.defaults({ events: [], signups: [] }).write();
// Set some defaults
// db.defaults({ posts: [], user: {} })
//   .write()


client.on('message', message => {

	// Return if message if from the bot
	if (message.author.bot) return;

	// Messages
	if (message.content.toLowerCase() == 'wat') {
		message.channel.send('wot');
	}

	if (message.content.toLowerCase() == 'russian' || message.content.toLowerCase() == 'russia') {
		message.channel.send('A nu cheeki breeki iv damke.');
		message.channel.send('https://www.youtube.com/watch?v=BnTW6fZz-1E');
	}

	// Group buy functions
	if (message.content.toLowerCase() == '!groupbuy') {
		message.channel.send('inc soon fella fuck thi');
	}

	// Event Functions
	if (message.content.startsWith('!nextevent')) {
		message.channel.send(nextEvent);
	}

	if (message.content.startsWith('!signmeup')) {
		if (nextEventAttendees.indexOf(message.author.id) == -1) {
			nextEventAttendees.push(message.author.id);
			db.get('signups')
			  .push({ id: shortid.generate(), discord_id: message.author.id, event_id: null})
			  .write();
			message.channel.send('Signed up');
		} else {
			message.channel.send('You are already signed up to this event');
		}

	}

	if (message.content.startsWith('!listevents')) {
		events = db.get('events')
		  .value();
		for (index = 0; index < events.length; ++index) {
			console.log(events[index]);
	 		// message.channel.send(events[index][name]);
		}
	 	// message.channel.send(events);
	}

	if (message.content.startsWith('!signedup')) {
		for (index = 0; index < nextEventAttendees.length; ++index) {
			var user = message.guild.members.get(nextEventAttendees[index]);
			var name = user.user.username;
			if (user.nickname != null) {
				name = user.nickname;
			}
		    message.channel.send(name);
		}
	}

	// Admin functions
	if (message.author.id == adminId) {
		if (message.content.startsWith('!setevent')) {
			nextEvent = message.content.split('!setevent ', 2)[1];
			db.get('events')
			  	.push({
			  		id: shortid.generate(),
			  		name: message.content.split('!setevent ', 2)[1]
	  			})
			 	.write();
			message.channel.send('Event Set: ' + nextEvent);
		}
	}
	// DEBUG
	// console.log(client.users.get(adminId));
	// console.log(message.author);
	// console.log(message.guild.members.get(nextEventAttendees[index]).nickname);

});

client.login(auth.token);