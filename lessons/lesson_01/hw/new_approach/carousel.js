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

