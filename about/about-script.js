fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/aboutpages?populate=*")
  .then(res => res.json())
  .then(data => {
    const content = data.data[0];

    // Access the text content correctly
    const about = content;

    document.getElementById("about-heading-one").textContent = about.headingOne || "Default Heading";
    document.getElementById("about-tagline").textContent = about.tagline || "Default tagline";
    document.getElementById("about-headingtwo").textContent = about.headingTwo || "Default Heading 2";
    document.getElementById("about-para-one").textContent = about.paragraphOne || "Default paragraph 1";
    document.getElementById("about-para-two").textContent = about.paragraphTwo || "Default paragraph 2";

    document.getElementById("value-one").textContent = about.valueOneTitle || "Value 1 Title";
    document.getElementById("value-para-one").textContent = about.valueOnePara || "Value 1 Para";
    document.getElementById("value-two").textContent = about.valueTwoTitle || "Value 2 Title";
    document.getElementById("value-para-two").textContent = about.valueTwoPara || "Value 2 Para";
    document.getElementById("value-three").textContent = about.valueThreeTitle || "Value 3 Title";
    document.getElementById("value-para-three").textContent = about.valueThreePara || "Value 3 Para";
    document.getElementById("value-four").textContent = about.valueFourTitle || "Value 4 Title";
    document.getElementById("value-para-four").textContent = about.valueFourPara || "Value 4 Para";

    // Load the video
    const video = about.aboutVideo?.[0];
    if (video?.url) {
      const videoSource = document.createElement("source");
      videoSource.src = video.url;
      videoSource.type = "video/mp4";
      document.getElementById("about-hero-video").appendChild(videoSource);
    }
  })
  
  .catch(err => console.error("Error fetching About Page data:", err));
