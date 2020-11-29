// toggle nav
let menuItems = document.getElementById('menuItems');
let menuIcon = document.getElementById('menuIcon');
menuItems.style.maxHeight = '0px';

menuIcon.addEventListener('click', menutoggle);
function menutoggle() {
    if (menuItems.style.maxHeight === '0px') {
        menuItems.style.maxHeight = '300px';
    } else {
        menuItems.style.maxHeight = '0px';
    }
}

// Scolling Change Nav Opacity

const header = document.querySelector('header');
const sectionOne = document.getElementById('top');

const sectionOneOptions = { 
    rootMargin: "-500px 0px 0px 0px"
}

const SectionOneObserver = new IntersectionObserver
(function(entries) {
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                header.classList.add('nav-scrolled');
            } else {
                header.classList.remove('nav-scrolled');
            }
        });

}, sectionOneOptions)

SectionOneObserver.observe(sectionOne);

// Scolling Change Porfolio Fade In

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -200px 0px"
};

const appearOnScroll = new IntersectionObserver
(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    })
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})

// Scolling Change Slide Horizontal In

const sliders = document.querySelectorAll('.slide-in');

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});