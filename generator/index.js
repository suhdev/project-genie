var readline = require('readline'),
	mkdir = require('mkdirp');

function proxy(fn,ctx){
	return function(){
		return fn.apply(ctx,arguments);
	}
}

var Generator = function(){
	this.tasks = [];
	this.completions = [];
	this.currentTask = null;
	this.rl = null;
	this.init();
};

Generator.prototype = {
	init:function(){
		this.rl = readline.createInterface({
		  input: process.stdin,
		  output: process.stdout,
		  completer:proxy(this.completer,this)
		});
	},
	next:function(){
		if (this.currentTask){
			this.currentTask.before();
			this.rl.question(this.currentTask.getPrompt(),
				proxy(this.callback,this));
		}else if (this.tasks.length > 0){
			this.skip();
		}else {
			console.log('done');
			this.rl.close();
		}
	},
	completer:function(line){
		if (this.currentTask.hasOnComplete()){
			return this.currentTask.onComplete(line);
		}
		if (!this.currentTask.hasCompletions()){
			return [];
		}
		var completions = this.currentTask.getCompletions();
	  	var hits = completions.filter(function(c){
	  		return c.indexOf(line) == 0;
	  	});
	  	return [hits.length?hits: completions, line];
	},
	skip:function(){
		this.currentTask = this.tasks.shift();
		this.next();
	},
	callback:function(answer){
		var a = answer.trim();
		if (answer && answer.trim() !== ""){
			this.currentTask.execute(answer,this);
		} else {
			if (this.currentTask.hasDefault()){
				this.currentTask.execute(this.currentTask.getDefault(),this);
			}else if (!this.currentTask.isDone()){
				this.currentTask.next();
			}else{
				this.skip();
			}
		}
		this.next();
	},
	register:function(task){
		this.tasks.push(task);
	}
};
module.exports = Generator;