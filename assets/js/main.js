// Cura landing page behaviour: brand CTA preselects the form, form posts to Formspree.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var brandRadio = form.querySelector('input[name="who"][value="brand"]');

  // "Bring Your Brand" jumps to the form with "Brand or maker" already selected
  document.querySelectorAll('[data-brand-cta]').forEach(function (el) {
    el.addEventListener('click', function () { if (brandRadio) brandRadio.checked = true; });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    var show = function (msg) { status.textContent = msg; status.hidden = false; };
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      show('The form isn’t connected yet. Add your Formspree form ID in index.html (see README).');
      return;
    }
    button.disabled = true;
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('Request failed');
        form.reset();
        show('Thanks. We’ll be in touch soon.');
      })
      .catch(function () {
        show('Something went wrong. Please email us or message @Curagrocer on Instagram.');
      })
      .finally(function () { button.disabled = false; });
  });
})();
