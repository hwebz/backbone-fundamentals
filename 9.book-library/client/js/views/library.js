var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',
    initialize: function() {                            // Updated
        this.collection = new app.Library();            // Updated
        this.collection.fetch({ reset: true });         // New - async books fetching
        this.render();

        this.listenTo(this.collection, 'add', this.renderBook);
        this.listenTo(this.collection, 'reset', this.render);   // New - re-render views after book fetched
    },

    events: {
        'click #add': 'addBook'
    },

    // render library by rendering each bok in its collection
    render: function() {
        this.collection.each(function(item) {
            this.renderBook(item);
        }, this);
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function(item) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append(bookView.render().el);
    },

    addBook: function(e) {
        e.preventDefault();
        var formData = {};

        $('#addBook div').children('input').each(function(i, el) {
            if ($(el).val() !== '') {
                if (el.id === 'keywords') {
                    formData[el.id] = [];
                    _.each($(el).val().split(' '), function(keyword) {
                        formData[el.id].push({
                            keyword: keyword
                        });
                    });
                } else if (el.id === 'releaseDate') {
                    formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
                } else {
                    formData[el.id] = $(el).val();
                }
            }

            // Clear input field value
            $(el).val('');
        });

        this.collection.create(formData);
    }
})