import { Facebook, Twitter, Instagram, Youtube, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center mr-2">
                <div className="h-6 w-6 bg-black rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-red-600 rounded-full"></div>
                </div>
              </div>
              <span className="font-bold text-lg">Ultraverse Chronicle</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Ultraverse Chronicle merupakan platform komunitas dan informasi terintegrasi yang menyajikan konten lengkap seputar dunia Ultraman. Kami hadir untuk menghubungkan penggemar melalui pengetahuan, visual, dan interaksi global.
            </p>
            <div className="flex space-x-4">
              <a href= "https://www.facebook.com/tsuburayaglobal/" target="_blank"  rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors"><Facebook size={20}/></a>
              <a href= "https://www.instagram.com/tsuburayaprod/?hl=id" target="_blank"  rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors"><Instagram size={20}  /></a>
              <a href="https://x.com/tsuburayaprod" target="_blank"  rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors"><Twitter size={20}/> </a>
              <a href="https://www.youtube.com/@ULTRAMAN_OFFICIAL" target="_blank"  rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors"><Youtube size={20} /></a>
              <a href="https://tsuburaya-prod.com/" target="_blank" rel="noopener noreferrer"  className="text-gray-400 hover:text-red-600 transition-colors"><Globe size={20} /></a>
            </div>
          </div>

          {/* ✅ Quick Links */}
          {/* Quick Links */}
    <div className="col-span-1">
        <h3 className="font-bold text-lg mb-4 text-red-600">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
        <button onClick={() => navigate('/')} className="text-left text-gray-400 hover:text-white transition-colors">Home</button>
        <button onClick={() => navigate('/series')} className="text-left text-gray-400 hover:text-white transition-colors">Series</button>
        <button onClick={() => navigate('/characters')} className="text-left text-gray-400 hover:text-white transition-colors">Characters</button>
        <button onClick={() => navigate('/news')} className="text-left text-gray-400 hover:text-white transition-colors">News</button>
        <button onClick={() => navigate('/information')} className="text-left text-gray-400 hover:text-white transition-colors">Information</button>
        <button onClick={() => navigate('/gallery')} className="text-left text-gray-400 hover:text-white transition-colors">Gallery</button>
        <button onClick={() => navigate('/shop')} className="text-left text-gray-400 hover:text-white transition-colors">Shop</button>
        <button onClick={() => navigate('/community')} className="text-left text-gray-400 hover:text-white transition-colors">Community</button>
        <button onClick={() => navigate('/login')} className="text-left text-gray-400 hover:text-white transition-colors">Login</button>
        </div>
    </div>


          {/* Community */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4 text-red-600">Community</h3>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/guidelines')} className="text-gray-400 hover:text-white">Community Guidelines</button></li>
              <li><button onClick={() => navigate('/events')} className="text-gray-400 hover:text-white">Upcoming Events</button></li>
              <li><button onClick={() => navigate('/faq')} className="text-gray-400 hover:text-white">FAQ</button></li>
              <li><button onClick={() => navigate('/support')} className="text-gray-400 hover:text-white">Support</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4 text-red-600">Contact Us</h3>
            <form className="space-y-3">
              <input type="email" placeholder="Your email" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md" />
              <textarea rows="3" placeholder="Your message" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"></textarea>
              <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors">Send Message</button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © {currentYear} Ultraman Fanbase. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => navigate('/privacy')} className="text-gray-500 text-sm hover:text-gray-300">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="text-gray-500 text-sm hover:text-gray-300">Terms of Service</button>
            <button onClick={() => navigate('/cookies')} className="text-gray-500 text-sm hover:text-gray-300">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
