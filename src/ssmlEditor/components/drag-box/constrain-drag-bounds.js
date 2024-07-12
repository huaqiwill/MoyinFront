import { useElementSize, useElementBounding } from "@vueuse/core";
import { computed } from "vue";

function createStyle(x, y) {
  return `left:${x}px;top:${y}px`;
}

function constrainRange(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

function boundaryRef(box, containerBox, padding) {
  const { width, height } = useElementSize(box);
  const {
    x,
    y,
    width: windowWidth,
    height: windowHeight,
  } = useElementBounding(containerBox);
  return computed(() => {
    return {
      minX: x.value + padding,
      minY: y.value + padding,
      maxX: x.value + windowWidth.value - width.value - padding,
      maxY: y.value + windowHeight.value - height.value - padding,
    };
  });
}

export function useConstrainDragBounds(box, containerBox, position) {
  const boundary = boundaryRef(box, containerBox, 5);
  const style = computed(() => {
    const cx = constrainRange(
      position.value.x,
      boundary.value.minX,
      boundary.value.maxX
    );
    const cy = constrainRange(
      position.value.y,
      boundary.value.minY,
      boundary.value.maxY
    );
    return createStyle(cx, cy);
  });
  return { style };
}
