/**
 * Created by jimmy on 13-11-14.
 */
Template.navbar.helpers({
    hasProjects: function() {
        return Projects.find({}).count() > 0;
    },
    projects: function() {
        return Projects.find({});
    },
    isActiveLi: function(liId) {
        return Session.get("currentActiveLi") == liId;
    },
    themes: function() {
        return Themes.find({});
    }
});

Template.navbar.events({
    'click .themeLi': function(event) {
        var previousTheme = Themes.findOne({active: true});
        var themeId = $(event.currentTarget).data('theme-id');

        Meteor.call('setActiveTheme', themeId, function() {
            var currentTheme = Themes.findOne({active: true});
            var links = $("head").find("link");
            _.each(links, function(link) {
                if( $(link).attr('href') == previousTheme.cssUrl ) {
                    $(link).attr('href', currentTheme.cssUrl);
                }
            });
        });
    }
});