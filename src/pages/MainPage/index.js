import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuList from "pages/LandingPages/MenuLists";

function MainPage() {
  return (
    <div>
      <MenuList />

      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ marginBottom: 20 }}>
            Welcome back,
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button startIcon={<DashboardIcon />} variant="contained" color="primary" fullWidth>
            Go to Dashboard
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button startIcon={<AssignmentIcon />} variant="contained" color="secondary" fullWidth>
            View Appointments
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainPage;
