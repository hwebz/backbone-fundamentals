var TodoRouter = Backbone.Router.extend({
    /* define the route and function maps for this router */
    routes: {
      "about" : "showAbout",
      "search/:query" : "searchTodos",
      "search/:query/p:page" : "searchTodos"
    },
  
    showAbout: function(){},
  
    searchTodos: function(query, page){
      var page_number = page || 1;
      console.log("Page number: " + page_number + " of the results for todos containing the word: " + query);
    }
  });
  
  var myTodoRouter = new TodoRouter();

  Backbone.history.start();

// Go to and check console:
// http://localhost/#search/job/p3   logs: Page number: 3 of the results for todos containing the word: job
// http://localhost/#search/job      logs: Page number: 1 of the results for todos containing the word: job 
// etc.