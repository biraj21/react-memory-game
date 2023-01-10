import { Airplay, Anchor, Box, Briefcase, Compass, Headphones, Smile, Speaker } from "react-feather";
import Card from "./components/Card";
import "./App.scss";
import { useEffect, useState } from "react";

const cardsData = [
  { svg: <Airplay color="#f8f38d" /> },
  { svg: <Anchor color="#ff6961" /> },
  { svg: <Briefcase color="#42d6a4" /> },
  { svg: <Box color="#08cad1" /> },
  { svg: <Compass color="#59adf6" /> },
  { svg: <Headphones color="#9d94ff" /> },
  { svg: <Smile color="#ffb480" /> },
  { svg: <Speaker color="#c780e8" /> },
].map((card, i) => ({ ...card, matched: false, pairNo: i }));

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  useEffect(reset, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setTurns(turns + 1);

      if (choiceOne.pairNo === choiceTwo.pairNo) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.pairNo === choiceOne.pairNo) {
              return { ...card, matched: true };
            }

            return card;
          });
        });
      } else {
        console.log("Doesn't match!");
      }

      setTimeout(resetChoices, 1000);
    }
  }, [choiceOne, choiceTwo]);

  function shuffleCards() {
    // using map to create new copies of object instead of copying references
    const shuffled = [...cardsData, ...cardsData].map((card) => ({ ...card }));
    shuffled.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }

  function resetChoices() {
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  function reset() {
    shuffleCards();
    setTurns(0);
    resetChoices();
  }

  function handleCardClick(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  return (
    <div className="app">
      <h1>Memory Pairs</h1>
      <button onClick={reset}>New Game</button>
      <div className="cards">
        {cards.map((card, i) => (
          <Card
            card={card}
            key={i}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      <p className="turns">Turns: {turns}</p>
    </div>
  );
}

export default App;
