const menu = [
    {
      id: 1,
      title: "Tteokbokki",
      category: "Korea",
      price: 10.99,
      img: "assets/tteokbokki.jpg",
      desc: "Spicy rice cakes served with fish cake.",
    },
    {
      id: 2,
      title: "Chicken Ramen",
      category: "Japan",
      price: 7.99,
      img: "assets/chicken-ramen.jpg",
      desc: "Chicken noodle soup served with vegetables such as soybeans and green onions. Optionally, you can ask for an egg.",
    },
    {
      id: 3,
      title: "Bibimbap",
      category: "Korea",
      price: 8.99,
      img: "assets/bibimbap.jpg",
      desc: "Boiled vegetables served with special hot sauce.",
    },
    {
      id: 4,
      title: "Dan Dan Mian",
      category: "China",
      price: 5.99,
      img: "assets/Dan-Dan-Noodles.jpg",
      desc: "Dan dan noodles served with green onions.",
    },
    {
      id: 5,
      title: "Yangzhou Fried Rice",
      category: "China",
      price: 12.99,
      img: "assets/Yangzhou-Fried-Rice.jpg",
      desc: "Yangzhou-style fried rice served with beans and pickles.",
    },
    {
      id: 6,
      title: "Onigiri",
      category: "Japan",
      price: 9.99,
      img: "assets/Onigiri.jpg",
      desc: "Rice sandwich served with soy sauce.",
    },
    {
      id: 7,
      title: "Jajangmyeon",
      category: "Korea",
      price: 15.99,
      img: "assets/Jajangmyeon.jpg",
      desc: "Black bean sauce noodles served with green onions.",
    },
    {
      id: 8,
      title: "Ma Yi Shang Shu",
      category: "China",
      price: 12.99,
      img: "assets/Ma-Yi-Shang-Shu.jpg",
      desc: "Hot pepper sauce noodles served with soybeans and onions.",
    },
    {
      id: 9,
      title: "Dorayaki",
      category: "Japan",
      price: 3.99,
      img: "assets/Dorayaki.jpg",
      desc: "Red bean paste dessert served with honey.",
    },
    {
      id: 10,
      title: "Kimchi Stew",
      category: "Korea",
      price: 11.99,
      img: "assets/kimchi-stew.jpg",
      desc: "Spicy kimchi stew with tofu and pork.",
    },
    {
      id: 11,
      title: "Sushi Platter",
      category: "Japan",
      price: 18.99,
      img: "assets/sushi-platter.jpg",
      desc: "Assorted sushi served with soy sauce and wasabi.",
    },
    {
      id: 12,
      title: "Mapo Tofu",
      category: "China",
      price: 9.99,
      img: "assets/mapo-tofu.jpg",
      desc: "Spicy Sichuan tofu dish with minced meat.",
    },
    {
      id: 13,
      title: "Tempura Udon",
      category: "Japan",
      price: 12.49,
      img: "assets/tempura-udon.jpg",
      desc: "Udon noodle soup served with tempura shrimp and vegetables.",
    },
    {
      id: 14,
      title: "Sweet and Sour Pork",
      category: "China",
      price: 10.99,
      img: "assets/sweet-sour-pork.jpg",
      desc: "Crispy pork stir-fried with pineapple and bell peppers in sweet and sour sauce.",
    },
    {
      id: 15,
      title: "Katsu Curry",
      category: "Japan",
      price: 13.99,
      img: "assets/katsu-curry.jpeg",
      desc: "Breaded pork cutlet served with Japanese curry and rice.",
    },
    {
      id: 16,
      title: "Bulgogi",
      category: "Korea",
      price: 14.99,
      img: "assets/bulgogi.jpg",
      desc: "Grilled marinated beef served with lettuce wraps.",
    },
    {
      id: 17,
      title: "Peking Duck",
      category: "China",
      price: 22.99,
      img: "assets/peking-duck.jpg",
      desc: "Roasted duck served with pancakes, cucumber, and hoisin sauce.",
    },
    {
      id: 18,
      title: "Miso Soup",
      category: "Japan",
      price: 4.99,
      img: "assets/miso-soup.jpg",
      desc: "Traditional Japanese soup with tofu and seaweed.",
    },
    {
      id: 19,
      title: "Japchae",
      category: "Korea",
      price: 9.99,
      img: "assets/japchae.jpg",
      desc: "Stir-fried glass noodles with vegetables and beef.",
    },
  ]

// Select DOM Elements
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// Function to Display Menu Items
function displayMenuItems(menuItems) {
  let displayMenu = menuItems
    .map((item) => {
      return `
        <div class="menu-item">
        <img src="${item.img}" class="photo" alt="${item.title}" />
          <div class="menu-info">
              <div class="menu-title">
                <h5>${item.title}</h5>
                <h5>$${item.price.toFixed(2)}</h5>
              </div>
              <p class="menu-text">${item.desc}</p>
          </div>
        </div>
      `;
    })
    .join("");
  sectionCenter.innerHTML = displayMenu;
}

// Function to Display Filter Buttons
function displayMenuButtons() {
  // Get unique categories
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["All"],
  );

  // Create buttons
  const categoryBtns = categories
    .map((category) => {
      return `
        <button type="button" class="btn btn-outline-dark mx-2 my-1" data-category="${category}">
          ${category}
        </button>
      `;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;

  // Select all buttons
  const filterBtns = btnContainer.querySelectorAll(".btn");

  // Add Event Listeners to Buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.category;
      const menuCategory = category === "All" ? menu : menu.filter((menuItem) => menuItem.category === category);
      displayMenuItems(menuCategory);
    });
  });
}

// Initialize Display
window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu);
  displayMenuButtons();
});
