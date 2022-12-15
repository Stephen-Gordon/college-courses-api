import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../config/api';
import { useEffect, useState } from 'react';

const Delete = ({ id, deleteCallback }) => {

        const [enrolments, setEnrolments] = useState();
    
        useEffect(() => {
           let token = localStorage.getItem('token');

            axios.get('/enrolments', {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                setEnrolments(response.data.data)
                console.log(enrolments)
            })
            .catch((err) => {
                console.error(err)
            });


        }, [])


    const onDelete = () => {
 
         let token = localStorage.getItem('token');

         axios.delete(`/enrolments/${id}`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
         .then((response) => {
            console.log(response.data);
            console.log("deleted enrolment")
            deleteCallback(id);
         })
         .catch((err) => {
            console.log("Errorr");
            console.error(err);
            console.log(err.response);
         });   
    };





    return (
        <Button 
            startIcon={<DeleteIcon />} 
            variant='outlined'
            color='error'
            onClick={onDelete}
        >
            Delete
        </Button>
    );
};

export default Delete;