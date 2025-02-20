import React, { useState } from "react";
import {
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  Rating,
  Input,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Preview = ({formTitle, formDescription, questions}) => {
  return (
    <Box>
    {/* Preview Mode */}
    <Typography variant="h5" sx={{ mb: 3 }}>
      {formTitle || "Untitled Form"}
    </Typography>
    <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
      {formDescription || "No description provided."}
    </Typography>

    {/* Display Questions */}
    {questions.map((question) => (
      <Box key={question.id} sx={{ mb: 4 }}>
        <Typography variant="h6">{question.title}</Typography>
        {question.type == "TEXT" && (
            <Box>
               <TextField
                    variant="outlined"
                    placeholder = "Enter your answer"
                   disabled
                    fullWidth
                  />
            </Box>
        )}
        {question.type === "MULTIPLE_CHOICE" && (
          <Box>
            {question.options.map((option, index) => (
              <Box key={index}>
                <FormControlLabel control={<Checkbox />} label={option} />
              </Box>
            ))}
          </Box>
        )}
        {question.type === "RATING" && (
          <Rating value={question.ratingValue} disabled sx={{ color: "#FFD700" }} />
        )}
        {question.type === "DATE" && (
            <Box sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={question.date}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  disabled="true"
                />
              </LocalizationProvider>
            </Box>)}
        {question.images.length > 0 && (
          <Box>
            {question.images.map((img, index) => (
              <img key={index} src={URL.createObjectURL(img)} alt={`Image ${index + 1}`} style={{ width: 100, height: 100, marginRight: 8 }} />
            ))}
          </Box>
        )}
      </Box>
    ))}
  </Box>
  )
}

export default Preview
