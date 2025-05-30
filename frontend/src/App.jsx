import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        const res = await axios.get("https://matches-frontend-eight.vercel.app/leagues");
        setLeagues(res.data);
      } catch (err) {
        console.error("Error fetching leagues:", err);
      }
    }
    fetchLeagues();
  }, []);

  async function fetchMatches(leagueId) {
    try {
      const res = await axios.get(
        `https://matches-frontend-eight.vercel.app/matches?leagueId=${leagueId}`
      );
      console.log(res);
      setMatches(res.data);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  }

  const handleLeagueChange = (e) => {
    const leagueId = e.target.value;
    setSelectedLeague(leagueId);
    if (leagueId) {
      fetchMatches(leagueId);
    } else {
      setMatches([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-800 shadow-md p-4">
        <div className="container mx-auto px-4 py-4 text-center">
          <h1 className="text-white text-3xl font-bold">
            Upcoming Matches App Assignment
          </h1>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 md:w-3/4 w-full ">
        <div className="flex flex-col items-center mb-8">
          <label
            htmlFor="league-select"
            className="mb-2 text-lg font-medium text-gray-700"
          >
            Select a League:
          </label>
          <select
            id="league-select"
            value={selectedLeague}
            onChange={handleLeagueChange}
            className="w-full max-w-xs p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose a league --</option>
            {leagues.map((league) => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
          {matches.length === 0 ? (
            <p className="text-gray-600">
              No matches available for the selected league.
            </p>
          ) : (
            <ul className="space-y-4">
              {matches.map((match) => (
                <li
                  key={match.id}
                  className="bg-white rounded-lg shadow p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-blue-700 px-4">
                      {match.homeTeam}
                    </span>
                    <span className="text-gray-500 font-semibold">vs</span>
                    <span className="text-lg font-bold text-blue-700 px-4">
                      {match.awayTeam}
                    </span>
                  </div>
                  <div className="text-gray-600 flex justify-center">
                    Date: {new Date(match.date).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
