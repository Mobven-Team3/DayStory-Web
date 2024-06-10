import { Avatar, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      setError('Token not found');
      return;
    }

    axios.get('https://talent.mobven.com:5043/api/Users', {
      headers: {
        Authorization: `Bearer ${token}`
        },
        
    })
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      setError('User not found');
    });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
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
              <Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
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