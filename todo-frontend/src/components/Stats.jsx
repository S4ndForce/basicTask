import { useEffect, useState } from "react";
import { fetchStats } from "../services/todoService";

function Stats({ selectedProjectId, refreshKey }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const res = await fetchStats(selectedProjectId);
      setStats(res.data);
    };

    loadStats();
  }, [selectedProjectId, refreshKey]);

  if (!stats) return null;

  const completionRate =
    stats.totalTodos === 0
      ? 0
      : Math.round(
          (stats.completedCount / stats.totalTodos) * 100
        );

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Task Summary
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center">
        <StatCard label="Total" value={stats.totalTodos} />
        <StatCard label="Active" value={stats.activeCount} />
        <StatCard label="Completed" value={stats.completedCount} />
      </div>

      <div className="text-sm text-gray-600">
        Completion rate:{" "}
        <span className="font-medium">{completionRate}%</span>
      </div>

      <Breakdown
        title="By Priority"
        data={stats.countByPriority}
      />

      <Breakdown
        title="By Category"
        data={stats.countByCategory}
      />
    </div>
  );
}

/* ---------- Helper components ---------- */

function StatCard({ label, value }) {
  return (
    <div className="bg-gray-50 border rounded p-3">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function Breakdown({ title, data }) {
  if (!data) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        {title}
      </h3>

      <div className="space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between text-sm text-gray-600"
          >
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
