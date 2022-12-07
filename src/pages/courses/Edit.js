import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/api';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import PageNotFound from '../PageNotFound';

const Edit = (props) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        axios.get(`/courses/${id}`, {
            headers : {
                "Authorization": `Bearer ${token}`
            }
        })
             .then((response) => {
                console.log(response.data);
                setCourse(response.data.data);
                setForm(response.data.data);
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response.data);
             });
    }, [id, token]);

    if(!course) return <PageNotFound />

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const submitForm = () => {

        let token = localStorage.getItem('token');

        axios.put(`/courses/${id}`, form, {
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
            });
    };

    console.log(form)
    return (
        <Grid item xs={8}>
            <h2>Edit Course</h2>

            <div className='form-group'>
                <TextField 
                    value={form.title}
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
                    value={form.code}
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
                    value={form.description}
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
                    value={form.points}  
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
                    value={form.level}
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

export default Edit;