// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close menu when link clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Load data and initialize
let projects = [];
let testimonials = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        projects = data.projects;
        testimonials = data.testimonials;
        renderProjects();
        renderTestimonials();
    })
    .catch(error => console.error('Error loading data:', error));

// Render projects
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    filtered.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'card project-card';
        
        let metaHTML = '';
        if (project.bhk) metaHTML += `<div class="project-meta-item">🏠 ${project.bhk} BHK</div>`;
        if (project.area) metaHTML += `<div class="project-meta-item">📐 ${project.area}</div>`;
        if (project.plotSize) metaHTML += `<div class="project-meta-item">📍 ${project.plotSize}</div>`;
        if (project.room) metaHTML += `<div class="project-meta-item">🛋️ ${project.room}</div>`;

        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                ${project.featured ? '<div class="project-featured">FEATURED</div>' : ''}
                <div class="project-overlay"></div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-meta">${metaHTML}</div>
                <span class="project-style">${project.style}</span>
            </div>
        `;

        grid.appendChild(projectCard);
    });
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// Render testimonials
function renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    grid.innerHTML = testimonials.map(t => `
        <div class="card testimonial-card">
            <div class="testimonial-quote-icon">"</div>
            <div style="padding: 2rem; padding-top: 1.5rem;">
                <div class="testimonial-stars">
                    ${'⭐'.repeat(t.rating)}
                </div>
                <p class="testimonial-text">${t.text}</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">${t.name.charAt(0)}</div>
                    <div class="testimonial-author-info">
                        <h4>${t.name}</h4>
                        <p>${t.location}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const whatsappMessage = `Hi Mauli Krupa Construction! I'm ${name}. ${message}. Contact: ${phone}`;
    const whatsappUrl = `https://wa.me/917898786721?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');

    // Show toast
    showToast('Message sent! Opening WhatsApp...');
    document.getElementById('contactForm').reset();
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
