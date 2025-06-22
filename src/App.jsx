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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Skill Progress Tracker (Demo)</h1>
      {domains.map((domain, dIndex) => (
        <div key={dIndex} className="mb-6 border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">{domain.name}</h2>
          {domain.items.map((item, i) => (
            <div key={i} className="mb-2">
              <label className="block font-medium mb-1">
                {item}
              </label>
              <select
                className="border p-2 rounded w-full"
                value={scores[`${domain.name}-${i}`] || ""}
                onChange={(e) => handleScoreChange(domain.name, i, e.target.value)}
              >
                <option value="">Select Score (0–4)</option>
                {[0, 1, 2, 3, 4].map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}

      <div className="flex gap-4 justify-center">
        <button onClick={calculateResults} className="bg-blue-600 text-white px-4 py-2 rounded">
          Calculate Results
        </button>
        <button onClick={reset} className="bg-gray-500 text-white px-4 py-2 rounded">
          Reset All
        </button>
      </div>

      {results && (
        <div className="mt-8 bg-green-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Assessment Summary</h2>
          <p className="mb-2">Total Score: {results.totalScore} / {results.maxScore}</p>
          <p className="mb-4">Progress: {Math.round((results.totalScore / results.maxScore) * 100)}%</p>
          <div>
            {Object.entries(results.domainResults).map(([name, data], i) => (
              <p key={i}><strong>{name}:</strong> {data.score} points ({data.percent}%)</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
