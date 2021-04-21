/**
 * This file defines a pointing-to-the-right gesture (👉).
 */
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

const pointingRight = new GestureDescription("pointing_right");

// Thumb
pointingRight.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.2);
pointingRight.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
pointingRight.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// Index
pointingRight.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
pointingRight.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// Remaining fingers
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  pointingRight.addCurl(finger, FingerCurl.FullCurl, 1.0);
  pointingRight.addDirection(finger, FingerDirection.DiagonalUpRight, 0.5);
  pointingRight.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

// Assign additional weight to the index finger
pointingRight.setWeight(Finger.Index, 2.0);

export default pointingRight;
