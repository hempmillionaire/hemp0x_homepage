import './style.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const enableNotificationsLink = document.getElementById('enable-notifications');
  const statusMessage = document.getElementById('status-message');

  if (enableNotificationsLink) {
    enableNotificationsLink.addEventListener('click', async (e) => {
      e.preventDefault();

      if (!('Notification' in window)) {
        statusMessage.textContent = 'This browser does not support notifications';
        return;
      }

      if (Notification.permission === 'granted') {
        statusMessage.textContent = 'Notifications are already enabled';
        return;
      }

      if (Notification.permission === 'denied') {
        statusMessage.textContent = 'Notifications were blocked. Please enable them in browser settings.';
        return;
      }

      try {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          statusMessage.textContent = 'Notifications enabled successfully';

          new Notification('hemp0x', {
            body: 'You will receive network updates and alerts',
            icon: '/vite.svg'
          });
        } else {
          statusMessage.textContent = 'Notification permission denied';
        }
      } catch (error) {
        statusMessage.textContent = 'Error requesting notification permission';
        console.error('Notification error:', error);
      }
    });
  }
});
