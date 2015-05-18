var Task = require('../task'),
	mkdir = require('mkdirp');
var FolderTask = function(){
	Task.call(this,'folder',[{
		init:function(task){
			task.setPrompt('Please enter a folder structure i.e. src/app/services: ');
		},
		execute:function(answer,task,gen){
			mkdir(answer.trim());
			task.setPrompt('> ');			
		}
	}]);
};
Task.extend(FolderTask);

module.exports = FolderTask;