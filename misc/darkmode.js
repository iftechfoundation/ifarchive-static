'use strict';

const testmode = true; //###

function get_theme_cookie()
{
    var mode = null;
    
    for (var val of document.cookie.split(';')) {
        if (val.trim() == 'theme=dark') {
            mode = 'dark';
            break;
        }
        if (val.trim() == 'theme=light') {
            mode = 'light';
            break;
        }
    }

    return mode;
}

function set_theme_cookie(val)
{
    var cookie;
    if (val == 'light' || val == 'dark') {
        cookie = 'theme='+val+'; path=/; max-age=31536000';
    }
    else {
        cookie = 'theme=none; path=/; max-age=0';
    }
    if (!testmode) {
        cookie += '; domain=ifarchive.org'
    }
    document.cookie = cookie;
}

function toggle_theme(ev)
{
    var oldmode = get_theme_cookie();
    var mode;
    if (oldmode == 'dark') {
        mode = 'light';
    }
    else if (oldmode == 'light') {
        mode = 'dark';
    }
    else {
        var match = window.matchMedia('(prefers-color-scheme: dark)');
        if (match.matches) {
            mode = 'light';
        }
        else {
            mode = 'dark';
        }
    }

    set_theme_cookie(mode);
    set_body_class(mode);
}

function set_body_class(mode)
{
    if (mode == 'light') {
        document.body.classList.add('LightMode');
        document.body.classList.remove('DarkMode');
        document.body.classList.remove('SysMode');
    }
    else if (mode == 'dark') {
        document.body.classList.add('DarkMode');
        document.body.classList.remove('LightMode');
        document.body.classList.remove('SysMode');
    }
    else {
        document.body.classList.add('SysMode');
        document.body.classList.remove('LightMode');
        document.body.classList.remove('DarkMode');
    }
}

window.addEventListener('load', function(ev) {
    var mode = get_theme_cookie();
    set_body_class(mode);

    var el = document.getElementById('toggletheme');
    el.addEventListener('click', toggle_theme);
});
