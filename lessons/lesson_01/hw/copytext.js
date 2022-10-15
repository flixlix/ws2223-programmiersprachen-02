const popup = document.getElementById("copied-text-confirmation");

function copyText() {
    togglePopup(1);
    /* show popup */
    const timeout = setTimeout(togglePopup, 5000);
    /* hide popup after 5 secs */

    const copyText = "luca.ziegler.felix@gmail.com";
    /* Get the text field */

    navigator.clipboard.writeText(copyText);
    /* Copy the text inside the text field */
}

function togglePopup(state) {
    if (state == "1") {
        popup.style.opacity = "1";
    } else {
        popup.style.opacity = "0"
    }
}