import { useEffect, useState } from "react";
import { Chore } from "../types/chore";
import { Link } from "react-router-dom";

export default function Chores() {
  const [chores, setChores] = useState<Chore[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "Adam",
  });

  useEffect(() => {
    fetch("http://localhost:4000/chores")
      .then((res) => res.json())
      .then((data) => {
        setChores(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    console.log("Submitting form:", form);

    const res = await fetch("http://localhost:4000/chores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, completed: false }),
    });

    if (res.ok) {
      const newChore = await res.json();
      setChores((prev) => [newChore, ...prev]);
      setForm({ title: "", description: "", assignedTo: "Adam" });
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-indigo-500 hover:text-indigo-700 text-sm font-medium"
          >
            ← Back to Dashboard
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
          >
            + New Chore
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          🧼 Chores Tracker
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading chores...</div>
        ) : chores.length === 0 ? (
          <div className="text-center text-gray-400 italic">
            No chores yet — you're all caught up! 🎉
          </div>
        ) : (
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
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-indigo-600">
              Add New Chore
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Chore title"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description (optional)"
                className="w-full p-2 border rounded"
              />
              <select
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Adam">Adam</option>
                <option value="Ariel">Ariel</option>
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
