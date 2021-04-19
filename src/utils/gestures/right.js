/**
 * This file defines a pointing-to-the-right gesture (👉).
 */
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

const MoveRightGesture = new GestureDescription("move_right");

MoveRightGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
MoveRightGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
MoveRightGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1);
MoveRightGesture.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  0.5
);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  MoveRightGesture.addCurl(finger, FingerCurl.FullCurl, 1);
  MoveRightGesture.addCurl(finger, FingerCurl.HalfCurl, 1);
  MoveRightGesture.addDirection(finger, FingerDirection.VerticalDown, 1);
}

// Give additional weight to thumb
MoveRightGesture.setWeight(Finger.Thumb, 2);

export { MoveRightGesture };
