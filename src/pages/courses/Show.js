import axios from '../../config/api'
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";




const Show = () => {
const { id } = useParams();
const [courses, setCourses] = useState(null)

let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`/courses/${id}`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            setCourses(response.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }, [id, token])

    if(!courses) return <h3>no courses</h3>

    return(
        
        <>
           <h1>Show</h1>
        </>
        )

};

export default Show;