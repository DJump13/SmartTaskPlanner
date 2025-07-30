
const LoginForm = ({ formData, handleChange, handleSubmit, error }) => (
  <div className="login-container">
    <h2>Login</h2>
    {error && <p className="error">{error}</p>}

    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      /><br />

      <button type="submit">Login</button>
    </form>
  </div>
);

export default LoginForm;
