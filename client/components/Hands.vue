<script setup lang="ts">
import { useAttrs } from 'vue';
import { HandsAttrs } from '@/models/attrs';

const attrs = <HandsAttrs>useAttrs();
const emit = defineEmits(['click']);

function clickOnResponse(id: string | number) {
  emit('click', id);
}
</script>

<!-- TODO Mobile version -->
<template>
  <div class="hands-cards">
    <div v-for="(item, id, index) in attrs.items" :key="index" class="hands-card" @click="clickOnResponse(id)">
      <div class="card-face">
        <div class="card-label text-sm font-mono">{{ item.response }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hands-cards {
  bottom: 0;
  display: flex;
  height: 200px;
  padding: 0 50px;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
}

.hands-card {
  height: 225px;
  margin: 0 -50px;
  position: relative;
  width: 150px;
  &:after {
    bottom: 0;
    content: '';
    left: -60px;
    position: absolute;
    right: -60px;
    top: 0px;
    z-index: 10;
  }
}

.card-face {
  bottom: 0;
  content: '';
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: 800ms cubic-bezier(0.19, 1, 0.22, 1) transform;
  &:after {
    animation: none;
    background: #fff;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
}

.card-label {
  letter-spacing: -0.025em;
  padding: 15px;
}

$total: 12;
@for $i from 0 through ($total - 1) {
  $rotationRange: 50;
  $rotation: calc(($i - ($total - 1) / 2) / ($total - 2) * $rotationRange);
  $offsetRange: 80;
  $offset: abs(calc(($i - ($total - 1) / 2) / ($total - 2) * $offsetRange));
  .hands-card:nth-child(#{$i + 1}) {
    .card-face {
      background: white;
      box-shadow: -5px 5px 5px hsla(0, 0%, 0%, 0.15), inset 0 0 0 1px hsla(0, 0%, 0%, 0.15);
      transform: translateY($offset * 1px) rotate($rotation * 1deg);
      .card-label {
        color: black;
        text-shadow: -0.025em 0.025em 0 hsla(0, 0%, 0%, 0.15);
      }
    }
    &:hover {
      .card-face {
        transform: translateY(-100px) rotate(0deg) scale(2);
        transition-duration: 0ms;
        z-index: 5;
        &:after {
          animation: fade 250ms ease-out forwards;
        }
      }
      &:after {
        top: -175px;
      }
    }
  }
}

@keyframes fade {
  0% {
    opacity: 0.9;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.15);
  }
}
</style>
