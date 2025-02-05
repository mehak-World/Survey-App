import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { handleAddOption, handleAddQuestion, handleEditOption, handleEditTitle, handleRemoveOption, handleRemoveQuestion, handleToggleMultipleSelect, handleToggleRequired } from "../utils/questionUtils";
import Preview from "./Preview";
import { handleImageChange } from "../utils/imageUtils";
import { useNavigate, useParams } from "react-router-dom";
import ViewResponse from "./ViewResponse";
import FilledFormAnalysis from "./FilledFormAnalysis";

const EditForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [activeTab, setActiveTab] = useState("edit");
  const [questions, setQuestions] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  
  // New state for generating and handling the sharable link
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getForm = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/forms/${id}`);
        const formData = response.data;
        setForm(formData);
        setFormTitle(formData.title || "");
        setFormDescription(formData.description || "");
        setQuestions(
          formData.questions.map((ques) => ({
            id: ques._id,
            type: ques.type,
            title: ques.title,
            required: ques.isRequired,
            multipleSelect: ques.isMultiple,
            options: ques.options || [],
            images: ques.images || [],
          }))
        );
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    getForm();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getButtonColor = (type) => {
    return selectedType === type ? "#4caf50" : "#3f51b5";
  };

  const saveForm = async () => {
    const response = await axios.post("http://localhost:3000/forms/" + id, {
      title: formTitle,
      description: formDescription,
      questions: questions,
    });
    if (response) {
      console.log(response);
      navigate("/");
    }
  };

  // Function to generate the sharable link
  const handleGenerateLink = () => {
    setGeneratedLink(`http://localhost:5173/fillForm/${id}`);
    setLinkModalOpen(true);
  };

  const handleCloseModal = () => {
    setLinkModalOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied to clipboard!");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "linear-gradient(to bottom right, #A8E6CF, #D0F7E5)", p: 4 }}>
      {/* Tabs */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Edit" value="edit" />
          <Tab label="Preview" value="preview" />
          <Tab label = "View Responses" value = "responses" />
          <Tab label = "Analysis" value = "analysis" />
        </Tabs>
            {/* Generate Sharable Link Button */}
            <Button variant="contained"  onClick={handleGenerateLink} sx={{ mb: 2, ml: 5 }}>
              Generate Sharable Link
            </Button>
      </Box>

      {/* Main Content */}
      <Paper elevation={3} sx={{ p: 4, maxWidth: "700px", mx: "auto" }}>
        {activeTab === "edit" && (
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
                  sx={{ bgcolor: getButtonColor("text") }}
                  onClick={() => setSelectedType("text")}
                >
                  Text
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: getButtonColor("mcq") }}
                  onClick={() => setSelectedType("mcq")}
                >
                  MCQ
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: getButtonColor("rating") }}
                  onClick={() => setSelectedType("rating")}
                >
                  Rating
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: getButtonColor("date") }}
                  onClick={() => setSelectedType("date")}
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
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={question.title}
                      onChange={(e) => handleEditTitle(question.id, e.target.value, questions, setQuestions)}
                      sx={{ mb: 2 }}
                    />

                    <Box sx={{ mt: 2 }}>
                      <Button variant="contained" component="label">
                        <AddPhotoAlternate />
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

                  <FormControlLabel
                    control={<Checkbox checked={question.required} onChange={() => handleToggleRequired(question.id, questions, setQuestions)} />}
                    label="Required"
                  />

                  {question.type === "mcq" && (
                    <FormControlLabel
                      control={<Checkbox checked={question.multipleSelect} onChange={() => handleToggleMultipleSelect(question.id, questions, setQuestions)} />}
                      label="Allow Multiple Select"
                    />
                  )}

                  {question.type === "mcq" && (
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

                  {question.type === "rating" && (
                    <Box sx={{ mt: 2 }}>
                      <Rating name={`rating-${question.id}`} value={question.ratingValue} disabled sx={{ color: "#FFD700" }} />
                    </Box>
                  )}

                  {question.type === "date" && (
                    <Box sx={{ mt: 2 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Select Date"
                          value={question.date}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                          disabled
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
            <Button variant="outlined" onClick={saveForm}>
              Save Form
            </Button>
          </Box>
        )} 
        {activeTab == "preview" && (
          <Preview formTitle={formTitle} formDescription={formDescription} questions={questions} />
        )}
        {activeTab == "responses" && (
          <ViewResponse id = {id} />
        )}

        {activeTab == "analysis" && (
          <FilledFormAnalysis id = {id} />
        )}
      </Paper>

      {/* Modal for Generated Link */}
      <Modal
        open={linkModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={linkModalOpen}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 2, width: 400, mx: "auto", mt: 10 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Shareable Link
            </Typography>
            <TextField
              fullWidth
              value={generatedLink}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handleCopyLink} variant="contained" sx={{ ml: 1 }}>
                      Copy Link
                    </Button>
                  </InputAdornment>
                ),
              }}
              readOnly
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default EditForm;
