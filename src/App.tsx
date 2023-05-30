import { Sidebar } from '@/components/ui/Sidebar/Sidebar'
import { Products } from '@/components/business/Product/Products'
import { Header } from '@/components/business/Header/Header'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Sidebar className="app-content-first" />
        <Products />
      </main>
    </div>
  )
}

export default App
