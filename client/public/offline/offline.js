let timerId;

const hideAlert = () => {
  const el = document.querySelector('.connection-alert');
  if (el) {
    el.parentElement.removeChild(el);
    clearTimeout(timerId);
  }
};

// type is 'success' or 'error'
const showConnectionStatus = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="connection-alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  timerId = window.setTimeout(hideAlert, time * 1000);
};

window.addEventListener('online', () =>
  showConnectionStatus(
    'connected',
    'Your device is connected to the internet!',
    10
  )
);
window.addEventListener('offline', () =>
  showConnectionStatus(
    'disconnected',
    'You are offline some functionality may be unavailable! Trying to connect...',
    60
  )
);
