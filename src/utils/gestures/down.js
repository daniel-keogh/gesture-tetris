/**
 * This file defines a "move down" gesture.
 */

import {
    Finger,
    FingerCurl,
    FingerDirection,
    GestureDescription,
} from 'fingerpose';

const MoveDownGesture = new GestureDescription('move_down');

// Thumb
MoveDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
MoveDownGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);

// Index
MoveDownGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
MoveDownGesture.addDirection(
    Finger.Index,
    FingerDirection.HorizontalLeft,
    0.25
);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
    MoveDownGesture.addCurl(finger, FingerCurl.FullCurl, 0.75);
    MoveDownGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}

export { MoveDownGesture };
