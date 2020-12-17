


// toggle nav
let menuItems = document.getElementById('menuItems');
let menuIcon = document.getElementById('menuIcon');
menuItems.style.maxHeight = '0px';

menuIcon.addEventListener('click', menutoggle);
function menutoggle() {
    if (menuItems.style.maxHeight === '0px') {
        menuItems.style.maxHeight = '200px';
    } else {
        menuItems.style.maxHeight = '0px';
    }
}
// product slider
let thumbnails = document.getElementsByClassName('thumbnail')
let activeImages = document.getElementsByClassName('active')

		for (var i=0; i < thumbnails.length; i++){
			thumbnails[i].addEventListener('mouseover', function(){
				console.log(activeImages)
				if (activeImages.length > 0){
					activeImages[0].classList.remove('active')
				}
				this.classList.add('active')
				document.getElementById('featured').src = this.src
			})
    }
    
		let buttonRight = document.getElementById('slideRight');
		let buttonLeft = document.getElementById('slideLeft');

		buttonLeft.addEventListener('click', function(){
			document.getElementById('slider').scrollLeft -= 180
		})
		buttonRight.addEventListener('click', function(){
			document.getElementById('slider').scrollLeft += 180
		})
// collapsible description
let coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

