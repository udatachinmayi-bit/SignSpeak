import Navbar from "../components/Navbar";

const gestures = [
  { emoji: "✋", title: "HELLO" },
  { emoji: "👍", title: "YES" },
  { emoji: "👎", title: "NO" },
  { emoji: "☝️", title: "HELP" },
  { emoji: "✊", title: "STOP" },
  { emoji: "✌️", title: "THANK YOU" },
  { emoji: "🤟", title: "I LOVE YOU" },
];

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white px-6 py-12">
        {/* Animated Background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-6xl font-extrabold">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SignSpeak
              </span>
            </h1>

            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-9">
              Empowering communication for non-verbal individuals
              through real-time AI-powered hand gesture recognition.
            </p>

            <h2 className="text-4xl font-bold mt-20 mb-12">
              Supported Gestures
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {gestures.map((gesture, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 hover:scale-105 transition duration-300"
                >
                  <div className="text-7xl mb-4">
                    {gesture.emoji}
                  </div>

                  <h3 className="text-2xl font-bold">
                    {gesture.title}
                  </h3>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <p className="text-2xl font-semibold text-gray-300">
                💙 Breaking communication barriers with technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
