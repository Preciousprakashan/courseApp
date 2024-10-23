import { CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinterception';

const Edit = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Provide a fallback if location.state or courseData is undefined
    const { courseData } = location.state || {};
    
    // Pre-fill the form with the fetched data or empty fields if courseData is undefined
    const [course, setCourse] = useState(courseData || {
        courseId: '',
        courseName: '',
        courseImage: '',
        courseDescription: '',
        courseDuration: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value }); // Update the course state with form input
    };

    const handleSubmit = () => {
        // Submit the updated course data
        axiosInstance.put(`http://localhost:4000/edit/${course._id}`, course) // Use _id to update
            .then(() => {
                console.log('Course updated successfully');
                navigate('/Home'); // Navigate back to the home page after success
                setTimeout(() => {
                alert('Course updated successfully');
            }, 100); // 100ms delay to ensure navigation happens first
            })
            .catch((error) => {
                console.error('Error updating course:', error);
            });
    };

    return (
        <>
            <Card sx={{ width: '100%', backgroundColor: '#ffffff', color: 'white' }}>
                <CardContent>
                    <h2>Edit Course</h2>
                    <Box>
                        {/* Course input fields */}
                        <TextField
                            onChange={handleChange}
                            name="courseId"
                            label="Course ID"
                            value={course.courseId || ''}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="courseName"
                            value={course.courseName || ''}
                            label="Course Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="courseImage"
                            value={course.courseImage || ''}
                            label="Course Image URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="courseDescription"
                            value={course.courseDescription || ''}
                            label="Course Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="courseDuration"
                            value={course.courseDuration || ''}
                            label="Course Duration (in hours)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" onClick={handleSubmit}>
                            Update Course
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default Edit;
