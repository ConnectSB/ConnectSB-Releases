/**
 * Created by jimmy on 13-11-14.
 */
Template.home.rendered = function() {
    Session.set('currentActiveLi', 'home');
};

Template.home.helpers({
    projects: function() {
        return Projects.find({});
    }
});

Template.home.events({
    'click .removeProject': function(event) {
        var element = event.currentTarget;
        var project = Projects.findOne({_id: $(element).data("project-id")});
        var projectName = project.name;

        Projects.remove({
            _id: project._id
        });

        toastr.success('Project with name "' + projectName + '" succesfully deleted', 'Deleted project');
    },
    'click .editProject': function(event) {
        var projectId = $(event.currentTarget).data("project-id");
        Router.go('editProject', {
            id: projectId
        });
    }
});