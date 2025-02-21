import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import ReactWordcloud from "react-wordcloud"; // Import the WordCloud component
import { getAuthToken, serverUrl } from "../utils/BackendUtils";


// Fixed set of 10 colors for consistency
const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#FF4567", "#0088FE", "#00C49F", "#AF19FF", "#FF6666", "#33FF57"];

const FilledFormAnalysis = ({id}) => {
  let responses;
  //const [responses, setResponses] = useState([]);
  const [mcqData, setMcqData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [wordCloudData, setWordCloudData] = useState({});

  const fetchFormResponse = async () => {
    const res = await axios.get(serverUrl + "get_submissions/" + id, {
      'headers': {
        'Authorization': getAuthToken()
      }
    });
    console.log(res.data);
    responses = res.data;
    //setResponses(res.data);

    processMCQData();
    processRatingData();
    processWordCloudData();
  };

  useEffect(() => {
    console.log("Using effect!")
    fetchFormResponse();
    
  }, [id/*responses*/]);

  const processMCQData = () => {
    console.log('Prcessing mcq data: ' + responses)
    const questionAnalysis = {};

    responses.forEach((response) => {
      response.answers.forEach((answer) => {
        if (answer?.question?.type === "MULTIPLE_CHOICE") {
          const questionTitle = answer.question.title;
          if (!questionAnalysis[questionTitle]) {
            questionAnalysis[questionTitle] = {};
          }

          answer.question.options.forEach((option) => {
            if (!questionAnalysis[questionTitle][option]) {
              questionAnalysis[questionTitle][option] = 0;
            }

            if (answer.response.includes(option)) {
              questionAnalysis[questionTitle][option] += 1;
            }
          });
        }
      });
    });

    const formattedData = Object.keys(questionAnalysis).map((questionTitle) => ({
      question: questionTitle,
      data: Object.keys(questionAnalysis[questionTitle]).map((option) => ({
        name: option,
        value: questionAnalysis[questionTitle][option],
      })),
    }));

    setMcqData(formattedData);
  };

  const processRatingData = () => {
    console.log('Prcessing rating data: ' + responses)
    const ratingAnalysis = {};

    responses.forEach((response) => {
      response.answers.forEach((answer) => {
        if (answer?.question?.type === "RATING") {
          const questionTitle = answer.question.title;
          if (!ratingAnalysis[questionTitle]) {
            ratingAnalysis[questionTitle] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
          }

          const ratingValue = answer.response; // Assuming it's a number from 1 to 5
          if (ratingValue >= 1 && ratingValue <= 5) {
            ratingAnalysis[questionTitle][ratingValue] += 1;
          }
        }
      });
    });

    const formattedRatingData = Object.keys(ratingAnalysis).map((questionTitle) => ({
      question: questionTitle,
      data: Object.keys(ratingAnalysis[questionTitle]).map((rating) => ({
        name: rating,
        value: ratingAnalysis[questionTitle][rating],
      })),
    }));

    setRatingData(formattedRatingData);
  };

  const processWordCloudData = () => {
    const cloudData = {};

    responses.forEach((response) => {
      response.answers.forEach((answer) => {
        if (answer?.question?.type === "TEXT") { // Handle text questions
          const questionTitle = answer.question.title;
          if (!cloudData[questionTitle]) {
            cloudData[questionTitle] = [];
          }

          // Split the response into individual words and count their frequency
          const words = answer.response.split(/\s+/).map((word) => word.toLowerCase());
          words.forEach((word) => {
            const existingWord = cloudData[questionTitle].find((item) => item.text === word);
            if (existingWord) {
              existingWord.value += 1; // Increase count if word already exists
            } else {
              cloudData[questionTitle].push({ text: word, value: 1 });
            }
          });
        }
      });
    });

    // Only set the word cloud data for questions with more than 20 responses
    const filteredCloudData = Object.keys(cloudData).reduce((acc, questionTitle) => {
      const wordCount = cloudData[questionTitle].reduce((sum, item) => sum + item.value, 0);
      if (wordCount > 20) {
        acc[questionTitle] = cloudData[questionTitle];
      }
      return acc;
    }, {});

    setWordCloudData(filteredCloudData);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Response Analysis
      </Typography>

      {/* MCQ Analysis */}
      {mcqData.map(({ question, data }, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {question}
          </Typography>
          <PieChart width={400} height={400}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} label>
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      ))}

      {/* Rating Analysis */}
      {ratingData.map(({ question, data }, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {question}
          </Typography>
          <BarChart width={400} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </Box>
      ))}

      {/* Word Cloud Analysis for Text-based Questions */}
      {Object.keys(wordCloudData).map((questionTitle) => (
        <Box key={questionTitle} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {questionTitle}
          </Typography>
          <ReactWordcloud words={wordCloudData[questionTitle]} />
        </Box>
      ))}
    </Box>
  );
};

export default FilledFormAnalysis;
