
import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './Pages/User/UserLayout'
import Home from './Pages/User/Home'
import Doctors from './Pages/User/Doctors'
import Services from './Pages/User/Services'
import About from './Pages/User/About'
import Contact from './Pages/User/Contact'
import AdminLayout from './Pages/Admin/AdminLayout'
import AppoinmentRegister from './Pages/User/AppoinmentRegister'
import MyAppoinment from './Pages/User/MyAppoinment'
import MyReports from './Pages/User/MyReports'
import Dashboard from './Pages/Admin/Dashboard'
import PatientsRecord from './Pages/Admin/PatientsRecord'
import Departments from './Pages/Admin/Departments'
import Appoinmet from './Pages/Admin/Appoinmet'
import PatientsReports from './Pages/Admin/PatientsReports'
import UserRoute from './Components/Common/UserRoute'
import AdminRoute from './Components/Common/AdminRoute'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import DoctorsAdmin from './Pages/Admin/DoctorsAdmin'
import PageNotFound from './Pages/PageNotFound'
import Profile from './Components/Common/Profile'
import AddPatient from './Pages/Admin/AddPatient'
import PatientView from './Pages/Admin/PatientView'
import PatientReportAdd from './Pages/Doctor/PatientReportAdd'
import DoctorRoute from './Components/Common/DoctorRoute'
import DoctorLayout from './Pages/Doctor/DoctorLayout'
import DoctorHomePage from './Pages/Doctor/DoctorHomePage'
import DoctorRegisterPage from './Components/Doctor/DoctorRegisterPage'
import OwnPatientsList from './Pages/Doctor/OwnPatientsList'
import AllPatientsList from './Pages/Doctor/AllPatientsList'
import PatientReportView from './Pages/Admin/PatientReportView'

function App() {

  return (
    <>
      <Routes>
        {/* normal routing for unregitered users */}
        <Route path='/' element={<UserLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='doctors' element={<Doctors/>}/>
          <Route path='service' element={<Services/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='contact' element={<Contact/>}/>
        </Route>

        {/* route for login , register , page nt found */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/doctorRegister' element={<DoctorRegisterPage/>}/>
        <Route path='*' element={<PageNotFound/>}/>

        {/* routing for registered users */}
        <Route element={<UserLayout/>}>
          <Route path='/user' element={<UserRoute/>}>
            <Route index element={<Home/>}/>
            <Route path='appoinmentreg' element={<AppoinmentRegister/>}/>
            <Route path='myAppoinment' element={<MyAppoinment/>}/>
            <Route path='myReport' element={<MyReports/>}/>
            <Route path='profile' element={<Profile/>}/>
          </Route>
        </Route>

        {/* routing for admin */}
        <Route element={<AdminLayout/>}>
          <Route path='/admin' element={<AdminRoute/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='patients' element={<PatientsRecord/>}/>
            <Route path='patientReport/:id?' element={<PatientReportView/>}/>
            <Route path='view/:id' element={<PatientView/>}/>
            <Route path='departments' element={<Departments/>}/>
            <Route path='appoinment' element={<Appoinmet/>}/>
            <Route path='addPatient/:id?' element={<AddPatient/>}/>
            <Route path='doctors' element={<DoctorsAdmin/>}/>
            <Route path='reports' element={<PatientsReports/>}/>
          </Route>
        </Route>

        {/* routing for doctors */}
        <Route element={<DoctorLayout/>}>
          <Route path='/doctor' element={<DoctorRoute/>}>
              <Route index element={<DoctorHomePage/>}/>
              <Route path='addReport' element={<PatientReportAdd/>} />
              <Route path='patients' element={<OwnPatientsList/>} />
              <Route path='allPatients' element={<AllPatientsList/>} />
          </Route>
        </Route>
      </Routes>    
    </>
  )
}

export default App
