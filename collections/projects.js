/**
 * Created by jimmy on 13-11-14.
 */

 allowAll = {
 	insert: function (userId, doc) {
 		return true;
 	},
 	update: function (userId, doc) {
 		return true;
 	},
 	remove: function (userId, doc) {
 		return true;
 	}
 };


 Projects = new Meteor.Collection("projects");

 Projects.allow(allowAll);