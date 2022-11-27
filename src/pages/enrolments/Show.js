import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";




const Show = () => {
const { id } = useParams();
const [festival, setFestival] = useState(null)

let token = localStorage.getItem('token');


    useEffect(() => {
        axios.get(`https://festivals-api.herokuapp.com/api/festivals/${id}`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            setFestival(response.data)
        })
        .catch((err)=> {
            console.error(err.response.data)
        });
    }, [id, token])

    if(!festival) return <h3>no festival</h3>

    return(
        
        <>
           <div>
                <p>{festival.title}</p>
                <p>{festival.description}</p>
           </div>
        </>
        )

};

export default Show;