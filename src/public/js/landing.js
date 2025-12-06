document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/landing.html');
    if (!res.ok) return;

    const html = await res.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    const main = document.querySelector('main');
    const searchSection = document.getElementById('search-section');

    if (main && searchSection) {
      main.insertBefore(wrapper, searchSection);
    }
  } catch (e) {
    console.error('Error loading landing content:', e);
  }
});