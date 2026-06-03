import { useState, useEffect } from 'react'
import { servicesAPI } from '../services/api'

interface Service {
  id: number
  title: string
  description: string
  category: string
  price_per_hour: number
  username: string
  rating: number
  image_url?: string
}

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  puutarha: { bg: 'bg-green-100', text: 'text-green-700', icon: '🌱' },
  lemmikitpalvelut: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '🐕' },
  siivous: { bg: 'bg-pink-100', text: 'text-pink-700', icon: '🧹' },
  korjaus: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '🛠️' },
  opetus: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '📚' },
  kuljetus: { bg: 'bg-orange-100', text: 'text-orange-700', icon: '🚗' },
  default: { bg: 'bg-gray-100', text: 'text-gray-700', icon: '⭐' },
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    loadServices()
  }, [searchTerm, categoryFilter])

  const loadServices = async () => {
    setLoading(true)
    try {
      const response = await servicesAPI.getAll(searchTerm || undefined, categoryFilter || undefined)
      setServices(response.data)
    } catch (err) {
      console.error('Error loading services:', err)
    } finally {
      setLoading(false)
    }
  }

  const getColorScheme = (category: string) => {
    const key = category.toLowerCase()
    return categoryColors[key] || categoryColors.default
  }

  const categories = [
    'Kaikki',
    'Puutarja',
    'Lemmikitpalvelut',
    'Siivous',
    'Korjaus',
    'Opetus',
    'Kuljetus',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Etsi palveluita</h1>
          <p className="text-lg text-blue-100">
            Tuhansia palveluita saatavilla - ruohonleikkaus, koiran ulkoily, siivous ja paljon muuta!
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Hae palveluita... (esim. ruohonleikkaus)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition text-lg"
            />
          </div>

          {/* Category Filter */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Kategoria:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat === 'Kaikki' ? '' : cat)}
                  className={`px-4 py-2 rounded-full font-semibold transition transform hover:scale-105 ${
                    (cat === 'Kaikki' && !categoryFilter) || categoryFilter === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-semibold">
            {loading ? 'Ladataan...' : `Löydetty ${services.length} palvelu${services.length !== 1 ? 'a' : ''}`}
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
            <p className="text-gray-600 mt-4">Ladataan palveluita...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <p className="text-2xl mb-2">😕</p>
            <p className="text-gray-600 text-lg">Palveluita ei löytynyt</p>
            <p className="text-gray-500">Yritä muuttaa hakusanoja tai kategoriaa</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const colorScheme = getColorScheme(service.category)
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition transform hover:scale-105 cursor-pointer group"
                >
                  {/* Image/Category Header */}
                  <div className={`h-32 ${colorScheme.bg} flex items-center justify-center group-hover:brightness-110 transition`}>
                    <span className="text-6xl">{colorScheme.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${colorScheme.bg} ${colorScheme.text}`}>
                        {service.category}
                      </span>
                      <span className="text-yellow-400">⭐ {service.rating.toFixed(1)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Seller Info */}
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-700">{service.username}</span>
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Hinta</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {service.price_per_hour.toFixed(0)}€<span className="text-sm text-gray-600">/h</span>
                        </p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                        Ota yhteyttä
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-blue-50 py-16 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kuinka se toimii?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Etsi</h3>
              <p className="text-gray-600">
                Selaa tuhansia palveluita ja etsi sopiva sinulle
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ota yhteyttä</h3>
              <p className="text-gray-600">
                Viesti palvelun tarjoajalle ja sovi yksityiskohdista
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jätä arvostelu</h3>
              <p className="text-gray-600">
                Hankkimisen jälkeen jätä arvostelu ja auta muita
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}