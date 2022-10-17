/* create variable of index of current item to the first item (indexing starts at 0) */
let currentItem = 0;

/* create constant variable and set its value to the elements that have the class name of 'carousel-item-container' */
const carouselItems = document.getElementsByClassName("carousel-item-container");

/* create constant and set its value to the elements that have the class name of 'carousel-page-indicator-container' */
const carouselPageIndicators = document.getElementsByClassName("carousel-page-indicator-container");

/* create constant variable and set its value to the amount of divs minus 1 (because indexing starts at 0, not at 1) */
const maxIndex = carouselItems.length - 1;

/* call function to show first item */
showItem(currentItem);


/* create function that accepts an argument of the index of the item to display */
function showItem(newIndex) {


    /* run through all items */
    for (let i = 0; i <= maxIndex; i++) {

        /* if i is not the new items index */
        if (i != newIndex) {

            /* hide element with the index i */
            carouselItems[i].style.display = "none";

            /* set page selectors as not active */
            carouselPageIndicators[i].classList.remove('active');
        }
    }

    /* scroll back to the top of the page */
    window.scrollTo(0, 0);

    /* show new item */
    carouselItems[newIndex].style.display = "block";

    /* set current page selector as active */
    carouselPageIndicators[newIndex].classList.add('active');

    /* update current index of selected item */
    currentItem = newIndex;
}

function nextItem() {
    currentItem++;
    /* if index item that was called is above the scope of available items */
    if (currentItem > maxIndex) {

        /* set new item to 0 (first item) */
        currentItem = 0;
    }
    setClassNameRemoveOthers(currentItem, 'right');
    showItem(currentItem);
}

function previousItem() {
    currentItem--;
    /* if index item that was called is below the scope of available items */
    if (currentItem < 0) {

        /* set new item to maximum index (last possible item) */
        currentItem = maxIndex;
    }
    setClassNameRemoveOthers(currentItem, 'left');
    showItem(currentItem);
}

function setClassNameRemoveOthers(index, newName) {
    carouselItems[index].classList.remove('right', 'left');
    carouselItems[index].classList.add(newName);
}

const bodyEl = document.getElementsByTagName('main')[0];

/* call this function on load */
window.addEventListener('load', function () {
    /* detect all swipes within this elements bounds */
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
            nextItem();
        }

        /* if first condition was not met */
        /* and */
        /* user swiped to the right */
        else if (swipedir === "right") {

            /* go to the previous item */
            previousItem();
        }
    }, false)
}



