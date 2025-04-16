import { useState } from "react";
import { Chore } from "../types/chore";
import { Link } from "react-router-dom";

const mockChores: Chore[] = [
  {
    id: "1",
    title: "Do the dishes",
    assignedTo: "me",
    completed: false,
  },
  {
    id: "2",
    title: "Vacuum living room",
    assignedTo: "partner",
    completed: true,
  },
];

export default function Chores() {
  const [chores, setChores] = useState<Chore[]>(mockChores);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Link
        to="/"
        className="inline-block mb-6 text-indigo-600 hover:text-indigo-800 font-medium"
      >
        ← Back to Dashboard
      </Link>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          🧼 Chores Tracker
        </h1>

        <ul className="space-y-4">
          {chores.map((chore) => (
            <li
              key={chore.id}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                chore.completed
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  {chore.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Assigned to:{" "}
                  <span className="capitalize">
                    {chore.assignedTo ?? "Unassigned"}
                  </span>
                </p>
              </div>

              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  chore.completed
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {chore.completed ? "Done" : "Pending"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
