"use client";
import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import DotLoader from "react-spinners/DotLoader";
import Modal from 'react-modal';
import './quiz.css';
import { IoIosCloseCircleOutline } from "react-icons/io";
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const QuizComponentClient = ({ quiz, state, quiz_id, plan_id, module_id }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [color, setColor] = useState("#85486e");
  const [loading, setLoading] = useState(false)
  const [scores, setScore] = useState(0)
  const [userQuizId, setUserQuizId] = useState(null)

  useEffect(() => {
    if (quiz && quiz.questions) {
      setUserResponses(Array(quiz.questions.length).fill(null));
    }
  }, [quiz]);

  const selectOption = (index) => {
    setUserResponses([...userResponses.slice(0, questionIndex), index, ...userResponses.slice(questionIndex + 1)]);
  };

  const next = () => {
    if (questionIndex < quiz.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const prev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const score = () => {
    let score = 0;
    userResponses.forEach((response, index) => {
      if (quiz.questions[index].responses[response]?.correct) {
        score++;
      }
    });
    return score;
  };

  const restart = () => {
    setQuestionIndex(0);
    setUserResponses(Array(quiz.questions.length).fill(null));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    setLoading(true)
    const user_score = score()
    const payload = quiz.questions.map((question, index) => {
      const userResponseIndex = userResponses[index];
      const correctResponse = question.responses.find(response => response.correct);
      return {
        plan_id: plan_id,
        quiz_id: quiz_id,
        module_id: module_id,
        user_id: localStorage.getItem('study-userId'),
        question: question.text,
        selectedOption: question.responses[userResponseIndex]?.text,
        correctOption: correctResponse.text,
        isCorrect: question.responses[userResponseIndex]?.correct || false,
        score: user_score
      };
    });

    console.log("Quiz Payload:",payload)

    const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

    const response = await fetch('/api/studyplans/quiz/submitQuestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BearerToken}`
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      setLoading(false)
      const error_response = await response.json();
      //console.log(error_response.error)
      toast.error(`${error_response.error}`, {
        position: "top-right"
      });

    } else {
      const data_response = await response.json();
      console.log(data_response.user_quiz_id)
      setUserQuizId(data_response.user_quiz_id)
      setLoading(false)
      setScore(user_score)
      setShowModal(true);
    }
    console.log(payload)
  };

  const handleQuizCompletion = () => {
    setShowReview(true);
  };

  const isLastQuestion = quiz && quiz.questions && questionIndex === quiz.questions.length - 1;

  if (!quiz || !quiz.questions) {
    return <>
      <div>
        <DotLoader
          color={color}
          loading={state}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>;
  }

  return (
    <section className="container w-100">

      <div className="questionBox w-100" id="app">
        <Transition
          duration={{ enter: 500, leave: 300 }}
          enterActiveClass="animated zoomIn"
          leaveActiveClass="animated zoomOut"
          mode="out-in"
        >
          {questionIndex < quiz.questions.length ? (
            <div className="questionContainer">
              <header>
                <div className="progressContainer mb-2">
                  <progress className="progress col-12 is-small" style={{ height: "5px" }} value={(questionIndex + 1) / quiz.questions.length * 100} max="100">
                    {(questionIndex + 1) / quiz.questions.length * 100}%
                  </progress>
                  <p className='my-3 text-muted' style={{ fontWeight: '500' }}>QUESTION {questionIndex + 1}/{quiz.questions.length}</p>
                </div>
              </header>
              <h5 className="titleContainer title mb-4" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "500", color: "#333333" }}>{quiz.questions[questionIndex].text}</h5>
              <div className="optionContainer">
                {quiz.questions[questionIndex].responses.map((response, index) => (
                  <div
                    className={`option ${userResponses[questionIndex] === index ? 'is-selected' : ''}`}
                    onClick={() => selectOption(index)}
                    key={index}
                    style={{
                      backgroundColor: userResponses[questionIndex] === index ? '#DBC7CF' : 'transparent',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                      padding: '0.6rem',
                      color: '#CB5284',
                      border: '1px solid #D1C8D0',
                      fontFamily: 'Fredoka, sans-serif',
                      fontWeight: '600'
                    }}
                  >
                    {String.fromCharCode(97 + index)}. {response.text}
                  </div>
                ))}
              </div>
              <footer className="questionFooter">
                <nav className="pagination d-flex justify-content-between" role="navigation" aria-label="pagination">
                  <button className="button btn px-5 text-white" style={{ background: 'linear-gradient(to right, #CB5284, #754968)' }} onClick={prev} disabled={questionIndex < 1}>
                    Back
                  </button>
                  <button disabled={loading} className={`button btn px-5 text-white  ${userResponses[questionIndex] === null ? '' : 'is-active'}`} onClick={isLastQuestion ? handleSubmit : next} style={{ background: 'linear-gradient(to right, #CB5284, #754968)' }}>
                    {isLastQuestion ? (loading ? 'Pls wait...' : 'Submit') : 'Next'}
                  </button>
                </nav>
              </footer>
            </div>
          ) : (
            <div className="quizCompleted">
              <span className="icon">
                <i className={`fa ${score() > 3 ? 'fa-check-circle-o is-active' : 'fa-times-circle'}`}></i>
              </span>
              <h2 className="title">You did {score() > 7 ? 'an amazing' : score() < 4 ? 'a poor' : 'a good'} job!</h2>
              <p className="subtitle">Total score: {score()} / {quiz.questions.length}</p>
              <br />
              <button className="button" onClick={restart}>Restart <i className="fa fa-refresh"></i></button>
            </div>
          )}
        </Transition>
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel="Quiz Score"
          style={{
            content: {
              width: '80%',
              height: '50%',
              top: '50%',
              left: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '10px',
              transform: 'translate(-50%, -50%)',
              borderRadius: '15px'
            },
          }}
        >
          <div className='ms-5'>
            <div className='position-absolute top-0 end-0'>
              <IoIosCloseCircleOutline size={20} onClick={closeModal} />
            </div>
          </div>
          <div className='scoreImg'>
          </div>

          <h1 style={{ color: '#CB5284', fontWeight: '900', fontSize: '25px' }}>{score()} / {quiz.questions.length}</h1>
          <Link href={`/study-plan/quiz/result/${quiz_id}/${plan_id}/${module_id}/${scores}/${quiz.questions.length}/${userQuizId}`} className="button btn px-5 text-white" style={{ background: 'linear-gradient(to right, #CB5284, #754968)' }}>Review</Link>
        </Modal>
        {showReview && (
          <div className="modal reviewQuestions container p-3" style={{ display: 'block' }}>
            <div className="modal-content container pb-4">
              <span className="close" style={{ float: 'right', width: '100%' }} onClick={() => setShowReview(false)}>&times;</span>
              <h2 className='text-center py-4'>Review Questions</h2>
              {quiz.questions.map((question, index) => (
                <div key={index}>
                  <h5>{question.text}</h5>
                  <p>Your answer: {question.responses[userResponses[index]]?.text}</p>
                  <p>Correct answer: {question.responses.find(response => response.correct)?.text}</p>
                </div>
              ))}
              <button className="button btn px-5 text-white" onClick={() => setShowReview(false)} style={{ background: 'linear-gradient(to right, #CB5284, #754968)' }}>Close</button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default QuizComponentClient;
