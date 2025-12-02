const endpointInput = document.querySelector('#endpoint');
const launchButton = document.querySelector('#launch');
const iframe = document.querySelector('#stream');
const iframeWrap = document.querySelector('#iframe-wrap');
const statusPill = document.querySelector('#status-pill');
const glassUrl = document.querySelector('#glass-url');
const checklist = document.querySelector('#checklist-steps');
const bundleForm = document.querySelector('#bundle-form');
const bundleSummary = document.querySelector('#bundle-summary');
const bundleSave = document.querySelector('#bundle-save');
const bundleClear = document.querySelector('#bundle-clear');
const bundleExport = document.querySelector('#bundle-export');
const bundleFields = {
  root: document.querySelector('#bundle-root'),
  bios: document.querySelector('#bundle-bios'),
  roms: document.querySelector('#bundle-roms'),
  versions: document.querySelector('#bundle-versions'),
  notes: document.querySelector('#bundle-notes'),
};

const STORAGE_KEY = 'retrobat-endpoint';
const STEP_KEY = 'retrobat-steps';
const BUNDLE_KEY = 'retrobat-bundle';

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

function readBundle() {
  try {
    return JSON.parse(localStorage.getItem(BUNDLE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function persistBundle(bundle) {
  localStorage.setItem(BUNDLE_KEY, JSON.stringify(bundle));
}

function renderBundleSummary(bundle) {
  if (!bundleSummary) return;

  const entries = Object.entries(bundle).filter(([, value]) => value);

  if (!entries.length) {
    bundleSummary.innerHTML = '<p class="muted">Add details on the left to see them here.</p>';
    return;
  }

  bundleSummary.innerHTML = '';

  entries.forEach(([key, value]) => {
    const labelMap = {
      root: 'Install location',
      bios: 'BIOS directory',
      roms: 'ROM path',
      versions: 'Versions',
      notes: 'Notes',
    };
    const block = document.createElement('div');
    const heading = document.createElement('strong');
    heading.textContent = labelMap[key] || key;
    const paragraph = document.createElement('p');
    paragraph.className = key === 'notes' ? '' : 'muted';
    paragraph.textContent = value;

    block.appendChild(heading);
    block.appendChild(paragraph);
    bundleSummary.appendChild(block);
  });
}

function hydrateBundle() {
  if (!bundleForm) return;

  const saved = readBundle();
  Object.entries(bundleFields).forEach(([key, input]) => {
    if (input && saved[key]) {
      input.value = saved[key];
    }
  });
  renderBundleSummary(saved);
}

function saveBundle() {
  const bundle = {};
  Object.entries(bundleFields).forEach(([key, input]) => {
    bundle[key] = input?.value.trim() || '';
  });
  persistBundle(bundle);
  renderBundleSummary(bundle);
  setStatus('RetroBat bundle saved', true);
}

function clearBundle() {
  Object.values(bundleFields).forEach((input) => {
    if (input) input.value = '';
  });
  persistBundle({});
  renderBundleSummary({});
  setStatus('Bundle cleared');
}

async function exportBundle() {
  const bundle = readBundle();
  const json = JSON.stringify(bundle, null, 2);

  try {
    await navigator.clipboard.writeText(json);
    setStatus('Bundle JSON copied', true);
  } catch (e) {
    setStatus('Copy failed. Select the text manually.');
    const fallback = document.createElement('textarea');
    fallback.value = json;
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand('copy');
    document.body.removeChild(fallback);
  }
}

launchButton.addEventListener('click', launch);

endpointInput.addEventListener('input', () => {
  setStatus('Ready to connect', true);
});

hydrateEndpoint();
initChecklist();
hydrateBundle();

if (bundleSave && bundleClear && bundleExport) {
  bundleSave.addEventListener('click', saveBundle);
  bundleClear.addEventListener('click', clearBundle);
  bundleExport.addEventListener('click', exportBundle);
}
