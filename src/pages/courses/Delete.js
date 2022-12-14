import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../config/api';
import { useEffect, useState } from 'react';

const CourseDeleteBtn = ({ id, deleteCallback, setEnrolmentChecker }) => {

        const [enrolments, setEnrolments] = useState();
        const [course, setCourse] = useState(); 

        const [count, setCount] = useState(1); 
        
        useEffect(() => {
           let token = localStorage.getItem('token');

            axios.get('/enrolments', {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                setEnrolments(response.data.data)
            })
            .catch((err) => {
                console.error(err)
            });


            axios.get(`/courses/${id}`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                setCourse(response.data.data)
            })
            .catch((err) => {
                console.error(err)
            });


        }, [])


       let enrolmentChecker;
      
        if(course?.enrolments?.length >= 1){
            enrolmentChecker = true
        }

        const deleteEnrolmentsChecker = () => {

            if(enrolmentChecker === true){
                setEnrolmentChecker(true)
                setCount(count + 1);


                if(count === 2){ 

                    let token = localStorage.getItem("token");

                    let deleteEnrolArray = enrolments.filter(enrolment => {
                        console.log("deleteEnrolArray")
                        return enrolment.course.id === id;
                    }); 
        
                    console.log(deleteEnrolArray)
        
                    deleteEnrolArray.forEach((enrolment) => {
                        console.log(enrolment.id)
                        axios
                        .delete(`/enrolments/${enrolment.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                        })
                        .then((response) => {
                            console.log(response)
                            console.log("deleted enrolments, now deleting course")
                            setEnrolmentChecker(false)
                            
                        })
                        .catch((error) => {
                        console.log(error);
                        });  
                    });   
                    onDelete();
                }
            } else{
            console.log("no enrolments, deleting course")
            onDelete();
            }

             
      };



    const onDelete = () => {
 
         let token = localStorage.getItem('token');

         axios.delete(`/courses/${id}`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
         .then((response) => {
            console.log(response.data);
            console.log("deleted course")
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
            onClick={deleteEnrolmentsChecker}
        >
            Delete
        </Button>
    );
};

export default CourseDeleteBtn;