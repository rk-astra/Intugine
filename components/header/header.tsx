import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import Image from 'next/image';
import Logout from '../auth/Logout';

const Header: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Image
                        src="/logo.svg" 
                        alt="logoipsum"
                        width={120} 
                        height={40}
                    />
                </Box>
                <Logout />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
