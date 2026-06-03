import { useState } from 'react'

interface Service {
  id: number
  title: string
  description: string
  category: string
  price: number
  seller: string
  rating: number
}

const mockServices: Service[] = [
  {
    id: 1,
    title: 'Ruohonleikkaus',
    description: 'Ammattimainen ruohonleikkauspalvelu',
    category: 'Puutarha',
    price: 50,
    seller: 'Matti K.',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Koiran ulkoilu',
    description: 'Päivittäinen koiran ulkoilutuspalvelu',
    category: 'Lemmikitpalvelut',
    price: 30,
    seller: 'Anna S.',
    rating: 5,
  },
]

export default function ServicesPage() {
  const [services] = useState<Service[]>(mockServices)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8">Saatavilla olevat palvelut</h2>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Hae palveluita..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-40"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{service.category}</p>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">{service.price}€/h</span>
                <span className="text-yellow-500">⭐ {service.rating}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Myyjä: {service.seller}</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Ota yhteyttä
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}