'use strict';

function check_theme_cookie()
{
    var darkmode = false;
    for (var val of document.cookie.split(';')) {
        if (val.trim() == 'theme=dark') {
            darkmode = true;
        }
    }

    set_body_class(darkmode);
}

function set_body_class(darkmode)
{
    if (!darkmode) {
        document.body.classList.add('LightMode');
        document.body.classList.remove('DarkMode');
    }
    else {
        document.body.classList.add('DarkMode');
        document.body.classList.remove('LightMode');
    }
}

window.addEventListener('load', function(ev) {
    check_theme_cookie();
});
