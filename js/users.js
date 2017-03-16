'use strict';

const userSelect = documentSelector('#user');
const usersURL = '/json/users.json';
const users$ = Observable.fromPromise(JSONfromURL(usersURL));
const mapUserToOption = (opt) => Object.assign(opt, {
  id: opt._id,
  name: `${opt.firstname} ${opt.lastname}`
});
const usersSort = (a, b) => a.lastname.localeCompare(b.lastname);
const mapUsersToSelect = users => users.map(mapUserToOption).sort(usersSort);
const userById = compose(querySelector(userSelect), dataValue('id'));
const userDataSet = compose(dataSet, userById);

users$.subscribe(compose(
  updateSelect(userSelect, ""),
  mapUsersToSelect
));
