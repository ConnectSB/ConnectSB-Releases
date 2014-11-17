/**
 * Created by jimmy on 13-11-14.
 */
Template.editProject.rendered = function() {
    Session.set("currentActiveLi", "editProject");
};

Template.editProject.helpers({

});

Template.editProject.events({
    'submit #editProjectForm': function(event) {
        event.preventDefault();

        var projectName = $('#projectName').val();
        Projects.update({
            _id: this._id
        },{
            $set: {
                "name": projectName
            }
        });

        toastr.success('Project with name "' + projectName + '" succesfully edited', 'Edited project');

        delete Session.keys["currentProject"];

        return Router.go('home');
    },
    'click #removeProject': function(event) {
        var element = event.currentTarget;
        var project = Projects.findOne({_id: $(element).data("project-id")});
        var projectName = project.name;

        Projects.remove({
            _id: project._id
        });

        toastr.success('Project with name "' + projectName + '" succesfully deleted', 'Deleted project');

        return Router.go('home');
    },
    'keyup #projectName': function (event) {
        var project = Session.get("currentProject");
        project.name = $(event.currentTarget).val();
        Session.set("currentProject", project);
    }
});