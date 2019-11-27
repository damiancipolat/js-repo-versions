#!/usr/bin/env node
const program = require('commander');

const {
	runCmd
} = require('./controller/cmd.js');

const {
	runServer
} = require('./controller/server.js');

//Define program options.
program
	.option('-w, --web' , 'Start a webserver to show the report dashboard.')
	.option('-p, --port [port]', 'Define webserver listen port.')
	.option('-i, --ip   [ip]', 'Define webserver listen ip address.');

//Parse parameters using commander.
program.parse(process.argv);

if (program.web){

	//Set ip / port values.
	const IP   = (typeof(program.ip)==='string')?program.ip:'127.0.0.1';
	const PORT = (typeof(program.port)==='string')?program.port:8080;

	//Start server.
	runServer(IP,PORT);

} else
	runCmd();