$('body').terminal({
    hello: function(what='') {
      if (what == '') {
        this.echo('Hello. Wellcome to this terminal. Press help for more info.');
      } else if (what == 'there') {
        this.echo('General Kenobi!');
      } else {
        this.echo('Hello, ' + what +
                  '. Wellcome to this terminal.');
      }
    }
}, {
    greetings: 'Welcome to the Site terminal...',
    checkArity: false
});