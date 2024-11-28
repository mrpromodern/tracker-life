// Это файл для регистрации Service Worker. Он помогает вашему приложению работать оффлайн и загружаться быстрее.

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] — это localhost для IPv6.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 — это localhost для IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)){3}$/
      )
  );
  
  export function register(config) {
    if ('serviceWorker' in navigator) {
      // URL Service Worker
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      if (isLocalhost) {
        // На localhost проверяем, зарегистрирован ли Service Worker
        checkValidServiceWorker(swUrl, config);
  
        // Добавляем дополнительное логирование для localhost
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service worker. ' +
              'To learn more, visit https://cra.link/PWA'
          );
        });
      } else {
        // Регистрируем Service Worker для продакшн-сборки
        registerValidSW(swUrl, config);
      }
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Обновленный контент доступен, но будет использован после перезагрузки
                console.log(
                  'New content is available and will be used when all tabs for this page are closed.'
                );
  
                // Вызовем callback, если он указан
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // Контент закеширован для оффлайн-использования
                console.log('Content is cached for offline use.');
  
                // Вызовем callback, если он указан
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Error during service worker registration:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Проверяем, доступен ли Service Worker
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then((response) => {
        // Убедимся, что сервис-воркер найден
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          // Если Service Worker не найден, удаляем его.
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Если найден, регистрируем его
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          'No internet connection found. App is running in offline mode.'
        );
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  