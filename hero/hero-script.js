fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/heroes?populate=*")
  .then(res => res.json())
  .then(data => {
    const logoImage = data.data[0].logo[0];
    const heroImage = data.data[0].backgroundimage[0];
    const heroImage1 = data.data[0].heroimage1[0];
    const heroImage2 = data.data[0].heroimage2[0];
    const heroImage3 = data.data[0].heroimage3[0];
    const heading = data.data[0].heroheading;
    const tagline = data.data[0].herotag;
    
    document.getElementById("hero-heading").textContent = heading || "Default Hero Heading";
    document.getElementById("hero-tagline").textContent = tagline || "Default Hero Tagline";

    const imageUrl = logoImage.url;
    const heroImageUrl = heroImage.url;
    const heroimage1 = heroImage1.url;
    const heroimage2 =  heroImage2.url;
    const heroimage3 = heroImage3.url;

    // Set it into the <img> tag
    document.getElementById("logo-img").src = imageUrl;
    document.getElementById("background-image").style.backgroundImage = `url(${heroImageUrl})`;
    document.getElementById("heroimage1").src = heroimage1;
    document.getElementById("heroimage2").src = heroimage2;
    document.getElementById("heroimage3").src = heroimage3;
  })
  .catch(error => console.error("Error loading logo image:", error));
