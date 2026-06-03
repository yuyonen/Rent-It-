export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Tervetuloa Rent It! -palveluun</h2>
        <p className="text-xl text-gray-600 mb-8">
          Vuokraa tai myy palveluita kuten ruohonleikkuuta, koiran ulkoiluttamista ja paljon muuta!
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
          Aloita nyt
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">🌱 Puutarjan hoito</h3>
          <p className="text-gray-600">
            Löydä ammattilaisia puutarjan hoitoon ja ruohonleikkuuun.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">🐕 Koiran ulkoilu</h3>
          <p className="text-gray-600">
            Luotettavat koiranulkoiluttajat koirallesi.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">🛠️ Muut palvelut</h3>
          <p className="text-gray-600">
            Siivous, korjaukset, opetus ja paljon muuta.
          </p>
        </div>
      </div>
    </div>
  )
}