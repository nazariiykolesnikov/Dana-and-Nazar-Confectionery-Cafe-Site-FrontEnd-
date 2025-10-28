$(document).ready(function () {
    const $slides = $('#heroSlider .slide');
    let currentIndex = 0;
    const slideCount = $slides.length;
    const intervalTime = 5000; // 5 секунд
    let autoSlide;

    function showSlide(index) {
        $slides.removeClass('active').fadeOut(600);
        $slides.eq(index).addClass('active').fadeIn(600);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        showSlide(currentIndex);
    }

    $('#nextSlide').on('click', function () {
        nextSlide();
        resetAutoSlide();
    });

    $('#prevSlide').on('click', function () {
        prevSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, intervalTime);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    $slides.hide().eq(currentIndex).show().addClass('active');
    startAutoSlide();
});
