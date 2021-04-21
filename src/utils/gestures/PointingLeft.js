/**
 * This file defines a pointing-to-the-left gesture (👈).
 */
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose';

const pointingLeft = new GestureDescription('pointing_left');

// Thumb
pointingLeft.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.2);
pointingLeft.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
pointingLeft.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// Index
pointingLeft.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
pointingLeft.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);

// Remaining fingers
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  pointingLeft.addCurl(finger, FingerCurl.FullCurl, 1.0);
  pointingLeft.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.5);
  pointingLeft.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
}

// Assign additional weight to the index finger
pointingLeft.setWeight(Finger.Index, 2.0);

export default pointingLeft;
