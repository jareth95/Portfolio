window.addEventListener('load', () => {
    
    // toggle nav
    const menuItems = document.querySelector('#menu-items');
    const menuIcon = document.querySelector('.menu-icon');

    menuIcon.addEventListener('click', menutoggle);
    function menutoggle() {
        if (menuItems.style.display === 'block') {
            menuItems.style.display = 'none';
        } else {
            menuItems.style.display = 'block';
        }
    }
    // home page

    // carousel

    const indexCarouselImg = document.querySelectorAll('.carousel-item')
    const selectedDiv = document.querySelectorAll('.carousel-div')

    if (indexCarouselImg !== null) {
        setInterval(indexCarouselChangeImage, 3500)
        indexCarouselClickChangeImage()
    }
    function indexCarouselClickChangeImage() {
        selectedDiv.forEach(circle => {
            circle.addEventListener('click', () => {
                for(let i = 0; i < indexCarouselImg.length; i++) {
                    if(indexCarouselImg[i].classList.contains('active')) {
                        indexCarouselImg[i].classList.remove('active')
                        selectedDiv[i].classList.remove('active')
                    }
                }
                circle.classList.add('active')
                for(let i = 0; i < indexCarouselImg.length; i++) {
                    if(selectedDiv[i].classList.contains('active')) indexCarouselImg[i].classList.add('active')
                }
            })
        })
    }
    function indexCarouselChangeImage() {
        for(let i = 0; i < indexCarouselImg.length; i++) {
            if(indexCarouselImg[i].classList.contains('active')) {
                indexCarouselImg[i].classList.remove('active')
                selectedDiv[i].classList.remove('active')
                if(i == indexCarouselImg.length -1) {
                    indexCarouselImg[0].classList.add('active')
                    selectedDiv[0].classList.add('active')
                } else {
                    indexCarouselImg[i+1].classList.add('active')
                    selectedDiv[i+1].classList.add('active')
                }
                return
            }
        }
    }
    // service page

    // changing service tab
    const tabHeading = document.querySelectorAll('.services-page-tab-heading')
    const tabContent = document.querySelectorAll('.services-page-content-container')

    if(tabHeading !== null) {
        tabHeading.forEach(tab => {
            tab.addEventListener('click', () => {
                for(let i = 0; i < tabHeading.length; i++) {
                    if(tabHeading[i].classList.contains('active')) {
                        tabHeading[i].classList.remove('active')
                        tabContent[i].classList.remove('active')
                    } 
                }
                tab.classList.add('active')
                if(tab.textContent == 'Plastering') tabContent[0].classList.add('active')
                if(tab.textContent == 'Rendering') tabContent[1].classList.add('active')
                if(tab.textContent == 'Venetian Polished Plastering') tabContent[2].classList.add('active')
            })
        })
    }
    // gallery
    const plasteringGalleryImage = document.querySelectorAll('.platering-gallery-image')
    const renderingGalleryImage = document.querySelectorAll('.rendering-gallery-image')
    const venetianGalleryImage = document.querySelectorAll('.venetian-gallery-image')
    
    plasteringGalleryImage.forEach(image => {
        image.addEventListener('click', () => {
            const imageGallery = document.querySelectorAll(`.${image.classList}`)
            galleryImageClicked(image, imageGallery)
        })
    })
    renderingGalleryImage.forEach(image => {
        image.addEventListener('click', () => {
            const imageGallery = document.querySelectorAll(`.${image.classList}`)
            galleryImageClicked(image, imageGallery)
        })
    })
    venetianGalleryImage.forEach(image => {
        image.addEventListener('click', () => {
            const imageGallery = document.querySelectorAll(`.${image.classList}`)
            galleryImageClicked(image, imageGallery)
        })
    })
    function galleryImageClicked (image, imageGallery) {
            const backgroundDiv = document.querySelector('.gallery-div')
            const galleryLeftArrow = document.querySelector('.left-arrow-gallery')
            const galleryRightArrow = document.querySelector('.right-arrow-gallery')

            image.classList.add('active')
            backgroundDiv.classList.add('active')
            galleryLeftArrow.classList.add('active')
            galleryRightArrow.classList.add('active')

            exitGallery(backgroundDiv, galleryLeftArrow, galleryRightArrow, imageGallery)
            changeGalleryImageRight(galleryRightArrow, imageGallery)
            changeGalleryImageLeft(galleryLeftArrow, imageGallery)
            
    }
    function exitGallery(background, leftArrow, rightArrow, imageGallery) {
        background.addEventListener('click', () => {
            background.classList.remove('active')
            leftArrow.classList.remove('active')
            rightArrow.classList.remove('active')
            for(let i = 0; i < imageGallery.length; i++) {
                imageGallery[i].classList.remove('active')
            }
        })
    }
    function changeGalleryImageRight(arrow, imageGallery) {
        arrow.addEventListener('click', () => {
            for(let i = 0; i < imageGallery.length; i++) {
                if(imageGallery[i].classList.contains('active')) {
                    imageGallery[i].classList.remove('active')
                    if(i == imageGallery.length -1) {
                        imageGallery[0].classList.add('active')
                    } else {
                        imageGallery[i+1].classList.add('active')
                    }
                    return
                }
            }
        })
    }
    function changeGalleryImageLeft(arrow, imageGallery) {
        arrow.addEventListener('click', () => {
            for(let i = 0; i < imageGallery.length; i++) {
                if(imageGallery[i].classList.contains('active')) {
                    imageGallery[i].classList.remove('active')
                    if(i == 0) {
                        imageGallery[imageGallery.length -1].classList.add('active')
                    } else {
                        imageGallery[i-1].classList.add('active')
                    }
                    return
                }
            }
        })
    }

})

