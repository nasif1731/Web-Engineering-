
const literaryWorks = [
    {
      title: "The House Maid",
      price: 500,
      coverArt: "./The HouseMaid.jpg",
      synopsis:
        "A gripping psychological thriller where a woman uncovers dark secrets while working as a housemaid in a wealthy family's home.",
    },
    {
      title: "Verity",
      price: 600,
      coverArt: "./verity.jpg",
      synopsis:
        "A struggling writer discovers an autobiography filled with shocking confessions hidden within the home of a famous novelist.",
    },
    {
      title: "Never Lie",
      price: 400,
      coverArt: "./neverLie.jpg",
      synopsis:
        "Newlyweds Tricia and Ethan are searching for the house of their dreams.But when they visit the remote manor that once belonged to Dr. Adrienne Hale, a renowned psychiatrist who vanished without a trace four years earlier, a violent winter storm traps them at the estate… with no chance of escape until the blizzard comes to an end.",
    },
  ];

  function craftBookCard(book) {
    const cardShell = document.createElement("div");
    cardShell.className = "book-card";

    const cardMechanism = document.createElement("div");
    cardMechanism.className = "book-inner";

    const frontCover = document.createElement("div");
    frontCover.className = "book-page";

    const coverImage = document.createElement("img");
    coverImage.className = "book-cover";
    coverImage.src = book.coverArt;
    coverImage.alt = `Cover artwork for ${book.title}`;

    const titleHeading = document.createElement("h2");
    titleHeading.className = "title";
    titleHeading.textContent = book.title;

    const priceDisplay = document.createElement("p");
    priceDisplay.className = "price-tag";
    priceDisplay.textContent = `Rs.${book.price.toFixed(2)}`;

    frontCover.append(coverImage, titleHeading, priceDisplay);

    const backCover = document.createElement("div");
    backCover.className = "book-page back-cover";

    const descriptionText = document.createElement("p");
    descriptionText.className = "synopsis";
    descriptionText.textContent = book.synopsis;

    const purchaseButton = document.createElement("button");
    purchaseButton.className = "purchase-btn";
    purchaseButton.textContent = "Add to Cart";
    purchaseButton.onclick = () => console.log(`Selected: ${book.title}`);

    backCover.append(descriptionText, purchaseButton);

    cardMechanism.append(frontCover, backCover);
    cardShell.appendChild(cardMechanism);
    return cardShell;
  }

  function displayCollection() {
    const shelf = document.querySelector(".book-collection");
    literaryWorks.forEach((book) => {
      shelf.appendChild(craftBookCard(book));
    });
  }

  function switchReadingMode() {
    const pageBody = document.body;
    const modeSwitch = document.querySelector(".reading-mode");

    pageBody.classList.toggle("midnight-library");

    const nightMode = pageBody.classList.contains("midnight-library");
    modeSwitch.textContent = nightMode ? "☀️ Light Mode" : "🌙 Night Mode";
    modeSwitch.setAttribute(
      "aria-label",
      nightMode ? "Switch to daylight mode" : "Switch to nighttime mode"
    );
  }

  displayCollection();
