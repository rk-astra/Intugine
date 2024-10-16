import React from 'react';
import { Chip } from '@mui/material';

interface StatusColors {
    background: string;
    color: string;
}

const tatStatusColors: Record<string, StatusColors> = {
    'On Time': { background: '#C2FAEA', color: '#008F66' },
    'Delayed': { background: '#F9D7D7', color: '#CC3333' },
    'Other': { background: '#FFECDB', color: '#D97F30' }, 
};

interface TATStatusButtonProps {
    type: string; 
}

const TATStatusButton: React.FC<TATStatusButtonProps> = ({ type }) => {
    const displayType = type === 'On-time' ? 'On Time' : type;

    const statusColor = tatStatusColors[displayType] || { background: '#E0E0E0', color: '#000000' }; 

    return (
        <Chip
            label={displayType} 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: '4px', 
                width: '104px', 
                height: '24px', 
                backgroundColor: statusColor.background, 
                color: statusColor.color, 
                borderRadius: '4px', 
                fontSize: '12px', 
                fontWeight: 400, 
                textAlign: 'center',
                letterSpacing: '0.4px', 
                lineHeight: '16px', 
                fontFamily: 'Source Sans Pro',
                boxShadow: 'none',
            }}
        />
    );
};

export default TATStatusButton;
