
 fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/aboutpages?populate=*")
    .then(res => res.json())
    .then(data => {

      // Hero Section
      document.getElementById("about-heading-one").textContent = content.headingOne || "Default Heading";
      document.getElementById("about-tagline").textContent = content.tagline || "Default tagline";

      // About Section
      document.getElementById("about-headingtwo").textContent = content.headingTwo || "Default Heading 2";
      document.getElementById("about-para-one").textContent = content.paragraphOne || "Default paragraph 1";
      document.getElementById("about-para-two").textContent = content.paragraphTwo || "Default paragraph 2";

      // Values Section
      document.getElementById("value-one").textContent = content.valueOneTitle || "Value 1 Title";
      document.getElementById("value-para-one").textContent = content.valueOnePara || "Value 1 Para";

      document.getElementById("value-two").textContent = content.valueTwoTitle || "Value 2 Title";
      document.getElementById("value-para-two").textContent = content.valueTwoPara || "Value 2 Para";

      document.getElementById("value-three").textContent = content.valueThreeTitle || "Value 3 Title";
      document.getElementById("value-para-three").textContent = content.valueThreePara || "Value 3 Para";

      document.getElementById("value-four").textContent = content.valueFourTitle || "Value 4 Title";
      document.getElementById("value-para-four").textContent = content.valueFourPara || "Value 4 Para";
    })
    .catch(err => console.error("Error fetching About Page data:", err));

  fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/aboutpages?populate=*")
  .then(res => res.json())
  .then(data => {
    
    const content = data.data[0];

    const videoData = content.aboutVideo?.[0];
    if (videoData && videoData.url) {
      const videoUrl = "https://meaningful-horse-99e25d03c1.strapiapp.com" + videoData.url;
      const videoSource = document.createElement("source");
      videoSource.src = videoUrl;
      videoSource.type = "video/mp4";
      document.getElementById("about-hero-video").appendChild(videoSource);
    }

  })
  .catch(err => console.error("Error fetching About Page data:", err));
