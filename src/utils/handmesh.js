/**
 * Utility class for drawing the hand mesh on a HTML5 canvas element.
 *
 * Adapted from below examples by Nicholas Renotte.
 *
 * https://github.com/nicknochnack/HandPoseDetection
 * https://www.youtube.com/watch?v=f7uBsb-0sGQ
 */

// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

const styles = {
  fill: {
    size: 6,
    colour: "indigo",
  },
  stroke: {
    size: 4,
    colour: "plum",
  },
};

export const drawHand = (predictions, ctx) => {
  // Check if we have any predictions
  if (predictions.length > 0) {
    // Loop through each prediction
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;
      const fingers = Object.keys(fingerJoints);

      // Loop through fingers
      for (let i = 0; i < fingers.length; i++) {
        const finger = fingers[i];

        //  Loop through pairs of joints
        for (let j = 0; j < fingerJoints[finger].length - 1; j++) {
          const firstJointIndex = fingerJoints[finger][j];
          const secondJointIndex = fingerJoints[finger][j + 1];

          // Draw a path onto the canvas
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = styles.stroke.colour;
          ctx.lineWidth = styles.stroke.size;
          ctx.stroke();
        }
      }

      // Loop through landmarks and draw them
      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0]; // Get x point
        const y = landmarks[i][1]; // Get y point

        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, styles.fill.size, 0, 3 * Math.PI);
        ctx.fillStyle = styles.fill.colour;
        ctx.fill();
      }
    });
  }
};
