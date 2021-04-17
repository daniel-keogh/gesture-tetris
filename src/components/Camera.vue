<template>
  <div>
    <web-cam
      ref="webcam"
      :height="height"
      :width="width"
      :device-id="deviceId"
      @started="onStarted"
      @stopped="onStopped"
      @error="onError"
      @notsupported="onNotsupported"
      @cameras="onCameras"
      @camera-change="onCameraChange"
      @video-live="onVideoLive"
    />
    <canvas ref="canvas" :height="height" :width="width" />
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";

import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import { Gestures, GestureEstimator } from "fingerpose";

import { drawHand } from "../utils/handmesh";

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
    };
  },

  watch: {
    camera(id) {
      this.deviceId = id;
    },

    devices() {
      // Once we have a list select the first one
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
      this.$emit("onloaded");

      // Detect hands at 100ms intervals
      setInterval(() => this.detect(model), 100);
    },

    async detect(model) {
      const videoEl = this.$refs.webcam?.$el;
      const canvasEl = this.$refs.canvas;

      if (videoEl && videoEl.readyState === 4) {
        // Make Detections
        const hand = await model.estimateHands(videoEl);

        if (hand.length > 0) {
          const GE = new GestureEstimator([
            Gestures.VictoryGesture,
            Gestures.ThumbsUpGesture,
          ]);

          const estimation = GE.estimate(hand[0].landmarks, 8);

          if (estimation.gestures.length > 0) {
            // Emit the gesture with the largest confidence value
            const confidences = estimation.gestures.map((g) => g.confidence);
            const largest = confidences.indexOf(Math.max(...confidences));

            this.$emit("ondetection", estimation.gestures[largest]);
          }
        }

        // Draw hand mesh
        const ctx = canvasEl.getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
        drawHand(hand, ctx);
      }
    },

    onStarted(e) {
      console.log("onStarted", e);
      this.runHandpose();
    },

    onStopped(e) {
      console.log("onStopped", e);
    },

    onError(e) {
      console.log("onError", e);
    },

    onNotsupported(e) {
      console.log("onNotsupported", e);

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
      console.log("onCameras", cameras);
    },

    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("onCameraChange", deviceId);
    },

    onVideoLive(e) {
      console.log("onVideoLive", e);
    },
  },
};
</script>

<style lang="scss" scoped>
canvas,
video {
  transform: scale(0.6);
  translate: 20% 20%;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
}
</style>
