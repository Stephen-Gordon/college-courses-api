import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Grid, TextField, FormControl, Select, MenuItem, InputLabel, Button} from "@mui/material";

const FestivalCreate = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
       
       
    });
   /*  title:"",
    description:"",
    city: "",
    start_date:"",
    end_date:"" */

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value
        }));
    }


    const submitForm = () => {
        let token = localStorage.getItem('token')
        axios.post('https://festivals-api.herokuapp.com/api/festivals', form,
        {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                navigate('festivals')
                
            })
            .catch((err)=> {
                console.error(err.response.data)
            });
    }

    return (
        <>
            <Grid item xs={8}>
                <h2>Create Festival</h2>

                    {/*     Title    */}
                    <TextField sx={{ mb:5, }}  label="Title" name="title" variant="outlined" onChange={handleForm} />
            

                    {/*     Desc     */}
                    <TextField sx={{ mb:5, }}  multiline label="Description" name="description" variant="outlined" onChange={handleForm} />
                

                    {/*     City     */}
                    <FormControl sx={{ mb:5, }}  multiline fullWidth>
                    <InputLabel id="city-select-label">City</InputLabel>
                        <Select
                        name="city"
                        labelId="city-select-label"
                        id="city-select"
                        value={"city"}
                        label="City"
                        onChange={handleForm}
                        >
                        <MenuItem value={"Dublin"}>Dublin</MenuItem>
                        <MenuItem value={"Cork"}>Cork</MenuItem>
                        <MenuItem value={"Galway"}>Galway</MenuItem>
                        <MenuItem value={"Mayo"}>Mayo</MenuItem>
                        <MenuItem value={"Wexford"}>Wexford</MenuItem>
                        </Select>
                </FormControl>

                {/*   Start  Date     */}
                <TextField sx={{ mb:5, }}  multiline 
                label="Start Date" 
                type="datetime-local"
                name="start_date" 
                variant="outlined" 
                onChange={handleForm}
                />


                {/*    End Date     */}
                <TextField sx={{ mb:5, }}  multiline 
                label="End Date" 
                type="datetime-local"
                name="end_date" 
                variant="outlined" 
                onChange={handleForm}
                />
                </Grid>
        
        
                {/* Submit button */}
                <Button variant='outlined' onClick={submitForm}>Submit</Button>
        </>
    )

}
export default FestivalCreate;