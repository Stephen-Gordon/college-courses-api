import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";




const Show = () => {
const { id } = useParams();
const [courses, setCourses] = useState(null)

//let token = localStorage.getItem('token');
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2IiwianRpIjoiZWY1ZmRhYjQwNjY5M2ZkOWVmNWQ3MGQzZmE5NDE5ODZlNDNlNjZjNDMzZWY4ZDhmODk2NGEyZGNmNGYwOWIxMjhhZDY4NGIyMTAwN2EyZmUiLCJpYXQiOiIxNjY5NzM5MjYxLjY0MDc1OCIsIm5iZiI6IjE2Njk3MzkyNjEuNjQwNzYyIiwiZXhwIjoiMTcwMTI3NTI2MS42MjkzMTIiLCJzdWIiOiIxNTIiLCJzY29wZXMiOltdfQ.S8s-7dzVABibFu23RjJyOS1sPhkBDPkyiVSqczqtQKMgFW1xBeSgRy2a_oKRtU6oahedJh0CWIa4oMQi2hx2eDx9Ya03vhd7Z6zt7is-KGvTjYiZ6Q3wLBiEDQn5WfkPefJQ2lkaz0LoJ_W5b-Iq1KVxezcn02dBoEcuY7Td4aq2mG6MCOS5M7-tPA-SXYZNNqik355zCDYsicertWTKNpJB8s-BiRJLM9ZTWlxy6cPuwgiBEqBATvfgzxnQ4t1HlynmBSONgEoEMKHJgjFme5MNrJttk-_noGDmexYvnDdXsUjexRwrh7XvMpjGPG4rVbHabMAobERX3TbQfeh3kMydqsXSao-lgbY7C_iNmgGBS8Etat6ueK_pU7O1K_V9yWiDaMVaVwZVcEXGpY8_PIpzWW-qYq9_qyKBFrzVfAFOeLkwGh66RhUNOVw5M22XieEtY3b7K3mCqVASu9nRgN_xN7UGmqVX5ik_CswgGUGHhPL9x30q_M62vl4uHwCVl1UJyZmPBpLXXP6ewGaysRF3gie9PoQ6f4cbyJLpWWfIeWNP6HzOiq7lY0B9tn2eSH8rZVF6MzkhZTMAEQFMPulXVKmZZac-aC6dZVGCg-uq9-xfyCfjnoJLorq6bXb2HaIJgNa9Y5EHGWkP6lQzxOA3zI0LTIX6_Dat6LXYQpM'

    useEffect(() => {
        axios.get(`https://college-api-mo.herokuapp.com/api/courses/${id}`, {
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