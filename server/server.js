/**
 * Created by jimmy on 13-11-14.
 */
Meteor.startup(function () {
    var themes = [
        {
            name: "Cerulean",
            cssUrl: "cerulean.css",
            active: true
        },
        {
            name: "Cosmo",
            cssUrl: "cosmo.css"
        },
        {
            name: "Cyborg",
            cssUrl: "cyborg.css"
        },
        {
            name: "Darkly",
            cssUrl: "darkly.css"
        },
        {
            name: "Flatly",
            cssUrl: "flatly.css"
        },
        {
            name: "Journal",
            cssUrl: "journal.css"
        },
        {
            name: "Lumen",
            cssUrl: "lumen.css"
        },
        {
            name: "Paper",
            cssUrl: "paper.css"
        },
        {
            name: "Readable",
            cssUrl: "readable.css"
        },
        {
            name: "Sandstone",
            cssUrl: "sandstone.css"
        },
        {
            name: "Simplex",
            cssUrl: "simplex.css"
        },
        {
            name: "Slate",
            cssUrl: "slate.css"
        },
        {
            name: "Spacelab",
            cssUrl: "spacelab.css"
        },
        {
            name: "Superhero",
            cssUrl: "superhero.css"
        },
        {
            name: "United",
            cssUrl: "united.css"
        },
        {
            name: "Yeti",
            cssUrl: "yeti.css"
        }
    ];
    if( Themes.find({}).count() == 0 ) {
        _.each(themes, function(theme, key) {
            if( key != 0 ) {
                theme.active = false;
            }
            Themes.insert(theme);
        });
    }
});