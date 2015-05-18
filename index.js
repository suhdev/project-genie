var Generator = require('./generator'),
	FolderTask = require('./tasks/folder'),
	GulpTask = require('./tasks/gulp'),
	BowerTask = require('./tasks/bower');
	
 var basicGen = new Generator();
 basicGen.register(new BowerTask());
 basicGen.register(new FolderTask());
 basicGen.register(new GulpTask());
 basicGen.next();
