/**
 * This file defines a pointing-to-the-left gesture (👈).
 */

import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

const MoveLeftGesture = new GestureDescription("move_left");

// Thumb
MoveLeftGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
MoveLeftGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);

// Index
MoveLeftGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
MoveLeftGesture.addDirection(
  Finger.Index,
  FingerDirection.HorizontalLeft,
  0.25
);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  MoveLeftGesture.addCurl(finger, FingerCurl.FullCurl, 0.75);
  MoveLeftGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}

export { MoveLeftGesture };
