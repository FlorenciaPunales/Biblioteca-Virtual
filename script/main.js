Vue.createApp({
  data(){
      return {
         
      }
  },
  created(){
    
      
  },
  mounted(){
    
      
  },
  methods:{
    
      
  }
}).mount('#app')



 window.onload = () =>{
    if(window.scrollY > 80){
     document.querySelector('.header .header-2').classList.add('active');

     }else{
        document.querySelector('.header .header-2').classList.remove('active');

     }
     fadeOute();
 }

function loader(){
   document.querySelector('.loader-container').classList.add('active');

}
function fadeOute(){
    setTimeout(loader,5000)
}

// swiper
// var swiper = new Swiper(".books-slider", {
//     loop:true,
//     centeredSlides: true,
//     autoplay: {
//       delay: 2500,
//       disableOnInteraction: false,
//     },
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1024: {
//         slidesPerView: 3,
//       },
//     },
//   });


//   var swiper = new Swiper(".featured-slider", {
//     spaceBetween: 10,
//     loop:true,
//     centeredSlides: true,
//     autoplay: {
//       delay: 2900,
//       disableOnInteraction: false,
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       450: {
//         slidesPerView: 2,
//       },
//       768: {
//         slidesPerView: 3,
//       },
//       1024: {
//         slidesPerView: 4,
//       },
//     },
//   });


 
//   var swiper = new Swiper(".arrivals-slider", {
//     spaceBetween: 10,
//     loop:true,
//     centeredSlides: true,
//     autoplay: {
//       delay: 4500,
//       disableOnInteraction: false,
//     },
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1024: {
//         slidesPerView: 3,
//       },
//     },
//   });


//   var swiper = new Swiper(".reviews-slider", {
//     spaceBetween: 10,
//     grabCursor:true,
//     loop:true,
//     centeredSlides: true,
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false,
//     },
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1024: {
//         slidesPerView: 3,
//       },
//     },
//   });


//   var swiper = new Swiper(".blogs-slider", {
//     spaceBetween: 10,
//     grabCursor:true,
//     loop:true,
//     centeredSlides: true,
//     autoplay: {
//       delay: 4500,
//       disableOnInteraction: false,
//     },
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1024: {
//         slidesPerView: 3,
//       },
//     },
//   });
  /*emergente*/
  // const toastTrigger = document.getElementById('liveToastBtn')
  // const toastLiveExample = document.getElementById('liveToast')
  // if (toastTrigger) {
  //   toastTrigger.addEventListener('click', () => {
  //     const toast = new bootstrap.Toast(toastLiveExample)
  
  //     toast.show()
  //   })
  // }
