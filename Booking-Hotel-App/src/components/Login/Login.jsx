
function Login() {
  return (
    <div className="loginContainer">
        <h2>Login</h2>
        <form className="form">
            <div className="formControl">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" />
            </div>
            <div className="formControl">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div className="buttons">
                <button className="btn btn--primary">Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login
