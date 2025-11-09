document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Quote fetch (ZenQuotes + fallback) ---------- */
  const quoteContainer = document.getElementById('quoteContainer');
  const newQuoteBtn = document.getElementById('newQuoteBtn');

  async function fetchQuote() {
    quoteContainer.innerHTML = '<div class="quote-text">Loading inspiration...</div>';
    try {
      const res = await fetch('https://zenquotes.io/api/random');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      const quote = data[0].q;
      const author = data[0].a;
      quoteContainer.innerHTML = `<div class="quote-text">"${quote}"</div><div class="quote-author">— ${author}</div>`;
    } catch (err) {
      // fallback list
      const fallback = [
        { q: "Cancer is a word, not a sentence.", a: "John Diamond" },
        { q: "You beat cancer by how you live, why you live, and in the manner in which you live.", a: "Stuart Scott" },
        { q: "Once you choose hope, anything’s possible.", a: "Christopher Reeve" },
        { q: "Courage doesn’t always roar. Sometimes it’s the quiet voice saying, ‘I will try again tomorrow.’", a: "Mary Anne Radmacher" }
      ];
      const pick = fallback[Math.floor(Math.random() * fallback.length)];
      quoteContainer.innerHTML = `<div class="quote-text">"${pick.q}"</div><div class="quote-author">— ${pick.a}</div>`;
    }
  }

  newQuoteBtn.addEventListener('click', fetchQuote);
  fetchQuote(); // load on start

  /* ---------- Contact form (validation + popup) ---------- */
  const contactForm = document.getElementById('contactForm');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('⚠️ Please fill out all fields.');
      return;
    }

    if (!email.includes('@')) {
      alert('⚠️ Please enter a valid email address (must include @).');
      return;
    }

    // show popup and reset form
    popup.style.display = 'flex';
    contactForm.reset();

    // auto-hide popup after 4s
    setTimeout(() => {
      popup.style.display = 'none';
    }, 4000);
  });

  // close button
  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  /* ---------- Back to top ---------- */
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = (window.pageYOffset > 300) ? 'block' : 'none';
  });
  window.scrollToTop = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  backToTopBtn.addEventListener('click', () => window.scrollToTop());

  /* ---------- Smooth anchor for CTA button (if present) ---------- */
  // cta-button uses anchor to #contact so native smooth scroll will work (CSS scroll-behavior)
});
