let logo = document.getElementById('logo')

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        logo.src = "images/hfg_logo_light_mode.png";
    } else {
        setTheme('theme-dark');
        logo.src = "images/hfg_logo_dark_mode.png";
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        logo.src = "images/hfg_logo_dark_mode.png";
    } else {
        setTheme('theme-light');
        logo.src = "images/hfg_logo_light_mode.png";
    }
})();