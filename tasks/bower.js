var bower = require('bower'),
	Task = require('../task'),
	fs = require('fs');

var BowerTask = function(){
	Task.call(this,'bower',[{
		init:function(task){
			task.setDefault('./components')
				.setPrompt('Set the path to your libraries [./components]: ');
		},

		execute:function(answer,task,gen){
			var obj = {
				directory:answer.trim(),
				timeout:12000
			};
			fs.writeFileSync('./.bowerrc',JSON.stringify(obj));
			task.next();
		}
	},{
		before:function(task){
			console.log('Please enter the libraries you wish to install, one library per line:');
		},
		init:function(task){
			task.setDefault(null)
				.setPrompt('> ');
		},
		execute:function(answer,task,gen){
			bower.commands
				.search(answer.trim(),{})
				.on('end',function(results){
					if (results.length > 0){
						bower.commands.install([results[0].name])
							.on('end',function(installed){
								// console.log(results[0].name+' has been installed');
							});
					}
				});
			task.setDefault(null)
				.setPrompt('> ');
		}
	}]);
};

Task.extend(BowerTask);
module.exports = BowerTask;