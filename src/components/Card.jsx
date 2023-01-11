import "./Card.scss";

export default function Card({ card, flipped, handleCardClick }) {
  function handleClick(e) {
    handleCardClick(card);
  }

  return (
    <div className={`card ${flipped ? "card--flipped" : ""} ${card.matched ? "card--matched" : ""}`}>
      <div className="card__front">{card.svg}</div>
      <div className="card__back" onClick={handleClick}></div>
    </div>
  );
}
