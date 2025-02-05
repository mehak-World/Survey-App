import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Preview from "./Preview";

const EditSurvey = () => {
    const {id} = useParams();
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [questions, setQuestions] = useState([]);
      const [newQuestion, setNewQuestion] = useState("");
      const [questionType, setQuestionType] = useState("text");
      const [previewMode, setPreviewMode] = useState(false);
    const [survey, setSurvey] = useState({})
    const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuestionText, setEditedQuestionText] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
            const fetchSurvey = async () => {
                    const response = await axios.get("http://localhost:3000/surveys/" + id);  
                    setSurvey(response.data)
                    setFormTitle(response.data.title)
                    setFormDescription(response.data.description)
                    setQuestions(response.data.questions.map((q) => ({
                        text: q.text,
                        type: q.ques_type,
                        options: q.options || [],
                      })))
                    console.log("Questions: ", response.data.questions);
            }

            fetchSurvey();
    }, [])

    const saveSurvey = async (e) => {
      e.preventDefault();
      try {
        const surveyData = {
          title: formTitle,
          description: formDescription,
          questions: questions.map((q) => ({
            text: q.text,
            ques_type: q.type,
            options: q.options || [],
          })),
        };
  
        const response = await axios.post(`http://localhost:3000/surveys/${id}/`, surveyData);
        console.log("Survey saved successfully:", response.data);
        navigate("/surveys")
      } catch (error) {
        console.error("Error saving survey:", error);
      }
    };

    const deleteQuestion = (e, i) => {
      e.preventDefault();
      const updatedQues = questions.filter((ques, index) => i !== index);
      setQuestions(updatedQues);
    };
    const addQuestion = (e) => {
      e.preventDefault();
      if (newQuestion.trim()) {
        setQuestions([
          ...questions,
          {
            text: newQuestion,
            type: questionType,
            options: questionType === "radio" ? [] : undefined,
          },
        ]);
        setNewQuestion("");
      }
    };

    const saveEditedQuestion = () => {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex].text = editedQuestionText;
      setQuestions(updatedQuestions);
      setEditingIndex(null);
      setEditedQuestionText(""); // Reset after saving
    };
  
    const addOption = (index) => {
      const updatedQuestions = [...questions];
      if (updatedQuestions[index].type === "radio") {
        updatedQuestions[index].options.push(`Option ${updatedQuestions[index].options.length + 1}`);
      }
      setQuestions(updatedQuestions);
    };
  
    const handleOptionChange = (qIndex, oIndex, newValue) => {
      const updatedQuestions = [...questions];
      if (updatedQuestions[qIndex].type === "radio") {
        updatedQuestions[qIndex].options[oIndex] = newValue;
      }
      setQuestions(updatedQuestions);
    };
  
    const handleDateChange = (index, date) => {
      const updatedQuestions = [...questions];
      if (updatedQuestions[index].type === "date") {
        updatedQuestions[index].selectedDate = date;
      }
      setQuestions(updatedQuestions);
    };
  
    const changeQues = (e, index) => {
  
      const updated = questions.map((q, i) => {
          if(i == index){
            return { ...q, text: e.target.value };
          }
          return q;
      })
  
      setQuestions(updated);
    }
  
    return (
      <div className="p-4">
        <div style={{ display: "flex", gap: "5%", alignItems: "center" }}>
          <h3 className="text-2xl font-bold mb-4">Create Survey</h3>
          <button onClick={() => setPreviewMode(!previewMode)} className="btn btn-primary">
            {previewMode ? "Edit Survey" : "Preview"}
          </button>
        </div>
  
        {previewMode ? (
          <Preview questions={questions} formTitle={formTitle} formDescription={formDescription} />
        ) : (
          <div style={{ display: "flex", gap: "5%", width: "100%" }}>
            {/* Left side: Add Question */}
            <div style={{ flex: 1, paddingRight: "20px" }}>
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Enter Survey Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows="3"
                  ></textarea>
                </div>
  
                <h5>Add Question</h5>
                <div className="mb-3">
                  <label htmlFor="questionType" className="form-label">Choose the type of question:</label>
                  <select
                    id="questionType"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="form-control"
                  >
                    <option value="text">Text</option>
                    <option value="radio">Multiple Choice</option>
                    <option value="date">Date</option>
                    <option value="rating">Rating</option>
                    <option value="file">File Upload</option>
                  </select>
                </div>
  
                <div className="mb-3">
                  <label htmlFor="questionText" className="form-label">Enter question title</label>
                  <input
                    type="text"
                    id="questionText"
                    className="form-control"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </div>
  
                <button className="btn btn-secondary" onClick={addQuestion}>Add Question</button>
              </form>
            </div>
  
            {/* Right side: Added Questions with Scroll */}
            <div style={{ flex: 1, paddingLeft: "20px", maxHeight: "500px", overflowY: "auto", borderLeft: "2px solid #ccc", paddingBottom: "10px" }}>
              <h5>Added Questions</h5>
              <ol>
                {questions.map((question, index) => (
                  <li key={index} className="mb-4">
                    <div>
                      <input className="block font-semibold mb-1"  value = {question.text} onChange = {(e) => changeQues(e, index)}/> <br />
  
                      {question.type === "text" && <input type="text" disabled placeholder="Short answer" className="border p-2 w-full" />}
                      {question.type === "radio" && (
                        <div>
                          {question.options.map((opt, oIndex) => (
                            <div key={oIndex} className="flex items-center mb-1">
                              <input type="radio" name={`question-${index}`} disabled className="mr-2" />
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                                className="border p-2 flex-grow"
                              />
                            </div>
                          ))}
                          <button onClick={() => addOption(index)} className="btn btn-secondary">Add Option</button>
                        </div>
                      )}
  
                      {question.type === "date" && <DatePicker selected={question.selectedDate} onChange={(date) => handleDateChange(index, date)} className="border p-2 w-full" placeholderText="Pick a date" disabled />}
                      {question.type === "rating" && (
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-gray-500 text-2xl cursor-pointer">★</span>
                          ))}
                        </div>
                      )}
                      {question.type === "file" && <input type="file" disabled className="border p-2 w-full" />}
  
                      {/* Delete buttons */}
                      <button className="btn" style={{ color: "red" }} onClick={(e) => deleteQuestion(e, index)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
  
        <button className="btn btn-primary mt-4" style={{ background: "lightGray", color: "black", border: "none" }} onClick={saveSurvey}>
          {previewMode ? "Submit" : "Save Survey"}
        </button>
  
       
      </div>
    );
  }
  
    
    


export default EditSurvey
