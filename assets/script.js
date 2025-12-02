const endpointInput = document.querySelector('#endpoint');
const launchButton = document.querySelector('#launch');
const iframe = document.querySelector('#stream');
const iframeWrap = document.querySelector('#iframe-wrap');
const statusPill = document.querySelector('#status-pill');
const glassUrl = document.querySelector('#glass-url');
const checklist = document.querySelector('#checklist-steps');

const STORAGE_KEY = 'retrobat-endpoint';
const STEP_KEY = 'retrobat-steps';

function readSteps() {
  try {
    return JSON.parse(localStorage.getItem(STEP_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function persistSteps(steps) {
  localStorage.setItem(STEP_KEY, JSON.stringify(steps));
}

function syncChecklist() {
  const steps = readSteps();
  checklist.querySelectorAll('li').forEach((item) => {
    const key = item.dataset.key;
    if (steps[key]) item.classList.add('done');
  });
}

function toggleStep(key) {
  const steps = readSteps();
  steps[key] = !steps[key];
  persistSteps(steps);
  syncChecklist();
}

function formatUrl(url) {
  if (!url) return 'remote stream: none';
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function setStatus(text, active = false) {
  statusPill.textContent = text;
  statusPill.style.borderColor = active ? 'rgba(108, 240, 194, 0.5)' : 'var(--border)';
  statusPill.style.color = active ? 'var(--accent)' : 'var(--muted)';
}

function saveEndpoint(url) {
  localStorage.setItem(STORAGE_KEY, url);
}

function hydrateEndpoint() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('session');
  const stored = localStorage.getItem(STORAGE_KEY) || '';
  const endpoint = fromQuery || stored;

  if (endpoint) {
    endpointInput.value = endpoint;
    glassUrl.textContent = `remote stream: ${formatUrl(endpoint)}`;
    setStatus('Endpoint loaded', true);
  }
}

function launch() {
  const url = endpointInput.value.trim();
  if (!url) {
    setStatus('Add a streaming URL first');
    iframeWrap.hidden = true;
    return;
  }

  saveEndpoint(url);
  glassUrl.textContent = `remote stream: ${formatUrl(url)}`;
  setStatus('Connecting...', true);
  iframe.src = url;
  iframeWrap.hidden = false;
}

function initChecklist() {
  checklist.querySelectorAll('li').forEach((item) => {
    const key = item.dataset.key;
    item.tabIndex = 0;
    item.addEventListener('click', () => toggleStep(key));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleStep(key);
      }
    });
  });
  syncChecklist();
}

launchButton.addEventListener('click', launch);

endpointInput.addEventListener('input', () => {
  setStatus('Ready to connect', true);
});

hydrateEndpoint();
initChecklist();
