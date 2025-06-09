const API_URL = 'http://localhost:1337/api/brands?populate=images';

async function loadBrands() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();

        const brandData = data.data[0];
        if (!brandData) return;

        const heading = brandData.heading || 'Our Brands';
        const brandHeadingEl = document.getElementById('brand-heading');
        if (brandHeadingEl) brandHeadingEl.textContent = heading;

        const images = brandData.images || [];

        const brandGridEl = document.getElementById('brand-grid');
        if (brandGridEl) {
            brandGridEl.innerHTML = '';
            images.forEach(imgObj => {
                // const imgUrl = 'http://localhost:1337' + (imgObj.formats?.thumbnail?.url || '');
                const imgUrl = 'http://localhost:1337' + imgObj.url; /*just trying */

                const altText = imgObj.alternativeText || 'Brand Logo';

                const colDiv = document.createElement('div');
                colDiv.className = 'col';

                colDiv.innerHTML = `
          <div class="bg-secondary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center p-4" style="height: 120px;">
            <img src="${imgUrl}" alt="${altText}" class="img-fluid" style="max-height: 80px;" />
          </div>
        `;

                brandGridEl.appendChild(colDiv);
            });
        }

        const brandCarouselInner = document.querySelector('#brand-carousel .carousel-inner');
        const brandCarouselIndicators = document.querySelector('#brand-carousel .carousel-indicators');

        if (brandCarouselInner && brandCarouselIndicators) {
            brandCarouselInner.innerHTML = '';
            brandCarouselIndicators.innerHTML = '';

            const slidesCount = Math.ceil(images.length / 2);

            for (let i = 0; i < slidesCount; i++) {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'carousel-item' + (i === 0 ? ' active' : '');

                const logosDiv = document.createElement('div');
                logosDiv.className = 'd-flex flex-column gap-3';

                for (let j = 0; j < 2; j++) {
                    const imgIndex = i * 2 + j;
                    if (imgIndex >= images.length) break;

                    const imgObj = images[imgIndex];
                    // const imgUrl = 'http://localhost:1337' + (imgObj.formats?.thumbnail?.url || '');
                    const imgUrl = 'http://localhost:1337' + imgObj.url;

                    const altText = imgObj.alternativeText || 'Brand Logo';

                    const logoDiv = document.createElement('div');
                    logoDiv.className = 'bg-secondary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center p-3';
                    logoDiv.style.height = '100px';
                    logoDiv.innerHTML = `<img src="${imgUrl}" alt="${altText}" class="img-fluid" style="max-height: 80px;" />`;

                    logosDiv.appendChild(logoDiv);
                }

                slideDiv.appendChild(logosDiv);
                brandCarouselInner.appendChild(slideDiv);

                const indicatorBtn = document.createElement('button');
                indicatorBtn.type = 'button';
                indicatorBtn.setAttribute('data-bs-target', '#brand-carousel');
                indicatorBtn.setAttribute('data-bs-slide-to', i.toString());
                indicatorBtn.setAttribute('aria-label', `Slide ${i + 1}`);
                if (i === 0) {
                    indicatorBtn.className = 'active';
                    indicatorBtn.setAttribute('aria-current', 'true');
                }
                brandCarouselIndicators.appendChild(indicatorBtn);
            }
        }
    } catch (error) {
        console.error('Failed to load brands:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadBrands);
