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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="flex justify-center">
              <div className="bg-white rounded-full shadow-2xl p-10">
                <FaHandPaper className="text-8xl text-blue-500" />
              </div>
            </div>

            <div>
              <h1 className="text-6xl font-extrabold text-gray-900">
                About{" "}
                <span className="text-blue-600">
                  SignSpeak
                </span>
              </h1>

              <div className="w-28 h-1 bg-blue-500 rounded-full my-6"></div>

              <p className="text-xl text-gray-700 leading-9">
                SignSpeak is a smart communication platform
                designed to help non-verbal individuals
                communicate using real-time hand gesture
                recognition.
              </p>

              <p className="text-xl text-gray-700 leading-9 mt-6">
                It transforms gestures into text and voice,
                helping bridge communication barriers.
              </p>
            </div>
          </div>

          {/* Features + Gestures */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div className="bg-white rounded-3xl shadow-2xl p-10 hover:scale-105 transition">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaCamera className="text-3xl text-blue-600" />
                </div>

                <h2 className="text-3xl font-bold text-blue-600">
                  Features
                </h2>
              </div>

              <ul className="space-y-6 text-lg text-gray-700">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-500" />
                  Real-time gesture recognition
                </li>

                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-500" />
                  Text translation
                </li>

                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-500" />
                  Voice output
                </li>

                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-500" />
                  Webcam-based interaction
                </li>

                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-500" />
                  User-friendly interface
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-10 hover:scale-105 transition">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-green-100 p-4 rounded-full">
                  <FaHandPaper className="text-3xl text-green-600" />
                </div>

                <h2 className="text-3xl font-bold text-green-600">
                  Supported Gestures
                </h2>
              </div>

              <ul className="space-y-5 text-2xl font-semibold text-gray-700">
                <li>✋ HELLO</li>
                <li>👍 YES</li>
                <li>👎 NO</li>
                <li>☝️ HELP</li>
                <li>✊ STOP</li>
              </ul>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl shadow-2xl p-10 mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white p-4 rounded-full shadow-lg">
                <FaBullseye className="text-3xl text-purple-600" />
              </div>

              <h2 className="text-4xl font-bold text-purple-700">
                Our Mission
              </h2>
            </div>

            <p className="text-xl text-gray-700 leading-9">
              To empower non-verbal individuals by providing
              accessible technology that converts gestures into
              understandable communication.
            </p>
          </div>

          {/* Developer */}
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <p className="text-center text-blue-500 font-semibold uppercase tracking-wider">
              Developer
            </p>

            <div className="grid md:grid-cols-2 gap-10 items-center mt-8">
              <div className="flex justify-center">
                <img
                  src={chinmayiImg}
                  alt="Chinmayi Udata"
                  className="w-80 h-80 rounded-full object-cover shadow-2xl border-8 border-blue-100"
                />
              </div>

              <div>
                <h2 className="text-5xl font-bold text-gray-900">
                  Chinmayi Udata
                </h2>

                <p className="text-xl text-gray-600 mt-6 leading-8">
                  A passionate developer dedicated to building
                  meaningful technology that improves lives and
                  makes communication accessible for everyone.
                </p>

                <div className="flex gap-6 mt-8 flex-wrap">
                  <a
                    href="https://github.com/udatachinmayi-bit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-110 transition"
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
                    className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-110 transition"
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
            <p className="text-2xl font-semibold text-gray-700">
              💙 Building connections. Breaking barriers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;