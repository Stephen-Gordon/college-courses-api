//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from 'axios'

//Router
import { Link } from 'react-router-dom';


//mui

const Index = ( props) => {

    const [festivals, setFestivals] = useState(null);

    useEffect(() => {
        axios.get('https://festivals-api.vercel.app/api/festivals')
        .then((response) => {
            console.log(response.data)
            setFestivals(response.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }, [])

    if(!festivals) return <h3>There are no festivals</h3>


    const festivalsList = festivals.map(festival => {
        return (
            <>
                <div key={festival._id} >
                    
                        <p>Title: {(props.authenticated) ? (
                            <Link  to={`/festivals/${festival._id}`}> {festival.title} </Link>
                        ): (
                           <p> {festival.title} </p>
                        )} </p>
                    
                    <br></br>
                    <p>Description: {festival.description}</p>
                    <hr></hr>                    
                </div>
            </>
        )
    })


    return(
        <>
            <h2>Fesitval Index</h2>
            {festivalsList}
        </>
    )

};

export default Index;