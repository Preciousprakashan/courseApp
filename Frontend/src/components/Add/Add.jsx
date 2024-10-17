import { CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const navigate = useNavigate();

    // Initialize empty course data for adding a new course
    const [course, setCourse] = useState({
        courseId: '',
        courseName: '',
        courseImage: '',
        courseDescription: '',
        courseDuration: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target; // Extract the 'name' and 'value' from the event's target (the input element)
      setCourse({ ...course, [name]: value }); // Update the 'course' state with the new input value
  };
  

    const handleSubmit = () => {
        // Submit the new course data
        axios.post('http://localhost:3001/addCourse', course) // POST to create a new course
            .then(() => {
                console.log('Course added successfully');
                navigate('/Home'); // Navigate back to the home page after success
                setTimeout(() => {
                    alert('Course added successfully');
                }, 100); // 100ms delay to ensure navigation happens first
            })
            .catch((error) => {
                console.error('Error adding course:', error);
            });
    };

    return (
        <>
            <Card sx={{ width: '100%', backgroundColor: '#ffffff', color: 'white' }}>
                <CardContent>
                    <h2>Add New Course</h2>
                    <Box>
                        {/* Course input fields */}
                        <TextField
                            onChange={handleChange}
                            name="courseId"
                            label="Course ID"
                            value={course.courseId}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="courseName"
                            value={course.courseName}
                            label="Course Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="courseImage"
                            value={course.courseImage}
                            label="Course Image URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="courseDescription"
                            value={course.courseDescription}
                            label="Course Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="courseDuration"
                            value={course.courseDuration}
                            label="Course Duration (in hours)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" onClick={handleSubmit}>
                            Add Course
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default AddCourse;
