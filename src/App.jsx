import  { useState } from 'react';
import questions from './components/Questions';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    }
  };

 

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    const score = selectedAnswers.reduce((acc, answer, idx) => {
      return acc + (answer === questions[idx].correctAnswer ? 1 : 0);
    }, 0);
    setScore(score);
    setIsQuizFinished(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (isQuizFinished) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
          <p className="text-xl">Your Score: {score} / {questions.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">{currentQuestion.question}</h2>
        {currentQuestion.options.map((option, idx) => (
          <div key={idx} className="mb-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                className="form-radio"
                checked={selectedAnswers[currentQuestionIndex] === option}
                onChange={() => handleAnswerSelect(option)}
              />
              <span className="ml-2">{option}</span>
            </label>
          </div>
        ))}
        
        <div className="mt-4 flex justify-between">
        <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="bg-yellow-500 text-white px-4 py-2 rounded items-center"
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
        <div className="mt-4 flex justify-between">
         
          {currentQuestionIndex === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
         
        </div>
      </div>
    </div>
  );
}

export default App;
