import { Box } from '@mui/material';
import Header from '@/components/header/header';
import StatusCard from '@/components/statusCard/StatusCard';
import TripListTable from '@/components/tripListTable/TripListTable';
import { authOptions } from '../utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { fetchTripsFromDB } from './actions/GetData';
import Login from '@/components/auth/Login';
import { Trip } from '@/types/tripTypes';

export const dynamic = 'force-dynamic';

const Dashboard = async () => {
  console.log("In Dashboard component, starting to load...");

  // Fetch session data inside the server context
  const session = await getServerSession(authOptions);

  // Check if the session is valid
  if (!session) {
    console.log("No session found, redirecting to login...");
    return <Login />;
  }

  console.log("Session found:", session);

  try {
    // Fetch trips data from the database
    const trips: Trip[] = await fetchTripsFromDB();

    // Render the dashboard with fetched trips data
    return (
      <Box
        sx={{
          height: '96.5vh',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '24px',
        }}
      >
        {/* Header */}
        <Box sx={{ flexShrink: 0 }}>
          <Header />
        </Box>

        {/* StatusNavBar */}
        <Box sx={{ flexShrink: 0, mt: 2 }}>
          <StatusCard trips={trips} />
        </Box>

        {/* Trip Table */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            marginRight: '24px',
            marginLeft: '24px',
          }}
        >
          <TripListTable trips={trips} />
        </Box>
      </Box>
    );
  } catch (error) {
    console.error("Error occurred in Dashboard component:", error);
    return <div>Failed to load the page. Please try again later.</div>;
  }
};

export default Dashboard;
