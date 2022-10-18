const bodyEl = document.getElementById('body');
const windowPath = window.location.pathname;
const windowPage = windowPath.split("/").pop();
console.log(windowPage);

/* call this function on load */
window.addEventListener('load', function () {
    /* detect all swipes within this elements bounds */
    /* swipedetect(mainEl); */
    swipedetect(bodyEl);
}, false)

function swipedetect(el) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 500, // maximum time allowed to travel that distance
        elapsedTime,
        startTime

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        /* set default direction as none */
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        /* save time when user touched surface onto 'startTime' variable */
        startTime = new Date().getTime();
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];

        /* get distance between starting and ending coordinate in x direction */
        distX = touchobj.pageX - startX;

        /* get distance between starting and ending coordinate in y direction */
        distY = touchobj.pageY - startY;

        /* get time difference between start and finish of user touching screen */
        elapsedTime = new Date().getTime() - startTime;

        /* if time between first touch and release isn't over the set limit */
        if (elapsedTime <= allowedTime) {

            /* if distance in x direction is within threshold and distance in y direction is below the restraint */
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {

                /* if distance in x is negative, it is considered a left swipe */
                /* otherwise it is considered a right swipe */
                swipedir = (distX < 0) ? 'left' : 'right';
            }

            /* if first condition was not met */
            /* aaaaaaand: */
            /* distance in y direction is within threshold and distance in x direction is below the restraint */
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {

                /* if distance in y direction is negative, it is considered an up swipe */
                /* otherwise it is considered a down swipe */
                swipedir = (distY < 0) ? 'up' : 'down';
            }
        }

        /* if user swiped to the left */
        if (swipedir === "left") {
            /* go to the next item */
            if (sidebarOpen) {
                closeSidebar();
            } else {
                nextItem();
            }
        }

        /* if first condition was not met */
        /* and */
        /* user swiped to the right */
        else if (swipedir === "right") {
            if (startX < 150 && windowPage === "index.html" || windowPage === "about_me.html") {
                openSidebar();
            } else {
                /* go to the previous item */
                previousItem();
            }
        }
    }, false)
}