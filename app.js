/* Created by Shubham & Nitin */

let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

let themeToggler = document.querySelector(".theme-toggler");
let toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.onclick = () => {
  themeToggler.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
  themeToggler.classList.remove("active");
};

document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
  btn.onclick = () => {
    let color = btn.style.background;
    document.querySelector(":root").style.setProperty("--theme-color", color);
  };
});

var swiper = new Swiper(".home-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

var swiper = new Swiper(".review-slider", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  spaceBetween: 10,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1050: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const bookNowBtn = document.querySelector('.btn[href="#"]');
  const modal = document.getElementById('bookNowModal');
  const closeBtn = document.querySelector('.close');

  bookNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
      if (e.target == modal) {
          modal.style.display = 'none';
      }
  });

  const bookNowForm = document.getElementById('bookNowForm');
  bookNowForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(bookNowForm);
      
      fetch('book_now_handler.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'success') {
              alert(data.message);
              modal.style.display = 'none';
              bookNowForm.reset();
          } else {
              alert(data.errors ? data.errors.join('\n') : data.message);
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
      });

      document.addEventListener('DOMContentLoaded', () => {
        const bookVideoBtn = document.querySelector('.book-video-btn');
        
        bookVideoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('bookNowModal');
            modal.style.display = 'block';
        });
    });
  });
});
