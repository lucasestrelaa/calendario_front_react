import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import { formatMoney, formatPercent, getMonth, getPercent } from  './helpers/helpers'

function App() {
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [months, setMonths] = useState([])
  const [total, setTotal] = useState(0.0)
  const [data, setData] = useState([]) 
  const urlBase = "http://localhost:3001/despesas"
  useEffect(() => {
    const months: any = [{
        "id": 1,"numero": '01',},{
        "id": 2,"numero": '02',},{
        "id": 3,"numero": '03',},{
        "id": 4,"numero": '04',},{
        "id": 5,"numero": '05',},{
        "id": 6,"numero": '06',},{
        "id": 7,"numero": '07',},{
        "id": 8,"numero": '08',},{
        "id": 9,"numero": '09',},{
        "id": 10,"numero": '10',},{
        "id": 11,"numero": '11',},{
        "id": 12,"numero": '12'
    }]
    setMonths(months);

    // axios.get(urlBase).then((res) => setData(res.data.sort((a: any, b: any) => a.descricao.localeCompare(b.descricao))))
  },[])
  useEffect(() => {
    // console.log(data)
  }, [data])

  const handleChangeYear = (event:any) => {
    setYear(event.target.value)
    // console.log(event.target.value)
  }
  const handleChangeMonth = (event: any) => {
    setMonth(event.target.value)
    // console.log(event.target.value)
  }
  
  const buscar = async () => {
    // conferir se os campos estão preenchidos
    if(year && month){
      // console.log('buscar')
      const getData = await axios.get(`${urlBase}?mes=${year}-${month}&_sort=dia`).then((res) => res.data)
      setData(getData)
      somaDespesa(getData)
      console.log(`${urlBase}?mes=${year}-${month}&_sort=dia`)
      data.map((res:any) => {
        console.log(res.valor)
      })
    }
  }
  const somaDespesa = (data: any) => {
    let soma = 0.0;
    data.map((res:any) => {
      soma += parseFloat(res.valor);
    })
    setTotal(soma)
  }

  return (
    <div className="App">
      <div>
        <input type="text" name="year" id="year" maxLength={4} onChange={handleChangeYear}/>
        <select name="month" id="month" onChange={handleChangeMonth}>
          <option>Selecione</option>
          {months ? months.map((res: any) =>  <option key={res.numero} value={res.numero}>{getMonth(res.id)}</option>) :""}
        </select>
        <button onClick={buscar}>buscar</button>
      </div>
      <div>
        <div><p>Soma Total: {total}</p></div>
        <table>
          <tr>
            <th>Despesa</th>
            <th>Categoria</th>
            <th>Dia</th>
            <th>Valor</th>
          </tr>
          
            {data? data.map((res:any) => {return <tr key={res.id}><td>{res.descricao}</td><td>{res.categoria}</td><td>{res.mes} - {res.dia}</td><td>{formatMoney(res.valor)}</td></tr>}):""}
          
        </table>
      </div>
    </div>
  );
}

export default App;
