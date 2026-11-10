(function () {
  'use strict';

  var modalEl = document.getElementById('signupModal');
  if (!modalEl) return;

  var form = modalEl.querySelector('form');
  var titleEl = modalEl.querySelector('#signupModalLabel');
  var summaryTitle = modalEl.querySelector('#signupEventTitle');
  var summaryDate = modalEl.querySelector('#signupEventDate');
  var summaryPlace = modalEl.querySelector('#signupEventPlace');
  var summaryPrice = modalEl.querySelector('#signupEventPrice');
  var hiddenEvent = modalEl.querySelector('#signupEventField');
  var submitBtn = modalEl.querySelector('[type="submit"]');
  var statusEl = modalEl.querySelector('#signupStatus');

  var lastTrigger = null;

  // Запоминаем кнопку, по которой открыли модалку, и подставляем данные
  modalEl.addEventListener('show.bs.modal', function (event) {
    lastTrigger = event.relatedTarget || null;
    if (!lastTrigger) return;

    var title = lastTrigger.getAttribute('data-event-title') || '';
    var date = lastTrigger.getAttribute('data-event-date') || '';
    var place = lastTrigger.getAttribute('data-event-place') || '';
    var price = lastTrigger.getAttribute('data-event-price') || '';
    var action = lastTrigger.getAttribute('data-event-action') || lastTrigger.textContent.trim();

    if (summaryTitle) summaryTitle.textContent = title;
    if (summaryDate) summaryDate.textContent = date;
    if (summaryPlace) summaryPlace.textContent = place;
    if (summaryPrice) summaryPrice.textContent = price;
    if (hiddenEvent) hiddenEvent.value = title;

    if (titleEl) titleEl.textContent = 'Запись: ' + title;
    if (submitBtn) submitBtn.textContent = action || 'Отправить заявку';

    // Сброс состояния формы при каждом открытии
    if (form) form.classList.remove('was-validated');
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.classList.remove('text-success', 'text-danger');
    }
  });

  // Возврат фокуса на кнопку-триггер после закрытия
  modalEl.addEventListener('hidden.bs.modal', function () {
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  });

  // Обработка отправки (демо: без сервера)
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        if (statusEl) {
          statusEl.textContent = 'Проверьте поля формы.';
          statusEl.classList.remove('text-success');
          statusEl.classList.add('text-danger');
        }
        return;
      }

      var nameInput = form.querySelector('#signupName');
      var name = nameInput ? nameInput.value.trim() : '';

      if (statusEl) {
        statusEl.textContent = 'Заявка отправлена' + (name ? ', ' + name : '') + '! Мы свяжемся с вами.';
        statusEl.classList.remove('text-danger');
        statusEl.classList.add('text-success');
      }

      // Здесь будет реальный запрос:
      // fetch(form.action, { method: 'POST', body: new FormData(form) })
      //   .then(...)

      form.reset();
      form.classList.remove('was-validated');

      // Автозакрытие через 1.5 c
      setTimeout(function () {
        var modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }, 1500);
    });
  }
})();