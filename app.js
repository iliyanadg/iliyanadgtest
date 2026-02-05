const plans = document.querySelectorAll(".plan");
const joinBtn = document.getElementById("joinBtn");
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

let selected = "annual";

// metti qui i tuoi link checkout reali
const CHECKOUT = {
  annual: "#",
  monthly: "#"
};

plans.forEach(p => {
  p.addEventListener("click", () => {
    plans.forEach(x => x.classList.remove("is-active"));
    p.classList.add("is-active");
    selected = p.dataset.plan;
    joinBtn.href = CHECKOUT[selected];
  });
});

joinBtn.href = CHECKOUT[selected];

// posts demo (colonna singola come screenshot)
const POSTS = [
  {
    title: "Sunset Magic Session • Mykonos Riviera, Greece",
    meta: "Exclusive Preview Video • Members-only • Join to unlock",
    img: "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "You Peep 👀",
    meta: "Exclusive Preview Video • Members-only • Join to unlock",
    img: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Guitar session — studio night",
    meta: "Exclusive Preview Video • Members-only • Join to unlock",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Live — Saint Tropez",
    meta: "Exclusive Preview Video • Members-only • Join to unlock",
    img: "https://images.unsplash.com/photo-1520975958225-6b76f02c91f8?auto=format&fit=crop&w=1400&q=80"
  }
];

const postsList = document.getElementById("postsList");
const noPosts = document.getElementById("noPosts");
const searchInput = document.getElementById("searchInput");

function render(list){
  postsList.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "postCard";
    card.innerHTML = `
      <div class="postThumb">
        <img src="${p.img}" alt="${p.title}">
        <div class="lockOverlay">
          <div class="lockPill">Join to unlock</div>
        </div>
      </div>
      <div class="postBody">
        <h4 class="postTitle">${p.title}</h4>
        <div class="postMeta">${p.meta}</div>
      </div>
    `;
    card.addEventListener("click", () => {
      alert("🔒 Join to unlock (demo). Collega qui il checkout o l’area VIP.");
    });
    postsList.appendChild(card);
  });
  noPosts.classList.toggle("hidden", list.length !== 0);
}

render(POSTS);

searchInput.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = POSTS.filter(p =>
    p.title.toLowerCase().includes(q) || p.meta.toLowerCase().includes(q)
  );
  render(filtered);
});
