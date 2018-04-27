const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

var capitalize = require('capitalize')
var array = {};
var joshMute = false;

array['salt'] = 0;

client.on('ready', () => {
	console.log('I am ready!');
	client.user.setActivity('Yorkshire Tea');
});

// Database Defaults
// Set some defaults
// db.defaults({ salts: []}).write();
// Set some defaults
// db.defaults({ posts: [], user: {} })
//   .write()


client.on('message', message => {

	if (message.content.toLowerCase() == 'wat') {
		message.channel.send('wot');
	}
	// DEBUG
	// console.log(message.author);
});

client.login(auth.token);