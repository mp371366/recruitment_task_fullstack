import { useParams } from 'react-router';
import './Currency.css';
import React, { useEffect, useState } from 'react';
import { getCurrency } from '../api/api';
import Spinner from './Spinner';
import { show } from './utils';

const codeTonName = (code) => {
  return {
    "eur": "Euro"
  }[code];
}

function Currency() {
  const { currency } = useParams();
  const name = codeTonName(currency);
  const todayDate = new Date();
  const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('fr-CA', options);
  const formattedDate = formatter.format(todayDate);
  const [date, setDate] = useState(formattedDate);
  const [loading, setLoading] = useState(true);
  const [currencyInfo, setCurrencyInfo] = useState([]);
  const twoWeeksAgo = new Date(Date.parse(date) - 13 * 24 * 3600 * 1000);
  const startDate = formatter.format(twoWeeksAgo);

  useEffect(async () => {
    const currencyInfo = await getCurrency(currency, startDate, date);
    setCurrencyInfo(currencyInfo.rates)
    setLoading(false);
  }, [loading]);

  function handleChange(event) {
    setDate(event.target.value);
    setLoading(true);
  }

  const info
    = loading ? <Spinner />
      : currencyInfo.length === 0 ? <div>Brak danych.</div>
        : (
          <table className="Currency-table">
            <caption>Ostatnie kursy {name} do {date}</caption>
            <thead>
              <tr>
                <th>Data</th>
                <th>Kupno (PLN)</th>
                <th>Sprzedaż (PLN)</th>
              </tr>
            </thead>
            <tbody>
              {currencyInfo.map(({ date, buy, sale }) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{show(buy)}</td>
                  <td>{show(sale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

  return (
    <div className="Currency">
      <form className="Currency-form">
        <label htmlFor="date">Ostatni dzień: </label>
        <input
          type="date"
          name="date"
          id="date"
          max={formattedDate} value={date}
          onChange={handleChange}
        />
      </form>
      {info}
    </div>
  );
}

export default Currency;
