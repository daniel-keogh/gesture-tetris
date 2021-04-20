<template>
  <div class="camera card">
    <div class="camera__most-recent" v-show="mostRecent.name.length > 0">
      <p class="subtitle is-4 mb-0">
        {{ mostRecent.name }}
      </p>

      <p class="subtitle is-4 mb-0">
        {{ mostRecent.confidence }}
      </p>
    </div>

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

    <div class="camera__hide">
      <b-button
        type="is-danger"
        outlined
        icon-left="eye-off"
        @click="$emit('on-minimize')"
      >
        Hide
      </b-button>
    </div>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";
import { DialogProgrammatic as Dialog } from "buefy";

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
      let name = "";

      if (this.detection.name) {
        switch (this.detection.name) {
          // Flip left & right
          case CustomGestures.MoveRightGesture.name:
            name = "Move Left";
            break;
          case CustomGestures.MoveLeftGesture.name:
            name = "Move Right";
            break;
          case CustomGestures.RotateLeftGesture.name:
            name = "Rotate Left";
            break;
          case Gestures.VictoryGesture.name:
            name = "Rotate Right";
            break;
          case Gestures.ThumbsUpGesture.name:
            name = "Move Down";
            break;
          default:
            break;
        }

        return {
          name,
          confidence: `${Math.floor(this.detection.confidence * 10)}%`,
        };
      }

      return {
        name,
        confidence: 0,
      };
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
            Gestures.VictoryGesture,
            CustomGestures.MoveRightGesture,
            CustomGestures.MoveLeftGesture,
            CustomGestures.RotateLeftGesture,
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
      this.$emit("on-loaded");

      Dialog.alert({
        title: "Error",
        message: "Sorry, but we are not able to access your webcam.",
        type: "is-danger",
        hasIcon: true,
        icon: "alert-outline",
      });
    },

    onNotsupported() {
      this.$emit("on-loaded");

      Dialog.alert({
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
  transform: scale(-1, 1);

  position: fixed;
  bottom: 0;
  right: 0;

  width: calc(640px * 0.6);
  height: calc(480px * 0.6);

  &__most-recent {
    transform: scale(-1, 1);

    position: relative;
    top: 0;
    left: 0;

    text-align: left;
    padding: 0.5rem 0.85rem;
    z-index: 11;

    display: flex;
    justify-content: space-between;

    background-color: rgba($color: black, $alpha: 0.25);

    p {
      color: white;
    }
  }

  &__hide {
    height: 100%;
    width: 100%;

    position: absolute;
    top: 0;
    left: 0;
    transform: scale(-1, 1);
    z-index: 20;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 0.5s;

    & > * {
      display: none;
    }

    &:hover {
      background-color: rgba($color: black, $alpha: 0.5);

      & > * {
        display: inline-flex;
      }
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
}

canvas,
video {
  height: 100%;
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10;
}
</style>
