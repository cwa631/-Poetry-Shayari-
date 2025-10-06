const posts = [
    {
        title: "Taqat vs Pyaar 💫",
        category: "poetry",
        description: `Jahan aapko apni taqat dikhani hoti hai, wahan zyada kuch karna nahi padta shakti pradarshan karna aasan hota hai. Lekin jahan prem dikhana hota hai, wahan asli mushkil shuru hoti hai. Iska sabse sundar udaharan Bhagwan Krishna hain jab unhe apni shakti dikhani hoti hai, to wo ek chhoti si ungli par Govardhan parvat utha lete hain, lekin jab unhe prem dikhana hota hai, to uska prateek hai bansuri wo halki si bansuri bhi dono haathon se uthate hain. Kyunki taqat aasaan hai, par prem mushkil hai boss... prem mushkil hai. ❤️`,
    },
    {
        title: "🌿 Spirituality Beyond Renunciation 🌿",
        category: "poetry",
        description: `Many people think that spirituality or bhakti means giving up everything leaving career, leaving studies, quitting jobs, becoming a monk, or sitting in a temple all day. They believe it means abandoning family and running away to Haridwar. But that's not the truth. Spiritual life is not about rejection it is about connection. We don't have to give up our career, education, or responsibilities. We simply have to add one valuable dimension Krishna to our lives. That's it`,
    },
];

const poemContainer = document.getElementById('poemContainer');

posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'poem-card';
    card.dataset.category = post.category;

    // If date/time missing → generate current ones
    const now = new Date();
    const date = post.date || now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = post.time || now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

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

// Animation on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.2 });

document.querySelectorAll('.poem-card').forEach(card => observer.observe(card));

// Filter functionality
const buttons = document.querySelectorAll('.filter-btn');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.poem-card').forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
        });
    });
});

// Read More Toggle
document.addEventListener('click', e => {
    if (e.target.classList.contains('read-more')) {
        const desc = e.target.previousElementSibling;
        desc.classList.toggle('expanded');
        e.target.textContent = desc.classList.contains('expanded') ? 'Read Less' : 'Read More';
    }
});

