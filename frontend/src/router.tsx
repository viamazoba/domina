import AuthLayout from './components/layout/AuthLayaout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterView from './views/RegisterView'
import LoginView from './views/LoginView'
import TaskView from './views/TasksView'

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/' element={<RegisterView />} />
          <Route path='/login' element={<LoginView />} />
          <Route path='/tasks' element={<TaskView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
