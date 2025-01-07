import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Preview from "./Preview";
import axios from "axios"

function SurveyBuilder() {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [previewMode, setPreviewMode] = useState(false);

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
  
      const response = await axios.post("http://localhost:3000/surveys", surveyData);
      console.log("Survey saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving survey:", error);
    }
  };
  

  // Form title and description for preview
  // const formTitle = "Sample Survey"; // You can make this dynamic if needed
  // const formDescription = "Please fill out the survey below.";

  // const renderPreview = () => {
  //   return (
  //     <div className="p-4">
  //       <h2 className="text-xl font-bold">{formTitle}</h2>
  //       <p>{formDescription}</p>
  //       {questions.map((question, index) => (
  //         <div key={index} className="my-4">
  //           <div className="font-semibold">{question.text}</div>
  //           {question.type === "text" && <input type="text" placeholder="Your answer" class="form-control" className="border p-2 w-full mt-2" />}
  //           {question.type === "radio" && (
  //             <div className="mt-2">
  //               {question.options.map((option, idx) => (
  //                 <div key={idx}>
  //                   <input type="radio" name={`question-${index}`} /> {option}
  //                 </div>
  //               ))}
  //             </div>
  //           )}
  //           {question.type === "date" && <input type="date" class="form-control" className="border p-2 w-full mt-2" />}
  //           {question.type === "rating" && (
  //             <div className="mt-2">
  //               {[1, 2, 3, 4, 5].map((rating) => (
  //                 <span key={rating}>⭐</span>
  //               ))}
  //             </div>
  //           )}
  //           {question.type === "file" && <input type="file" class="form-control" className="mt-2" />}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  const addQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setQuestions([
        ...questions,
        {
          text: newQuestion,
          type: questionType,
          options: [],
        },
      ]);
      setNewQuestion("");
    }
  };

  const addOption = (index, e) => {
    e.preventDefault();
    const updatedQuestions = questions.map((q, i) => {
      if (i === index && q.type === "radio") {
        return {
          ...q,
          options: [...q.options, `Option ${q.options.length + 1}`],
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, newValue) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === qIndex && q.type === "radio") {
        const updatedOptions = q.options.map((opt, j) =>
          j === oIndex ? newValue : opt
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleDateChange = (index, date) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === index && q.type === "date") {
        return { ...q, selectedDate: date };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  // const isDateDisabled = (index, date) => {
  //   const disabledDates = questions[index]?.dateSettings?.disabledDates || [];
  //   return disabledDates.some(
  //     (disabledDate) =>
  //       date.getDate() === disabledDate.getDate() &&
  //       date.getMonth() === disabledDate.getMonth() &&
  //       date.getFullYear() === disabledDate.getFullYear()
  //   );
  // };

  return (
    <div className="p-4">
      <div style={{ display: "flex", gap: "5%", alignItems: "center" }}>
        <h3 className="text-2xl font-bold mb-4">Create Survey</h3>
        <p>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="btn btn-primary"
          >
            {previewMode ? "Edit Survey" : "Preview"}
          </button>
        </p>
      </div>
      {previewMode ? (
        <Preview
          questions={questions}
          formTitle={formTitle}
          formDescription={formDescription}
        />
      ) : (
        <form className="w-50">
          <div class="mb-3">
            <label for="title" class="form-label">
              Enter Survey Title
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              name="title"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">
              Description
            </label>
            <textarea
              class="form-control"
              id="description"
              name="description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              rows="3"
            ></textarea>
          </div>

          {/* Render Questions */}
          <ol>
            {questions.map((question, index) => (
              <li key={index} className="mb-4">
                <div>
                  <label className="block font-semibold mb-1">
                    {question.text}
                  </label>
                  {question.type === "text" && (
                    <input
                      type="text"
                      disabled
                      placeholder="Short answer"
                      className="border p-2 w-full"
                    />
                  )}
                  {question.type === "radio" && (
                    <div>
                      {question.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex items-center mb-1">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            disabled
                            className="mr-2"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) =>
                              handleOptionChange(index, oIndex, e.target.value)
                            }
                            className="border p-2 flex-grow"
                          />
                        </div>
                      ))}
                      <button
                        onClick={(e) => addOption(index, e)}
                        className="btn btn-secondary"
                      >
                        Add Option
                      </button>
                    </div>
                  )}
                  {question.type === "date" && (
                    <DatePicker
                      selected={question.selectedDate}
                      onChange={(date) => handleDateChange(index, date)}
                      className="border p-2 w-full"
                      placeholderText="Pick a date"
                      disabled
                    />
                  )}
                  {question.type === "rating" && (
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className="text-gray-500 text-2xl cursor-pointer"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  {question.type === "file" && (
                    <input type="file" disabled className="border p-2 w-full" />
                  )}
                </div>
              </li>
            ))}
          </ol>

          <h5>Add Questions</h5>

          <div class="mb-3">
            <label for="title" class="form-label">
              Choose the type of question:{" "}
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="border p-2 m-2"
            >
              <option value="text">Text</option>
              <option value="radio">Multiple Choice</option>
              <option value="date">Date</option>
              <option value="rating">Rating</option>
              <option value="file">File Upload</option>
            </select>
          </div>

          <div className="row">
            <div class="mb-3 col-10">
              <label for="title" class="form-label">
                Enter question title
              </label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>
            <div className="col-2">
              <button
                className="btn btn-secondary"
                onClick={(e) => addQuestion(e)}
              >
                Add Question
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ background: "lightGray", color: "black", border: "none" }}
            onClick = {(e) => saveSurvey(e)}
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}

export default SurveyBuilder;
