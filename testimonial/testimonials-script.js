
  fetch('http://localhost:1337/api/testimonials?populate=image')
    .then(res => res.json())
    .then(data => {
      const testimonials = data.data;
      const container = document.querySelector('.swiper-wrapper');
      container.innerHTML = '';

      testimonials.forEach(item => {
        const attr = item; 

        let imgUrl = '';
        if (Array.isArray(attr.image) && attr.image.length > 0) {
          imgUrl = 'http://localhost:1337' + attr.image[0].url;
        }

        let messageText = '';
        if (Array.isArray(attr.message) && attr.message.length > 0) {
          messageText = attr.message[0].children.map(c => c.text).join(' ');
        }

        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        slide.innerHTML = `
          <div class="testimonial-card">
            <img src="${imgUrl}" alt="${attr.name}">
            <div class="testimonial-text">
              <p>"${messageText}"</p>
              <h6>${attr.name}</h6>
              <small>${attr.role}</small>
            </div>
          </div>
        `;
        container.appendChild(slide);
      });

            new Swiper(".testimonial-swiper", {
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 30,
                loop: true,
                grabCursor: true,
                effect: "coverflow",
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 2,
                    slideShadows: false,
                },
            });
    })
    .catch(err => console.error('Error fetching testimonials:', err));
