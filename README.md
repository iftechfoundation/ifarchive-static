# Static files and configuration for the IF Archive

- Copyright 2017-2025 by the Interactive Fiction Technology Foundation

This repository contains a miscellany of setup, configuration, and information files about the [IF Archive][ifarch] server.

[ifarch]: https://ifarchive.org/

These files are licensed under a [Creative Commons Attribution 4.0 International License][ccby4]. See the [IF Archive Terms of Use][license]. (Whose source file is in this repository!)

[ccby4]: http://creativecommons.org/licenses/by/4.0/
[license]: https://ifarchive.org/misc/license.html

Here may be found:

- `conf`: Apache and other service config files.
- `index.html`: The front page.
- `misc`: Contents of [https://ifarchive.org/misc/](https://ifarchive.org/misc/). This includes the Archive CSS stylesheet, licenses, the bit of Javascript which handles the dark/light theming, and so on.
- `md`: Markdown source for some of the files in `misc`. (Older files, including `index.html`, are maintained as raw HTML rather than Markdown. We may convert them to Markdown in the future.)
- `imagesrc`: The Archive site logo ("favicon").
- `tools`: Scripts which help maintain this repo. In particular, `tools/build.py` renders the Markdown files in `md` into HTML. 
- `csscomp`: Entries in the 2009 web design competition which gave the IF Archive its current look.

