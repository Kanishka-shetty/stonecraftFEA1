fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/heroabouts/footers")
  .then(res => res.json())
  .then(data => {
    const footerData = data.data[0];
    const footer = footerData.attributes || footerData;

//Company Name
const companyName = footer.CompanyName;
const companyNameElement = document.getElementById("company-name");
if(companyNameElement && companyName) {
  companyNameElement.innerHTML = companyName.replace(/\n/g, "<br>");
}

const tagline = footer.CompanyTag;
const taglineElement = document.getElementById("company-tagline");
if(taglineElement && tagline) {
  taglineElement.innerHTML = tagline.replace(/\n/g, "<br>");
}

const branchone = footer.Branch1Title;
const branchonelement = document.getElementById("branch1-title");
if(branchonelement && branchone) {
  branchonelement.innerHTML = branchone.replace(/\n/g, "<br>");
} 

const branchtwo = footer.Branch2Title;
const branchtwoelement = document.getElementById("branch2-title");
if(branchtwoelement && branchtwo) {
  branchtwoelement.innerHTML = branchtwo.replace(/\n/g, "<br>");
} 
    // Phone
    const phoneone = footer.PhoneOne;
    const phoneElementone = document.getElementById("phoneOne");
    if (phoneElementone && phoneone) {
      phoneElementone.textContent = phoneone;
      phoneElementone.href = `tel:${phoneone}`;
    }

    const phonetwo = footer.PhoneTwo;
    const phoneElementtwo = document.getElementById("phoneTwo");
    if (phoneElementtwo && phonetwo) {
      phoneElementtwo.textContent = phonetwo;
      phoneElementtwo.href = `tel:${phonetwo}`;
    }
    // Email
    const emailOne = footer.EmailOne;
    const emailElementone = document.getElementById("emailOne");
    if (emailElementone && emailOne) {
      emailElementone.textContent = emailOne;
      emailElementone.href = `mailto:${emailOne}`;
    }

     const emailtwo = footer.EmailTwo;
    const emailElementtwo = document.getElementById("emailTwo");
    if (emailElementtwo && emailtwo) {
      emailElementtwo.textContent = emailtwo;
      emailElementtwo.href = `mailto:${emailtwo}`;
    }

    // Address
    const address = footer.AddressOne;
    const addressElement = document.getElementById("addressOne");
    if (addressElement && address) {
      addressElement.innerHTML = address.replace(/\n/g, "<br>");
    }

    const addresstwo = footer.Addresstwo;
    const addressElementtwo = document.getElementById("addressTwo");
    if (addressElementtwo && addresstwo) {
      addressElementtwo.innerHTML = addresstwo.replace(/\n/g, "<br>");
    }
//Map
    const mapLink = footer.branch1Map;
    const mapElement = document.getElementById("branch1-map");
    if (mapElement && mapLink) {
      mapElement.src = mapLink;
    }

    const mapLinktwo = footer.branch2Map;
    const mapElementtwo = document.getElementById("branch2-map");
    if (mapElementtwo && mapLinktwo) {
      mapElementtwo.src = mapLinktwo;
    }

    //Social Media Icons
    const facebookLink = footer.FacebookLink;
    const facebookElement = document.getElementById("facebook-link");
    if (facebookElement && facebookLink) {
      facebookElement.href = facebookLink;
    }

    const instagramLink = footer.InstagramLink;
    const instagramElement = document.getElementById("instagram-link");   
if (instagramElement && instagramLink) {
      instagramElement.href = instagramLink;
}

const twitterLink = footer.TwitterLink;
const twitterElement = document.getElementById("twitter-link"); 
if (twitterElement && twitterLink) {
      twitterElement.href = twitterLink;
}

const whatsappLink = footer.WhatsappLink;
const whatsappElement = document.getElementById("whatsapp-link");
if (whatsappElement && whatsappLink) {
      whatsappElement.href = whatsappLink;
}

  })
  .catch(err => console.error("Error loading footer data:", err));
