import React from 'react';
import { Chip } from '@mui/material';

interface TripStatusButtonProps {
    type: string;
}

const TripStatusButton: React.FC<TripStatusButtonProps> = ({ type }) => {
    return (
        <Chip
            label={type}
            sx={{
                backgroundColor: '#D7E3FE',
                color: '#1E3A8A', 
                borderRadius: '4px',
                height: '24px',
                width: '180px', 
                fontSize: '12px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '500', 
                gap: '10px', 
                boxShadow: 'none', 
                textTransform: 'none', 
                letterSpacing: '0.4px', 
            }}
        />
    );
};

export default TripStatusButton;
