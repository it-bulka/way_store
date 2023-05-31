import { Sidebar } from '@/components/ui/Sidebar/Sidebar'
import { Products } from '@/components/business/Products/Products'
import { Header } from '@/components/business/Header/Header'
import { Footer } from '@/components/business/Footer/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Sidebar className="app-content-first" />
        <Products />
      </main>
      <Footer />
    </div>
  )
}

export default App
