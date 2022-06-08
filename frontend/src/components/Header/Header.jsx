import React from 'react';
import "./header.scss";
import {AppBar, Toolbar, IconButton, Typography, Box,Badge} from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: 'rgb(50, 54, 58)',
        },
    },
});

const Header = () => {
    return (
        <div className="Header1">
            <ThemeProvider theme={darkTheme}>
            <AppBar className="Header" position="static" >
                <Toolbar>
                    {/*<IconButton*/}
                    {/*    size="large"*/}
                    {/*    edge="start"*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="open drawer"*/}
                    {/*    sx={{ mr: 2 }}*/}
                    {/*>*/}
                    {/*</IconButton>*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        MapLogo
                    </Typography>
                    {/*<Search>*/}
                    {/*    <SearchIconWrapper>*/}
                    {/*        <SearchIcon />*/}
                    {/*    </SearchIconWrapper>*/}
                    {/*    <StyledInputBase*/}
                    {/*        placeholder="Search…"*/}
                    {/*        inputProps={{ 'aria-label': 'search' }}*/}
                    {/*    />*/}
                    {/*</Search>*/}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailOutlineIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsNoneIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            // onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            // aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            // onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            </ThemeProvider>
        </div>
    );
};

export default Header;