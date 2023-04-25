import { usePostLoginMutation, usePostSignupMutation } from "@/state/api"
import { useEffect, useState } from "react"

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>
  setSecret: React.Dispatch<React.SetStateAction<string>>
}

const Login: React.FC<Props> = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("1234")
  const [triggerLogin, resultLogin] = usePostLoginMutation()
  const [triggerSignup] = usePostSignupMutation()
  useEffect(() => {
    const users = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9"]
    const randomIndex = Math.floor(Math.random() * users.length)
    setUsername(users[randomIndex])
  }, [])
  const handleLogin = () => {
    triggerLogin({ username, password })
  }
  const handleRegister = () => {
    triggerSignup({ username, password })
  }
  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username)
      setSecret(password)
    }
  }, [resultLogin.data]) //eslint-disable-line
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">CHATGPT APP</h2>
        
        {isRegister ? (
          <div>
            <h5 className="ce-chat-header">Signup Page</h5>
            <p>Signing up disabled. Please login with any of </p>
            <p>the provided usernames from user1 to user9</p>
          </div>
        ) : (
          <div>
            <h5 className="ce-chat-header">Login Page</h5>
            <p>Please login with any of: user1, user2 up to user9</p>
            <p>Password: 1234</p>
          </div>
        )}

        <div>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="register-change" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already a registered user? Login" : "New user? Signup"}
        </p>
        <div className="login-actions">
          {isRegister ? (
            <button
              style={{ color: "blue", borderRadius: "10px", padding: "5px 10px", border: "1px solid blue" }}
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
          ) : (
            <button
              style={{ color: "blue", borderRadius: "10px", padding: "5px 10px", border: "1px solid blue" }}
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
