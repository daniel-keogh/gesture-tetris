/**
 * This file defines gestures for left & right rotation.
 */

import {
    Finger,
    FingerCurl,
    FingerDirection,
    GestureDescription,
} from 'fingerpose';

const RotateLeftGesture = (function () {
    const rotateLeft = new GestureDescription('rotate_left');

    // Thumb
    rotateLeft.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
    rotateLeft.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);

    // Index
    rotateLeft.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    rotateLeft.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.25);

    for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
        rotateLeft.addCurl(finger, FingerCurl.FullCurl, 0.75);
        rotateLeft.addDirection(finger, FingerDirection.VerticalDown, 0.25);
    }
})();

const RotateRightGesture = (function () {
    const rotateRight = new GestureDescription('rotate_right');

    // Thumb
    rotateRight.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
    rotateRight.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);

    // Index
    rotateRight.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    rotateRight.addDirection(
        Finger.Index,
        FingerDirection.HorizontalLeft,
        0.25
    );

    for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
        rotateRight.addCurl(finger, FingerCurl.FullCurl, 0.75);
        rotateRight.addDirection(finger, FingerDirection.VerticalDown, 0.25);
    }
})();

export { RotateLeftGesture, RotateRightGesture };
