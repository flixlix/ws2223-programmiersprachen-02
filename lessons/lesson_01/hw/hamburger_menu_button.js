let hamburgerMenuButton = document.getElementById('hambuger-menu-button');
let dropdownMenu = document.getElementById('collapsible-menu-navigation-container');



function toggleDropdownNav() {
    console.log(dropdownMenu.style.opacity)
    if (dropdownMenu.style.opacity === "1") {
        dropdownMenu.style.opacity = 0;
        dropdownMenu.style.visibility = "hidden";
    } else {
        dropdownMenu.style.opacity = 1;
        dropdownMenu.style.visibility = "visible";
    }
}