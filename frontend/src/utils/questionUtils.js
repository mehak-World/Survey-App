export const handleAddQuestion = (questions, selectedType, setQuestions) => {
  if (selectedType) {
    const newQuestion = {
      id: Date.now(),
      type: selectedType,
      title: `${selectedType} Question`,
      options: selectedType === "MULTIPLE_CHOICE" ? ["", ""] : [],
      required: false,
      multipleSelect: false,
      images: [],
    };
    setQuestions([...questions, newQuestion]);
  }
};

export const handleRemoveQuestion = (id, questions, setQuestions) => {
  setQuestions(questions.filter((q) => q.id !== id));
};

export const handleEditTitle = (id, title, questions, setQuestions) => {
  const updatedQuestions = questions.map((q) =>
    q.id === id ? { ...q, title } : q
  );
  setQuestions(updatedQuestions);
};

export const handleAddOption = (id, questions, setQuestions) => {
  const updatedQuestions = questions.map((q) =>
    q.id === id ? { ...q, options: [...q.options, ""] } : q
  );
  setQuestions(updatedQuestions);
};

export const handleRemoveOption = (id, index, questions, setQuestions) => {
  const updatedQuestions = questions.map((q) =>
    q.id === id
      ? { ...q, options: q.options.filter((_, i) => i !== index) }
      : q
  );
  setQuestions(updatedQuestions);
};

export const handleToggleRequired = (id, questions, setQuestions) => {
  const updatedQuestions = questions.map((q) =>
    q.id === id ? { ...q, required: !q.required } : q
  );
  setQuestions(updatedQuestions);
};

export const handleToggleMultipleSelect = (id, questions, setQuestions) => {
  const updatedQuestions = questions.map((q) =>
    q.id === id ? { ...q, multipleSelect: !q.multipleSelect } : q
  );
  setQuestions(updatedQuestions);
};

export const handleEditOption = (id, index, text, questions, setQuestions) => {
  const updatedQuestions = questions.map((q) =>
    q.id === id
      ? {
          ...q,
          options: q.options.map((opt, i) => (i === index ? text : opt)),
        }
      : q
  );
  setQuestions(updatedQuestions);
};


const questionTypeMap = {
  "text": "TEXT",
  "mcq": "MULTIPLE_CHOICE",
  "rating": "RATING",
  "date": "DATE",
}

let reverseQuestionTypeMap = {};
for (const key in questionTypeMap) {
  reverseQuestionTypeMap[questionTypeMap[key]] = key;
}

export const convertToQuestionDto = (question) => {

  let data;

  switch (question.type) {
    case "MULTIPLE_CHOICE":
      data = {
        options: question.options,
        multipleSelect: question.multipleSelect
      }
      break;

    default:
      data = null;
  };

  const questionDto = {
    title: question.title,
    type: question.type, //questionTypeMap[question.type],
    required: question.required,
    data: data
  };

  return questionDto;
}

export const convertAllToQuestionDtos = (questions) => {
  return questions.map((question) => {return convertToQuestionDto(question)});
}

export const convertToQuestion = (questionDto) => {
  /*
  const question = {
    id: questionDto._id,
    title: questionDto.title,
    type: reverseQuestionTypeMap[questionDto.type],
    required: questionDto.required,
    options: questionDto.data.options || [],
    multipleSelect: questionDto.data.multipleSelect || []
  };
  */
  //questionDto.type = reverseQuestionTypeMap[questionDto.type]
  questionDto.multipleSelect = questionDto.multipleSelect || false
  questionDto.required = questionDto.required || false
  return questionDto;
}

export const convertAllToQuestions = (questionDtos) => {
  return questionDtos.map((questionDto) => {return convertToQuestion(questionDto)});
}
