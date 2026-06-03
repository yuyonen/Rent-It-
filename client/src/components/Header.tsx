import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2 hover:opacity-80 transition">
          <Link to="/" className="flex items-center gap-2">
            🏠 <span>Rent It!</span>
          </Link>
        </h1>

        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-blue-200 transition font-semibold">
            Etusivu
          </Link>
          <Link to="/services" className="hover:text-blue-200 transition font-semibold">
            Palvelut
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-blue-200 transition font-semibold">
                Profiili
              </Link>
              <Link to="/my-services" className="hover:text-blue-200 transition font-semibold">
                Omat palvelut
              </Link>
              <Link to="/messages" className="hover:text-blue-200 transition font-semibold relative">
                Viestit
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </Link>
              <div className="flex items-center gap-3 border-l border-blue-400 pl-8">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {user?.username?.[0].toUpperCase()}
                </div>
                <span className="text-sm font-semibold">{user?.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition font-semibold text-sm"
                >
                  Ulos
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-200 transition font-semibold"
              >
                Kirjaudu
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-bold transform hover:scale-105"
              >
                Rekisteröidy
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>
    </header>
  )
}