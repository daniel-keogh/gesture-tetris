/**
 * This file defines a pointing-to-the-right gesture (👉).
 */

import {
    Finger,
    FingerCurl,
    FingerDirection,
    GestureDescription,
} from 'fingerpose';

const MoveRightGesture = new GestureDescription('move_right');

// Thumb
MoveRightGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
MoveRightGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);

// Index
MoveRightGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
MoveRightGesture.addDirection(
    Finger.Index,
    FingerDirection.HorizontalRight,
    0.25
);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    MoveRightGesture.addCurl(finger, FingerCurl.FullCurl, 0.75);
    MoveRightGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}

export { MoveRightGesture };
