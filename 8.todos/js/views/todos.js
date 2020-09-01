var app = app || {};

// Todo Item View
// --------------
// The DOM element for a todo item...
app.TodoView = Backbone.View.extend({
    // ... is a list tag.
    tagName: 'li',

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
        'click .toggle': 'toggleCompleted',     // New
        'dblclick label': 'edit',
        'click .destroy': 'clear',  // New
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close',
        'keydown .edit': 'revertOnEscape' // New
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);          // New
        this.listenTo(this.model, 'visible', this.toggleVisible);   // New
    },

    // Re-renders the titles of the todo item.
    render: function() {
        this.$el.html(this.template(this.model.attributes));

        this.$el.toggleClass('completed', this.model.get('completed')); // New
        this.toggleVisible();                                           // New

        this.$input = this.$('.edit');
        return this;
    },

    // New - Toggles visibility of item
    toggleVisible: function() {
        this.$el.toggleClass('hidden', this.isHidden());
    },

    // New - Determines if item should be hidden
    isHidden: function() {
        var isCompleted = this.model.get('completed');
        return (    // hidden cases only
            (!isCompleted && app.TodoFilter === 'completed')
            || (isCompleted && app.TodoFilter === 'active')
        );
    },

    // New - Toggle the `"completed"` state of the model.
    toggleCompleted: function() {
        this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
        var value = this.$input.val().trim();

        if (value) {
            this.model.save({ title: value });
        }

        this.$el.removeClass('editing');
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
        if (e.which === ENTER_KEY) {
            this.close();
        }
    },

    revertOnEscape: function(e) {
        if (e.which === ESC_KEY) {
            this.$el.removeClass('editing');
            // Also reset the hidden input back to the original value.
            this.$input.val(this.model.get('title'));
        }
    },

    // New - Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function() {
        this.model.destroy();
    }
})