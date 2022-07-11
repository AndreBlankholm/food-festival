require('bootstrap');
const img1 = require("../../assets/img/food-table.jpg");   // (1) Let's import the two image files by adding the following expressions into the top of the script.js file:
const img2 = require("../../assets/img/grill.jpg");

$(document).ready(function() {
  // First image is hard coded in index.html
  const carouselSlides = [
    {
      title: "We travel all over the US",
      subtitle: "Check out our schedule!",
      img: img1, // (2) update the img property with the new image variables, as shown in the following code:
      btnText: "View Schedule",
      btnUrl: "schedule.html"
    },
    {
      title: "Our food is seriously the bomb!",
      subtitle: "What are you waiting for?",
      img: img2, // (2) update the img property with the new image variables, as shown in the following code:
      btnText: "Purchase Tickets",
      btnUrl: "tickets.html"
    },
  ];
  
  carouselSlides.forEach((slide, i) => {
    $('.carousel-inner').append(`
  <div class="carousel-item fullscreen-carousel" style="background-image: url('${slide.img}')">
    <div class="d-flex h-100 align-items-center justify-content-center carousel-caption">
        <div class="container">
          <div class="row align-items-center justify-content-center">
              <h2 class="display-4 mb-2">${slide.title}</h2>
          </div>
          <div class="row align-items-center justify-content-center"> 
            <h3>${slide.subtitle}</h3>
          </div>
          <div class=" mt-4 row align-items-center justify-content-center"> 
            <a class="btn btn-primary" href="${slide.btnUrl}">
                ${slide.btnText}
            </a>
          </div>
        </div>
    </div>
  </div>`)
  })
});