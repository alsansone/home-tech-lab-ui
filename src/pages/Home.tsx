import { Link } from "react-router-dom";

const projects = [
  {
    name: "Chores App",
    description: "Track household chores",
    path: "/chores",
    emoji: "🧼",
  },
  // Add more projects here
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
          🧪 Home Tech Lab
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.name}
              to={project.path}
              className="bg-white hover:shadow-xl transition-all border border-gray-200 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
                  {project.emoji} {project.name}
                </h2>
                <p className="text-gray-600">{project.description}</p>
              </div>
              <span className="mt-4 text-sm text-indigo-500 font-medium">
                View →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}