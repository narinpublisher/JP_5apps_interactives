const calcButton =
  document.querySelector('#calcButton');

const totalInput =
  document.querySelector('#totalAmount');

const peopleInput =
  document.querySelector('#peopleCount');

const result =
  document.querySelector('#result');


calcButton.addEventListener('click', () => {

  const total =
    Number(totalInput.value);

  const people =
    Number(peopleInput.value);

  const taxed =
    total * 1.1;

  const perPerson =
    taxed / people;

  result.textContent =
    `¥${Math.round(perPerson).toLocaleString()}`;

});