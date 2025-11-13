const menuToggle = document.getElementById("menu-toggle");
const sideNav = document.querySelector(".side-nav");

menuToggle.addEventListener("click", () => {
    sideNav.classList.toggle("open");
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    // page loads normally (only-show mode removed)
    const carousel = document.getElementById('hero-carousel');
    const slides = carousel ? carousel.querySelectorAll('.carousel-slide') : [];
    let currentSlide = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 10000);
    }

    // RSVP form logic
    const addPersonBtn = document.getElementById('add-person');
    const personList = document.getElementById('person-list');
    const rsvpForm = document.getElementById('rsvp-form');

    function createPersonRow() {
        const wrapper = document.createElement('div');
        wrapper.className = 'person-row';

        const first = document.createElement('input');
        first.type = 'text';
        first.name = 'firstName[]';
        first.placeholder = 'Förnamn';

        const last = document.createElement('input');
        last.type = 'text';
        last.name = 'lastName[]';
        last.placeholder = 'Efternamn';

        const info = document.createElement('input');
        info.type = 'text';
        info.name = 'info[]';
        info.placeholder = 'Information (t.ex. allergier, relation)';

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-person';
        removeBtn.textContent = 'Ta bort';

        wrapper.appendChild(first);
        wrapper.appendChild(last);
        wrapper.appendChild(info);
        wrapper.appendChild(removeBtn);

        return wrapper;
    }

    // start with one row by default
    if (personList && personList.children.length === 0) {
        personList.appendChild(createPersonRow());
    }

    if (addPersonBtn) {
        addPersonBtn.addEventListener('click', () => {
            personList.appendChild(createPersonRow());
            personList.lastChild.querySelector('input').focus();
        });
    }

    // delegate remove
    if (personList) {
        personList.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('remove-person')) {
                const row = e.target.closest('.person-row');
                if (row) row.remove();
            }
        });
    }

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const contactName = document.getElementById('contactName');
            const contactEmail = document.getElementById('contactEmail');

            if (!contactName.checkValidity() || !contactEmail.checkValidity()) {
                // Let browser show native validation cues
                contactName.reportValidity();
                contactEmail.reportValidity();
                return;
            }

            // gather data
            const data = new FormData(rsvpForm);
            const payload = {};
            for (const [k, v] of data.entries()) {
                if (k.endsWith('[]')) {
                    const name = k.replace('[]', '');
                    payload[name] = payload[name] || [];
                    payload[name].push(v);
                } else {
                    payload[k] = v;
                }
            }

            console.log('RSVP payload', payload);

            // show simple confirmation
            const card = rsvpForm.closest('.card');
            if (card) {
                card.innerHTML = `
                    <h2>Tack!</h2>
                    <p>Din anmälan har tagits emot. Vi hör av oss vid behov.</p>
                `;
            }
        });
    }
});
