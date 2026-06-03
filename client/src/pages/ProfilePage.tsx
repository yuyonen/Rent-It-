export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 bg-gray-300 rounded-full mr-6"></div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Käyttäjän Nimi</h2>
            <p className="text-gray-600">Liity palveluun nähdäksesi profiilin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Omat palvelut</h3>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-4">
              + Lisää uusi palvelu
            </button>
            <p className="text-gray-600">Sinulla ei ole vielä palveluita. Aloita luomalla uusi!</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Viestit</h3>
            <p className="text-gray-600">Sinulla ei ole uusia viestejä.</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h3 className="text-xl font-bold mb-4">Arvostelut</h3>
          <p className="text-gray-600">Sinulla ei ole vielä arvosteluja.</p>
        </div>
      </div>
    </div>
  )
}