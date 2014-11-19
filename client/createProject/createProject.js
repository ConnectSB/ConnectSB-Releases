/**
 * Created by jimmy on 13-11-14.
 */

 Template.createProject.rendered = function() {
    var uniqueProjectId = new Meteor.Collection.ObjectID()._str;
    Session.set('uniqueProjectId', uniqueProjectId);
    Meteor.subscribe('releasesForProjectWithId', uniqueProjectId);
};

Template.createProject.destroyed = function() {
    var projectId = Session.get('uniqueProjectId');
    var releases = Releases.find({'projectId': projectId}).fetch();
    var project = Projects.findOne(projectId);

    if (!project) {
        _.each(releases, function(release, index) {
            Releases.remove(release._id);
        });
    }
}

Template.createProject.helpers({
    releases: function() {
        return Releases.find({
            projectId: Session.get('uniqueProjectId')
        }).fetch();
    }
});

Template.createProject.events({
    'submit #createProjectForm': function(event) {
        event.preventDefault();
        var projectName = $('#projectName').val();

        Projects.insert({
            _id: Session.get('uniqueProjectId'),
            name: projectName
        });

        // Update all releases
        var releaseWindows = $('.createReleaseWindow');

        _.each(releaseWindows, function(value, index) {
            var releaseId = $(value).data('release-id');
            var releaseDate = $($(value).find('input.releaseDate')[0]).val();
            var liveDate = $($(value).find('input.liveDate')[0]).val();
            var description = $($(value).find('input.description')[0]).val();

            updateData = {};

            if (releaseDate) {
                updateData.releaseDate = releaseDate;
            }

            if (liveDate) {
                updateData.liveDate = liveDate;
            }

            if (description) {
                updateData.description = description;
            }

            Releases.update(releaseId, {
                $set: updateData
            })
        });

        toastr.success('Project with name "' + projectName + '" succesfully created', 'Created project');

        delete Session.keys["uniqueProjectId"];

        return Router.go('home');
    },
    'click #addReleaseBtn': function(event) {
        Releases.insert({
            projectId: Session.get('uniqueProjectId'),
            releaseDate: new Date(),
            liveDate: new Date(),
            description: ''
        });
    },
    'click .deleteReleaseBtn': function(event) {
        var releaseId = $(event.currentTarget).data('release-id');
        Releases.remove(releaseId);
    },
    'click #deleteCurrentProject': function(event) {
        return Router.go('home');
    }
});