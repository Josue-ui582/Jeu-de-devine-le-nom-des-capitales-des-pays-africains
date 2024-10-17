import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { countries } from "./Country";

const SelectCountryGame = () => {
  const [selectedCountry, setSelectedCountry] = useState({});
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameActive, setGameActive] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextCompleted, setIsTextCompleted] = useState(false);
  
  const chooseRandomCountry = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const country = chooseRandomCountry();
    setSelectedCountry(country);
    setDisplayedText("");
    setCurrentIndex(0);
    setIsTextCompleted(false);
    setUserAnswer("");
    setTimeLeft(20);
    setGameActive(true);
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 2000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFailure();
    }
  }, [timeLeft, gameActive]);

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  useEffect(() => {
    if (selectedCountry.name && currentIndex < `Quelle est la capitale de ${selectedCountry.name} ?`.length) {
      const typingEffect = setTimeout(() => {
        setDisplayedText(
          (prev) => prev + `Quelle est la capitale de ${selectedCountry.name} ?`[currentIndex]
        );
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(typingEffect);
    } else if (selectedCountry.name && currentIndex === `Quelle est la capitale de ${selectedCountry.name} ?`.length) {
      setIsTextCompleted(true);
    }
  }, [currentIndex, selectedCountry]);

  useEffect(() => {
    if (gameActive && isTextCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 2000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFailure();
    }
  }, [timeLeft, gameActive, isTextCompleted]);

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === selectedCountry.capital.toLowerCase()) {
      toast.success(`Ouais! C'est vrai, ${selectedCountry.capital} est bien la capitale de ${selectedCountry.name}. Vous avez gagné !`, {
        autoClose: 3000,
        closeOnClick: true,
      });
      const audio = new Audio("/path/to/victory-sound.mp3");
      audio.play();
      setGameActive(false);
    } else {
      handleFailure();
    }
  };

  const handleFailure = () => {

    if (!userAnswer) {
      toast.error("Temps écoulé, veuillez écrire quelque chose", {
        autoClose: 3000,
        closeOnClick: true,
      });
    } else {
      toast.error(`${userAnswer || "Temps écoulé"} n'est pas la capitale de ${selectedCountry.name} c'est plutôt ${selectedCountry.capital}`, {
        autoClose: 3000,
        closeOnClick: true,
      });
    }

    setGameActive(false);
  };

  return (
    <>
      <p>Devinez la capitale d'un pays africain. Vous avez 20 secondes pour répondre!</p>
      
      <div className="input-container">
      <p>{displayedText}</p>
      <input
          type="text"
          value={userAnswer}
          onChange={handleAnswerChange}
          placeholder={`Entrez la capitale`}
          disabled={!gameActive || !isTextCompleted}
        />
        <button
          onClick={checkAnswer}
          disabled={!gameActive || userAnswer === "" || !isTextCompleted}
        >
          Vérifier
        </button>
      </div>

      <p>Temps restant : {isTextCompleted ? timeLeft : "Chargement..."}</p>

      {!gameActive && (
        <button onClick={startNewGame} className="button">
          Rejouer
        </button>
      )}

      <ToastContainer />
    </>
  );
};

export default SelectCountryGame;
