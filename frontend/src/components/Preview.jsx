import React from 'react'

const Preview = ({questions, formTitle, formDescription}) => {
    return (
        <div className="p-4">
          <h2 className="text-xl font-bold">{formTitle}</h2>
          <p>{formDescription}</p>
          {questions.map((question, index) => (
            <div key={index} className="my-4">
              <div className="font-semibold">{index+1}. {question.text}</div>
              {question.type === "text" && <input type="text" placeholder="Your answer" class="form-control" className="border p-2 w-full mt-2" />}
              {question.type === "radio" && (
                <div className="mt-2">
                  {question.options.map((option, idx) => (
                    <div key={idx}>
                      <input type="radio" name={`question-${index}`} /> {option}
                    </div>
                  ))}
                </div>
              )}
              {question.type === "date" && <input type="date" class="form-control" className="border p-2 w-full mt-2" />}
              {question.type === "rating" && (
                <div className="mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <span key={rating}>⭐</span>
                  ))}
                </div>
              )}
              {question.type === "file" && <input type="file" class="form-control" className="mt-2" />}
            </div>
          ))}
        </div>
      );
}

export default Preview
