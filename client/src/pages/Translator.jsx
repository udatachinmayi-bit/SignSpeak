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

      <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold">
              SignSpeak Translator
            </h1>

            <p className="text-gray-300 mt-4 text-xl">
              AI-powered real-time gesture translation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
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
                className="w-full rounded-3xl"
              />
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <FaMicrophoneAlt className="text-3xl text-green-400" />
                  <h2 className="text-3xl font-bold">
                    Output
                  </h2>
                </div>

                <h3 className="text-5xl font-bold text-center">
                  {gesture}
                </h3>

                <p className="text-center mt-4 text-gray-300">
                  {status}
                </p>

                <div className="mt-6">
                  <p className="mb-2">
                    Confidence: {confidence}%
                  </p>

                  <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 transition-all"
                      style={{
                        width: `${confidence}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-6">
                  Supported Gestures
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {gestures.map((g, index) => (
                    <div
                      key={index}
                      className="bg-white/10 rounded-2xl p-4 text-center"
                    >
                      <div className="text-4xl mb-2">
                        {g.icon}
                      </div>
                      <p>{g.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translator;
