function loco() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },

        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

}

loco()

function nav() {
    var nav = document.querySelector('nav')
    var svg = document.querySelector('nav svg')
    gsap.from(svg, {
        width: '20vh',
        scrollTrigger: {
            scroller: '.main',
            trigger: '.page2',
            start: 'top 0%',
            end: 'top -4%',
            scrub: 2,
        }
    })

    gsap.from(nav, {
        height: '9vh',
        backgroundColor: 'transparent',
        scrollTrigger: {
            scroller: '.main',
            trigger: '.page2',
            start: 'top 0%',
            end: 'top -4%',
            scrub: 2,
        }
    })
}

nav()

function page2() {
    var as = document.querySelectorAll('.page2 a')
    as.forEach(a => {
        a.addEventListener('mouseover', function () {
            gsap.to(a, {
                x: -10,
                ease: 'power3.out'
            })
        })
        a.addEventListener('mouseleave', function () {
            gsap.to(a, {
                x: 10,
                ease: 'power3.out'
            })
        })
    })
}

page2()

let scrollTriggerInstance;

// Function to initialize GSAP animation and event listeners
function initializeAnimation() {
    // Initialize GSAP scroll animation
    scrollTriggerInstance = gsap.to('.page5 .left', {
        y: '-130vh',
        ease: 'power1.out',
        scrollTrigger: {
            trigger: '.page5',
            scroller: '.main',
            start: 'top 0',
            end: 'top -180%',
            pin: true,
            scrub: 2
        }
    });
}

function page5() {
    const images = document.querySelectorAll('.page5 .right img');
    const products = document.querySelectorAll('.page5 .left .pro');
    let lastIndex = -1; // Variable to store the index of the last visible image

    products.forEach(function (pro, idx) {
        pro.addEventListener('mouseenter', function () {
            // Hide all images before showing the current one
            images.forEach((image) => (image.style.opacity = 0));

            // Show the image corresponding to the hovered product
            images[idx].style.opacity = 1;
            lastIndex = idx; // Store the index of the current image
        });

        pro.addEventListener('mouseleave', function () {
            // When mouse leaves the product, do not hide the image
            // The last shown image will stay visible
        });
    });

    // On initial load, show the image of the last hovered product if exists
    if (lastIndex !== -1) {
        images[lastIndex].style.opacity = 1;
    }
}

// Function to remove GSAP ScrollTrigger and event listeners
function removeAnimation() {
    if (scrollTriggerInstance) {
        scrollTriggerInstance.scrollTrigger.kill();
        scrollTriggerInstance = null;
        page5();
    }

    // Hide all images initially
    const images = document.querySelectorAll('.page5 .right img');
    images.forEach(image => image.style.opacity = 0);
}

// Function to handle screen width changes
function handleResize() {
    if (window.innerWidth >= 720) {
        if (!scrollTriggerInstance) {
            initializeAnimation();
            page5();
        }
    } else {
        removeAnimation();
    }
}

// Run once on load
handleResize();

// Attach the function to the resize event
window.addEventListener('resize', handleResize);
