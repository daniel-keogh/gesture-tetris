/**
 * This file defines gestures for an upwards-pointing index finger (☝️).
 */
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

const pointingUpwards = new GestureDescription("pointing_upwards");

// Index
pointingUpwards.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
pointingUpwards.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

// Remaining fingers are at full curl
for (let finger of [Finger.Thumb, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  pointingUpwards.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

// Assign additional weight to the index & middle fingers
pointingUpwards.setWeight(Finger.Index, 2.0);
pointingUpwards.setWeight(Finger.Middle, 2.0);

export default pointingUpwards;
