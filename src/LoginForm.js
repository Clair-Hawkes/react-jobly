import { useState } from "react";
import Alert from './Alert';

/** LoginForm component
 * TODO:
 *
 * Props: setContext
 *
 * State:
 * - formData: { username, password, firstName, lastName, email }
 * - errorData: []
 *
 * RoutesList -> LoginForm
 */
//TODO: make password secret
function LoginForm({ sendUserData }) {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errorData, setErrorData] = useState([]);

  /** Update local state w/curr state of input elem */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /**  handleSubmit calls func passed as prop
   * on success will reset formData state
   * on failure will setErrorData state
  */
  function handleSubmit(evt) {
    evt.preventDefault();
    try {
      sendUserData(formData);
      setFormData(initialState);
      setErrorData([]);
    } catch (err) {
      setErrorData(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        /></p>

      <p><label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        /></p>

      {errorData.length > 0 && <Alert errors={errorData} />}

      <button>Submit</button>

    </form>
  )
}

export default LoginForm;