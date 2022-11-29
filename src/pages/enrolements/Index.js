//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from 'axios'

//Router
import { Link } from 'react-router-dom';


//mui

const Index = ( props) => {

    let token = localStorage.getItem('token')

    const [enrolements, setEnrolements] = useState(null);

    useEffect(() => {
        axios.get('https://college-api-mo.herokuapp.com/api/enrolements', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
           
            setEnrolements(response.data)
            
        })
        .catch((err) => {
            console.error(err)
        });
    }, [token])

    if(!enrolements) return <h3>There are no enrolements</h3>
    console.log(enrolements)

    const enrolementsList = enrolements.data.map(enrolement => {
        return (
            <>
                <div key={enrolement.id} >
                    
                        <p>Title: {(props.authenticated) ? (
                            <Link  to={`/enrolements/${enrolement.id}`}> {enrolement.title} </Link>
                        ): (
                           <p> {enrolement.title} </p>
                        )} </p>
                    
                    <br></br>
                    <p>Description: {enrolement.description}</p>
                    <hr></hr>                    
                </div>
            </>
        )
    })
 

    return(
        <>
            <h2>enrolements Index</h2>
            {enrolementsList} 
        </>
    )
 
};

export default Index;