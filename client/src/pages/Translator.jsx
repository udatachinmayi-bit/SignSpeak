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
} from "react-icons/fa";
import { speakText } from "../utils/speechUtils";

const Translator = () => {
  const webcamRef = useRef(null);
  const recognizerRef = useRef(null);

  const [gesture, setGesture] = useState("Loading...");
  const [status, setStatus] = useState("Initializing...");
  const [confidence, setConfidence] = useState(0);

  const lastSpokenRef = useRef("");
  const candidateGestureRef = useRef("");
  const gestureCountRef = useRef(0);

  const mapGesture = (name) => {
    const gestureMap = {
      Open_Palm: "HELLO",
      Closed_Fist: "STOP",
      Pointing_Up: "HELP",
      Thumb_Up: "YES",
      Thumb_Down: "NO",
      Victory: "THANK YOU",
      ILoveYou: "I LOVE YOU",
    };

    return gestureMap[name] || "";
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
        setStatus("Ready");
      } catch (error) {
        console.error(error);
        setStatus("Initialization Failed");
      }
    };

    initRecognizer();
  }, []);

  useEffect(() => {
    let animationFrameId;

    const detectGesture = async () => {
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
            results.gestures.length > 0 &&
            results.gestures[0].length > 0
          ) {
            const topGesture = results.gestures[0][0];
            const detected = mapGesture(
              topGesture.categoryName
            );

            setConfidence(
              Math.round(topGesture.score * 100)
            );

            if (detected && topGesture.score > 0.65) {
              if (
                candidateGestureRef.current === detected
              ) {
                gestureCountRef.current += 1;
              } else {
                candidateGestureRef.current = detected;
                gestureCountRef.current = 1;
              }

              if (gestureCountRef.current >= 6) {
                setGesture(detected);
                setStatus("Recognized");

                if (
                  lastSpokenRef.current !== detected
                ) {
                  speakText(detected);
                  lastSpokenRef.current = detected;
                }
              }
            }
          } else {
            setGesture("Show Gesture");
            setStatus("Waiting...");
            setConfidence(0);
            candidateGestureRef.current = "";
            gestureCountRef.current = 0;
            lastSpokenRef.current = "";
          }
        }
      }

      animationFrameId =
        requestAnimationFrame(detectGesture);
    };

    detectGesture();

    return () =>
      cancelAnimationFrame(animationFrameId);
  }, []);

  const gestures = [
    {
      icon: <FaHandPaper />,
      label: "HELLO",
    },
    {
      icon: <FaThumbsUp />,
      label: "YES",
    },
    {
      icon: <FaThumbsDown />,
      label: "NO",
    },
    {
      icon: <FaHandPointUp />,
      label: "HELP",
    },
    {
      icon: <FaStopCircle />,
      label: "STOP",
    },
    {
      icon: "✌️",
      label: "THANK YOU",
    },
    {
      icon: "🤟",
      label: "I LOVE YOU",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white px-6 py-10">
        {/* Background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              SignSpeak Translator
            </h1>

            <p className="text-gray-300 mt-4 text-xl">
              AI-powered real-time gesture translation
            </p>
          </div>

          {/* Main */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Camera */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <FaCamera className="text-3xl text-cyan-400" />
                <h2 className="text-3xl font-bold">
                  Live Camera
                </h2>
              </div>

              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored={true}
                className="w-full rounded-3xl border border-white/10"
              />
            </div>

            {/* Right */}
            <div className="flex flex-col gap-8">
              {/* Output */}
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <FaMicrophoneAlt className="text-3xl text-green-400" />
                  <h2 className="text-3xl font-bold">
                    Translation Output
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-10 text-center border border-white/10">
                  <h3 className="text-5xl font-bold">
                    {gesture}
                  </h3>

                  <p className="text-gray-300 mt-4">
                    {status}
                  </p>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Confidence</span>
                      <span>{confidence}%</span>
                    </div>

                    <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
                        style={{
                          width: `${confidence}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Supported Gestures */}
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold">
                      Supported Gestures
                    </h2>
                    <p className="text-gray-300 mt-2">
                      AI-recognized communication gestures
                    </p>
                  </div>

                  <div className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-semibold">
                    7 Gestures
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {gestures.map((g, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 hover:scale-105 hover:border-cyan-400/40 transition-all duration-300 shadow-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

                      <div className="relative z-10 text-center">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition">
                          {g.icon}
                        </div>

                        <h3 className="text-lg font-bold">
                          {g.label}
                        </h3>

                        <div className="mt-3 h-1 w-12 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 p-5 text-center">
                  <p className="text-gray-300">
                    Show your hand clearly in front of the camera
                    for better recognition accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-14">
            <p className="text-2xl font-semibold text-gray-300">
              💙 Giving gestures a voice
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translator;
