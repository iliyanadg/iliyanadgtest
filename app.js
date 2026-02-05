// ====== Pricing toggle ======
const annualBtn = document.querySelector('[data-billing="annual"]');
const monthlyBtn = document.querySelector('[data-billing="monthly"]');

const priceValue = document.getElementById("priceValue");
const pricePeriod = document.getElementById("pricePeriod");
const priceSub = document.getElementById("priceSub");
const buyBtn = document.getElementById("buyBtn");

// Metti qui i tuoi link (quando li hai)
const LINKS = {
  annual: "https://example.com/checkout-annual",
  monthly: "https://example.com/checkout-monthly"
};

function setBilling(mode){
  annualBtn.classList.toggle("is-active", mode === "annual");
  monthlyBtn.classList.toggle("is-active", mode === "monthly");

  if(mode === "annual"){
    priceValue.textContent = "79";
    pricePeriod.textContent = "/year";
    priceSub.textContent = "7-day free trial • Cancel anytime";
    buyBtn.href = LINKS.annual;
  }else{
    priceValue.textContent = "9";
    pricePeriod.textContent = "/month";
    priceSub.textContent = "7-day free trial • Cancel anytime";
    buyBtn.href = LINKS.monthly;
  }
}
annualBtn.addEventListener("click", () => setBilling("annual"));
monthlyBtn.addEventListener("click", () => setBilling("monthly"));
setBilling("annual");

// ====== Posts (demo) + Search ======
const POSTS = [
  { title: "Behind the scenes — set 01", date: "Jan 14, 2026", duration: "04:12", tag: "Video", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80" },
  { title: "Private drop — members only", date: "Jan 09, 2026", duration: "07:31", tag: "Video", img: "https://images.unsplash.com/photo-1524503033411-f7a2fe8c7f82?auto=format&fit=crop&w=1200&q=80" },
  { title: "Exclusive photo set — midnight", date: "Jan 02, 2026", duration: "12 photos", tag: "Photos", img: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1200&q=80" },
  { title: "Extended cut — full version", date: "Dec 28, 2025", duration: "09:05", tag: "Video", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80" },
  { title: "Weekly drop — archive update", date: "Dec 20, 2025", duration: "03:44", tag: "Update", img: "https://images.unsplash.com/photo-1520975958225-6b76f02c91f8?auto=format&fit=crop&w=1200&q=80" },
  { title: "Deleted scenes — raw moments", date: "Dec 12, 2025", duration: "06:18", tag: "Video", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80" },
];

const postsGrid = document.getElementById("postsGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

function card(post){
  const el = document.createElement("article");
  el.className = "card";
  el.innerHTML = `
    <div class="thumb">
      <img src="${post.img}" alt="${post.title}">
      <div class="badge">${post.tag}</div>
      <div class="lock">🔒</div>
    </div>
    <div class="card__body">
      <h3 class="card__title">${post.title}</h3>
      <div class="card__meta">
        <span>${post.date}</span>
        <span>${post.duration}</span>
      </div>
    </div>
  `;
  el.addEventListener("click", () => {
    alert("🔒 Join to unlock (demo). Collega qui la tua area VIP/checkout.");
  });
  return el;
}

function render(list){
  postsGrid.innerHTML = "";
  list.forEach(p => postsGrid.appendChild(card(p)));
  noResults.classList.toggle("hidden", list.length !== 0);
}
render(POSTS);

searchInput.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = POSTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.tag.toLowerCase().includes(q)
  );
  render(filtered);
});

// year
document.getElementById("year").textContent = new Date().getFullYear();
