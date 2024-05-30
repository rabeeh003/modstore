import './App.css'
import { useSelector } from 'react-redux';
import UserNavbar from './pages/user/components/UserNavbar';
import Home from './pages/user/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import PostPage from './pages/user/PostPage';
import Category from './pages/user/Category';
import AdminNavbar from './pages/admin/components/AdminNavbar';
import AdminHome from './pages/admin/AdminHome';
import PostList from './pages/admin/PostList';
import Advertisement from './pages/admin/Advertisement';
import Login from './pages/admin/Login';
import CreateBlog from './pages/admin/CreateBlog';

function App() {
  const them = useSelector(state => state.them.currentThem)
  const admin = useSelector(state => state?.admin)?.admin

  const AdminRoute = ({ children, ...rest }) => {
    if (admin != '') {
      return children
    } else {
      return <Navigate to={"/login"}></Navigate>
    }
  }

  const LoginRoute = ({ children, ...rest }) => {
    if (admin == "") {
      return children
    } else {
      return <Navigate to={"/admin"}></Navigate>
    }
  }


  return (
    <div className={`${them} h-full min-h-[100vh] bg-background text-foreground`}>
      <Routes>
          <Route path='/' element={<UserNavbar />}>
            <Route index element={<Home />} />
            <Route path='apps/:appid' element={<PostPage />} />
            <Route path=':category' element={<Category />} />
          </Route>
        <Route path='/admin' element={<AdminRoute><AdminNavbar /></AdminRoute>}>
          <Route index element={<AdminHome />} />
          <Route path='post-list' element={<PostList />} />
          <Route path='advertisement' element={<Advertisement />} />
          <Route path='create-blog' element={<CreateBlog />} />
        </Route>
        <Route path='/login' element={<LoginRoute><Login /></LoginRoute>} />
      </Routes>
    </div>
  )
}

export default App
