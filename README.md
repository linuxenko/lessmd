### Lessmd

[![Build Status](https://travis-ci.org/linuxenko/lessmd.svg?branch=master)](https://travis-ci.org/linuxenko/lessmd) [![Dependency Status](https://dependencyci.com/github/linuxenko/lessmd/badge)](https://dependencyci.com/github/linuxenko/lessmd) [![Coverage Status](https://coveralls.io/repos/github/linuxenko/lessmd/badge.svg)](https://coveralls.io/github/linuxenko/lessmd)

[![asciicast](https://asciinema.org/a/90323.png)](https://asciinema.org/a/90323) [![asciicast](https://asciinema.org/a/baujqagwnhzy41ssoybgz4aat.png)](https://asciinema.org/a/baujqagwnhzy41ssoybgz4aat) [![asciicast](https://asciinema.org/a/3x2d09zt795qwm4v0dehrosox.png)](https://asciinema.org/a/3x2d09zt795qwm4v0dehrosox) [![asciicast](https://asciinema.org/a/bz0h8cujw3nzvt3c0lcmniltl.png)](https://asciinema.org/a/bz0h8cujw3nzvt3c0lcmniltl)

[Lessmd](https://git.io/lessmd) - unix terminal document viewer/pager with markdown 
and piping support.

### Why ?

  * It is JavaScript
  * Minimal and fast
  * Unix like pager with navigation
  * Displaying markdown with colors
  * Can translate markdown into colored output
  * Configurable user interface
  * Support files and pipes
  * With livereload (watching the file)
  * Markdown color theming support


### Usage

Pager mode:

```sh
  lessmd README.md
```

Shortcuts:
  * `q` or `ctrl+c` exit

Piping with another programs:

```sh
  lessmd < README.md
```

Saving output into file for some prompt , motd, issue file.

```sh
 echo "# welcome\n * do not touch anything \n * just press Ctrl+D" \
 | lessmd | tee /etc/motd
```

### Installation

```
  npm install -g lessmd
```


### Configuration

Lessmd looks for user settings inside of the home directory `.lessmd.js`.

Example of the `.lessmd.js`:

```js
module.exports = {
  colors : {    /// markdown theming colors
    text : ,    
    lang : ,
    heading : ,
    code : ,
    quote : ,
    em : ,
    codespan : ,
    strong : ,
    html : ,
    del : ,
    link : ,
    hr : ,
    listitem :,
  },
  theme : {
    draw : false       // disable any ui (header and footer bars)
    text : '',         // text style
    strong : ''        // bold text style 
  },
  headerfn : function() { return 'header'; }, // custom header fn,
  footerfn : function() { return 'footer'; }  // custom footer fn
};
```


### License

MIT (c) Svetlana Linuxenko

