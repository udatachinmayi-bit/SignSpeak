import Navbar from "../components/Navbar";

const gestures = [
  {
    emoji: "✋",
    title: "HELLO",
    description: "Open palm gesture",
  },
  {
    emoji: "👍",
    title: "YES",
    description: "Thumb up gesture",
  },
  {
    emoji: "👎",
    title: "NO",
    description: "Thumb down gesture",
  },
  {
    emoji: "☝️",
    title: "HELP",
    description: "Point one finger up",
  },
  {
    emoji: "✊",
    title: "STOP",
    description: "Closed fist gesture",
  },
];

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">
            SignSpeak
          </h1>

          <p className="text-xl text-gray-600 mt-4">
            Helping non-verbal people communicate using gestures
          </p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-10">
          Supported Gestures
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gestures.map((gesture, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition"
            >
              <div className="text-6xl mb-4">
                {gesture.emoji}
              </div>

              <h3 className="text-2xl font-bold text-blue-600">
                {gesture.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {gesture.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;