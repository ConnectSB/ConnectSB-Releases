Meteor.publish('projects', function() {
	return Projects.find({});
});

Meteor.publish('projectForId', function(id) {
	return Projects.find(id);
});

Meteor.publish('releases', function() {
	return Releases.find({});
});

Meteor.publish('releasesForProjectWithId', function(id) {
	return Releases.find({projectId: id});
});

Meteor.publish('themes', function() {
	return Themes.find({});
});