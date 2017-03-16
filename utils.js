'use strict';

console.clear();
const Observable = Rx.Observable;

// Utils
function compose(f, g) {
  return function composed(...args) {
    return f.call(this, g.apply(this, arguments));
  };
}
const log = l => o => {
  console.log(l, o);
  return o;
};

const identity = value => value;
const getValue = evt => evt.target.value;
const setValue = input => value => input.value = value;
const updateHTML = domObject => html => domObject.innerHTML = html;
const dataValue = prop => value => `[data-${prop}='${value}']`;
const querySelector = element => selector => element.querySelector(selector);
const documentSelector = querySelector(document);
const textContent = element => element.textContent;
const dataSet = element => element.dataset;
const fromNullable = fn => m => !m ? {} : fn(m);
const stringify = o => JSON.stringify(o, null, ' ');
const JSONfromURL = URL => fetch(URL).then(r => r.json())

const inputChanges = (inputDOM, value = "", eventDOM = "keyup") => Observable
  .fromEvent(inputDOM, eventDOM)
  .startWith({ target: { value } })
  .distinctUntilChanged()
  .map(getValue)
  .do(setValue(inputDOM));

const setData = (element, data) => {
  Object.assign(element.dataset, data);
  return element;
};
const createOption = def => opt => setData(new Option(opt.name, opt.id, def, (opt.id === def)), opt);

const updateSelect = (input, selected) => options => {
  const fragment = new DocumentFragment();
  const appendChild = child => fragment.appendChild(child);
  [{}].concat(options).forEach(compose(appendChild, createOption(selected)));
  input.appendChild(fragment);
};

const MAP = { ZOOM: 5, SIZE: '1000x200' };
const updateMap = img => country => img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${country}&zoom=${MAP.ZOOM}&size=${MAP.SIZE}`

const ISO_8601 = { FULL: 'YYYY-MM-DDThh:mm:ssTZD', WIRE: 'YYYY-MM-DD' };
const dateFormatted = date => moment(date, ISO_8601.FULL).format(ISO_8601.WIRE);
