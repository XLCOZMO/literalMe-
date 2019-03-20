import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/Collection.js';

Template.mainBody.helpers({
	bookAll(){
		return userDB.find({},{sort:{Likes : -1}});
	}
});
 
Template.mainBody.events({
	'click .js-savebtn'(event, instance){
		var author = $("#AddBook input[name='author']").val();
		var title = $("#AddBook input[name='title']").val();
		var Cover = $("#AddBook input[name='Cover']").val();
		var Description = $("AddBook input[name='Description']").val();
		$("#AddBook input[name='author']").val("");
		$("#AddBook input[name='title']").val("");
		$("#AddBook input[name='Cover']").val("");
		$("#AddBook input[name='Description']").val("");
		$("#AddBook").modal("hide");
		userDB.insert({'author':author, 'Title': title, 'Cover':Cover, 'Description': Description, 'Likes':0, 'Dislikes':0});
	},   
	
	'click .js-likes'(event, instance){
		var likes = userDB.findOne({'_id':this._id}).Likes;
		if(!likes){
			likes=0;
		}
		likes++;
		userDB.update({'_id':this._id},{$set:{'Likes':likes}});
	},

	'click .js-dislikes'(event, instance){
		var dislikes = userDB.findOne({'_id':this._id}).Dislikes;
		if(!dislikes){
			dislikes=0;
		}
		dislikes++;
		userDB.update({'_id':this._id},{$set:{'Dislikes':dislikes}});
	},

	'click .js-edit'(event, instance){
		var modalname = "#editBook" + this._id;
		var author = $(modalname + " input[name='author']").val();
		var title = $(modalname + " input[name='title']").val();
		var Cover = $(modalname + " input[name='Cover']").val();
		var Description = $(modalname + " input[name='Description']").val();

		if(author==undefined || author==""){
			author = this.author;
		}
		if(title==undefined || title==""){
			title = this.Title;
		}
		if(Cover==undefined || Cover==""){
			Cover = this.Cover;
		}
		if(Description==undefined || Description==""){
			Description = this.Description;
		}

		$(modalname + " input[name='author']").val("");
		$(modalname + " input[name='title']").val("");
		$(modalname + " input[name='Cover']").val("");
		$(modalname + " input[name='Description']").val("");
		$(modalname).modal("hide");
		userDB.update({'_id':this._id}, {$set:{'author':author, 'Title': title, 'Cover':Cover, 'Description': Description}});
	},

	'click .js-delete'(event, instance){
		var profId = this._id;
		$('#'+ profId).fadeOut('slow',function(){
			userDB.remove({_id: profId});
		});	
	}
});