import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SpeachToTexr from './pages/SpeachToTexr'
import ImageToText from './pages/ImageToText'
import Header from './components/features/Header'
import WordFileFramer from './pages/Word'
function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<SpeachToTexr />}>
        </Route>
        <Route path='/image' element={<ImageToText />}>
        </Route>
        <Route path='/word' element={<WordFileFramer />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
