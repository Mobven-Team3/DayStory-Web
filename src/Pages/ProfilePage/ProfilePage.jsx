import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Avatar, Grid, CircularProgress, Box } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Token'ı localStorage'dan al
    if (!token) {
      setError('Token not found');
      return;
    }

    axios.get('http://165.22.93.225:5003/api/Users/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUser(response.data);
    })
    .catch(() => {
      setError('User not found');
    });
  }, []);

  if (error) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '60%', padding: '20px' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" style={{ width: '150px', height: '150px' }} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
              <Typography variant="body1">Username: {user.username}</Typography>
              <Typography variant="body1">Email: {user.email}</Typography>
              <Typography variant="body1">Birth Date: {user.birthDate}</Typography>
              <Typography variant="body1">Gender: {user.gender}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
