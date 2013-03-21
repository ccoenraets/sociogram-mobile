fb.views.Menu = Backbone.View.extend({

    initialize: function () {
        this.template = fb.templateLoader.get('menu');
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    }

});

fb.views.Welcome = Backbone.View.extend({

    initialize: function () {
        var self = this;
        this.template = fb.templateLoader.get('welcome');
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        'click .login': 'login'
    },

    login: function () {
        $(document).trigger('login');
        return false;
    }

});

fb.views.Person = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.options.template(this.model));
        return this;
    }

});

fb.views.Friends = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.options.template(this.model));
        return this;
    }

});

fb.views.Error = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('error'));
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        'click .retry':'retry'
    },

    retry: function () {
        Backbone.history.loadUrl(Backbone.history.fragment);
    }

});

fb.views.Feed = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.options.template(this.model));
        return this;
    }

});

fb.views.Post = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.options.template());
        return this;
    },

    events: {
        "click .post": "postMessage"
    },

    postMessage: function () {
        var status = {
                name: "Check Out Sociogram Mobile",
                link: "http://coenraets.org",
                picture: "http://coenraets.org/sociogram/img/sociogram_80x86.png",
                caption: "A PhoneGap/Facebook starter app",
                description: "Sociogram is a sample application that demonstrates how to use the Facebook JavaScript SDK and the Graph API",
                message: $('.message').val()
            };
        fb.spinner.show();
        console.log(status);
        FB.api('/me/feed', 'post', status, function(response) {
            console.log(response);
            fb.spinner.hide();
            if (response && response.id) {
                fb.alert('Your post was published.');
            } else {
                fb.alert('Your post was not published.');
            }
        });
        return false;
    }

});

fb.views.PostUI = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.options.template());
        return this;
    },

    events: {
        "click .post": "postMessage"
    },

    postMessage: function () {
        FB.ui(
            {
                method:'feed',
                name:'Check Out Sociogram Mobile',
                link: "http://coenraets.org",
                picture: "http://coenraets.org/sociogram/img/sociogram_80x86.png",
                caption: "A PhoneGap/Facebook starter app",
                description: "Sociogram is a sample application that demonstrates how to use the Facebook JavaScript SDK and the Graph API"
            },
            function (response) {
                console.log(response);
                if (response && response.post_id) {
                    fb.alert('Your post was published.');
                } else {
                    fb.alert('Your post was not published.');
                }
            }
        );
        return false;
    }

});

fb.views.Revoke = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.options.template());
        return this;
    },

    events: {
        "click .revoke": "revoke"
    },

    revoke: function () {
        fb.spinner.show();
        FB.api("/me/permissions", "delete", function () {
            fb.spinner.hide();
            fb.alert('Permissions revoked');
            FB.getLoginStatus();
        });
        $(document).trigger('permissions_revoved');
        return false;
    }

});