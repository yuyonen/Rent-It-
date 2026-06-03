import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">🏠 Rent It!</Link>
        </h1>
        <nav className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-blue-200 transition">
            Etusivu
          </Link>
          <Link to="/services" className="hover:text-blue-200 transition">
            Palvelut
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-blue-200 transition">
                Profiili
              </Link>
              <Link to="/my-services" className="hover:text-blue-200 transition">
                Omat palvelut
              </Link>
              <Link to="/messages" className="hover:text-blue-200 transition">
                Viestit
              </Link>
              <span className="text-blue-100">{user?.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
              >
                Kirjaudu ulos
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">
                Kirjaudu
              </Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition font-semibold">
                Rekisteröidy
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}