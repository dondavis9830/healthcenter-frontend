import axiosService from "../API/axiosService";

//user registration
export const registerUserAPI=async(user)=>{
    return await axiosService('POST',`/users`,user)
}

// search userid and email in users array
export const checkUseridAndEmailAPI=async(email)=>{
    return await axiosService('GET',`/users?email=${email}`,{})
}

// search user for login ,checking in users array
export const searchUserAPI=async(email,password,userID)=>{
    return await axiosService('GET',`/users?email=${email}&password=${password}&userID=${userID}`)
}

// user booking appointment
export const bookAppointmentAPI=async(appointment)=>{
    return await axiosService('POST',`/appoinment`,appointment)
}

// get all appoinment details
export const showAppointmentsAPI=async()=>{
    return await axiosService('GET','/appoinment',{})
}

// get all appoinment details through id
export const getPatientDetailsThroughIdAPI=async(id)=>{
    return await axiosService('GET',`/appoinment/${id}`,{})
}

// add patient details
export const addPatientAPI=async(patient)=>{
    return await axiosService('POST',`/patients`,patient)
}

// get patient data through id
export const getPatientThroughIdAPI=async(id)=>{
    return await axiosService('GET',`/patients/${id}`,{})
}

//edit patient details
export const editPatientDetails=async(id,patient)=>{
    return await axiosService('PATCH',`/patients/${id}`,patient)
}

// delete appoinment through id 
export const deleteAppointmentAPI=async(id)=>{
    return await axiosService('DELETE',`/appoinment/${id}`,{})
}

// get all patient details 
export const getAllPatientsDetailsAPI=async()=>{
    return await axiosService('GET',`/patients`,{})
}

// delete patient data through id
export const deletePatientDetailsAPI=async(id)=>{
    return await axiosService('DELETE',`/patients/${id}`,{})
}

// view patient details through id
export const viewPatientDetailsAPI=async(id)=>{
    return await axiosService('GET',`/patients/${id}`,{})
}

// add doctors
export const addDoctorDetailsAPI=async(doctor)=>{
    return await axiosService('POST',`/doctors`,doctor)
}

// get all doctors details
export const getAlldetailsAboutDoctorsAPI=async()=>{
    return await axiosService('GET',`/doctors`,{})
}

// edit doctor details
export const editDoctordetailsAPI=async(id,doctor)=>{
    return await axiosService('PATCH',`/doctors/${id}`,doctor)
}

// delete doctors data
export const deleteDoctordetailAPI=async(id)=>{
    return await axiosService('DELETE',`/doctors/${id}`,{})
}

// call PHID
export const  getPhidAPI=async()=>{
    return await axiosService('GET',`/PHID`,{})
}

// call PHID
export const  updatedPhidAPI=async(value)=>{
    return await axiosService('PATCH',`/PHID/1`,{PHID:value})
}

// search doctor for register ,checking in doctors array
export const searchDoctorEmailAPI=async(email)=>{
    return await axiosService('GET',`/doctors?email=${email}`,{})
}