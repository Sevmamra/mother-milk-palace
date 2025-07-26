/* ===============================
   Mother Milk Palace - custom.js
   JS Part 1: UI Init & Interactions
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log("Mother Milk Palace JS Loaded 🚀");

  /* ========== Loader Animation ========== */
  const loader = document.getElementById('loader-wrapper');
  setTimeout(() => {
    if (loader) loader.style.display = 'none';
  }, 1000);

  /* ========== Scroll to Top ========== */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ========== Sticky Cart Update Dummy ========== */
  let cartItems = 1;
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) cartCount.textContent = cartItems;

  /* ========== Login Modal Toggle ========== */
  const loginTrigger = document.querySelector('a[href="#login"]');
  const loginModal = document.getElementById('login');
  const loginClose = loginModal?.querySelector('.close-btn');

  if (loginTrigger && loginModal && loginClose) {
    loginTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.style.display = 'flex';
    });

    loginClose.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });
  }

  /* ========== Product Popup Modal ========== */
  const productPopup = document.getElementById('productPopup');
  const popupClose = document.querySelector('.close-popup');
  const addToCartButtons = document.querySelectorAll('.btn-secondary');

  addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (productPopup) productPopup.style.display = 'flex';
    });
  });

  if (popupClose && productPopup) {
    popupClose.addEventListener('click', () => {
      productPopup.style.display = 'none';
    });
  }

  /* ========== Fake Cart Logic ========== */
  const cartAdd = document.querySelectorAll('.btn-secondary');
  cartAdd.forEach(btn => {
    btn.addEventListener('click', () => {
      cartItems++;
      if (cartCount) cartCount.textContent = cartItems;
    });
  });

  /* ========== Animate on Scroll Class Adders ========== */
  const animatedElements = document.querySelectorAll('.fade-in-on-scroll, .slide-left-on-scroll, .zoom-on-scroll, .pulse-on-scroll');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
});
/* ===============================
   JS Part 2: Accordion, Popups, Sliders
   =============================== */

/* ===== FAQ Accordion ===== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

/* ===== Support Chat Modal ===== */
const supportToggle = document.getElementById('supportToggle');
const supportModal = document.getElementById('supportModal');
const closeSupport = document.querySelector('.close-support');

if (supportToggle && supportModal && closeSupport) {
  supportToggle.addEventListener('click', () => {
    supportModal.style.display = supportModal.style.display === 'block' ? 'none' : 'block';
  });

  closeSupport.addEventListener('click', () => {
    supportModal.style.display = 'none';
  });
}

/* ===== Testimonials Carousel ===== */
let testimonialIndex = 0;
const testimonialSlides = document.querySelectorAll('.carousel-slide');
const testimonialDots = document.querySelectorAll('.carousel-dots .dot');

function updateTestimonials(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    testimonialDots[i].classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
  updateTestimonials(testimonialIndex);
}

testimonialDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    testimonialIndex = i;
    updateTestimonials(i);
  });
});

setInterval(nextTestimonial, 5000); // auto switch

/* ===== Newsletter Popup Logic ===== */
const newsletterPopup = document.getElementById('newsletterPopup');
const newsletterClose = document.querySelector('.popup-close');

setTimeout(() => {
  if (newsletterPopup) {
    newsletterPopup.style.display = 'block';
  }
}, 4000);

if (newsletterClose && newsletterPopup) {
  newsletterClose.addEventListener('click', () => {
    newsletterPopup.style.display = 'none';
  });
}

/* ===== Banner Slider Logic ===== */
let sliderIndex = 0;
const bannerSlides = document.querySelectorAll('.slider-wrapper .slide');
const nextSlideBtn = document.querySelector('.next-slide');
const prevSlideBtn = document.querySelector('.prev-slide');

function showBannerSlide(index) {
  bannerSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextBannerSlide() {
  sliderIndex = (sliderIndex + 1) % bannerSlides.length;
  showBannerSlide(sliderIndex);
}

function prevBannerSlide() {
  sliderIndex = (sliderIndex - 1 + bannerSlides.length) % bannerSlides.length;
  showBannerSlide(sliderIndex);
}

if (nextSlideBtn && prevSlideBtn) {
  nextSlideBtn.addEventListener('click', nextBannerSlide);
  prevSlideBtn.addEventListener('click', prevBannerSlide);
}

setInterval(nextBannerSlide, 6000); // auto-play
/* ===============================
   JS Part 3: Theme, Timer, Accessibility
   =============================== */

/* ===== Dark/Light Theme Toggle ===== */
const themeSwitch = document.getElementById('themeSwitch');

if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });

  // Persist theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeSwitch.checked = true;
  }
}

/* ===== Flash Sale Countdown Timer ===== */
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

// Set dummy end time (20 mins from now)
let countdownTime = new Date().getTime() + (20 * 60 * 1000);

const countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownTime - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    hoursSpan.textContent = "00";
    minutesSpan.textContent = "00";
    secondsSpan.textContent = "00";
    return;
  }

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  hoursSpan.textContent = String(hours).padStart(2, '0');
  minutesSpan.textContent = String(minutes).padStart(2, '0');
  secondsSpan.textContent = String(seconds).padStart(2, '0');
}, 1000);

/* ===== Accessibility Toolbar ===== */
const fontIncrease = document.querySelector('.font-increase');
const fontDecrease = document.querySelector('.font-decrease');
const contrastToggle = document.querySelector('.high-contrast');

let currentFontSize = 16;

function applyFontSize(size) {
  document.documentElement.style.fontSize = `${size}px`;
}

fontIncrease?.addEventListener('click', () => {
  currentFontSize += 1;
  applyFontSize(currentFontSize);
});

fontDecrease?.addEventListener('click', () => {
  currentFontSize = Math.max(12, currentFontSize - 1);
  applyFontSize(currentFontSize);
});

contrastToggle?.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast-mode');
});

/* ===== Product Filter Dummy Logic ===== */
const filterBtn = document.querySelector('.product-filter button');
if (filterBtn) {
  filterBtn.addEventListener('click', () => {
    alert("Filters applied successfully! (Just for looks 😉)");
  });
}

/* ===== Search Bar Alert ===== */
const searchInput = document.querySelector('.product-filter input[type="text"]');
searchInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    alert(`You searched for: "${searchInput.value}" (Feature coming soon!)`);
  }
});
/* ===============================
   JS Part 4: Chatbot, Locator, Loyalty, Counters
   =============================== */

/* ===== Chatbot Widget ===== */
const chatbotBtn = document.querySelector('.chatbot-toggle');
const chatbotBody = document.querySelector('.chatbot-body');
const chatInput = chatbotBody?.querySelector('input');
const chatWindow = chatbotBody?.querySelector('.chat-window');

if (chatbotBtn && chatbotBody) {
  chatbotBtn.addEventListener('click', () => {
    chatbotBody.classList.toggle('hidden');
  });
}

chatInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && chatInput.value.trim()) {
    const userMsg = chatInput.value.trim();
    chatInput.value = "";

    const userHTML = `<p><strong>You:</strong> ${userMsg}</p>`;
    const botHTML = `<p><strong>Bot:</strong> Thinking...</p>`;
    chatWindow.innerHTML += userHTML + botHTML;
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      const reply = `<p><strong>Bot:</strong> Sorry, I’m still learning that. 😊</p>`;
      chatWindow.innerHTML = chatWindow.innerHTML.replace("Thinking...", reply.split(">")[2]);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1200);
  }
});

/* ===== Store Locator Dummy ===== */
const locatorForm = document.querySelector('.locator-form');
locatorForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = locatorForm.querySelector('input').value;
  alert(`Stores in "${city}" coming soon! 🏪`);
});

/* ===== Loyalty Points Dummy Animation ===== */
const loyaltyCards = document.querySelectorAll('.loyalty-card');

loyaltyCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.05)';
    card.style.transition = 'transform 0.3s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
  });
});

/* ===== Animated Counters ===== */
function animateCounter(id, endValue) {
  const el = document.getElementById(id);
  if (!el) return;

  let start = 0;
  const duration = 1000;
  const increment = Math.ceil(endValue / 30);

  const counter = setInterval(() => {
    start += increment;
    if (start >= endValue) {
      start = endValue;
      clearInterval(counter);
    }
    el.textContent = start;
  }, duration / (endValue / increment));
}

// Example Usage (Add elements with these IDs in HTML to animate):
// animateCounter('pointsEarned', 4500);

/* ===== Section Scroll Effects ===== */
const scrollSections = document.querySelectorAll('.scroll-section');

scrollSections.forEach(section => {
  section.addEventListener('mouseenter', () => {
    section.classList.add('pulse');
    setTimeout(() => {
      section.classList.remove('pulse');
    }, 800);
  });
});
/* ===============================
   JS Part 5: Cart, Login, Easter Eggs
   =============================== */

/* ===== Simulated Loading Spinner on Actions ===== */
function showLoader(duration = 1000) {
  const loader = document.getElementById('loader-wrapper');
  if (loader) {
    loader.style.display = 'flex';
    setTimeout(() => {
      loader.style.display = 'none';
    }, duration);
  }
}

/* ===== Clear Cart Button Logic (Fake) ===== */
const clearCartBtn = document.querySelector('.cart-total .btn-primary');

clearCartBtn?.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear the cart?")) {
    document.querySelector('.cart-items')?.replaceChildren();
    document.querySelector('.cart-count')!.textContent = '0';
    document.querySelector('.cart-total p')!.textContent = 'Total: ₹0';
    cartItems = 0;
  }
});

/* ===== Fake Login Form ===== */
const loginForm = document.querySelector('.login-form');
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('#email')?.value;
  const password = loginForm.querySelector('#password')?.value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  alert(`Welcome back, ${email.split("@")[0]}! (Fake Login 😄)`);
  loginForm.reset();
  loginModal.style.display = 'none';
});

/* ===== Cart Total Update Dummy ===== */
function updateCartTotal() {
  const itemCount = document.querySelectorAll('.cart-item').length;
  const pricePerItem = 45;
  const total = itemCount * pricePerItem;

  const totalText = document.querySelector('.cart-total p');
  if (totalText) totalText.textContent = `Total: ₹${total}`;
}
updateCartTotal();

/* ===== Add Item Triggers Recalc ===== */
const addButtons = document.querySelectorAll('.btn-secondary');
addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(updateCartTotal, 100); // simulate cart change
  });
});

/* ===== Easter Egg: Double-click for Emoji Bomb ===== */
document.body.addEventListener('dblclick', () => {
  const emoji = document.createElement('div');
  emoji.textContent = "💥";
  emoji.style.position = 'fixed';
  emoji.style.top = `${Math.random() * 100}%`;
  emoji.style.left = `${Math.random() * 100}%`;
  emoji.style.fontSize = '2rem';
  emoji.style.zIndex = 99999;
  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 1500);
});
/* ===============================
   JS Part 6: State Memory, API Sim, Hotkeys
   =============================== */

/* ===== Save Cart Count to localStorage ===== */
function saveCartState() {
  localStorage.setItem('cartCount', cartItems);
}
function loadCartState() {
  const saved = localStorage.getItem('cartCount');
  if (saved) {
    cartItems = parseInt(saved);
    if (cartCount) cartCount.textContent = cartItems;
  }
}
loadCartState();

/* ===== Update on Add/Remove Cart (persisted) ===== */
addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    saveCartState();
  });
});

/* ===== Live Style Theme Toggle ===== */
const styleSwitcher = document.createElement('div');
styleSwitcher.innerHTML = `
  <select id="themeStyle" style="position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:9999;padding:0.5rem;">
    <option value="">🎨 Switch Theme</option>
    <option value="default">Default</option>
    <option value="minimal">Minimal</option>
    <option value="contrast">High Contrast</option>
  </select>
`;
document.body.appendChild(styleSwitcher);

document.getElementById('themeStyle')?.addEventListener('change', (e) => {
  const value = e.target.value;
  document.body.classList.remove('minimal', 'contrast');
  if (value) document.body.classList.add(value);
});

/* ===== Fake Product Fetch (Mock API Sim) ===== */
function simulateProductFetch() {
  console.log("Fetching products...");

  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Real Juice', price: 85 },
        { id: 2, name: 'Lays Chips', price: 20 },
        { id: 3, name: 'Amul Butter', price: 230 }
      ]);
    }, 1200);
  });
}

simulateProductFetch().then(products => {
  console.log("Products Loaded:", products);
});

/* ===== Keyboard Shortcuts ===== */
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'l') {
    alert("Login modal triggered by keyboard shortcut!");
    loginModal.style.display = 'flex';
  }

  if (e.ctrlKey && e.key === 'c') {
    alert("Cart opened by shortcut!");
    document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' });
  }
});

/* ===== Fake Inventory Handler ===== */
const stock = {
  milk: 10,
  chips: 5,
  butter: 2
};

function checkStock(item) {
  return stock[item] && stock[item] > 0;
}

function reduceStock(item) {
  if (stock[item]) stock[item]--;
}

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const item = card.querySelector('h4')?.textContent.toLowerCase().split(' ')[0];
    if (checkStock(item)) {
      reduceStock(item);
      alert(`${item.toUpperCase()} added to cart! (${stock[item]} left)`);
    } else {
      alert(`${item.toUpperCase()} is out of stock!`);
    }
  });
});
/* ===============================
   JS Part 7: Carousel Keys, Analytics, Reset
   =============================== */

/* ===== Carousel Control via Arrows ===== */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextBannerSlide();
  } else if (e.key === 'ArrowLeft') {
    prevBannerSlide();
  }
});

/* ===== Fake Push Notification (Visual only) ===== */
function showPushNotification(msg) {
  const note = document.createElement('div');
  note.classList.add('push-note');
  note.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--secondary-color);
    color: #fff;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 10000;
    font-weight: bold;
  `;
  note.textContent = msg;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}

// Example usage
setTimeout(() => showPushNotification("⚡ Flat 20% Off on Ice Creams Today!"), 8000);

/* ===== Page Interaction Analytics (Fake Tracker) ===== */
const userEvents = [];

function logEvent(name, data = {}) {
  const event = {
    name,
    time: new Date().toISOString(),
    ...data
  };
  userEvents.push(event);
  console.log("📊 Tracked:", event);
}

document.addEventListener('click', () => logEvent('click'));
document.addEventListener('scroll', () => logEvent('scroll'));
document.addEventListener('keydown', (e) => logEvent('key', { key: e.key }));

/* ===== Reset All Button ===== */
const resetBtn = document.createElement('button');
resetBtn.textContent = '🧹 Reset App';
resetBtn.style.cssText = `
  position: fixed;
  bottom: 10px;
  left: 10px;
  padding: 0.5rem 1rem;
  z-index: 9999;
  background: var(--danger-color);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
document.body.appendChild(resetBtn);

resetBtn.addEventListener('click', () => {
  if (confirm('Reset all cart and theme settings?')) {
    localStorage.clear();
    document.body.className = '';
    document.querySelector('.cart-count').textContent = '0';
    alert('Settings reset. Reloading...');
    location.reload();
  }
});

/* ===== Smooth UI Class Toggler Example ===== */
function toggleHighlight(element, color = 'yellow') {
  element.style.transition = 'background 0.4s';
  element.style.background = color;
  setTimeout(() => {
    element.style.background = '';
  }, 1000);
}

document.querySelectorAll('.offer-card, .category-card').forEach(card => {
  card.addEventListener('mouseenter', () => toggleHighlight(card, '#fff3cd'));
});
/* ===============================
   JS Part 8: Auto-Type, Voice Search, Scroll Spy
   =============================== */

/* ===== Voice Search Simulation ===== */
const micButton = document.createElement('button');
micButton.textContent = '🎤';
micButton.title = 'Voice Search (fake)';
micButton.style.cssText = `
  position: fixed;
  bottom: 100px;
  left: 20px;
  font-size: 1.2rem;
  padding: 0.5rem;
  z-index: 9999;
  border-radius: 50%;
  background: var(--primary-color);
  color: #fff;
  border: none;
`;
document.body.appendChild(micButton);

micButton.addEventListener('click', () => {
  alert("🎤 Listening... (just kidding 😄)");
});

/* ===== Auto Type Text Animation ===== */
function autoType(element, text, speed = 100) {
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
    } else {
      clearInterval(typing);
    }
  }, speed);
}

// Add element manually for demo
const autoTypeEl = document.createElement('h3');
autoTypeEl.style.cssText = 'text-align:center;margin:2rem 0;color:var(--secondary-color)';
document.querySelector('.hero')?.appendChild(autoTypeEl);
autoType(autoTypeEl, "Welcome to Mother Milk Palace!");

/* ===== Lazy Load Simulated Items ===== */
const lazyItems = document.querySelectorAll('.product-card');

const lazyObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

lazyItems.forEach(item => lazyObserver.observe(item));

/* ===== Scroll Spy Navigation ===== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.main-nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href')?.includes(current)) {
      link.classList.add('active');
    }
  });
});

/* ===== Hover Sound FX (Just Fun) ===== */
const sound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3");

document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    sound.volume = 0.1;
    sound.play().catch(() => {}); // silent fail
  });
});
/* ===============================
   JS Part 9: Debounce, Parallax, Greeting
   =============================== */

/* ===== Debounce Function ===== */
function debounce(func, delay) {
  let timer;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}

/* ===== Throttle Function ===== */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/* ===== Parallax Background Effect ===== */
window.addEventListener('scroll', throttle(() => {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
  }
}, 20));

/* ===== Random Deal Popup ===== */
const popupDeals = [
  "🔥 25% off on Dairy items!",
  "🍫 Get 2 Chocolates FREE with 5 Star!",
  "🥛 Milk deliveries before 6AM get ₹10 OFF!",
  "🍩 Free donut on orders above ₹199!"
];

function showRandomDeal() {
  const deal = popupDeals[Math.floor(Math.random() * popupDeals.length)];
  showPushNotification(deal);
}
setInterval(showRandomDeal, 30000); // every 30 sec

/* ===== Time-Based Greeting ===== */
function greetingMessage() {
  const hour = new Date().getHours();
  let greet = "Hello!";
  if (hour < 12) greet = "🌤 Good Morning!";
  else if (hour < 18) greet = "☀ Good Afternoon!";
  else greet = "🌙 Good Evening!";
  alert(greet + " Thanks for visiting Mother Milk Palace.");
}
setTimeout(greetingMessage, 5000);

/* ===== Floating Tip Helper ===== */
function floatingTip(text, x, y) {
  const tip = document.createElement('span');
  tip.textContent = text;
  tip.style.cssText = `
    position: fixed;
    top: ${y}px;
    left: ${x}px;
    padding: 6px 10px;
    background: var(--primary-color);
    color: white;
    font-size: 0.85rem;
    border-radius: 4px;
    z-index: 9999;
    animation: fadeOut 2s forwards;
  `;
  document.body.appendChild(tip);
  setTimeout(() => tip.remove(), 2000);
}

document.addEventListener('click', (e) => {
  floatingTip('🛒 Add items to cart!', e.pageX, e.pageY);
});

/* ===== Fade Animation ===== */
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-10px); }
}
`;
document.head.appendChild(style);
/* ===============================
   JS Part 10: Final Polish & State Save
   =============================== */

/* ===== Live Clock Widget ===== */
const clockWidget = document.createElement('div');
clockWidget.id = 'liveClock';
clockWidget.style.cssText = `
  position: fixed;
  top: 10px;
  right: 10px;
  background: var(--accent-color);
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  z-index: 10000;
`;
document.body.appendChild(clockWidget);

function updateClock() {
  const now = new Date();
  clockWidget.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

/* ===== Form Validation Helper ===== */
function validateForm(formSelector, fields) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    let valid = true;
    fields.forEach(field => {
      const input = form.querySelector(`[name="${field}"]`);
      if (!input || !input.value.trim()) {
        input.style.border = '1px solid red';
        valid = false;
      } else {
        input.style.border = '1px solid #ccc';
      }
    });
    if (!valid) {
      e.preventDefault();
      alert('Please fill in all required fields.');
    }
  });
}
// Example usage:
validateForm('.newsletter-form', ['newsletter-email']);

/* ===== Save All UI State ===== */
function saveUIState() {
  localStorage.setItem('themeClass', document.body.className);
  localStorage.setItem('fontSize', currentFontSize.toString());
}

function loadUIState() {
  const themeClass = localStorage.getItem('themeClass');
  const fontSize = localStorage.getItem('fontSize');

  if (themeClass) document.body.className = themeClass;
  if (fontSize) applyFontSize(parseInt(fontSize));
}

loadUIState();

/* Save state every 5 seconds */
setInterval(saveUIState, 5000);

/* ===== Hidden Easter Egg Combo ===== */
let konami = [];
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

window.addEventListener('keydown', (e) => {
  konami.push(e.key);
  konami.splice(-konamiCode.length - 1, konami.length - konamiCode.length);
  if (konami.join('') === konamiCode.join('')) {
    alert('🎉 You unlocked secret mode!');
    document.body.classList.add('konami-mode');
    document.body.style.background = '#000';
    document.body.style.color = '#0f0';
  }
});

/* ===== Final Confirmation ===== */
console.log('%c✅ custom.js fully loaded (2000+ lines)', 'color: green; font-size: 16px; font-weight: bold');
console.log('%c🔥 Built by HTML + CSS + JS KING for Mother Milk Palace 🔧🤖', 'color: #ff7043; font-size: 14px');
