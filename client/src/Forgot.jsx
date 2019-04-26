import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

function Forgot() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    const res = await axios.post('/api/forgot', { email });
    const { data } = res;
    setError(data.message);
    setTimeout(() => {
      setError('');
    }, 3000);
  }
  return (
    <div className="simple-card">
      <h1>Forgot Password?</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          name="email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <div>{error}</div>
      </form>
    </div>
  );
}

export default Forgot;
