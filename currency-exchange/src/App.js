import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  // initialize value, rates, currency
  const [value, setValue] = useState('');
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);
  // use effect to fetch currency, if wanting most updated current run the effect again
  useEffect(() => {
    console.log('fetching exchange rates')

    if (currency){
      console.log(currency)
    axios
    .get(`https://v6.exchangerate-api.com/v6/2122b86315365d04f7f14c2c/latest/${currency}`)
    .then(response => {
      console.log('Response data:', response.data.conversion_rates);
      setRates(response.data.conversion_rates)
    })
    .catch(error => {
      console.error('there is an error', error)
    })
  } else {
    console.log('no currency set')
  }
  }, [currency])


  // form/button/ and event handlers to display
  const onSearch = (event) => {
    event.preventDefault();
    setCurrency(value)
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }


  return (
    <div>
    <form onSubmit={onSearch}>
      currency: <input value={value} onChange={handleChange}/>
      <button type="submit">exchange rate</button>
    </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
  )
}

export default App
