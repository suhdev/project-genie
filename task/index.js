var _ = require('underscore');
var Task = function(id,stages){
	this.id = id;
	this.prompt = null;
	this.currentStage = null;
	this.completions = [];
	this.stages = stages||[]; 
	this.def = null;
	this.next();
};

/**
 * stage = {
 	init:function(Task t){
		t.prompt = 
 	},
	before:{
		$default:'value'
		fn:
	},
	execute:{
		$default:
		fn:
	},
	after:{
		fn:
	}

 }
 * 
 *
 */
Task.prototype = {
	addStage:function(stage){
		this.stages.push(stage);
	},
	getId:function(){
		return this.id;
	},
	hasDefault:function(){
		return this.def;
	},
	hasBefore:function(){
		return this.currentStage.before;
	},
	before:function(gen){
		if (this.hasBefore()){
			this.currentStage.before(this,gen);
			this.currentStage.before = null;
		}
	},
	hasCompletions:function(){
		return (this.completions && this.completions.length > 0);
	},
	setCompletions:function(comps){
		this.completions = comps;
		return this;
	},
	hasOnComplete:function(){
		return this.currentStage.complete;
	},
	onCompletion:function(line){
		if (this.currentStage.complete){
			this.currentStage.complete(line,this);
		}
	},
	getCompletions:function(){
		return this.completions;
	},
	getDefault:function(){
		return this.def;
	},
	setDefault:function(d){
		this.def = d;
		return this;
	},
	setPrompt:function(prompt){
		this.prompt = prompt;
		return this;
	},
	getPrompt:function(){
		return this.prompt;
	},
	next:function(){
		if (this.stages.length > 0){
			this.currentStage = this.stages.shift();
			this.currentStage.init(this);
		}
	},
	isDone:function(){
		return this.stages.length === 0;
	},
	execute:function(answer,gen){
		if (this.currentStage){
			if (this.currentStage.execute){
				this.currentStage.execute(answer,this,gen);
			}
			if (this.currentStage.after){
				this.currentStage.after(this,gen);
			}
		}else if (this.stages.length > 0){
			this.next();
		}else {
			gen.skip();
		}
	},
};

Task.extend = function(cstr){
	cstr.prototype = Task.prototype;
	cstr.prototype.constructor = Task;
};

Task.create = function(cstr,prototype){
	cstr.prototype = _.extend({},prototype,Task.prototype);
	cstr.prototype.constructor = Task;

}

module.exports = Task;