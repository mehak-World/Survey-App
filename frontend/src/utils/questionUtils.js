export const handleAddQuestion = (questions, selectedType, setQuestions) => {
    if (selectedType) {
      const newQuestion = {
        id: Date.now(),
        type: selectedType,
        title: `${selectedType} Question`,
        options: selectedType === "mcq" ? ["", ""] : [],
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
  