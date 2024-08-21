'use strict';

const testmode = true; //###

function get_theme_cookie()
{
    var darkmode = null;
    
    for (var val of document.cookie.split(';')) {
        if (val.trim() == 'theme=dark') {
            darkmode = 'dark';
            break;
        }
        if (val.trim() == 'theme=light') {
            darkmode = 'light';
            break;
        }
    }

    return darkmode;
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
    var darkmode;
    if (oldmode == 'dark') {
        darkmode = 'light';
    }
    else if (oldmode == 'light') {
        darkmode = 'dark';
    }
    else {
        var match = window.matchMedia('(prefers-color-scheme: dark)');
        if (match.matches) {
            darkmode = 'light';
        }
        else {
            darkmode = 'dark';
        }
    }

    set_theme_cookie(darkmode);
    set_body_class(darkmode);
}

function set_body_class(darkmode)
{
    if (darkmode == 'light') {
        document.body.classList.add('LightMode');
        document.body.classList.remove('DarkMode');
        document.body.classList.remove('SysMode');
    }
    else if (darkmode == 'dark') {
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
    var darkmode = get_theme_cookie();
    set_body_class(darkmode);

    var el = document.getElementById('toggletheme');
    el.addEventListener('click', toggle_theme);
});
