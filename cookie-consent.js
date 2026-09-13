/*
 * Cookie-consent + Yandex Metrica
 * Сайт «Ваш массаж»
 *
 * Перед публикацией замените YOUR_METRICA_ID на реальный номер счетчика.
 * Файл подключается в index.html перед </body>:
 * <script src="cookie-consent.js"></script>
 */
(function () {
  const STORAGE_KEY = 'vashMassageAnalyticsConsent';
  const METRICA_ID = 'YOUR_METRICA_ID';

  function loadMetrica() {
    if (!/^\d+$/.test(METRICA_ID)) return;
    if (window.__vashMetricaLoaded) return;
    window.__vashMetricaLoaded = true;

    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j=0;j<document.scripts.length;j++) {
        if (document.scripts[j].src.indexOf(r) !== -1) return;
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0];
      k.async=1;k.src=r;k.onload=function(){};
      a.parentNode.insertBefore(k,a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    window.ym(METRICA_ID, 'init', {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:false,
      ecommerce:"dataLayer"
    });
  }

  function removeBanner() {
    const el = document.getElementById('cookie-consent');
    if (el) el.remove();
  }

  function saveChoice(value) {
    localStorage.setItem(STORAGE_KEY, value);
    if (value === 'accepted') loadMetrica();
    removeBanner();
  }

  function showBanner() {
    if (localStorage.getItem(STORAGE_KEY)) {
      if (localStorage.getItem(STORAGE_KEY) === 'accepted') loadMetrica();
      return;
    }

    const box = document.createElement('div');
    box.id = 'cookie-consent';
    box.innerHTML =
      '<div class="cookie-consent__text">Мы используем cookie и Яндекс Метрику, чтобы понимать, как посетители пользуются сайтом, и улучшать его работу. <a href="cookie.html">Подробнее</a>.</div>' +
      '<div class="cookie-consent__actions">' +
      '<button type="button" data-cookie-accept>Разрешить аналитику</button>' +
      '<button type="button" data-cookie-reject>Только необходимые</button>' +
      '</div>';

    const style = document.createElement('style');
    style.textContent =
      '#cookie-consent{position:fixed;left:20px;right:20px;bottom:20px;z-index:9999;max-width:900px;margin:auto;background:#fffaf4;color:#18314e;border:1px solid #e4d6c4;border-radius:18px;box-shadow:0 12px 40px rgba(17,43,74,.18);padding:18px 20px;display:flex;gap:18px;align-items:center;justify-content:space-between;font:13px/1.5 Arial,sans-serif}' +
      '#cookie-consent a{color:#9b6529;text-decoration:underline}' +
      '.cookie-consent__actions{display:flex;gap:8px;flex-wrap:wrap;flex:0 0 auto}' +
      '.cookie-consent__actions button{border:1px solid #c9953e;border-radius:999px;padding:10px 15px;background:#112b4a;color:#fff;cursor:pointer;font:600 12px Arial}' +
      '.cookie-consent__actions button[data-cookie-reject]{background:transparent;color:#112b4a}' +
      '@media(max-width:650px){#cookie-consent{left:10px;right:10px;bottom:10px;display:block}.cookie-consent__actions{margin-top:12px}.cookie-consent__actions button{flex:1}}';

    document.head.appendChild(style);
    document.body.appendChild(box);

    box.querySelector('[data-cookie-accept]').addEventListener('click', function(){saveChoice('accepted')});
    box.querySelector('[data-cookie-reject]').addEventListener('click', function(){saveChoice('rejected')});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
