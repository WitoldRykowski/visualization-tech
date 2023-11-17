<script setup lang="ts">
import { AppToolbar } from '@/components'
import { QPageContainer, QPage, QHeader, QLayout } from 'quasar'

import { ref, onMounted } from 'vue'

const recording = ref(false)
const mediaRecorder = ref<MediaRecorder | null>(null)
const recordedChunks = ref([])
const recordedVideoURL = ref('')
let stream
const video = ref()

onMounted(() => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((s) => {
    stream = s
    video.value.srcObject = stream
    video.value.play()
  })

  console.log(stream)
})

const startRecording = () => {
  recordedChunks.value = []
  mediaRecorder.value = new MediaRecorder(stream)

  mediaRecorder.value.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.value.push(event.data)
    }
  }

  mediaRecorder.value.onstop = () => {
    const blob = new Blob(recordedChunks.value, { type: 'video/webm' })
    recordedVideoURL.value = URL.createObjectURL(blob)
  }

  mediaRecorder.value.start()
  recording.value = true
}

const stopRecording = () => {
  if (mediaRecorder.value && recording.value) {
    mediaRecorder.value.stop()
    recording.value = false
  }
}
</script>

<template>
  <QLayout view="hHh lpR fFf">
    <QHeader elevated class="bg-primary text-white">
      <AppToolbar />
    </QHeader>

    <QPageContainer>
      <QPage padding>
        <div id="main-container">
          <div>
            <h1>Vue Video Recorder</h1>
            <video ref="video" autoplay playsinline></video>
            <button @click="startRecording" :disabled="recording">Start Recording</button>
            <button @click="stopRecording" :disabled="!recording">Stop Recording</button>
            <video ref="recordedVideo" controls :src="recordedVideoURL" v-if="recordedVideoURL" />
          </div>

          <RouterView />
        </div>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss" scoped>
#main-container {
  height: calc(100vh - 98px);
}
</style>
