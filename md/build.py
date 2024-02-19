"""
We build some of our static misc HTML files from Markdown.

This script generates them properly. To run:

% python3 md/build.py

To upload:

% scp misc/org-*.html upload.ifarchive.org:/var/ifarchive/htdocs/misc

"""

import os.path
from jinja2 import Environment, FileSystemLoader, select_autoescape
import markdown

template_path = 'md'
dest_path = 'misc'
app_css_uri = '/misc/admintool.css'

jenv = Environment(
    loader = FileSystemLoader(template_path),
    autoescape = select_autoescape(),
    keep_trailing_newline = True,
)
jenv.globals['appcssuri'] = app_css_uri

mdenv = markdown.Markdown(extensions=[
    'attr_list', 'def_list', 'fenced_code', 'tables', 'meta',
])

def build(filename):
    print('Writing %s...' % (filename,))
    fl = open(os.path.join(template_path, filename))
    dat = fl.read()
    fl.close()
    mdenv.reset()
    body = mdenv.convert(dat)
    metadata = mdenv.Meta

    title = 'IF Archive'
    if 'title' in metadata:
        title = ''.join(metadata['title'])

    changedate = None
    if 'changedate' in metadata:
        changedate = ''.join(metadata['changedate'])
    
    tem = jenv.get_template('template.html')

    newname, newsuffix = os.path.splitext(filename)
    destfilename = os.path.join(dest_path, newname+'.html')
    
    fl = open(destfilename, 'w')
    fl.write(tem.render(
        content=body, title=title,
        changedate=changedate))
    fl.close()

build('org-overview.md')
build('org-procedures.md')
