/**
 * Created by jimmy on 14-11-14.
 */
Template.theme.helpers({
    activeTheme: function() {
        return Themes.findOne({active: true});
    },
    isArray: function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
});