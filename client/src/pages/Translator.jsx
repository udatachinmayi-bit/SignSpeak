import Navbar from "../components/Navbar";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";
import {
  FaCamera,
  FaMicrophoneAlt,
  FaHandPaper,
  FaThumbsUp,
  FaThumbsDown,
  FaHandPointUp,
  FaStopCircle,
  FaCircle,
  FaRobot,
} from "react-icons/fa";
import { speakText } from "../utils/speechUtils";

const Translator = () => {
  const webcamRef = useRef(null);
  const recognizerRef = useRef(null);

  const [gesture, setGesture] = useState("Loading...");
  const [status, setStatus] = useState("Initializing AI...");
  const [confidence, setConfidence] = useState(0);

  const lastSpokenRef = useRef("");
  const candidateGestureRef = useRef("");
  const gestureCountRef = useRef(0);

  const mapGesture = (name) => {
    switch (name) {
      case "Open_Palm":
        return "HELLO";
      case "Closed_Fist":
        return "STOP";
      case "Pointing_Up":
        return "HELP";
      case "Thumb_Up":
        return "YES";
      case "Thumb_Down":
        return "NO";
      default:
        return "";
    }
  };

  useEffect(() => {
    const initRecognizer = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        recognizerRef.current =
          await GestureRecognizer.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
              },
              runningMode: "VIDEO",
              numHands: 1,
            }
          );

        setGesture("Show Gesture");
        setStatus("AI Ready");
      } catch (error) {
        console.error(error);
        setStatus("Initialization Failed");
      }
    };

    initRecognizer();
  }, []);

  useEffect(() => {
    let animationFrameId;

    const detect = async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        recognizerRef.current
      ) {
        const video = webcamRef.current.video;

        if (video.readyState === 4) {
          const results =
            recognizerRef.current.recognizeForVideo(
              video,
              performance.now()
            );

          if (
            results.gestures &&
            results.gestures.length > 0
          ) {
            const topGesture = results.gestures[0][0];
            setConfidence(Math.round(topGesture.score * 100));

            if (topGesture.score > 0.7) {
              const detected = mapGesture(
                topGesture.categoryName
              );

              if (detected) {
                if (
                  candidateGestureRef.current === detected
                ) {
                  gestureCountRef.current += 1;
                } else {
                  candidateGestureRef.current =
                    detected;
                  gestureCountRef.current = 1;
                }

                if (gestureCountRef.current >= 8) {
                  setGesture(detected);
                  setStatus("Gesture Recognized");

                  if (
                    lastSpokenRef.current !== detected
                  ) {
                    speakText(detected);
                    lastSpokenRef.current = detected;
                  }
                }
              }
            }
          } else {
            setGesture("Show Gesture");
            setStatus("Waiting for hand...");
            setConfidence(0);
            candidateGestureRef.current = "";
            gestureCountRef.current = 0;
            lastSpokenRef.current = "";
          }
        }
      }

      animationFrameId =
        requestAnimationFrame(detect);
    };

    detect();

    return () =>
      cancelAnimationFrame(animationFrameId);
  }, []);

  const gestureCards = [
    {
      icon: <FaHandPaper />,
      name: "HELLO",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaThumbsUp />,
      name: "YES",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaThumbsDown />,
      name: "NO",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <FaHandPointUp />,
      name: "HELP",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <FaStopCircle />,
      name: "STOP",
      color: "from-gray-600 to-gray-800",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative z-10 px-6 py-10 max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
              <FaRobot className="text-cyan-400 text-xl" />
              <span className="font-semibold tracking-wide">
                AI POWERED GESTURE TRANSLATION
              </span>
            </div>

            <h1 className="text-7xl font-extrabold mt-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SignSpeak Translator
            </h1>

            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-9">
              Premium real-time communication platform for
              non-verbal individuals powered by AI gesture
              recognition and voice synthesis.
            </p>
          </div>

          {/* Main layout */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Camera */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <FaCamera className="text-3xl text-cyan-400" />
                  <h2 className="text-3xl font-bold">
                    Live Camera
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <FaCircle className="text-red-500 animate-pulse text-sm" />
                  <span className="text-sm font-semibold">
                    LIVE
                  </span>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  mirrored={true}
                  className="w-full h-[520px] object-cover"
                />
              </div>
            </div>

            {/* Output */}
            <div className="flex flex-col gap-8">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <FaMicrophoneAlt className="text-3xl text-green-400" />
                  <h2 className="text-3xl font-bold">
                    AI Output
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-10 text-center border border-white/10">
                  <h3 className="text-6xl font-extrabold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                    {gesture}
                  </h3>

                  <p className="text-gray-300 mt-6 text-lg">
                    {status}
                  </p>

                  <div className="mt-8">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Confidence</span>
                      <span>{confidence}%</span>
                    </div>

                    <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${confidence}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gesture cards */}
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold mb-8">
                  Supported Gestures
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {gestureCards.map((item, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${item.color} rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300 cursor-pointer`}
                    >
                      <div className="text-4xl mb-4">
                        {item.icon}
                      </div>

                      <h3 className="text-xl font-bold">
                        {item.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl font-semibold text-gray-300">
              💙 Giving every gesture a powerful voice
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translator;
