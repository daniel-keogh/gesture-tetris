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

MoveLeftGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
MoveLeftGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
MoveLeftGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1);
MoveLeftGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.5);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  MoveLeftGesture.addCurl(finger, FingerCurl.FullCurl, 1);
  MoveLeftGesture.addCurl(finger, FingerCurl.HalfCurl, 1);
  MoveLeftGesture.addDirection(finger, FingerDirection.VerticalDown, 1);
}

// Give additional weight to thumb
MoveLeftGesture.setWeight(Finger.Thumb, 2);

export { MoveLeftGesture };
