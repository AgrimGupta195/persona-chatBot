
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <div className="bg-black h-screen flex flex-col">
      <nav className='bg-black text-white flex justify-center items-center px-4 py-3 text-3xl font-bold sm:text-2xl border-b border-white/20 shadow-lg shadow-white/10 shrink-0'>
        Chat With Famous Personalities       
      </nav>
      <div className='flex-1 overflow-hidden'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/chat/:id" element={<ChatPage/>} />
        </Routes>
      </div>
    </div>
  )
};

export default App;