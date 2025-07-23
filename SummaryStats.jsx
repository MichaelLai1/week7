import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function SummaryStats({ data }) {
  const total = data.length;
  const avgTime =
    total > 0
      ? Math.round(
          data.reduce((sum, r) => sum + r.readyInMinutes, 0) / total
        )
      : 0;

  // --- Prepare data for pie chart (Cuisine breakdown) ---
  const cuisineCounts = {};
  data.forEach((r) => {
    r.cuisines.forEach((c) => {
      cuisineCounts[c] = (cuisineCounts[c] || 0) + 1;
    });
  });

  const cuisineData = Object.entries(cuisineCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // --- Prepare data for bar chart (Top 10 recipes by ready time) ---
  const barData = [...data]
    .sort((a, b) => b.readyInMinutes - a.readyInMinutes)
    .slice(0, 10)
    .map((r) => ({
      name: r.title.length > 20 ? r.title.slice(0, 20) + "..." : r.title,
      time: r.readyInMinutes,
    }));

  return (
    <div className="summary">
      <p>Total Recipes: {total}</p>
      <p>Average Ready Time: {avgTime} mins</p>

      <h4>📊 Cuisine Breakdown</h4>
      <PieChart width={300} height={300}>
        <Pie
          data={cuisineData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {cuisineData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`hsl(${index * 40}, 70%, 50%)`}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h4>⏱ Top 10 Recipes by Ready Time</h4>
      <BarChart width={600} height={300} data={barData}>
        <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="time" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default SummaryStats;
