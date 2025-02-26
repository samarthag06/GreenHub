import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getManufacturer } from "../api/manufacturers";

interface Manufacturer {
  _id: string;
  name: string;
  total_products_sold: number;
  green_products_sold: number;
}

const MLeaderboard: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Redirect if user is not logged in
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch manufacturers
  const { data: manufacturers = [], isLoading, error } = useQuery<Manufacturer[]>({
    queryKey: ["manufacturers"],
    queryFn: getManufacturer,
  });

  // Show loading state
  if (isLoading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">Error loading leaderboard</div>;

  // Calculate green ratio and rank manufacturers
  const rankedManufacturers = manufacturers
    .map((manufacturer) => ({
      ...manufacturer,
      greenRatio:
        manufacturer.total_products_sold > 0
          ? manufacturer.green_products_sold / manufacturer.total_products_sold
          : 0, // Prevent division by zero
    }))
    .sort((a, b) => b.greenRatio - a.greenRatio);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manufacturer Leaderboard</h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold">Rank</th>
              <th className="px-6 py-3 text-sm font-semibold">Manufacturer</th>
              <th className="px-6 py-3 text-sm font-semibold">Total Products Sold</th>
              <th className="px-6 py-3 text-sm font-semibold">Green Products Sold</th>
              <th className="px-6 py-3 text-sm font-semibold">Green Ratio</th>
            </tr>
          </thead>
          <tbody>
            {rankedManufacturers.length > 0 ? (
              rankedManufacturers.map((manufacturer, index) => (
                <tr key={manufacturer._id} className="border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{manufacturer.name}</td>
                  <td className="px-6 py-4">{manufacturer.total_products_sold}</td>
                  <td className="px-6 py-4">{manufacturer.green_products_sold}</td>
                  <td className="px-6 py-4">
                    {manufacturer.greenRatio.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No manufacturers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MLeaderboard;
