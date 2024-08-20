'use strict';

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
    //###
}

function toggle_theme(ev)
{
    var darkmode = get_theme_cookie();
    if (darkmode == 'dark') {
        darkmode = 'light';
    }
    else if (darkmode = 'light') {
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
