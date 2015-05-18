var Task = require('../task'),
	mkdir = require('mkdirp'),
	fs = require('fs');
var GulpTask = function(){
	var self = this;
	this.template = '';
	this.gulpfile = null;
	this.writer = null;
	this.srcDirs = [];
	this.testDirs = [];
	Task.call(this,'gulp',[
		{
			init:function(task){
				task.setPrompt('Do you need gulp support (Y/n) [n]? ')
					.setCompletions(['Y','N','y','n','yes','no'])
					.setDefault('n');
			},
			execute:function(answer,task,gen){
				var a = answer.trim().toLowerCase(); 
				if (a !== 'y' && a !== 'yes'){
					gen.skip();
					return;
				}
				task.next();
			}

		},{
			init:function(task){
				task.setDefault('./')
					.setCompletions([])
					.setPrompt('Enter location of gulpfile.js [./]:');
			},
			execute:function(answer,task,gen){
				var path = answer.trim().charAt(answer.length-1) === '/'?answer.trim():answer.trim()+'/';
				self.gulpfile = path+'gulpfile.js';
				fs.writeFileSync(self.gulpfile,'');
				fs.readFile(__dirname+'/gulp.template.js',function(err,data){
					if (err){
						console.log(err);
						return;
					}
					console.log(data.toString());
				});
				// self.writer = fs.createWriteStream(self.gulpfile);
				// self.writer.write()
				task.next();
			}
		},{
			before:function(task){
				console.log('Enter your source folders, one folder per line: ');
			},
			init:function(task){
				task.setDefault(null)
					.setPrompt('> ');
			},
			execute:function(answer,task,gen){
				self.srcDirs.push(answer.trim().toLowerCase());
			}
		},{
			before:function(task){
				console.log('Enter your test folders, one folder per line: ');
			},
			init:function(task){
				task.setDefault(null)
					.setPrompt('> ');
			},
			execute:function(answer,task,gen){
				self.testDirs.push(answer.trim().toLowerCase());
			}
		},{
			before:function(task){
				console.log('What tasks do you want to include?');
			},
			init:function(task){
				task.setDefault(null)
					.setCompletions(['ngdocs','concat-source','concat-lib','jasmine','karma','watch','dev','production'])
					.setPrompt('> ');
			},
			execute:function(answer,task,gen){
				var a = answer.trim().toLowerCase();
				switch(a){
					case 'ngdocs':
					fs.appendFileSync(self.gulpfile,'');
					break;
					case 'concat-source':

					break;
				}
			},
		}
	]);
};
Task.extend(GulpTask);
GulpTask.prototype.end = function(){

};

module.exports = GulpTask;