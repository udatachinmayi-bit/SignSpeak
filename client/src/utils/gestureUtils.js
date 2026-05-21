export const detectGesture = (landmarks) => {
  if (!landmarks || landmarks.length === 0) return "";

  const hand = landmarks[0];

  const indexTip = hand[8];
  const indexPIP = hand[6];

  const middleTip = hand[12];
  const middlePIP = hand[10];

  const ringTip = hand[16];
  const ringPIP = hand[14];

  const pinkyTip = hand[20];
  const pinkyPIP = hand[18];

  const thumbTip = hand[4];
  const thumbIP = hand[3];

  const indexUp = indexTip.y < indexPIP.y - 0.03;
  const middleUp = middleTip.y < middlePIP.y - 0.03;
  const ringUp = ringTip.y < ringPIP.y - 0.03;
  const pinkyUp = pinkyTip.y < pinkyPIP.y - 0.03;

  const thumbOpen =
    Math.abs(thumbTip.x - thumbIP.x) > 0.04;

  // HELLO ✋
  if (
    thumbOpen &&
    indexUp &&
    middleUp &&
    ringUp &&
    pinkyUp
  ) {
    return "HELLO";
  }

  // YES ✌️
  if (
    indexUp &&
    middleUp &&
    !ringUp &&
    !pinkyUp
  ) {
    return "YES";
  }

  // NO 🤘
  if (
    indexUp &&
    !middleUp &&
    !ringUp &&
    pinkyUp
  ) {
    return "NO";
  }

  // HELP ☝️
  if (
    indexUp &&
    !middleUp &&
    !ringUp &&
    !pinkyUp
  ) {
    return "HELP";
  }

  // STOP ✊
  if (
    !indexUp &&
    !middleUp &&
    !ringUp &&
    !pinkyUp
  ) {
    return "STOP";
  }

  return "";
};