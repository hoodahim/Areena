import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { error, isLoading, signup } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(name, email, password);
    if (!error) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div className="form-control">
        <label htmlFor="name">Name: </label>
        <input
          type="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="material-symbols-outlined loginSignup"
      >
        person_add
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
