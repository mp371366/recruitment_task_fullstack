import axios from 'axios';

const base = 'api';

export const currencies = [
  "EUR", 'USD', 'CZK', 'IDR', 'BRL'
];

function validate(response) {
  if (response.status !== 200 || response.statusText !== 'OK')
    throw Error('Bad repsponse');

  return response.data;
}

export async function getCurrencies() {
  return axios
    .get(`${base}/currencies`)
    .then(validate)
    .then(({ rates, ...rest }) => {
      return {
        ...rest,
        rates: rates.filter((curr) => currencies.includes(curr.code))
      };
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getCurrency(currency, startDate, endDate) {
  return axios
    .get(`${base}/currency/${currency}/${startDate}/${endDate}`)
    .then(validate)
    .catch((error) => {
      console.error(error);
    });
}