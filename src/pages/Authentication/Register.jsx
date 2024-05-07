
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { registerUserAction } from '../../Redux/Auth/auth.action'
import { useNavigate } from 'react-router-dom'

const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" }
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 character").required("Password is required")
}

const Register = () => {
  const [formValue, setFormvalue] = useState(initialValues);
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    values.gender=gender
    console.log("handlesubmit", values);
    dispatch(registerUserAction({data:values}))
    window.location.href = '/';
  }

  const [gender, setGender] = useState('');
  const handleChange = (event) => {
    setGender(event.target.value);
  };


  return (
    <>
      <Formik onSubmit={handleSubmit}
        // validationSchema={validationSchema} 
        initialValues={initialValues}>

        <Form className='space-y-5'>

          <div className='space-y-5'>

            <div>
              <Field as={TextField}
                name='firstName'
                placeholder='FirstName'
                type='text'
                variant='outlined'
                fullWidth />
              <ErrorMessage name='firstName' component={"div"} className='text-red-500' />
            </div>

            <div>
              <Field as={TextField}
                name='lastName'
                placeholder='LastName'
                type='text'
                variant='outlined'
                fullWidth />
              <ErrorMessage name='lastName' component={"div"} className='text-red-500' />
            </div>

            <div>
              <Field as={TextField}
                name='email'
                placeholder='Email'
                type='email'
                variant='outlined'
                fullWidth />
              <ErrorMessage name='email' component={"div"} className='text-red-500' />
            </div>

            <div>
              <Field as={TextField}
                name='password'
                placeholder='Password'
                type='password'
                variant='outlined'
                fullWidth />
              <ErrorMessage name='password' component={"div"} className='text-red-500' />
            </div>

            <div>
             <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="Gender"
                name="gender"
                onChange={handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <ErrorMessage name='gender' component={"div"} className='text-red-500' />
              </RadioGroup>
            </div>
          </div>
          <Button sx={{ padding: '.8rem 0rem' }}
            fullWidth
            type='submit'
            variant='contained'
            color='primary'>
            Register
          </Button>
        </Form>

      </Formik>
      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>If you have already account </p>
        <Button onClick={()=>navigate('/login')}>Login</Button>
      </div>
    </>
  )
}

export default Register