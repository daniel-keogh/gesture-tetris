import PointingLeftGesture from "./PointingLeft";
import PointingRightGesture from "./PointingRight";
import PointingUpwardsGesture from "./PointingUpwards";
import ThumbsDownGesture from "./ThumbsDown";

import { Gestures, GestureEstimator } from "fingerpose";

// Initialise the estimator
const GE = new GestureEstimator([
  Gestures.VictoryGesture,
  Gestures.ThumbsUpGesture,
  PointingLeftGesture,
  PointingRightGesture,
  PointingUpwardsGesture,
  ThumbsDownGesture,
]);

const CustomGestures = {
  PointingLeftGesture,
  PointingRightGesture,
  PointingUpwardsGesture,
  ThumbsDownGesture,
};

export { CustomGestures, GE };
