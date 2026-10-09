// Automatic Welcome Greeting Transition to Home
function enterPortfolio() {
  const welcomeScreen = document.getElementById('welcome-screen');
  if (!welcomeScreen || welcomeScreen.style.display === 'none') return;
  
  welcomeScreen.style.opacity = '0';
  welcomeScreen.style.transform = 'translateY(-20px)';
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
  }, 700);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    enterPortfolio();
  }, 1800);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    enterPortfolio();
  }
});

// Robust Bulletproof Theme Switcher Logic
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const icon = document.getElementById('theme-icon');
  const html = document.documentElement;
  if (!icon) return;
  
  if (savedTheme === 'light') {
    html.classList.remove('dark');
    icon.className = "fa-solid fa-sun text-xs text-orange-500";
  } else {
    html.classList.add('dark');
    icon.className = "fa-solid fa-moon text-xs text-yellow-400";
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    icon.className = "fa-solid fa-sun text-xs text-orange-500";
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    icon.className = "fa-solid fa-moon text-xs text-yellow-400";
  }
}

// Initialize theme on page load
initTheme();

// Formspree AJAX Handler
async function handleFormspreeSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = document.getElementById('submit-btn');
  const alertBox = document.getElementById('contact-alert');
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> <span>Sending...</span>';
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      alertBox.classList.remove('hidden');
      alertBox.className = "bg-green-100 dark:bg-green-950/85 border border-green-300 dark:border-green-800 text-green-800 dark:text-green-300 p-3 rounded-xl font-medium";
      alertBox.innerHTML = '<i class="fa-solid fa-circle-check mr-1.5"></i> Message sent successfully! I will get back to you soon.';
      form.reset();
    } else {
      alertBox.classList.remove('hidden');
      alertBox.className = "bg-red-100 dark:bg-red-950/85 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 p-3 rounded-xl font-medium";
      alertBox.innerHTML = '<i class="fa-solid fa-circle-xmark mr-1.5"></i> There was a problem submitting your form. Please try again.';
    }
  } catch (error) {
    alertBox.classList.remove('hidden');
    alertBox.className = "bg-red-100 dark:bg-red-950/85 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 p-3 rounded-xl font-medium";
    alertBox.innerHTML = '<i class="fa-solid fa-wifi mr-1.5"></i> Network error. Please check your connection and try again.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Send Professional Message</span>';
    setTimeout(() => alertBox.classList.add('hidden'), 5000);
  }
}

// AuraWeather Case Study Data
const projectDetails = {
  auraweather: {
    title: "AuraWeather",
    problem: "Users need a quick, responsive, and visually appealing way to check real-time weather forecasts and atmospheric conditions without clutter.",
    features: "Live weather API integration, clean modern UI design with Tailwind CSS, responsive container grids, and intuitive search functionality.",
    learned: "Mastered fetching external API data asynchronously with JavaScript, parsing JSON responses, and handling dynamic DOM updates smoothly."
  }
};

function openModal(projectKey) {
  const data = projectDetails[projectKey];
  if (!data) return;
  
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-problem').textContent = data.problem;
  document.getElementById('modal-features').textContent = data.features;
  document.getElementById('modal-learned').textContent = data.learned;
  document.getElementById('project-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('project-modal').classList.add('hidden');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Mouse 3D Tilt Effect
const card = document.getElementById('interactive-card');
if (card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -16;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 16;
    
    card.classList.remove('reset');
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.classList.add('reset');
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

// Navigation Switcher
function navigateTo(slideName) {
  document.querySelectorAll('.ppt-slide').forEach(slide => slide.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('bg-gray-900', 'text-white', 'dark:bg-white', 'dark:text-black');
    btn.classList.add('text-gray-700', 'dark:text-gray-300');
  });
  
  document.getElementById(`slide-${slideName}`).classList.remove('hidden');
  const activeNav = document.getElementById(`nav-${slideName}`);
  activeNav.classList.add('bg-gray-900', 'text-white', 'dark:bg-white', 'dark:text-black');
  activeNav.classList.remove('text-gray-700', 'dark:text-gray-300');
}

// Portfolio Tab Switcher
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('bg-gray-900', 'text-white', 'dark:bg-white', 'dark:text-black');
    btn.classList.add('text-gray-700', 'dark:text-gray-300');
  });
  
  document.getElementById(`content-${tabName}`).classList.remove('hidden');
  const activeBtn = document.getElementById(`tab-${tabName}`);
  activeBtn.classList.add('bg-gray-900', 'text-white', 'dark:bg-white', 'dark:text-black');
  activeBtn.classList.remove('text-gray-700', 'dark:text-gray-300');
}

// Dynamic Comments Handler (Guestbook)
function addComment(e) {
  e.preventDefault();
  const name = document.getElementById('comment-name').value;
  const text = document.getElementById('comment-text').value;
  
  const commentHTML = `
    <div class="bg-white/90 dark:bg-neutral-900/90 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
      <span class="font-bold text-gray-900 dark:text-white">${name}</span>
      <p class="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">${text}</p>
    </div>
  `;
  
  document.getElementById('comments-list').insertAdjacentHTML('beforeend', commentHTML);
  document.getElementById('comment-form').reset();
}