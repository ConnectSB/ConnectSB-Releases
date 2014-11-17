/**
 * Created by jimmy on 14-11-14.
 */
Meteor.methods({
    setActiveTheme: function(themeId) {
        Themes.update({}, {
            $set: {
                active: false
            }
        }, {
            multi: true
        });
        Themes.update(themeId, {$set: {active: true}});
    }
});