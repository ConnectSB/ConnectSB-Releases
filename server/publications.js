Meteor.publish('projects', function() {
	return Projects.find({}, {sort: {'name': 1}});
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