'use strict';

function check_theme_cookie()
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
    check_theme_cookie();
});
