
fetch('http://localhost:1337/api/brandheading')
    .then(res => res.json())
    .then(data => {
        const heading = data.data.heading || 'Our Brand';
        document.getElementById('brand-heading-desktop').textContent = heading;//Can create an classs elector instead..do it at teh end
        document.getElementById('brand-heading-mobile').textContent = heading;
    })
    .catch(err => {
        console.error('Error fetching brand heading:', err);
    });

fetch('http://localhost:1337/api/brands?populate=images')
    .then(res => res.json())
    .then(data => {
        const brands = data.data;
        const desktopContainer = document.getElementById('brands-desktop');
        const mobileContainer = document.getElementById('brands-mobile');

        // Inject into Desktop (3 columns per row)
        brands.forEach((brand) => {
            const images = brand.images || brand.attributes.images || [];

            images.forEach(image => {
                const imgUrl = image.url || '';
                const name = image.name || 'Brand';
                const fullUrl = `http://localhost:1337${imgUrl}`;

                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
            <div class="card brand-card">
              <img src="${fullUrl}" alt="${name}" class="img-fluid">
            </div>
          `;
                desktopContainer.appendChild(col);
            });
        });

        // Inject into Mobile Swiper (2x2 grid per slide)
        let mobileImages = [];

        brands.forEach((brand) => {
            const images = brand.images || brand.attributes.images || [];
            mobileImages.push(...images);
        });

        for (let i = 0; i < mobileImages.length; i += 2) {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            const group = mobileImages.slice(i, i + 2);
            group.forEach(image => {
                const imgUrl = image.url || '';
                const name = image.name || 'Brand';
                const fullUrl = `http://localhost:1337${imgUrl}`;

                slide.innerHTML += `
            <div class="brand-card">
              <img src="${fullUrl}" alt="${name}">
            </div>
          `;
            });

            mobileContainer.appendChild(slide);
        }
        // Initialize Swiper
        new Swiper('.brand-swiper', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 3000, // 3 seconds
                disableOnInteraction: false,
            },
        });
    })
    .catch(err => {
        console.error('Error fetching brands from Strapi:', err);
    });
