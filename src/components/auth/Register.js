//Hooks
import { useState, useEffect } from "react"

//Axios
import axios from 'axios';

//NAV
import { useNavigate } from "react-router-dom";

const Register = (props) => {

    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "" 
    });



    const [errorMessage, setErrorMessage] = useState("")


    const errorStyle = {
        color: "red"
    }

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value
        }));
    }


    const handleClick = () => {
        console.log("clicked", form)
        axios.post('/register', {
            email: form.name,
            email: form.email,
            password: form.password
        })
        .then((response) => {
            console.log(response.data)
            props.onAuthenticated(true, response.data.token)
            navigate('/home')
        })
        .catch((err) => {
            console.error(err)
            console.log(err.response.error)
            setErrorMessage(err.response.data.message)
        });
    }

    const returnHome = () => {
        let timer = setTimeout(() => {
            navigate('/')
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }
   
    

    if (props.authenticated){

        returnHome();

        return(
        <>
            <h3>You are already Logged in... Returning home</h3>
        </>
        )
        
    }else {
        
    


    return (
        <>
            Name: <input type='text' name='name' onChange={handleForm}/>
            Email: <input type='text' name='email' onChange={handleForm}/>
            Password: <input type='text' name='password' onChange={handleForm}/>
            <button onClick={handleClick}>Submit</button>
            <p style={errorStyle}>{errorMessage}</p>
        </>
    );
}

}

export default Register