
const RegisterForm = ({ formData, handleChange, handleSubmit, error }) => (
  <div className="register-container">
    <h2>Register</h2>
    {error && <p className="error">{error}</p>}

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      /><br />

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

      <button type="submit">Register</button>
    </form>
  </div>
);

export default RegisterForm;