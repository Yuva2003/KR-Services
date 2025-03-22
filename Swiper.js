<!-- Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css">

<!-- Services Section -->
<div id="servicesSection" style="display: none;">
    <h2>Our Work Samples</h2>
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="sample1.jpg" alt="Sample 1"></div>
            <div class="swiper-slide"><img src="sample2.jpg" alt="Sample 2"></div>
            <div class="swiper-slide"><img src="sample3.jpg" alt="Sample 3"></div>
        </div>
        <!-- Navigation buttons -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</div>

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
<script>
document.getElementById("servicesBtn").addEventListener("click", function() {
    document.getElementById("servicesSection").style.display = "block";

    new Swiper('.swiper', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
});
</script>
