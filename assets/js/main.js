// Cura landing page: contact form (Formspree AJAX) and the "Bring Your Brand" preselect.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var button = form.querySelector('button[type="submit"]');
  var brandRadio = form.querySelector('input[name="inquiry_type"][value="Brand or maker"]');

  // "Bring Your Brand" jumps to the form with "Brand or maker" already selected
  document.querySelectorAll('[data-brand-cta]').forEach(function (el) {
    el.addEventListener('click', function () { if (brandRadio) brandRadio.checked = true; });
  });

  function show(msg) { status.textContent = msg; status.hidden = false; }
  function clearInvalid() {
    form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearInvalid();
    status.hidden = true;
    button.disabled = true;
    var label = button.textContent;
    button.textContent = 'Sending…';

    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (data) { return { ok: r.ok, data: data }; });
      })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          if (brandRadio) form.querySelector('input[name="inquiry_type"]').checked = true;
          show('Thanks. We’ll be in touch soon.');
          return;
        }
        var errors = (res.data && res.data.errors) || [];
        errors.forEach(function (err) {
          var field = err.field && form.querySelector('[name="' + err.field + '"]');
          if (field) field.setAttribute('aria-invalid', 'true');
        });
        show(errors.length ? errors.map(function (err) { return err.message; }).join(' ')
                           : 'Something went wrong. Please try again, or message @Curagrocer on Instagram.');
      })
      .catch(function () {
        show('We couldn’t send that. Check your connection and try again, or message @Curagrocer on Instagram.');
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = label;
      });
  });
})();
