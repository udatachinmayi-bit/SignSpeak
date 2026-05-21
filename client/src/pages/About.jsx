import Navbar from "../components/Navbar";
import {
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
  FaHandPaper,
  FaBullseye,
  FaCamera,
} from "react-icons/fa";

import chinmayiImg from "../assets/chinmayi.jpg";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white px-6 py-10">
        {/* Animated Background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-2xl rounded-full shadow-2xl p-10 border border-white/20">
                  <FaHandPaper className="text-8xl text-cyan-400" />
                </div>
              </div>

              <div>
                <h1 className="text-6xl font-extrabold">
                  About{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    SignSpeak
                  </span>
                </h1>

                <div className="w-28 h-1 bg-cyan-400 rounded-full my-6"></div>

                <p className="text-xl text-gray-300 leading-9">
                  SignSpeak is a smart communication platform
                  designed to help non-verbal individuals
                  communicate using real-time hand gesture
                  recognition.
                </p>

                <p className="text-xl text-gray-300 leading-9 mt-6">
                  It transforms gestures into text and voice,
                  helping bridge communication barriers.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 hover:scale-105 transition">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-blue-500/20 p-4 rounded-full">
                    <FaCamera className="text-3xl text-cyan-400" />
                  </div>

                  <h2 className="text-3xl font-bold text-cyan-400">
                    Features
                  </h2>
                </div>

                <ul className="space-y-6 text-lg text-gray-300">
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-cyan-400" />
                    Real-time gesture recognition
                  </li>

                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-cyan-400" />
                    Text translation
                  </li>

                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-cyan-400" />
                    Voice output
                  </li>

                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-cyan-400" />
                    Webcam-based interaction
                  </li>

                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-cyan-400" />
                    User-friendly interface
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 hover:scale-105 transition">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-green-500/20 p-4 rounded-full">
                    <FaHandPaper className="text-3xl text-green-400" />
                  </div>

                  <h2 className="text-3xl font-bold text-green-400">
                    Supported Gestures
                  </h2>
                </div>

                <ul className="space-y-5 text-2xl font-semibold text-gray-300">
                  <li>✋ HELLO</li>
                  <li>👍 YES</li>
                  <li>👎 NO</li>
                  <li>☝️ HELP</li>
                  <li>✊ STOP</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-500/20 p-4 rounded-full">
                  <FaBullseye className="text-3xl text-purple-400" />
                </div>

                <h2 className="text-4xl font-bold text-purple-400">
                  Our Mission
                </h2>
              </div>

              <p className="text-xl text-gray-300 leading-9">
                To empower non-verbal individuals by providing
                accessible technology that converts gestures into
                understandable communication.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10">
              <p className="text-center text-cyan-400 font-semibold uppercase tracking-wider">
                Developer
              </p>

              <div className="grid md:grid-cols-2 gap-10 items-center mt-8">
                <div className="flex justify-center">
                  <img
                    src={chinmayiImg}
                    alt="Chinmayi Udata"
                    className="w-80 h-80 rounded-full object-cover shadow-2xl border-8 border-cyan-400/20"
                  />
                </div>

                <div>
                  <h2 className="text-5xl font-bold">
                    Chinmayi Udata
                  </h2>

                  <p className="text-xl text-gray-300 mt-6 leading-8">
                    A passionate developer building meaningful
                    technology to improve communication and
                    accessibility for everyone.
                  </p>

                  <div className="flex gap-6 mt-8 flex-wrap">
                    <a
                      href="https://github.com/udatachinmayi-bit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-black px-8 py-4 rounded-2xl shadow-xl hover:scale-110 transition"
                    >
                      <FaGithub className="text-3xl" />
                      <span className="text-xl font-semibold">
                        GitHub
                      </span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/chinmayi-udata-61aa7237a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-blue-600 px-8 py-4 rounded-2xl shadow-xl hover:scale-110 transition"
                    >
                      <FaLinkedin className="text-3xl" />
                      <span className="text-xl font-semibold">
                        LinkedIn
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-14">
              <p className="text-2xl font-semibold text-gray-300">
                💙 Building connections. Breaking barriers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
