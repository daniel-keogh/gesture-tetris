/**
 * This file defines gestures for an upwards-pointing index finger (☝️).
 */
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose';

const pointingUpwards = new GestureDescription('pointing_upwards');

// Thumb
pointingUpwards.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
pointingUpwards.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);
pointingUpwards.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
pointingUpwards.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
pointingUpwards.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0
);

// Index
pointingUpwards.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
pointingUpwards.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
pointingUpwards.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpLeft,
  0.75
);
pointingUpwards.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  0.75
);

// Remaining fingers point downwards
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  pointingUpwards.addCurl(finger, FingerCurl.FullCurl, 1.0);
  pointingUpwards.addDirection(finger, FingerDirection.VerticalDown, 0.75);
  pointingUpwards.addDirection(finger, FingerDirection.VerticalUp, 0.2);
  pointingUpwards.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  pointingUpwards.addDirection(finger, FingerDirection.HorizontalLeft, 0.2);
  pointingUpwards.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  pointingUpwards.addDirection(finger, FingerDirection.HorizontalRight, 0.2);
}

// Assign additional weight to the index finger
pointingUpwards.setWeight(Finger.Index, 2.0);

export default pointingUpwards;
