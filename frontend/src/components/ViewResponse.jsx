import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilledForm from './FilledForm';
import { Button, Box } from '@mui/material';
import { getAuthToken, serverUrl } from '../utils/BackendUtils';

const ViewResponse = ({ id }) => {
  const [responses, setResponses] = useState([]);
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0); // State to keep track of the current response index

  const fetchFormResponse = async () => {
    const res = await axios.get(serverUrl + "get_submissions/" + id, {
      headers: {
            "Authorization": getAuthToken()
          }
    })
    console.log(res.data);
    setResponses(res.data);
  };

  useEffect(() => {
    fetchFormResponse();
  }, [id]);

  // Function to handle navigation to the previous response
  const handlePrevResponse = () => {
    if (currentResponseIndex > 0) {
      setCurrentResponseIndex(currentResponseIndex - 1);
    }
  };

  // Function to handle navigation to the next response
  const handleNextResponse = () => {
    if (currentResponseIndex < responses.length - 1) {
      setCurrentResponseIndex(currentResponseIndex + 1);
    }
  };

  return responses.length > 0 ? (
    <div>
        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={handlePrevResponse}
          disabled={currentResponseIndex === 0}
        >
          &lt; Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextResponse}
          disabled={currentResponseIndex === responses.length - 1}
        >
          Next &gt;
        </Button>
      </Box>
      <br />
      <br />
      <div>
        {/* Display the current response */}
        <FilledForm key={responses[currentResponseIndex].id} response={responses[currentResponseIndex]} />
      </div>

    
     
    </div>
  ) : (
    <div>No responses available</div>
  );


};

export default ViewResponse;
