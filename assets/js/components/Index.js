import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Index.css';
import { getCurrencies } from '../api/api';
import Spinner from './Spinner';
import { show } from './utils';

function Index() {
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);
  const [date, setDate] = useState("");

  useEffect(async () => {
    if (!loading) return;
    const { date, rates } = await getCurrencies();
    setCurrencies(rates);
    setDate(date);
    setLoading(false);
  }, [loading]);

  if (loading)
    return <div className="Index"><Spinner /></div>;

  if (currencies.length === 0)
    return <div className="Index">Brak danych.</div>;



  function row({ code, buy, sale }) {
    return (
      <tr key={code}>
        <td><Link className="Index-link" to={code}>{code}</Link></td>
        <td>{show(buy)}</td>
        <td>{show(sale)}</td>
      </tr>
    );
  }

  return (
    <div className="Index">
      <table className="Index-table">
        <caption>Kursy walut z dnia {date}</caption>
        <thead>
          <tr>
            <th>Waluta</th>
            <th>Kupno (PLN)</th>
            <th>Sprzedaż (PLN)</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map(row)}
        </tbody>
      </table>
    </div>
  );
}

export default Index;