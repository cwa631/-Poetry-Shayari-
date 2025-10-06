const posts = [
           {
                title: "🌿 I Lost My Dream but Kept My Character 🌸",
                category: "poetry",
                description: `I have not won; rather, in this entire pursuit of winning, I have lost my character. Everyone has called me unfit yet I did not give up. Today, I myself admit I am unfit. You know, Sir, how I used to be; earlier, I felt proud of myself, but now even looking at myself fills me with unease. No, Sir, to achieve any dream I do not want to change who I am. I do not know whether I am right or wrong, but this is who I am this is my true self. Instead of fulfilling my dream, I should not lose my character, and so this is what I will do; even if I die, I will die with my character intact.`,
                date: "06 Oct 2025",
                time: "1:25 PM"
            },
            {
                title: "🌿 Spirituality Beyond Renunciation 🌿",
                category: "poetry",
                description: `Many people think that spirituality or bhakti means giving up everything leaving career, leaving studies, quitting jobs, becoming a monk, or sitting in a temple all day. They believe it means abandoning family and running away to Haridwar. But that's not the truth. Spiritual life is not about rejection it is about connection. We don't have to give up our career, education, or responsibilities. We simply have to add one valuable dimension Krishna to our lives. That's it`,
                date: "05 Oct 2025",
                time: "10:25 PM"
            },
        ];

        const poemContainer = document.getElementById('poemContainer');

        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'poem-card';
            card.dataset.category = post.category;

            card.innerHTML = `
        <h3 class="poem-title">${post.title}</h3>
        <p class="poem-desc">${post.description}</p>
        <button class="read-more">Read More</button>
        <div class="poem-meta">
          <i class="fa-solid fa-calendar-days"></i><span>${post.date}</span>
          <i class="fa-solid fa-clock"></i><span>${post.time}</span>
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
                buttons.forEach(b => b.classList.remove('scale-110'));
                btn.classList.add('scale-110');
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
