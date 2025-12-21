import { Link, useLocation, useNavigate } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import { isAuthenticated, removeToken } from '../../lib/auth';
import { cn } from '../../lib/utils';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  
  const { data: user } = trpc.auth.me.useQuery(undefined, {
    enabled: authenticated,
  });

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md sticky top-0 z-[1000]">
      <div className="max-w-screen-xl mx-auto px-5 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-3 text-white no-underline text-2xl font-bold transition-opacity hover:opacity-90">
          <span className="text-[28px]">🎥</span>
          NotWhat
        </Link>

        <div className="flex items-center gap-2">
          {authenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={cn(
                  "text-white no-underline px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 hover:bg-white/15",
                  isActive('/dashboard') && "bg-white/20"
                )}
              >
                <span className="text-lg">🏠</span>
                <span className="max-md:hidden">Dashboard</span>
              </Link>
              <Link 
                to="/channels" 
                className={cn(
                  "text-white no-underline px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 hover:bg-white/15",
                  isActive('/channels') && "bg-white/20"
                )}
              >
                <span className="text-lg">📺</span>
                <span className="max-md:hidden">Channels</span>
              </Link>
              <button 
                onClick={() => navigate('/create-channel')}
                className="bg-white text-indigo-500 border-none px-5 py-2.5 rounded-lg font-semibold cursor-pointer transition-all flex items-center gap-1.5 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-px"
              >
                <span className="text-lg max-md:hidden">➕</span>
                <span className="max-md:hidden">Create</span>
                <span className="md:hidden">➕</span>
              </button>
              
              {user && (
                <div className="flex items-center gap-3 px-4 py-2 bg-white/15 rounded-lg text-white font-medium">
                  <div className="w-8 h-8 rounded-full bg-white text-indigo-500 flex items-center justify-center font-bold">
                    {user.email[0].toUpperCase()}
                  </div>
                  <span className="max-md:hidden">{user.email}</span>
                </div>
              )}

              <button 
                onClick={handleLogout}
                className="bg-white/20 text-white border-none px-5 py-2.5 rounded-lg font-semibold cursor-pointer transition-all flex items-center gap-1.5 hover:bg-white/30 hover:-translate-y-px"
              >
                <span className="text-lg max-md:hidden">🚪</span>
                <span className="max-md:hidden">Logout</span>
                <span className="md:hidden">🚪</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white no-underline px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 hover:bg-white/15">
                Login
              </Link>
              <Link to="/register" className="bg-white text-indigo-500 no-underline px-5 py-2.5 rounded-lg font-semibold transition-all hover:bg-gray-50 hover:shadow-lg hover:-translate-y-px">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
