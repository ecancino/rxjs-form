'use strict';

const formFieldset = documentSelector('#form');
const firstnameInput = documentSelector('#firstname');
const lastnameInput = documentSelector('#lastname');
const genderFemale = documentSelector('#female');
const genderMale = documentSelector('#male');
const ageInput = documentSelector('#age');
const registeredInput = documentSelector('#registered');
const savedPre = documentSelector('#saved');
const mapImg = documentSelector('#location');

console.log(genderFemale, genderMale)

const userChanges$ = inputChanges(userSelect, "", "change");

userChanges$.subscribe(userId => {
  if (!userId) return;
  const user = userDataSet(userId);

  const firstnameChanges$ = inputChanges(firstnameInput, user.firstname);
  const lastnameChanges$ = inputChanges(lastnameInput, user.lastname);
  const countryChange$ = inputChanges(countrySelect, user.country, "change").map(countryName);
  const ageChanges$ = inputChanges(ageInput, user.age);
  const registeredChanges$ = inputChanges(registeredInput, dateFormatted(user.registered), "change");

  const femaleChanges$ = inputChanges(genderFemale, "F", "change");
  const maleChanges$ = inputChanges(genderMale, "M", "change");

  const genderChanges$ = Observable.combineLatest(femaleChanges$, maleChanges$, (female, male) => {
    return [female, male];
  });

  const parseForm = (firstname, lastname, country, age, registered, gender) => ({ firstname, lastname, country, age, registered, gender });
  const formChange$ = Observable.combineLatest(firstnameChanges$, lastnameChanges$, countryChange$, ageChanges$, registeredChanges$, genderChanges$, parseForm);
  const mapUpdater = updateMap(mapImg);
  const updateData = compose(updateHTML(savedPre), stringify);
  const enableForm = o => formFieldset.disabled = !user.id;
  const updateForm = compose(mapUpdater, updateData);

  formChange$.subscribe(form => {
    // updateMap();
    updateData(form);
    mapUpdater(form.country);
    enableForm();
  });
});
