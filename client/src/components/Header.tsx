import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">🏠 Rent It!</Link>
        </h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-blue-200 transition">
            Etusivu
          </Link>
          <Link to="/services" className="hover:text-blue-200 transition">
            Palvelut
          </Link>
          <Link to="/profile" className="hover:text-blue-200 transition">
            Profiili
          </Link>
        </nav>
      </div>
    </header>
  )
}