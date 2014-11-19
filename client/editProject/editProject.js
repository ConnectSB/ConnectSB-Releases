/**
 * Created by jimmy on 13-11-14.
 */

 Template.editProject.events({
    'submit #editProjectForm': function(event) {
        event.preventDefault();
        var projectName = $('#projectName').val();

        Projects.update(this._id, {
            $set: {
                name: projectName
            }
        });

        // Update all releases
        var releaseWindows = $('.editReleaseWindow');

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

        toastr.success('Project with name "' + projectName + '" succesfully updated', 'Updated project');

        delete Session.keys["uniqueProjectId"];

        return Router.go('home');
    },
    'click #addReleaseBtn': function(event) {
        Releases.insert({
            projectId: this._id,
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

Template.editProject.helpers({
    releases: function() {
        return Releases.find({});
    }
});