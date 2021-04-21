/**
 * This file defines a thumbs-down gesture (👎).
 *
 * Basically identical to `thumbs_up` but with the `FingerDirection` set to `VerticalDown`.
 */
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

const thumbsDown = new GestureDescription("thumbs_down");

thumbsDown.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
thumbsDown.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
thumbsDown.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.25);
thumbsDown.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.25);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsDown.addCurl(finger, FingerCurl.FullCurl, 1.0);
  thumbsDown.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  thumbsDown.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

export default thumbsDown;
