import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Button,
  FormControl,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material";

const InputBox: React.FC<{
  label: string;
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  error?: string;
}> = ({ label, value, name, placeholder, onChange, width = "100%", error }) => (
  <FormControl fullWidth margin="dense">
    <Typography
      component="label"
      sx={{
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "16px",
        color: "#1A1A1A",
        marginBottom: "2px",
      }}
    >
      {label}
    </Typography>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: width,
        height: "32px",
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: "12px",
        lineHeight: "16px",
        color: "#666666",
        padding: "8px 12px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E0E0E0",
        borderRadius: "4px",
      }}
    />
    {error && (
      <Typography color="error" variant="caption">
        {error}
      </Typography>
    )}
  </FormControl>
);

interface TripForm {
  tripId: string;
  transporter: string;
  source: string;
  destination: string;
  phone: string;
}

interface AddTripDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formState: TripForm) => Promise<void>;
  existingTrips: TripForm[];
}

const AddTripDialog: React.FC<AddTripDialogProps> = ({
  open,
  onClose,
  onSubmit,
  existingTrips,
}) => {
  const [formState, setFormState] = useState<TripForm>({
    tripId: '',
    transporter: '',
    source: '',
    destination: '',
    phone: '',
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [tripIdError, setTripIdError] = useState<string | undefined>(undefined);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined); 

  useEffect(() => {
    const { tripId, transporter, source, destination } = formState;
    
    // Check if Trip ID already exists
    if (existingTrips.some((trip) => trip.tripId === tripId)) {
      setTripIdError('Trip ID already exists, please use a unique ID');
    } else {
      setTripIdError(undefined);
    }

    // Form validation (excluding phone number for now)
    setIsFormValid(!!(tripId && transporter && source && destination && !tripIdError));
  }, [formState, existingTrips, tripIdError]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validate phone number only at submission time
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formState.phone)) {
      setPhoneError('Phone number must be a 10-digit number');
    } else {
      setPhoneError(undefined); 
      await onSubmit(formState); 
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          width: '648px',
          height: '392px',
          borderRadius: '8px',
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: '24px 32px 16px',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '32px',
          color: '#1A1A1A',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Add Trip
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: '0px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            marginBottom: '8px',
          }}
        >
          <InputBox
            label="Trip ID"
            value={formState.tripId}
            name="tripId"
            onChange={handleTextFieldChange}
            placeholder="Enter Trip ID"
            error={tripIdError}
          />

          <FormControl fullWidth margin="dense">
            <Typography
              component="label"
              sx={{
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#1A1A1A',
                marginBottom: '2px',
              }}
            >
              Transporter
            </Typography>
            <Select
              name="transporter"
              value={formState.transporter}
              onChange={handleSelectChange}
              fullWidth
              sx={{
                fontFamily: 'Source Sans Pro, sans-serif',
                fontSize: '12px',
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                height: '32px',
              }}
            >
              <MenuItem value="">
                <em>Select Option</em>
              </MenuItem>
              <MenuItem value="Blue Dart">Blue Dart</MenuItem>
              <MenuItem value="DHL">DHL</MenuItem>
              <MenuItem value="Delhivery">Delhivery</MenuItem>
              <MenuItem value="DTDC">DTDC</MenuItem>
              <MenuItem value="GATI">GATI</MenuItem>
              <MenuItem value="Safexpress">Safexpress</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            marginBottom: '8px',
          }}
        >
          <InputBox
            label="Source"
            value={formState.source}
            name="source"
            onChange={handleTextFieldChange}
            placeholder="Enter Source"
          />
          <InputBox
            label="Destination"
            value={formState.destination}
            name="destination"
            onChange={handleTextFieldChange}
            placeholder="Enter Destination"
          />
        </Box>

        <InputBox
          label="Phone"
          value={formState.phone}
          name="phone"
          onChange={handleTextFieldChange}
          placeholder="Enter Phone Number"
          error={phoneError} 
        />
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: '1px solid #F2F2F2',
          padding: '16px 32px',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            width: '98px',
            height: '32px',
            background: '#FFFFFF',
            border: '1px solid #E0E0E0',
            borderRadius: '4px',
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid || !!tripIdError} 
          sx={{
            width: '120px',
            height: '32px',
            background: isFormValid && !tripIdError ? '#0057D1' : '#C7C7C7',
            borderRadius: '4px',
            color: '#FFFFFF',
            textTransform: 'none',
          }}
        >
          Add Trip
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTripDialog;
