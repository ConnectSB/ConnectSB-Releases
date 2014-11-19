/**
 * Created by jimmy on 13-11-14.
 */
 Router.map(function() {
    this.route('home', {
        path: '/',
        waitOn: function() {
            return [
            Meteor.subscribe('projects'),
            Meteor.subscribe('releases'),
            Meteor.subscribe('themes')
            ]
        },
        data: function() {
            return Projects.find({});
        }
    });

    this.route('createProject', {
        path: '/create-project',
        waitOn: function() {
            return Meteor.subscribe('themes')
        }
    });

    this.route('editProject', {
        path: '/edit-project/:id',
        waitOn: function() {
            Meteor.subscribe('projectForId', this.params.id),
            Meteor.subscribe('releasesForProjectWithId', this.params.id),
            Meteor.subscribe('themes')
        },
        data: function() {
            Session.set('uniqueProjectId', this.params.id);
            return Projects.findOne({_id: this.params.id});
        }
    })
});

 Router.onBeforeAction('loading');

 Router.configure({
    layoutTemplate: "main"
});