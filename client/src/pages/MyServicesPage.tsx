import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { servicesAPI } from '../services/api'

interface Service {
  id: number
  title: string
  description: string
  category: string
  price_per_hour: number
  is_available: boolean
}

export default function MyServicesPage() {
  const { user } = useAuth()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    pricePerHour: '',
  })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    if (!user) return
    setLoading(true)
    try {
      const response = await servicesAPI.getUserServices(user.id)
      setServices(response.data)
    } catch (err) {
      console.error('Error loading services:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await servicesAPI.create(formData)
      setFormData({ title: '', description: '', category: '', pricePerHour: '' })
      setShowForm(false)
      loadServices()
    } catch (err) {
      console.error('Error creating service:', err)
    }
  }

  const handleDelete = async (serviceId: number) => {
    if (window.confirm('Oletko varma?')) {
      try {
        await servicesAPI.delete(serviceId)
        loadServices()
      } catch (err) {
        console.error('Error deleting service:', err)
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Omat palvelut</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Peruuta' : '+ Lisää palvelu'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">Uusi palvelu</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Otsikko</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Esim. Ruohonleikkaus"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategoria</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Esim. Puutarja"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Kuvaus</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Kuvaa palveluasi tarkemmin..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hinta (€/tunti)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.pricePerHour}
                onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Lisää palvelu
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Ladataan...</div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">Sinulla ei ole vielä palveluita</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Luo ensimmäinen palvelu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.category}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  service.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {service.is_available ? 'Saatavilla' : 'Ei saatavilla'}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">{service.price_per_hour}€/h</p>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Muokkaa
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Poista
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}