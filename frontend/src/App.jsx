import { createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dasboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Important from './pages/Important';
import Settings from './pages/Settings';
import RootLayout from './layout/RootLayout';
import DashboardLayout from './layout/DashboardLayout';
import Tags from './pages/Tags';
import AddNote from './pages/AddNote';
import NoteDetails from './pages/NoteDetails';
import EditNote from './pages/EditNote';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path='dashboard' element={<Dasboard />} />
            <Route path='important' element={<Important />} />
            <Route path='settings' element={<Settings />} />
            <Route path='tags' element={<Tags />} />
            <Route path='add-note' element={<AddNote />} />
            <Route path='edit-note/:id' element={<EditNote />} />
            <Route path='note-details/:id' element={<NoteDetails />} />
          </Route>
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
