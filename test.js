
var qs = function(selector) {
  return document.querySelector(selector);
}
var qsEach = function(selector, cb) {
  Array.from(document.querySelectorAll(selector)).forEach(cb);
};
qs('h3').innerText =  'Welcome, Your Employee Discounts Are Here!';
qs('h3').style.cssText = 'font-size: 28px !important';
qsEach('.modal-header p', function(el) {
  if (!el.textContent.trim()) el.remove();
});
qs('.modal-header p').innerText =  'Save on major brands & everyday essentials.';
qs('.modal-header p').style.cssText = 'font-size: 18px;';
qs('.modal-header').style.cssText = 'border: none !important;';
qs('.button-holder').style.cssText = 'padding: 0 0 20px 0 !important;';
qs('#submitBtn').innerText =  'VIEW MY DISCOUNTS >';
qs('#submitBtn').style.cssText = 'font-size: 18px;' +
  'height: 65px;' +
  'background-color: #b6e338;' +
  'color: #000;' +
  'font-weight: 600;';
qs('#submitBtn').addEventListener('mouseover', function() {
  qs('#submitBtn').style.backgroundColor = '#000';
  qs('#submitBtn').style.color = '#fff';
});
qs('#submitBtn').addEventListener('mouseout', function() {
  qs('#submitBtn').style.backgroundColor = '#b6e338';
  qs('#submitBtn').style.color = '#000';
});
qsEach('.terms-title', function(el) {el.textContent = 'Activate Your Employee Savings';});
qsEach('.input-text-wrapper label', function(el) {el.classList.add('sr-only');});
qsEach('.aui #portlet_terms-of-use form .field.email', function(el) {
  el.setAttribute('placeholder','Confirm your email');
  el.style.width = '340px';
});
qsEach('.modal-header p', function(el) {
  el.textContent = 'Save on major brands & everyday essentials.';
  el.style.fontSize = '1.2em';
  el.style.display = 'inline-block';
  el.style.width = '430px';
  el.style.textAlign = 'center';
});
qsEach('.portlet-content', function(el) {
  el.style.textAlign = 'center';
  el.style.margin = '0 auto';
  el.style.width = '980px';
});
qsEach('.aui .input-text-wrapper .modal-header', function(el) {el.style.borderBottom = 'none';});
qsEach('.logo-portlet', function(el) {
  el.style.margin = '0 auto';
  el.style.width = 'auto';
});
qsEach('.lm-first-logo', function(el) {
  el.style.margin = '0 auto';
  el.style.float = 'none';
  el.style.display = 'inline-block';
  el.style.borderRight = '1px solid gray';
});
qsEach('.lm-logos', function(el) {
  el.style.float = 'none';
  el.style.display = 'inline-block';
  el.style.marginLeft = '0';
});
qsEach('.aui #portlet_terms-of-use .journal-entry-container .modal-header h3', function(el) {
  el.innerText = 'Welcome, Your Employee Discounts Are Here!';
  el.className = '';
  el.style.textAlign = 'center !important';
  el.style.fontSize = '2em';
  el.style.width = '400px';
  el.style.margin = '0 auto 10px auto';
});
qsEach('input#email', function(el) {
  el.style.width = '430px';
  el.style.margin = '0 0 15px 0';
});
qsEach('.aui form#fm .error div', function(el) {
  el.style.position = 'relative !important';
  el.style.bottom = '0 !important';
  el.style.fontSize = '14px !important';
  el.style.margin = '0 auto';
});
qsEach('.aui form#fm .button-holder', function(el) {el.style.display = 'inline-block;';});
qsEach('.aui form#fm .button-holder button', function(el) {
  el.innerText = 'View My Discounts >';
  el.style.width = '430px';
  el.style.height = '65px';
  el.style.textTransform = 'none';
  el.style.borderRadius = '15px';
  el.style.float = 'none';
  el.style.backgroundColor = '#00B4FA';
  el.style.color = '#000';
  el.style.fontSize = '1.7em';
  el.style.fontWeight = 'bold';
});
qsEach('.form-wrapper p:last-child', function(el) {
  el.style.color = 'grey';
  el.style.fontSize = '0.9em';
});
qsEach('.form-wrapper p:last-child a', function(el) {
  el.style.color = '#737373';
  el.style.fontSize = '0.9em';
});
qsEach('.sr-only', function(el) {
  el.style.position = 'absolute';
  el.style.left = '-10000px';
  el.style.top = 'auto';
  el.style.width = '1px';
  el.style.height = '1px';
  el.style.overflow = 'hidden';
});
qsEach('#customLogo > div.span2.lm-first-logo', function(el) {el.style.marginLeft = '0px';});
if (window.innerWidth < 980) {
  qsEach('#customLogo > div.span2.lm-logos', function(el) {
    el.style.marginRight = '50px';
  });
} 