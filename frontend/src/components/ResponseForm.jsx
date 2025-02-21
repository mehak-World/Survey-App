import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Rating,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { serverUrl } from "../utils/BackendUtils";
import { getAuthToken } from "../utils/BackendUtils";
import { convertAllToQuestions } from "../utils/questionUtils";

const ResponseForm = () => {
  const [form, setForm] = useState({});

  // Response types can include: string (text, single-choice mcq), [string] (multi-choice mcq), number (rating), 
  // Date? (Date)
  const [responses, setResponses] = useState({}); // Store user responses
  const [errors, setErrors] = useState({}); // Store validation errors
  const [submitted, setSubmitted] = useState(false); // Track submission status
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(serverUrl + "forms/" + id, {
          headers: {
            "Authorization": getAuthToken()
          }
        });
    if (response) {
      const formData = response.data
      formData.questions = convertAllToQuestions(response.data.questions);

      console.log(formData)
      setForm(formData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validation: Check required questions
    let newErrors = {};
    form.questions.forEach((question) => {
      if (question.required && !responses[question._id]) {
        newErrors[question._id] = true; // Mark as error
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Stop submission if errors exist
    }

    const submissionDto = {
      formId: id,
      answers: form.questions.map((question) => ({
        questionId: question._id,
        response: responses[question._id] ?? "", // Store empty string if unanswered
      })),
      respondedAt: new Date()
    };

    console.log(submissionDto)

    try {
      await axios.post(serverUrl + "response", submissionDto);
      setSubmitted(true); // Show thank-you message after successful submission
    } catch (error) {
      console.error("Error submitting response", error);
    }
  };

  if (submitted) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: "700px", mx: "auto", my: "50px" }}>
        <Box>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Thank you for your submission!
          </Typography>
        </Box>
      </Paper>
    );
  }

  return form ? (
    <Paper elevation={3} sx={{ p: 4, maxWidth: "700px", mx: "auto", my: "50px" }}>
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {form.title || "Untitled Form"}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          {form.description || "No description provided."}
        </Typography>

        {/* Display Questions */}
        {form.questions?.map((question) => (
          <Box key={question._id} sx={{ mb: 4, border: errors[question._id] ? "2px solid red" : "none", p: 2 }}>
            <Typography variant="h6">
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
                value={responses[question._id] || ""}
                onChange={(e) => handleResponseChange(question._id, e.target.value)}
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
                          <Checkbox
                            checked={Array.isArray(responses[question._id]) && responses[question._id].includes(option)}
                            onChange={(e) => {
                              const selectedOptions = responses[question._id] || [];
                              if (e.target.checked) {
                                handleResponseChange(question._id, [...selectedOptions, option]);
                              } else {
                                handleResponseChange(
                                  question._id,
                                  selectedOptions.filter((opt) => opt !== option)
                                );
                              }
                            }}
                          />
                        }
                        label={option}
                      />
                    </Box>
                  ))
                ) : (
                  // Single select (radio buttons)
                  <RadioGroup
                    value={responses[question._id] || ""}
                    onChange={(e) => handleResponseChange(question._id, e.target.value)}
                  >
                    {question.options.map((option, index) => (
                      <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                )}
              </Box>
            )}

            {/* Rating Input */}
            {question.type === "RATING" && (
              <Rating
                value={responses[question._id] || 0}
                onChange={(e, newValue) => handleResponseChange(question._id, newValue)}
                sx={{ color: "#FFD700" }}
              />
            )}

            {/* Date Picker */}
            {question.type === "DATE" && (
              <Box sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Date"
                    value={responses[question._id] || null}
                    onChange={(newDate) => handleResponseChange(question._id, newDate)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Box>
            )}
          </Box>
        ))}

        {/* Submit Button */}
        <Button variant="contained" onClick={handleSubmit}>
          Submit response
        </Button>
      </Box>
    </Paper>
  ) : (
    ""
  );
};

export default ResponseForm;
