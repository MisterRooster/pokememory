import './App.css'
import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import CardGrid from './components/CardGrid';
import ModalInfo from './components/ModalInfo';

function App() {
  return (
    <div className='flex flex-col min-h-full'>
      <ModalInfo />
      <HeaderBar/>
      <main className='p-4 flex-1 bg-gradient-to-b from-base-100 to-base-200'>
        <CardGrid />
      </main>
      <FooterBar />
    </div>
  )
}

export default App
