import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Voting = () => {
  const navigate = useNavigate();
  const submittedNames = JSON.parse(localStorage.getItem('submittedNames')) || [];
  const [votes, setVotes] = useState(Array(submittedNames.length).fill(0));
  const [votingEnded, setVotingEnded] = useState(false);

  const handleVote = (index) => {
    if (!votingEnded) {
      const newVotes = [...votes];
      newVotes[index] += 1;
      setVotes(newVotes);
    }
  };

  const endVoting = () => {
    setVotingEnded(true);
  };

  const getWinner = () => {
    const maxVotes = Math.max(...votes);
    const winners = submittedNames.filter((_, index) => votes[index] === maxVotes);
    return winners.length > 1 ? "It's a tie!" : winners[0];
  };

  const resetVoting = () => {
    localStorage.removeItem('submittedNames'); // Clear the names from localStorage
    setVotes(Array(submittedNames.length).fill(0)); // Reset votes
    setVotingEnded(false); // Reset voting state
    navigate('/'); // Navigate back to the Names page
  };

  return (
    <div className="container">
      <h1>Submitted Names</h1>
      {submittedNames.length > 0 ? (
        <div>
          {submittedNames.map((name, index) => (
            <button className='options' key={index} onClick={() => handleVote(index)} disabled={votingEnded}>
              {name} 
            </button>
          ))}
          <br />
          <button onClick={endVoting} disabled={votingEnded} className='endBtn'>End Voting</button>
          {votingEnded && (
            <div className="voting-results">
              <h2>Voting Results:</h2>
              <p>Winner: {getWinner()}</p>
              <h3>Vote Counts:</h3>
              <ul>
                {submittedNames.map((name, index) => (
                  <li key={index}>
                    {name}: {votes[index]} votes
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={resetVoting} className='resetBtn'>Start New Vote</button>
        </div>
      ) : (
        <p>No names submitted.</p>
      )}
    </div>
  );
};

export default Voting;
