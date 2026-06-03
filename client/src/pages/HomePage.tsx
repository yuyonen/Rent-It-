import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Vuokraa tai myy palveluita
              <span className="text-blue-600"> helposti</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Rent It! on palveluiden markkinapaikka, jossa ammattilaiset ja harrastajat voivat tarjota ja etsiä palveluita. Ruohonleikkaus, koiran ulkoilu, siivous ja paljon muuta!
            </p>
            <div className="flex gap-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
              >
                Aloita nyt
              </Link>
              <Link
                to="/services"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Selaa palveluita
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-lg opacity-75"></div>
              <div className="relative bg-white rounded-lg p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">🏠</div>
                    <div>
                      <p className="font-semibold text-gray-900">500+ palvelua</p>
                      <p className="text-sm text-gray-600">käytettävissä</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">👥</div>
                    <div>
                      <p className="font-semibold text-gray-900">2000+ käyttäjää</p>
                      <p className="text-sm text-gray-600">aktiivisia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">⭐</div>
                    <div>
                      <p className="font-semibold text-gray-900">4.8 keskiarvo</p>
                      <p className="text-sm text-gray-600">arvioista</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Miksi valita Rent It!?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Turvallinen</h3>
              <p className="text-gray-600">
                Kaikki käyttäjät vahvistetaan ja niillä on arviointi-järjestelmä. Turvallisia maksuja.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nopea</h3>
              <p className="text-gray-600">
                Etsi palveluita sekunnissa. Ota yhteyttä palvelun tarjoajaan välittömästi.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Edullinen</h3>
              <p className="text-gray-600">
                Kilpailukykyiset hinnat suoraan palvelun tarjoajalta ilman välikäsiä.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Responsiivinen</h3>
              <p className="text-gray-600">
                Käytä millä tahansa laitteella. Optimal-kokemus puhelimella ja pöytäkoneella.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Arvioitu</h3>
              <p className="text-gray-600">
                Lue muiden arvioita ja anna oma arviosi. Rakenna luottamusta yhteisön kanssa.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Viestintä</h3>
              <p className="text-gray-600">
                Viesti suoraan palvelun tarjoajalle sovimatta yksityiskohtia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Suosituimmat palvelut
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Nähdään mitä palveluita käyttäjät etsivät eniten
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
              <div className="h-40 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-5xl">🌱</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Puutarjan hoito</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Ruohonleikkaus, puiden leikkaus, istutus
                </p>
                <p className="text-2xl font-bold text-green-600">25-60€/h</p>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
              <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-5xl">🐕</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Koiran ulkoilu</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Päivittäinen ulkoilu, leikkiminen, hoito
                </p>
                <p className="text-2xl font-bold text-blue-600">20-40€/h</p>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
              <div className="h-40 bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
                <span className="text-5xl">🧹</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Siivous</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Asunnon siivous, syvä siivous, ikkunat
                </p>
                <p className="text-2xl font-bold text-pink-600">20-50€/h</p>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
              <div className="h-40 bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                <span className="text-5xl">🛠️</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Korjauspalvelut</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Remontti, korjaukset, asennus
                </p>
                <p className="text-2xl font-bold text-yellow-600">30-80€/h</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Selaa kaikki palvelut →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Aloita ansaitseminen tai säästäminen tänään
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Liity tuhansien tyytyväisten käyttäjien joukkoon. Se on ilmaista!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Rekisteröidy nyt
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition"
            >
              Selaa palveluita
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
            <p className="text-gray-600">Palvelua</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600 mb-2">2000+</p>
            <p className="text-gray-600">Käyttäjää</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-yellow-600 mb-2">4.8★</p>
            <p className="text-gray-600">Keskiarvo</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-600 mb-2">24h</p>
            <p className="text-gray-600">Tuki</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Rent It!</h4>
              <p className="text-sm">Palveluiden markkinapaikka, jossa ammattilaiset ja harrastajat voivat tarjota palveluita.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Palvelut</h4>
              <ul className="text-sm space-y-2">
                <li><Link to="/services" className="hover:text-white">Selaa palveluita</Link></li>
                <li><Link to="/register" className="hover:text-white">Lisää palvelu</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Tili</h4>
              <ul className="text-sm space-y-2">
                <li><Link to="/login" className="hover:text-white">Kirjaudu</Link></li>
                <li><Link to="/register" className="hover:text-white">Rekisteröidy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Yhteystiedot</h4>
              <p className="text-sm">📧 info@rentit.fi</p>
              <p className="text-sm">📞 +358 (0)1 234 5678</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Rent It! Kaikki oikeudet pidätetään.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}