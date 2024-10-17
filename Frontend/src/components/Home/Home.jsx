import Paper from '@mui/material/Paper';
import { Typography, Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid2 } from '@mui/material'; // Added CardActions and Button here
import React, { useState, useEffect } from 'react';

import './Home.css'; // Ensure the CSS file is imported
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [course, setCourse] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:3001/').then((res) => {
            setCourse(res.data);
        });
    }, []);




    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id) // Make sure to use DELETE method
            .then(() => {
                // Navigate to a different page (e.g., a confirmation page or back to the home page)
                navigate('/Home');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting course:', error);
                // Optionally show an error message to the user
            });
    };



    const handleEdit = (id) => {
        // Fetch the course details by _id
        axios.get('http://localhost:3001/' + id) // Fetch the course data by _id
            .then((response) => {
                const courseData = response.data; // Get the course data

                // Pass the fetched course data to the edit component
                navigate('/Edit', { state: { courseData } }); // Use react-router's navigate with state
            })
            .catch((error) => {
                console.error('Error fetching course data for edit:', error);
                // Optionally show an error message to the user
            });
    };

    return (
        <>


            <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://cdn.prod.website-files.com/63cfd421cd678e3860a446ee/66b9ce98a8ba8e759b77103d_64fed3e18c79d2f43bce0c0b_5393409.jpeg" className="d-block w-100" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Introduction to Node.js
                            </h5>
                            <p>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, allowing you to run JavaScript on the server-side.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpaperaccess.com/full/314827.jpg" className="d-block w-100" alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Asynchronous Programming</h5>
                            <p>Node.js uses an event-driven, non-blocking I/O model, making it efficient and suitable for data-intensive real-time applications.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpaperaccess.com/full/1877565.png" className="d-block w-100" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Web Development Essentials</h5>
                            <p>Explore the key aspects of web development
                            </p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


            <Typography
                variant="h5"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontWeight: 400,
                    marginBottom: 2,
                    marginTop: '80px',
                    '::before': {
                        content: '""',
                        flexGrow: 1,
                        marginRight: '16px',
                        borderBottom: '2px solid rgba(0, 0, 0, 0.5)',
                    },
                    '::after': {
                        content: '""',
                        flexGrow: 1,
                        marginLeft: '16px',
                        borderBottom: '2px solid rgba(0, 0, 0, 0.5)',
                    }
                }}
            >
                Course List
            </Typography>

            <Grid2 justifyContent="flex-start" container spacing={5} sx={{ padding: 2 }}>
                {course.map((data) => (
                    <Grid2 item xs={12} sm={6} md={4}>



                        <Card sx={{ width: 440, height: 300 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={data.courseImage} // Use image from database
                                    alt={data.courseName} // Better alt text
                                />

                                <CardContent>
                                    <Typography component="div" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                        {data.courseName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {data.courseDescription}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleEdit(data._id)}>
                                    edit
                                </Button>
                                <Button size="small" color="primary" onClick={() => handleDelete(data._id)}>
                                    delete
                                </Button>
                            </CardActions>
                        </Card>



                    </Grid2>
                ))}
            </Grid2 >
        </>
    );
}

export default Home;
