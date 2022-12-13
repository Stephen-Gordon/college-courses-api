
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

 
const Sidebar = (props) => {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

      const drawerWidth = 240;
    // const container = window !== undefined ? () => window().document.body : undefined;
     
    return (
        <Drawer
       // container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
       <p>HI</p>
      </Drawer>
    )

};

export default Sidebar