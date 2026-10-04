import axios from 'axios'

const axoisInstance = axios .create({
    baseURL:'https://helthcenter-backend.onrender.com/',
    timeout:30000
})

axoisInstance.interceptors.response.use(
    function (response){
        console.log('API responce recived....');
        return response 
    },
    function (error){
        if(error.response){

            const status=error.response.status
            console.log(`status : ${status}`);
            console.log((`server response : ${status}`));

            if(status===401){
                console.log(`authorized error.....`);
            }
            else if(status===404){
                console.log(`API is not found.....`);
            }
            else if(status===500){
                console.log(`something went wrong.....`);
            }
        }
        else if(error.request){
            console.log(`No responce from server.....`);
        }
        else{
            console.log(`error`,error.message);
        }

        return Promise.reject(error);
    }
)

export default axoisInstance