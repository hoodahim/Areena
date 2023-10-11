import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isLoading, login } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
    if (!error) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Login</h2>
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
        input
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
