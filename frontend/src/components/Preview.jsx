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
  RadioGroup,
  Radio,
  Rating,
  Input,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Preview = ({formTitle, formDescription, questions}) => {
 
  return (
    <Box  >
    {/* Preview Mode */}
    <Typography variant="h5" sx={{ mb: 3 }}>
      {formTitle || "Untitled Form"}
    </Typography>
    <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
      {formDescription || "No description provided."}
    </Typography>

     {/* Display Questions */}
     <Box >
     {questions?.map((question) => (
              <Box key={question._id} sx={{ mb: 3 }}>
                <Typography variant="h6" >
                  {question.title}
                  {question.required && <span style={{ color: "red" }}> *</span>}
                </Typography>
    
                {/* MCQ - Show Multi-Select Label */}
                {question.type === "MULTIPLE_CHOICE" && question.multipleSelect && (
                  <Typography variant="body2" color="textSecondary">
                    (Multiple selections allowed)
                  </Typography>
                )}
    
                {/* Text Input */}
                {question.type === "TEXT" && (
                  <TextField
                    variant="outlined"
                    placeholder="Enter your answer"
                    fullWidth
                    disabled
                  />
                )}
    
                {/* MCQ (Single & Multiple Select) */}
                {question.type === "MULTIPLE_CHOICE" && (
                  <Box>
                    {question.multipleSelect ? (
                      // Multiple select (checkboxes)
                      question.options.map((option, index) => (
                        <Box key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox disabled
                              />
                            }
                            label={option}
                          />
                        </Box>
                      ))
                    ) : (
                      // Single select (radio buttons)
                      <RadioGroup disabled
                      >
                        {question.options.map((option, index) => (
                          <FormControlLabel key={index} value={option} control={<Radio />} label={option} disabled/>
                        ))}
                      </RadioGroup>
                    )}
                  </Box>
                )}
    
                {/* Rating Input */}
                {question.type === "RATING" && (
                  <Rating
                  
                    disabled
                    sx={{ color: "#FFD700" }}
                  />
                )}
    
                {/* Date Picker */}
                {question.type === "DATE" && (
                  <Box sx={{ mt: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker disabled
                        label="Select Date"
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Box>
                )}
              </Box>
            ))}
    
            {/* Submit Button */}
            <Button variant="contained" disabled>
              Submit response
            </Button>
     </Box>
          
  </Box>
  )
}

export default Preview
