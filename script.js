// 🌟 Post List
const posts = [
    {
        id: 1,
        title: "Taqat vs Pyaar 💫",
        category: "poetry",
        description: `
Jahan pe aapko apni <span class="highlight">taqat</span> dikhani ho,<br>
usme zyada kuch nahi karna hota hai.<br>
Jahan <span class="highlight">shakti pradarshan</span> karna hota hai,<br>
usme zyada kuch nahi lagta hai — wo aasan hai.<br>
Lekin jahan <span class="love">prem</span> dikhana hota hai, wo mushkil hai.<br><br>

Iska example <span class="divine">Bhagwan Krishna</span> hain —<br>
jab unhe apni <span class="highlight">shakti</span> dikhani hoti hai,<br>
to wo ek chhoti ungli par <span class="highlight">Govardhan Parvat</span> utha lete hain.<br>
Aur jab unhe <span class="love">prem</span> dikhana hota hai,<br>
to <span class="highlight">prem</span> ka prateek kya hai? <span class="divine">Bansuri</span>.<br>
Wo halki si bansuri bhi dono haathon se uthaate hain.<br><br>

<span class="love-strong">Prem mushkil hai boss.</span><br>
<span class="love-strong">Prem mushkil hai. ❤️</span>`,
        date: "05 Oct 2025",
        time: "11:11 PM",
    },
    {
        id: 2,
        title: "🌿 Spirituality Beyond Renunciation 🌿",
        category: "poetry",
        description: `
Many people think that spirituality or bhakti means giving up everything —<br>
leaving career, leaving studies, quitting jobs, becoming a monk, or sitting in a temple all day.<br><br>
They believe it means abandoning family and running away to Haridwar.<br>
But that's not the truth.<br>
Spiritual life is not about <span class="highlight">rejection</span> — it is about <span class="love">connection</span>.<br><br>
We don't have to give up our <span class="highlight">career</span>, <span class="highlight">education</span>, or <span class="highlight">responsibilities</span>.<br>
We simply have to add one valuable dimension — <span class="divine">Krishna</span> — to our lives.<br>
That's it. 💫`,
        date: "04 Oct 2025",
        time: "11:00 PM",
    },
];

// 🌟 Smart Date-Time Function (Permanent per post)
function getPermanentDateTime(post) {
    const key = `post_${post.id}_datetime`;
    const saved = localStorage.getItem(key);

    if (saved) return JSON.parse(saved); // already exists → use saved

    // if fixed date/time exists in post data → save permanently
    if (post.date && post.time) {
        localStorage.setItem(key, JSON.stringify({ date: post.date, time: post.time }));
        return { date: post.date, time: post.time };
    }

    // for new post without date/time → auto-generate & store permanently
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });

    localStorage.setItem(key, JSON.stringify({ date, time }));
    return { date, time };
}

// 🌸 Display Posts
const poemContainer = document.getElementById('poemContainer');

posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'poem-card';
    card.dataset.category = post.category;

    const { date, time } = getPermanentDateTime(post);

    card.innerHTML = `
    <h3 class="poem-title">${post.title}</h3>
    <p class="poem-desc">${post.description}</p>
    <button class="read-more">Read More</button>
    <div class="poem-meta">
      <i class="fa-solid fa-calendar-days"></i><span>${date}</span>
      <i class="fa-solid fa-clock"></i><span>${time}</span>
    </div>
    <div class="signature">— ᗩ𝐚𝐝𝐢❣️</div>
  `;

    poemContainer.appendChild(card);
});

// 🌟 Animation on scroll
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll('.poem-card').forEach(card => observer.observe(card));

// 🌈 Filter functionality with dynamic label change
const buttons = document.querySelectorAll('.filter-btn');
const mainFilterBtn = document.querySelector('.main-filter');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // 🔹 Show/Hide poems by category
        document.querySelectorAll('.poem-card').forEach(card => {
            card.style.display =
                filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
        });

        // 🔹 Change main filter button label dynamically
        if (filter === 'all') {
            mainFilterBtn.innerHTML = `<i class="fa-solid fa-feather-pointed"></i> All ▾`;
        } else if (filter === 'shayari') {
            mainFilterBtn.innerHTML = `<i class="fa-solid fa-feather-pointed"></i> Shayari ▾`;
        } else if (filter === 'poetry') {
            mainFilterBtn.innerHTML = `<i class="fa-solid fa-feather-pointed"></i> Poetry ▾`;
        }
    });
});

// 💬 Read More Toggle
document.addEventListener('click', e => {
    if (e.target.classList.contains('read-more')) {
        const desc = e.target.previousElementSibling;
        desc.classList.toggle('expanded');
        e.target.textContent = desc.classList.contains('expanded')
            ? 'Read Less'
            : 'Read More';
    }
});
