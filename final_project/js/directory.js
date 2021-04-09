const directoryPath = "data/directory.json";

fetch(directoryPath)
  .then((response) => response.json())
  .then((jsonObject) => {
    const businesses = jsonObject.businesses;
    businesses.forEach((business) => {
      let card = document.createElement("div");
      let name = document.createElement("h3");
      let address = document.createElement("p");
      let description = document.createElement("p");
      let level = document.createElement("p");
      let phone = document.createElement("a");
      let email = document.createElement("a");
      let website = document.createElement("a");
      let logo = document.createElement("img");
      let div = document.createElement("div");

      name.textContent = business.name;
      address.textContent = business.address;
      description.textContent = business.description;
      level.textContent = business.level;

      phone.textContent = business.phone;
      phone.href = "tel:" + business.phone;

      email.textContent = business.email;
      email.href = "mailto:" + business.email;

      website.textContent = business.website;
      website.href = business.website;

      logo.setAttribute("src", "images/" + business.logo);
      logo.setAttribute("alt", business.name);

      div.appendChild(name);
      div.appendChild(address);
      div.appendChild(description);
      div.appendChild(phone);
      div.appendChild(email);
      div.appendChild(website);
      div.appendChild(level);

      card.appendChild(div);
      card.appendChild(logo);

      document.getElementById("directory").appendChild(card);
    });
  });
