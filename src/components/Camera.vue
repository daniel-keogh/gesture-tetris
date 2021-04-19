<template>
  <div class="camera">
    <p class="camera__most-recent">{{ mostRecent }}</p>
    <web-cam
      ref="webcam"
      :height="height"
      :width="width"
      :device-id="deviceId"
      @started="onStarted"
      @error="onError"
      @notsupported="onNotsupported"
      @cameras="onCameras"
      @camera-change="onCameraChange"
    />
    <canvas ref="canvas" :height="height" :width="width" />
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";

import { GestureEventBus } from "../main";

import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import { Gestures, GestureEstimator } from "fingerpose";

import { drawHandMesh } from "../utils/handmesh";
import CustomGestures from "../utils/gestures";

export default {
  name: "Camera",

  components: {
    WebCam,
  },

  data() {
    return {
      height: "480",
      width: "640",

      camera: null,
      deviceId: null,
      devices: [],

      minConfidence: 6,
      detection: "",
    };
  },

  computed: {
    mostRecent() {
      if (this.detection.name) {
        if (this.detection.name === "move_right") {
          return "Move Left";
        } else if (this.detection.name === "move_left") {
          return "Move Right";
        } else {
          // Capitalise the first letter of each word and remove underscores
          return this.detection.name
            .replace("_", " ")
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }
      }
      return "";
    },
  },

  watch: {
    camera(id) {
      this.deviceId = id;
    },

    devices() {
      // Once we have a list of devices, select the first one
      const first = this.devices[0];

      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    },
  },

  methods: {
    async runHandpose() {
      const model = await handpose.load();
      await this.detect(model);

      // Model has been loaded
      this.$emit("on-loaded");

      this.detect(model);
    },

    async detect(model) {
      const videoEl = this.$refs.webcam?.$el;
      const canvasEl = this.$refs.canvas;

      if (videoEl && videoEl.readyState === 4) {
        // Make Detections
        const hand = await model.estimateHands(videoEl);

        if (hand.length > 0) {
          const GE = new GestureEstimator([
            Gestures.ThumbsUpGesture,
            // CustomGestures.MoveDownGesture,
            CustomGestures.MoveRightGesture,
            CustomGestures.MoveLeftGesture,
            // CustomGestures.RotateLeftGesture,
            // CustomGestures.RotateRightGesture,
          ]);

          const estimation = GE.estimate(hand[0].landmarks, this.minConfidence);

          if (estimation.gestures.length > 0) {
            // Get the gesture with the largest confidence value
            const confidences = estimation.gestures.map((g) => g.confidence);
            const largest = confidences.indexOf(Math.max(...confidences));

            this.detection = estimation.gestures[largest];

            // Emit an event
            GestureEventBus.onGestureDetected(estimation.gestures[largest]);
          }
        }

        // Draw hand mesh
        const ctx = canvasEl.getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
        drawHandMesh(hand, ctx);

        // Continue detection loop
        requestAnimationFrame(() => this.detect(model));
      }
    },

    onStarted() {
      this.runHandpose();
    },

    onError() {
      this.$emit("onloaded");

      this.$buefy.dialog.alert({
        title: "Error",
        message: "Sorry, but we are not able to access your webcam.",
        type: "is-danger",
        hasIcon: true,
        icon: "alert-outline",
      });
    },

    onNotsupported() {
      this.$emit("onloaded");

      this.$buefy.dialog.alert({
        title: "Error",
        message: "Sorry, but your browser does not appear to be supported.",
        type: "is-danger",
        hasIcon: true,
        icon: "alert-outline",
        onConfirm: () => this.$router.go(-1),
      });
    },

    onCameras(cameras) {
      this.devices = cameras;
    },

    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
    },
  },
};
</script>

<style lang="scss" scoped>
.camera {
  transform: scale(-0.6, 0.6);
  translate: 20% 20%;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 640px;
  height: 480px;

  &__most-recent {
    transform: scale(-1, 1);
    font-size: 2rem;
    position: relative;
    top: -3rem;
    left: 0;
    z-index: 11;
  }
}

canvas,
video {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
}
</style>
