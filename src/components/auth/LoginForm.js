import axios from 'axios';
import { useState } from "react"


const LoginForm = (props) => {



  
    const [form, setForm] = useState({
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
        axios.post('https://festivals-api.herokuapp.com/api/users/login', {
            email: form.email,
            password: form.password
        })
        .then((response) => {
            console.log(response.data)
            //setAuthenticated(true)
            props.onAuthenticated(true, response.data.token)

        })
        .catch((err) => {
            console.error(err)
            console.log(err.response.error)
            setErrorMessage(err.response.data.message)
        });
    }


    if (props.authenticated){
        return <><h3>You are authenticated</h3></>
    }else {
        
    


    return (
        <>
            Email: <input type='text' name='email' onChange={handleForm}/>
            Password: <input type='text' name='password' onChange={handleForm}/>
            <button onClick={handleClick}>Submit</button>
            <p style={errorStyle}>{errorMessage}</p>
        </>
    );
}

}

export default LoginForm