/**
 * Created by jimmy on 13-11-14.
 */
Template.createProject.rendered = function() {
    Session.set("currentActiveLi", "createProject");
    Projects.insert({
        name: "",
        finishedCreating: false
    }, function(error, _id) {
        Session.set("currentProject", Projects.findOne(_id));
    });
};

Template.createProject.helpers({
    releases: function() {
        return Releases.find({
            projectId: this._id
        }).fetch();
    }
});

Template.createProject.events({
    'submit #createProjectForm': function(event) {
        event.preventDefault();

        var project = Session.get("currentProject");
        var projectName = $('#projectName').val();

        Projects.update({
           _id: project._id
        },{
            $set: {
                name: projectName,
                finishedCreating: true
            }
        });

        toastr.success('Project with name "' + projectName + '" succesfully created', 'Created project');

        delete Session.keys["currentProject"];

        return Router.go('home');
    },
    'keyup #projectName': function (event) {
        var project = Session.get("currentProject");

        Projects.update({
            _id: project._id
        },{
            $set: {
                name: $(event.currentTarget).val()
            }
        });

        Session.set("currentProject", Projects.findOne({_id: project._id}));
    },
    'click #addReleaseBtn': function(event) {
        Releases.insert({
            projectId: this._id,
            releaseDate: new Date(),
            liveDate: new Date()
        });
    },
    'click .deleteReleaseBtn': function(event) {
        var releaseId = $(event.currentTarget).data('release-id');
        Releases.remove(releaseId);
    },
    'click #deleteCurrentProject': function(event) {
        Projects.remove({
            _id: Session.get("currentProject")._id
        });

        return Router.go('home');
    }
});