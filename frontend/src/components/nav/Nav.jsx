import { Link } from 'react-router-dom';
import { authActions } from '../../store/index';
import { useDispatch, useSelector} from 'react-redux';

const Nav = () => {
const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  const dispatch =useDispatch();
  const logout =()=>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    history("/signin");
  }
  return (
    <div>
      <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">

  <div className="text-2xl font-bold">Professional AI Chatbot</div>

  
  <div className="hidden md:flex space-x-6">
    <Link to="/" className="hover:text-gray-200">Home</Link>
    {!isLoggedIn && (
        <>
        <Link to="/signin" className="hover:text-gray-200">Login</Link>
        <Link to="/signup" className="hover:text-gray-200">SingUp</Link>
        </>
    )}
    {isLoggedIn && (
        <>
        <Link onClick={logout} className="hover:text-gray-200">Logout</Link>
        </>
    )}
  </div>
</nav>
    </div>
  )
}

export default Nav;