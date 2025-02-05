import React from 'react';
import {
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Rating,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";  // Import dayjs for date parsing

const FilledForm = ({ response }) => {
  return (
    <Box>
      {/* Display Questions */}
      {response.answers.map((result) => (
        <Box key={result._id} sx={{ mb: 4 }}>
          <Typography variant="h6">{result.questionId.title}</Typography>

          {/* Text Input */}
          {result.questionId.type === "text" && (
            <Box>
              <TextField
                variant="outlined"
                value={result.response}
                disabled
                fullWidth
              />
            </Box>
          )}

          {/* MCQ */}
          {result.questionId.type === "mcq" && (
            <Box>
              {result.questionId.options.map((option, index) => (
                <Box key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={result.response.includes(option)}  // Check if option is in the response array
                        disabled
                      />
                    }
                    label={option}
                  />
                </Box>
              ))}
            </Box>
          )}

          {/* Rating */}
          {result.questionId.type === "rating" && (
            <Rating value={result.response} disabled sx={{ color: "#FFD700" }} />
          )}

          {/* Date */}
          {result.questionId.type === "date" && (
            <Box sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={
                    result.response && dayjs(result.response).isValid()
                      ? dayjs(result.response)
                      : null
                  }  // Ensure valid date is passed to the DatePicker
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  disabled={true}
                />
              </LocalizationProvider>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default FilledForm;
