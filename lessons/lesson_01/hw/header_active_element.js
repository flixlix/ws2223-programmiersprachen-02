function setActive() {
    let aObj = document.querySelectorAll('header a:not(.logo)');
    console.log(aObj)
    for (i = 0; i < aObj.length; i++) {
        if (document.location.href.indexOf(aObj[i].href) >= 0) {
            aObj[i].className = 'active';
            /* set class name "active" to current link */

        }
    }
    if (document.location.pathname == "/hfg/grundlagen_webtechnologien/tutorial_html_index.php" ||
        document.location.pathname == "/hfg/grundlagen_webtechnologien/tutorial_css_index.php") {
        aObj[1].className = 'active';
    }
    /* if no links correspond to the current path */
    return;
    /* stop function here */
}

window.onload = setActive;
/* set current header links to active */