/**
 * Created by jimmy on 13-11-14.
 */
Router.map(function() {
    this.route('home', {
        path: '/'
    });

    this.route('createProject', {
        path: '/create-project'
    });

    this.route('editProject', {
        path: '/edit-project/:id',
        data: function () {
            return Projects.findOne({_id: this.params.id});
        }
    })
});

Router.onBeforeAction('loading');

Router.configure({
    layoutTemplate: "main"
});