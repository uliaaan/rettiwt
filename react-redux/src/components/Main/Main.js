import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';

const Main = ({ children }) => (
  <>
    <Header />
    <Grid container spacing={0} justify="center">
      <Grid item xs={12} sm={6} style={{ marginTop: 20 }}>
        {children}
      </Grid>
    </Grid>
    <Footer />
  </>
);

export default Main;
