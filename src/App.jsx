import React, { useState } from "react";

const domains = [
  {
    name: "Receptive Language",
    items: [
      "Follows 1-step instructions",
      "Identifies common objects",
      "Points to named body parts",
    ],
  },
  {
    name: "Expressive Language",
    items: [
      "Uses 2-word phrases",
      "Names familiar people",
      "Asks basic questions",
    ],
  },
  {
    name: "Motor Skills",
    items: [
      "Grasps small objects",
      "Draws straight lines",
      "Jumps with both feet",
    ],
  },
  {
    name: "Social Interaction",
    items: [
      "Responds to name",
      "Engages in turn-taking",
      "Initiates play with peers",
    ],
  },
  {
    name: "Daily Living Skills",
    items: [
      "Feeds self with spoon",
      "Puts on shoes",
      "Brushes teeth with help",
    ],
  },
];

export default function SkillProgressTracker() {
  const [scores, setScores] = useState({});
  const [results, setResults] = useState(null);

  const handleScoreChange = (domain, itemIndex, value) => {
    setScores((prev) => ({
      ...prev,
      [`${domain}-${itemIndex}`]: parseInt(value),
    }));
  };

  const calculateResults = () => {
    let totalScore = 0;
    let maxScore = 0;
    const domainResults = {};

    domains.forEach((domain) => {
      let domainScore = 0;
      domain.items.forEach((_, i) => {
        const score = scores[`${domain.name}-${i}`] || 0;
        domainScore += score;
        totalScore += score;
        maxScore += 4;
      });
      domainResults[domain.name] = {
        score: domainScore,
        percent: Math.round((domainScore / (domain.items.length * 4)) * 100),
      };
    });

    setResults({ totalScore, maxScore, domainResults });
  };

  const reset = () => {
    setScores({});
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg font-sans mt-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Skill Progress Tracker
      </h1>

      {domains.map((domain, dIndex) => (
        <div
          key={dIndex}
          className="mb-8 border border-gray-200 p-5 rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            {domain.name}
          </h2>
          {domain.items.map((item, i) => (
            <div key={i} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {item}
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={scores[`${domain.name}-${i}`] || ""}
                onChange={(e) =>
                  handleScoreChange(domain.name, i, e.target.value)
                }
              >
                <option value="">Select score (0–4)</option>
                {[0, 1, 2, 3, 4].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        <button
          onClick={calculateResults}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Calculate Results
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Reset All
        </button>
      </div>

      {results && (
        <div className="mt-10 bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            Assessment Summary
          </h2>
          <p className="mb-2 font-semibold text-gray-700">
            Total Score: {results.totalScore} / {results.maxScore}
          </p>
          <p className="mb-4 font-semibold text-gray-700">
            Progress:{" "}
            {Math.round((results.totalScore / results.maxScore) * 100)}%
          </p>
          <div className="space-y-1 text-sm">
            {Object.entries(results.domainResults).map(([name, data], i) => (
              <p key={i}>
                <strong>{name}:</strong> {data.score} points ({data.percent}%)
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
