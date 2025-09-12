import { useState } from "react"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    //
  }
  return (
  <form className="flex space-x-2 w-full">
    <input
        type="email"
        name="email"
        value={email}
        placeholder="email@example.com"
        className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-[#b2c935] transition-colors duration-200 min-w-0"
        required
        // disabled={pending}
        onChange={(e) => setEmail(e.target.value)}
        />
    <input
        type="password"
        name="password"
        value={password}
        className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-[#b2c935] transition-colors duration-200 min-w-0"
        required
        // disabled={pending}
        onChange={(e) => setPassword(e.target.value)}
        />
    <button
        type="submit"
        disabled={!email}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#b2c935] to-[#9db82a] text-[#231f1f] font-semibold text-sm hover:from-[#095aa3] hover:to-[#074a8c] hover:text-white transition-all duration-200 flex-shrink-0 cursor-pointer disabled:cursor-not-allowed"
        onClick={handleLogin}
        >
        Login
       </button>
    </form>
  )
}

export default LoginForm