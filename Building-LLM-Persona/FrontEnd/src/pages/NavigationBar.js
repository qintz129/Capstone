import {Button, AppBar, Toolbar} from '@mui/material'; 
import { Link } from 'react-router-dom'; 

const NavigationBar = () => { 
    return (
      <AppBar position="static" sx={{ backgroundColor: '#61694D' }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Build Persona
          </Button> 
          <Button color="inherit" component={Link} to="/saved-persona">
            Persona Library
          </Button>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default NavigationBar;