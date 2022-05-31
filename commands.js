#!/usr/bin/env node
const {
  performaceSensitiveFunc,
  findDetails

} = require("./index.js");
const program = require('commander');
// version
program
	.version('1.0.0')
	.alias('v')
	.description('Pokemon weight and height finder.')

// find height and weight using limit and offset
program
	.command('list <limit> <offset>')
	.alias('l')
	.description('Find the pokemon\'s average height and weight using limit and offset, and displaying execution time. ')
	.action((limit, offset) => {
			findDetails(limit,offset)
			.then((pokemon)=> {console.info(pokemon);
		console.info(`${pokemon.length} matche(s) `)}).catch( err => ({
      type: err.statusText, payload: err
    }));
		performaceSensitiveFunc(limit, offset);
	})


program.parse(process.argv);