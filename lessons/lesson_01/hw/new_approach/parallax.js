window.addEventListener("scroll", function () {
    const distance = window.scrollY
    let text = document.querySelectorAll(".parallax-video")
    for (let i = 0; i < text.length; i++) {
        text[i].style.transform = `translateY(${distance *
            1}px)`
    }
})