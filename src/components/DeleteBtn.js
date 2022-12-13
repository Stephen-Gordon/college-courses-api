import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../config/api';

const DeleteBtn = ({ id, deleteCallback, resource }) => {

    const onDelete = () => {
        let token = localStorage.getItem('token');

        axios.delete(`/${resource}/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
         .then((response) => {
               console.log(response.data);
               console.log("All good");

               deleteCallback(id);

         })
         .catch((err) => {
           deleteCallback(id);
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

export default DeleteBtn;