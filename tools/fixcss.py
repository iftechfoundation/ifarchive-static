"""
The CSS files have a bunch of repeated declarations. It's convenient
to have a script to generate the extras.

To run:

% python3 tools/fixcss.py misc/ifarchive.css misc/admintool.css

This rewrites the files in place, so check them into version control
before you go wild with this. Just in case.
"""

import sys
import re

pat_div = re.compile(r'^\s*/[*]\s*---\s*(begin|end)\s*([A-Za-z]+)\s*---\s*[*]/\s*$')

def imbibe(filename):
    fl = open(filename)
    lines = []
    lightseg = []
    darkseg = []
    
    seg = None
    for ln in fl.readlines():
        match = pat_div.match(ln)
        if match:
            marker, key = match.group(1), match.group(2)
            if marker == 'begin':
                if seg:
                    raise Exception('begin without previous end')
                seg = key
            elif marker == 'end':
                if not seg:
                    raise Exception('end without previous begin')
                seg = None
                
        if seg == 'mediaLightMode':
            if match:
                for ln in lightseg:
                    if ln.startswith('/*'):
                        ln = ln.replace('LightMode', 'mediaLightMode')
                    else:
                        ln = ln.replace('LightMode', 'SysMode')
                    lines.append(ln)
            continue
        if seg == 'mediaDarkMode':
            if match:
                for ln in darkseg:
                    if ln.startswith('/*'):
                        ln = ln.replace('DarkMode', 'mediaDarkMode')
                    else:
                        ln = ln.replace('DarkMode', 'SysMode')
                    lines.append(ln)
            continue
        if seg == 'LightMode':
            lightseg.append(ln)
        if seg == 'DarkMode':
            darkseg.append(ln)
        lines.append(ln)
    fl.close()

    return lines

def expel(filename, lines):
    fl = open(filename, 'w')
    for ln in lines:
        fl.write(ln)
    fl.close()

for filename in sys.argv[ 1 : ]:
    lines = imbibe(filename)
    expel(filename, lines)
