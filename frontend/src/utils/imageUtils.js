export const handleImageChange = (id, event, questions, setQuestions) => {
    const files = Array.from(event.target.files);
    console.log(files);
    const question = questions.find((q) => q.id === id);
  
    if (files.length + question.images.length <= 5) {
      const updatedQuestions = questions.map((q) =>
        q.id === id ? { ...q, images: [...q.images, ...files] } : q
      );
      setQuestions(updatedQuestions);
    } else {
      alert("You can only upload up to 5 images.");
    }
  };
  