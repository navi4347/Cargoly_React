import * as React from 'react';
import { useState, useEffect } from 'react';
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
import AnchorIcon from '@mui/icons-material/Anchor';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import Portpair from '../Pages/Admin/Portpair';
import CarrierMaster from '../Pages/Admin/CarrierMaster';
import CarrierBuy from '../Pages/Admin/CarrierBuy';
import Booking from '../Pages/Admin/Booking';
import SchedulingMaster from '../Pages/Admin/SchedulingMaster';
import Quotation from '../Pages/Admin/Quotation';
import CarrierAllocation from '../Pages/Admin/CarrierAllocation';
import InternalAllocation from '../Pages/Admin/InternalAllocation';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Adminpic from '../assets/2.jpg'
import { useNavigate } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (content) => {
    setSelectedContent(content);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('token');
     sessionStorage.removeItem('enteredEmail');
  sessionStorage.removeItem('loggedIn');
    navigate('/'); 
  };
  

  if (loading) {
    return <div>Loading...</div>; 
  } 

  const handleSales = () => {
    navigate('/Sales'); 
  };

  const menuItems = [
    { text: 'Portpair', icon: <AnchorIcon /> },
    { text: 'Carrier Master', icon: <AccountBalanceIcon /> },
    { text: 'Carrier Buy', icon: <CurrencyExchangeIcon /> },
    { text: 'Booking', icon: <LocalActivityIcon /> },
    { text: 'Scheduling Master', icon: <CalendarMonthIcon /> },
    { text: 'Quotation', icon: <LibraryBooksIcon /> },
    { text: 'Carrier Allocation', icon: <DirectionsBoatIcon /> },
    { text: 'Internal Allocation', icon: <KeyboardCommandKeyIcon /> },
    { text: 'Logout', icon: <LogoutIcon /> },
  ];
  

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
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          
        </Typography>
          <Stack spacing={3} direction="row">
          <Button variant="contained">ADMIN</Button>
          <Button onClick={handleSales} variant="outlined">SALES</Button>
          <Badge badgeContent={4} color="error">
          <NotificationsIcon color="action" />
          </Badge>
          <Avatar alt="Admin" src={Adminpic} />
          </Stack>
         
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
        <List sx={{ marginTop: '6px' }}>
          {menuItems.map(({ text, icon }) => (
            <ListItem
              key={text}
              disablePadding
              button
              onClick={() => {
                if (text === 'Logout') {
                  handleLogout();
                } else {
                  handleListItemClick(text);
                }
              }}
              sx={{ marginBottom: '8px' }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: 'white' }}>{icon}</ListItemIcon>
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