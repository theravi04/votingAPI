import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [voterId, setVoterId] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [score, setScore] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/leaderboard`);
      setLeaderboard(response.data);
      console.log(response.data);
      
    } catch (error) {
      setMessage({ text: "Failed to fetch leaderboard", type: "error" });
    }
  };

  const submitVote = async () => {
    if (!voterId || !participantId || !score) {
      setMessage({ text: "Please enter all fields", type: "error" });
      return;
    }

    if (parseInt(score) < 1 || parseInt(score) > 100) {
      setMessage({ text: "Score must be between 1 and 100", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/vote`, { voterId, participantId, score: parseInt(score) });
      setMessage({ text: "Vote submitted successfully!", type: "success" });
      setVoterId("");
      setParticipantId("");
      setScore("");
      fetchLeaderboard();
    } catch (error) {
      setMessage({ text: "Failed to submit vote", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div>
        <header>
          <h1>Competition Leaderboard</h1>
          <p>Vote for your favorite participants and track their standings</p>
        </header>

        <div>
          {/* Leaderboard Section */}
          <div>
            <div>
              <h2>Current Rankings</h2>
            </div>
            
            <div>
              {leaderboard.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Participant</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map(({ rank, participant, score }) => (
                      <tr key={participant}>
                        <td>
                          <div>
                            {rank}
                          </div>
                        </td>
                        <td>{participant}</td>
                        <td>{score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No rankings available yet</div>
              )}
            </div>
          </div>

          {/* Voting Form Section */}
          <div>
            <div>
              <h2>Submit Your Vote</h2>
            </div>
            
            <div>
              {message.text && (
                <div>
                  {message.text}
                </div>
              )}
              
              <div>
                <div>
                  <label htmlFor="voterId">Voter ID</label>
                  <input
                    id="voterId"
                    type="text"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                    placeholder="Enter your ID"
                  />
                </div>
                
                <div>
                  <label htmlFor="participantId">Participant ID</label>
                  <input
                    id="participantId"
                    type="text"
                    value={participantId}
                    onChange={(e) => setParticipantId(e.target.value)}
                    placeholder="Participant to vote for"
                  />
                </div>
                
                <div>
                  <label htmlFor="score">Score (1-100)</label>
                  <input
                    id="score"
                    type="number"
                    min="1"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Score between 1-100"
                  />
                </div>
                
                <button
                  onClick={submitVote}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Vote"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;