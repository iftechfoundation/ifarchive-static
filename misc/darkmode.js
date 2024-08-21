'use strict';

/* Simple script to support light and dark mode on IF Archive web pages.

   Our color-theme strategy is a bit complicated. We want to default to
   the user's system color theme. This doesn't require JS at all; it relies
   on CSS and the "prefers-color-scheme" @media query.

   However, we want to support very old browsers that don't recognize
   @media queries. And we *also* want to give the user the option to
   manually select a dark/light theme preference. As the IF Archive does
   not have user accounts, that preference must be stored in a cookie.
   That's where this script comes in.

   At load time, we check for a "theme=dark" or "theme=light" cookie. If
   found, we set the <body> class to "DarkMode" or "LightMode", which
   has fixed colors. If no cookie is present, we set the <body> class
   to "SysMode", which uses the @media query to select colors.

   (This setup means that color declarations are written very redundantly
   in ifarchive.css. Sorry about that.)

   A page-footer button lets the user set or toggle the cookie. There's
   no way to unset the cookie, but that's okay -- if someone sets a color,
   that's probably the color they want. Note that the page-footer button
   might not be present on every page; the color system still works
   site-wide as long as this script is loaded.
*/

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
    if (el) {
        el.addEventListener('click', toggle_theme);
    }
});
