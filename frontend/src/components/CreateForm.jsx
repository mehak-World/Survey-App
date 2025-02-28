import React, { useState } from "react";
import axios from "axios"
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
import { Delete as DeleteIcon } from "@mui/icons-material";
import {AddPhotoAlternate} from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { handleAddOption, handleAddQuestion, handleEditOption, handleEditTitle, handleRemoveOption,
  handleRemoveQuestion, handleToggleMultipleSelect, handleToggleRequired, convertAllToQuestionDtos } from "../utils/questionUtils";
import Preview from "./Preview";
import { handleImageChange } from "../utils/imageUtils";
import {useNavigate} from "react-router-dom"
import { serverUrl } from "../utils/BackendUtils";
import {getAuthToken} from '../utils/BackendUtils';


const CreateForm = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [questions, setQuestions] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getButtonColor = (type) => {
    return selectedType === type ? "#4caf50" : "#3f51b5";
  };

  const saveForm = async () => {

    const questionDtos = convertAllToQuestionDtos(questions);

    const response = await axios.post(serverUrl + "createform", {
      title: formTitle,
      description: formDescription,
      questions: questionDtos
    }, {
      headers: {
        "Authorization": getAuthToken()
      }
    })
    if(response){
      navigate("/")
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "linear-gradient(to bottom right, #A8E6CF, #D0F7E5)", p: 4 }}>
      {/* Tabs */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Edit" value="edit" />
          <Tab label="Preview" value="preview" />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Paper elevation={3} sx={{ p: 4, maxWidth: "700px", mx: "auto" }}>
        {activeTab === "edit" ? (
          <Box>
            {/* Form Title and Description */}
            <TextField
              fullWidth
              label="Form Title"
              variant="outlined"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Untitled"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Form Description"
              variant="outlined"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Enter a brief description"
              sx={{ mb: 2 }}
            />

            {/* Quick Start Options */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: getButtonColor("TEXT") }}
                  onClick={() => setSelectedType("TEXT")}
                >
                  Text
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: getButtonColor("MULTIPLE_CHOICE") }}
                  onClick={() => setSelectedType("MULTIPLE_CHOICE")}
                >
                  MCQ
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: getButtonColor("RATING") }}
                  onClick={() => setSelectedType("RATING")}
                >
                  Rating
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: getButtonColor("DATE") }}
                  onClick={() => setSelectedType("DATE")}
                >
                  Date
                </Button>
              </Grid>
            </Grid>

            {/* Add Question Button */}
            <Button variant="contained" fullWidth onClick={() => handleAddQuestion(questions, selectedType, setQuestions)} disabled={!selectedType}>
              Add Question
            </Button>

            {/* Questions */}
            <Box sx={{ mt: 4 }}>
              {questions.map((question) => (
                <Box key={question.id} sx={{ mb: 4 }}>

                  <div style = {{display: "flex", gap: "10px", alignItems: "center"}}>   {/* Question Title */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={question.title}
                      onChange={(e) => handleEditTitle(question.id, e.target.value, questions, setQuestions)}
                      sx={{ mb: 2 }}
                    />

                    <Box sx={{ mt: 2 }}>
                      <Button variant="contained" component="label" >
                          <AddPhotoAlternate/>
                      
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          multiple
                          onChange={(e) => handleImageChange(question.id, e, questions, setQuestions)}
                        />
                      </Button>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        {question.images.length} images uploaded
                      </Typography>
                    </Box>

                  </div>
               

                  {/* Required Toggle */}
                  <FormControlLabel
                    control={<Checkbox checked={question.required} onChange={() => handleToggleRequired(question.id, questions, setQuestions)} />}
                    label="Required"
                  />

                  {/* Multiple Select Toggle (only for MCQ) */}
                  {question.type === "MULTIPLE_CHOICE" && (
                    <FormControlLabel
                      control={
                        <Checkbox checked={question.multipleSelect} onChange={() => handleToggleMultipleSelect(question.id, questions, setQuestions)} />
                      }
                      label="Allow Multiple Select"
                    />
                  )}

                  {/* Options for MCQ */}
                  {question.type === "MULTIPLE_CHOICE" && (
                    <Box>
                      {question.options.map((option, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <TextField
                            variant="outlined"
                            value={option}
                            onChange={(e) => handleEditOption(question.id, index, e.target.value, questions, setQuestions)}
                            fullWidth
                          />
                          <IconButton onClick={() => handleRemoveOption(question.id, index, questions, setQuestions)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <Button variant="outlined" onClick={() => handleAddOption(question.id, questions, setQuestions)}>
                        Add Option
                      </Button>
                    </Box>
                  )}

                  {/* Rating Question */}
                  {question.type === "RATING" && (
                    <Box sx={{ mt: 2 }}>
                      <Rating
                        name={`rating-${question.id}`}
                        value={question.ratingValue}
                        disabled= "true"
                        sx={{ color: "#FFD700" }} // Golden color
                      />
                    </Box>
                  )}

                  {/* Date Question */}
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
                    </Box>
                  )}

                  <IconButton onClick={() => handleRemoveQuestion(question.id, questions, setQuestions)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Button variant="outlined" onClick = {saveForm}>Save Form</Button>
          </Box>
        ) : (
        <Preview formTitle={formTitle} formDescription = {formDescription} questions = {questions} />
        )}
      </Paper>
    </Box>
  );
};

export default CreateForm;
