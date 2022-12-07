import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';

const Create = (props) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const isRequired = (fields) => {
        let error = false;
        setErrors({});

        fields.forEach(field => {
            if(!form[field]){
                error = true;
                setErrors((prevState) => ({
                    ...prevState,
                    [field]: {
                        message: `${field} is required!!!!`
                    }
                }));
            }
        });


        return error;
    };

    const submitForm = () => {


        if(!isRequired(['title', 'code', 'description', 'points', 'level'])){
            let token = localStorage.getItem('token');

            axios.post('/courses', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                navigate('/courses');
            })
            .catch((err) => {
                console.error(err);
                console.log(err.response.data);
                setErrors(err.response.data.errors);
            });
        }

        
    };

    return (
        <Grid item xs={8}>
            <h2>Create Courses</h2>
            
            <div className='form-group'>
                <TextField 
                    label="Title" 
                    name="title" 
                    variant="filled" 
                    onChange={handleForm}
                   /*  error={errors.title}
                    helperText={errors.title?.message} */
                />
            </div>
            <div className='form-group'>
                <TextField 
                    label="Code" 
                    name="code" 
                    variant="filled" 
                    onChange={handleForm}
                   /*  error={errors.code}
                    helperText={errors.code?.message} */
                />
            </div>
            <div className='form-group'>
                <TextField 
                    multiline 
                    label="Description" 
                    name="description" 
                    variant="filled" 
                    onChange={handleForm} 
                    /* error={errors.description}
                    helperText={errors.description?.message} */
                />
            </div>

            <div className='form-group'>
                <TextField 
                    label="Points" 
                    name="points" 
                    variant="filled" 
                    onChange={handleForm}
                    /* error={errors.points}
                    helperText={errors.points?.message} */
                />
            </div>

            <div className='form-group'>
                <TextField 
                    label="Level" 
                    name="level" 
                    variant="filled" 
                    onChange={handleForm}
                    /* error={errors.level}
                    helperText={errors.level?.message} */
                />
            </div>

            <Button variant='contained' onClick={submitForm}>Submit</Button>
        </Grid>
    );
};

export default Create;