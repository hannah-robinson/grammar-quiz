import { useState } from 'react'
import './quiz.css'
import { data } from '../../assets/data.js'

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const { question, answerOptions } = data[currentQuestion]
  const totalQuestions = data.length

  const handleNextBtnClick = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < data.length) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1)
      setAnswered(false)
    } else {
      setShowScore(true)
    }
  }

  const handleAnswerClick = (index, isCorrect) => {
    if (!answered) {
      setAnswered(true)
      setSelectedOption(index)
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1)
      }
    }
  }

  return (
    <div className='quiz__container'>
      {showScore ? (
        <div className='quiz__score'>
          Score: {score} out of {data.length}
        </div>
      ) : (
        <>
          <h1 className='quiz__title'>
            <em>for</em> or <em>during</em>?
          </h1>
          <hr />
          <h2 className='quiz__question'>
            {currentQuestion + 1}. {question}
          </h2>
          <ul>
            {answerOptions.map((option, index) => {
              return (
                <li
                  key={option.id}
                  className={`quiz__answer ${
                    answered
                      ? option.isCorrect
                        ? 'correct'
                        : selectedOption === index
                        ? 'wrong'
                        : ''
                      : ''
                  }`}
                  onClick={() => handleAnswerClick(index, option.isCorrect)}
                >
                  {answered
                    ? option.isCorrect
                      ? ' ✅ '
                      : selectedOption === index
                      ? ''
                      : ''
                    : ''}
                  {option.answer}
                </li>
              )
            })}
          </ul>
          <button
            className={`quiz__btn--next ${answered ? '' : 'disabled'}`}
            onClick={handleNextBtnClick}
            disabled={answered ? '' : 'disabled'}
          >
            Next
          </button>
          <div className='quiz__progress'>
            {currentQuestion + 1} of {totalQuestions} questions
          </div>
        </>
      )}
    </div>
  )
}

export default Quiz
