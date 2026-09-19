document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-btn');
    const introCover = document.getElementById('intro-cover');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    // 1. Cover Open Animation
    openBtn.addEventListener('click', () => {
        // Fire Confetti
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#cba135', '#4a121a']
        });

        // Slide Down Effect
        introCover.style.transform = 'translateY(100vh)';
        introCover.style.opacity = '0';

        // Show Main
        mainContent.classList.remove('hidden');

        // Play Music from second 24
        bgMusic.currentTime = 24;
        bgMusic.play().catch(err => console.log('Autoplay blocked:', err));

        // Hide overlay from DOM after transition
        setTimeout(() => {
            introCover.style.display = 'none';
        }, 1000);
    });

    // 2. Swiper Initialization (3D Coverflow)
    if (typeof Swiper !== 'undefined') {
        new Swiper('.mySwiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }

    // 3. Countdown Timer
    var countDownDate = new Date("Oct 17, 2026 19:00:00").getTime();

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown-timer").innerHTML = "IT'S TIME!";
        }
    }, 1000);

    // 4. Music Toggle logic
    let isPlaying = false;
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                isPlaying = true;
            } else {
                bgMusic.pause();
                isPlaying = false;
            }
        });
    }

    // 5. Gallery Slider Logic
    let currentIndex = 0;
    const cards = document.querySelectorAll('.gallery-card');
    const dots = document.querySelectorAll('.gallery-dots .dot');

    function updateGallery(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next', 'hidden-card');
            
            if (i === index) {
                card.classList.add('active');
            } else if (i === (index - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (i === (index + 1) % cards.length) {
                card.classList.add('next');
            } else {
                card.classList.add('hidden-card');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateGallery(currentIndex);
    }

    if (cards.length > 0) {
        let slideInterval = setInterval(nextSlide, 3000);

        const container = document.getElementById('galleryContainer');
        if (container) {
            container.addEventListener('mouseenter', () => clearInterval(slideInterval));
            container.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 3000));
        }

        updateGallery(currentIndex);
    }
});