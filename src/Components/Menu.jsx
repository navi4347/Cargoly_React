import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Portpair from '../Pages/Admin/Portpair';
import CarrierMaster from '../Pages/Admin/CarrierMaster';
import CarrierBuy from '../Pages/Admin/CarrierBuy';
import Booking from '../Pages/Admin/Booking';
import SchedulingMaster from '../Pages/Admin/SchedulingMaster';
import Quotation from '../Pages/Admin/Quotation';
import CarrierAllocation from '../Pages/Admin/CarrierAllocation';
import InternalAllocation from '../Pages/Admin/InternalAllocation';
import './Style.css'

const drawerWidth = 250;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedContent, setSelectedContent] = React.useState('Portpair');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleListItemClick = (content) => {
    setSelectedContent(content);
  };

  const getContentComponent = () => {
    switch (selectedContent) {
      case 'Portpair':
        return <Portpair />;
      case 'Carrier Master':
        return <CarrierMaster />;
      case 'Carrier Buy':
        return <CarrierBuy />;
        case 'Booking':
          return <Booking />;
          case 'Scheduling Master':
          return <SchedulingMaster />;
          case 'Quotation':
          return <Quotation />;
          case 'Carrier Allocation':
          return <CarrierAllocation />;
          case 'Internal Allocation':
          return <InternalAllocation />;
      default:
        return null;
    }
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <Typography variant="h4" sx={{ my: 2 }}>
        CARGOLY
          </Typography>
          <IconButton onClick={handleDrawerClose} style={{ color: 'white' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {['Portpair', 'Carrier Master', 'Carrier Buy'].map((text) => (
            <ListItem
             key={text} 
            disablePadding
            button
            onClick={() => handleListItemClick(text)}>
              <ListItemButton>
                <ListItemIcon style={{ color: 'white' }}>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Booking', 'Scheduling Master', 'Quotation'].map((text) => (
            <ListItem key={text} disablePadding  onClick={() => handleListItemClick(text)}>
              <ListItemButton>
                <ListItemIcon style={{ color: 'white' }}>
                <MailIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Carrier Allocation', 'Internal Allocation', 'Logout'].map((text) => (
            <ListItem key={text} disablePadding  onClick={() => handleListItemClick(text)}>
              <ListItemButton>
                <ListItemIcon style={{ color: 'white' }}>
                <MailIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      <Main open={open}>
        <DrawerHeader />
        {getContentComponent()}
      </Main>
    </Box>
  );
}