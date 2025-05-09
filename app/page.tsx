import Image from "next/image";
import Weather from "./components/Weather";
import Todo from "./components/Todo";
import Shopping from "./components/Shopping";
import Notes from "./components/Notes";
import Calendar from "./components/Calendar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weather Tile */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6">
            <Weather />
          </div>

          {/* Calendar Tile */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6 md:col-span-2 lg:col-span-2">
            <Calendar />
          </div>

          {/* Todo Tile */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6">
            <Todo />
          </div>

          {/* Notes Tile */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-md p-6">
            <Notes />
          </div>

          {/* Shopping Tile */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-md p-6">
            <Shopping />
          </div>
        </div>
      </div>
    </div>
  );
}
