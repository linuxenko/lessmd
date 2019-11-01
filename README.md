### Lessmd

[![npm version](https://img.shields.io/npm/v/lessmd.svg?style=flat-square)](https://www.npmjs.com/package/lessmd)
[![Build Status](https://img.shields.io/travis/linuxenko/lessmd?style=flat-square)](https://travis-ci.org/linuxenko/lessmd)
[![Coverage Status](https://img.shields.io/coveralls/github/linuxenko/lessmd?style=flat-square)](https://coveralls.io/github/linuxenko/lessmd)
[![dependencies Status](https://david-dm.org/linuxenko/lessmd/status.svg?style=flat-square)](https://david-dm.org/linuxenko/lessmd)
[![devDependencies Status](https://david-dm.org/linuxenko/lessmd/dev-status.svg?style=flat-square)](https://david-dm.org/linuxenko/lessmd?type=dev)


[![asciicast](https://asciinema.org/a/90323.png)](https://asciinema.org/a/90323)

[Lessmd](https://git.io/lessmd) is a terminal viewer/pager with markdown and piping support.

### Why ?

  * It is a JavaScript
  * Minimal and fast
  * Unix like pager with navigation
  * Displays markdown with colors
  * Can translate markdown into colored output
  * Configurable user interface
  * Supports files and pipes
  * With livereload (watch filechanges)
  * Markdown theming support

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

To save some output into a file, which you can use as a motd or an issue files.

```sh
 echo "# welcome\n * do not touch anything \n * just press Ctrl+D" \
 | lessmd | tee /etc/motd
```

[![pipe example](https://raw.githubusercontent.com/linuxenko/lessmd/master/misc/pipe-example.png)](https://raw.githubusercontent.com/linuxenko/lessmd/master/misc/pipe-example.png)

### Installation

```
  npm install -g lessmd
```


### Configuration

Lessmd looks for user settings inside of a home directory, the filename is `.lessmd.js`.

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

### ChangeLog

**1.2.1**
  * Dependencies update

**1.2.0**

  * Bug with long slices

**1.1.0 - 2016-11-15**

  * Html options for marked (sanityze, smartypants)
  * `h,j,k,l` bindings
  * Smaller chunks colorization for view mode

**1.0.1 - 2016-11-03**

  * Added original less keybindings


### License

MIT (c) Svetlana Linuxenko

