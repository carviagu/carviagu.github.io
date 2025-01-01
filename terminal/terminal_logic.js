const speed = 2;
let progress;
let animation;

function progress_bar(width, percent) {
    const size = Math.round(width * percent / 100);
    let left = '', taken = '', i;
    for (i=size; i--;) {
        taken += '=';
    }
    if (taken.length > 0) {
        taken = taken.replace(/=$/, '>');
    }
    for (i=width-size; i--;) {
        left += ' ';
    }
    return '[' + taken + left + '] ' + percent + '%';
}

class Progress {
    constructor({speed, term, render}) {
        this._speed = speed;
        this._term = term;
        this._render = render;
    }
    _progress(percent) {
        return this._render(percent);
    }
    start() {
        const self = this;
        self._prompt = self._term.get_prompt();
        let i = 0;
        return new Promise(resolve => {
            (function loop() {
                self._string = self._progress(i);
                i += self._speed;
                self._term.set_prompt(self._string);
                if (i < 100) {
                    self._timer = setTimeout(loop, 100);
                } else {
                    term.echo(self._progress(i)).set_prompt(self._prompt);
                    resolve();
                }
            })();
        });
    }
    stop() {
        clearTimeout(this._timer);
        term.echo(this._string).set_prompt(this._prompt);
    }
};

$('body').terminal({
    help: function() {
      this.echo(
        'AVAILABLE COMMANDS \n\necho ...... returns the provided message \nlinkedin .. returns link to Carlos LinkedIn profile \nclear ..... cleans the terminal \nexit ...... reboot the terminal\n')
    },
    hello: function(what='') {
      if (what == '') {
        this.echo('Hello. Wellcome to this terminal. Press help for more info.');
      } else if (what == 'there') {
        this.echo('General Kenobi!');
      } else {
        this.echo('Hello, ' + what +
                  '. Wellcome to this terminal.');
      }
    },
    echo: function(...args) {
        this.echo(args.join(' '));
    },
    linkedin: function() {
      this.echo('Find me on... https://www.linkedin.com/in/carviagu/')
    },
    run: function(program='') {
        if (program == '') {
          this.echo('Specify an order or program to execute');
        } else if (program == '') {
          
        }
    },
    exit: function() {
      this.clear();
      this.echo('TERMINAL CONSOLE, VERSION 3.4.0 "AMANDA" \nCARVIAGU SITE \n\nCONNECTION STABLISHED \n\nWelcome to the site terminal! Type help to know available commands...\n');
    },
    test: function() {
        const render = (percent) => progress_bar(50, percent);
        progress = new Progress({speed, this, render});
        animation = true;
        this.pause(true);
        progress.start().then(() => {
            animation = false;
            this.resume();
            this.echo('Test ended succesfully!')
        })
    }
  
}, {
    greetings: 'TERMINAL CONSOLE, VERSION 3.4.0 "AMANDA" \nCARVIAGU SITE \n\nCONNECTION STABLISHED \n\nWelcome to the site terminal! Type help to know available commands...\n',
    checkArity: false
});