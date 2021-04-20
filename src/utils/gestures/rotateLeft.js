/**
 * This file defines gestures for left rotation.
 */
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

const RotateLeftGesture = new GestureDescription("rotate_left");

// Thumb
RotateLeftGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
RotateLeftGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);

// Index
RotateLeftGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
RotateLeftGesture.addDirection(
  Finger.Index,
  FingerDirection.HorizontalLeft,
  0.25
);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  RotateLeftGesture.addCurl(finger, FingerCurl.FullCurl, 0.75);
  RotateLeftGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}

export { RotateLeftGesture };
