/** 
 * @namespace ProjectGenie
 * @description
 * Project Genie Module
 */
var generator = require('./src/generators/basic'),
	task = require('./src/tasks/basic'),
	folderTask = require('./src/tasks/folder'),
	gulpTask = require('./src/tasks/gulp'),
	npmTask = require('./src/tasks/npm'),
	bowerTask = require('./src/tasks/bower');
	
 // var basicGen = new Generator();
 // basicGen.register(new BowerTask());
 // basicGen.register(new FolderTask());
 // basicGen.register(new GulpTask());
 // basicGen.next();


module.exports = { 
	Generator:generator,
	Task:task,
	/**
	 * @namespace ProjectGenie.Tasks
	 * @name ProjectGenie.Tasks
	 * @description
	 * Contains implementations of a set of basic tasks 
	 */
	Tasks:{
		NpmTask:npmTask,
		BowerTask:bowerTask,
		GulpTask:gulpTask,
		FolderTask:folderTask
	}
};