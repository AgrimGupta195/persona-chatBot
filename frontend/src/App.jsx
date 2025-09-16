import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Responsive Navigation */}
      <nav className='bg-black text-white flex justify-center items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border-b border-white/20 shadow-lg shadow-white/10 shrink-0'>
        <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center leading-tight'>
          <span className="block sm:hidden">Chat With Personalities</span>
          <span className="hidden sm:block md:hidden">Chat With Famous People</span>
          <span className="hidden md:block">Chat With Famous Personalities</span>
        </h1>
      </nav>
      
      {/* Main Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/chat/:id" element={<ChatPage/>} />
        </Routes>
      </div>
    </div>
  )
};

export default App;