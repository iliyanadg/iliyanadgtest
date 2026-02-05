const posts = [
  {
    id: "p1",
    title: "Teaser Gold Night ✨",
    desc: "Un’anteprima elegante: set, luci e dettagli in black & gold.",
    date: "Feb 05, 2026",
    category: "video",
    access: "free",
    tags: ["bold", "fast"],
    img: "https://images.unsplash.com/photo-1520975958225-2cfe93f1e1c5?w=1200&h=800&fit=crop"
  },
  {
    id: "p2",
    title: "Backstage: dettagli luxury",
    desc: "Close-up, texture, vibe premium: il dietro le quinte che non vedi altrove.",
    date: "Feb 02, 2026",
    category: "photo",
    access: "vip",
    tags: ["luxury", "minimal"],
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200&h=800&fit=crop"
  },
  {
    id: "p3",
    title: "Audio note — mood & confessioni",
    desc: "Una nota vocale intima: atmosfera, voce e pensieri.",
    date: "Jan 28, 2026",
    category: "audio",
    access: "vip",
    tags: ["minimal"],
    img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1200&h=800&fit=crop"
  },
  {
    id: "p4",
    title: "Mini story: ‘La stanza dorata’",
    desc: "Testo breve, stile diario. Una scena, un dettaglio, un invito.",
    date: "Jan 20, 2026",
    category: "writing",
    access: "free",
    tags: ["minimal", "luxury"],
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop"
  },
  {
    id: "p5",
    title: "VIP Cut: versione estesa 🔒",
    desc: "Solo per VIP: più lungo, più vicino, più intenso.",
    date: "Jan 10, 2026",
    category: "video",
    access: "vip",
    tags: ["bold", "luxury"],
    img: "https://images.unsplash.com/photo-1520975682031-a9b37718886c?w=1200&h=800&fit=crop"
  },
  {
    id: "p6",
    title: "Foto set: silhouette",
    desc: "Una selezione di scatti in controluce, puliti e magnetici.",
    date: "Dec 22, 2025",
    category: "photo",
    access: "free",
    tags: ["minimal", "fast"],
    img: "https://images.unsplash.com/photo-1520975953821-18c73a94c1b4?w=1200&h=800&fit=crop"
  },
];

const els = {
  grid: document.getElementById("postsGrid"),
  q: document.getElementById("q"),
  category: document.getElementById("category"),
  access: document.getElementById("access"),
  reset: document.getElementById("reset"),
  tags: Array.from(document.querySelectorAll(".tag")),
  year: document.getElementById("year"),
  sub: document.getElementById("sub"),
  email: document.getElementById("email"),
  subOk: document.getElementById("subOk"),
};

let activeTag = null;

function pillForAccess(access){
  if (access === "vip") return `<span class="pill pill--vip">VIP • Join to Unlock</span>`;
  return `<span class="pill">Free</span>`;
}

function render(list){
  els.grid.innerHTML = list.map(p => `
    <article class="post">
      <div class="post__thumb">
        <img src="${p.img}" alt="${p.title}">
      </div>
      <div class="post__body">
        <div class="post__meta">
          <span>${p.date}</span>
          ${pillForAccess(p.access)}
        </div>
        <h3 class="post__title">${p.title}</h3>
        <p class="post__desc">${p.desc}</p>
      </div>
    </article>
  `).join("");
}

function applyFilters(){
  const q = (els.q.value || "").toLowerCase().trim();
  const cat = els.category.value;
  const acc = els.access.value;

  const filtered = posts.filter(p => {
    const matchesQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q);

    const matchesCat = (cat === "all") || (p.category === cat);
    const matchesAcc = (acc === "all") || (p.access === acc);
    const matchesTag = !activeTag || p.tags.includes(activeTag);

    return matchesQ && matchesCat && matchesAcc && matchesTag;
  });

  render(filtered);
}

function setActiveTag(tag){
  activeTag = tag;
  els.tags.forEach(b => {
    b.classList.toggle("is-active", b.dataset.tag === tag);
  });
  applyFilters();
}

function resetAll(){
  els.q.value = "";
  els.category.value = "all";
  els.access.value = "all";
  activeTag = null;
  els.tags.forEach(b => b.classList.remove("is-active"));
  applyFilters();
}

els.q.addEventListener("input", applyFilters);
els.category.addEventListener("change", applyFilters);
els.access.addEventListener("change", applyFilters);
els.reset.addEventListener("click", resetAll);

els.tags.forEach(btn => {
  btn.addEventListener("click", () => {
    const t = btn.dataset.tag;
    if (activeTag === t) setActiveTag(null);
    else setActiveTag(t);
  });
});

els.year.textContent = new Date().getFullYear();

els.sub.addEventListener("click", () => {
  const v = (els.email.value || "").trim();
  if (!v) {
    els.subOk.textContent = "Inserisci una mail 🙂";
    return;
  }
  els.subOk.textContent = "Perfetto: sei iscrittə (demo).";
  els.email.value = "";
});

render(posts);
