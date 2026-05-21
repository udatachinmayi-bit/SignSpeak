import Navbar from "../components/Navbar";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";
import { speakText } from "../utils/speechUtils";

const Translator = () => {
  const webcamRef = useRef(null);
  const recognizerRef = useRef(null);

  const [gesture, setGesture] = useState("Loading...");

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

      setGesture("Show a gesture");
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
            const topGesture =
              results.gestures[0][0];

            if (topGesture.score > 0.7) {
              const detected = mapGesture(
                topGesture.categoryName
              );

              if (detected) {
                if (
                  candidateGestureRef.current ===
                  detected
                ) {
                  gestureCountRef.current += 1;
                } else {
                  candidateGestureRef.current =
                    detected;
                  gestureCountRef.current = 1;
                }

                if (
                  gestureCountRef.current >= 8
                ) {
                  setGesture(detected);

                  if (
                    lastSpokenRef.current !==
                    detected
                  ) {
                    speakText(detected);
                    lastSpokenRef.current =
                      detected;
                  }
                }
              }
            }
          } else {
            setGesture("Show a gesture");
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

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
        <h1 className="text-4xl font-bold mb-8">
          Sign Language Translator
        </h1>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Webcam
            ref={webcamRef}
            audio={false}
            mirrored={true}
            className="w-[700px] h-[500px]"
          />
        </div>

        <div className="mt-8 text-3xl font-bold text-blue-600">
          {gesture}
        </div>
      </div>
    </>
  );
};

export default Translator;