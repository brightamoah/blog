<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { SizeAndPosManager } from "~/utils/sizeAndPositionManager";
import { props as componentProps } from "~/components/infinite/props";
import {
  SCROLL_INNER_STYLE,
  SCROLL_ITEM_STYLE,
  SCROLL_WRAP_STYLE,
} from "~/constants/style";
import { POSITION, SIZE } from "~/constants";
import type { ScrollToAlignment } from "~/types/type";

// defineOptions({
//   name: "InfiniteScroll",
// });

const props = defineProps(componentProps);

// State variables
let cachedStyles: Record<number, CSSProperties> = {};
// const sizeAndPositionManager = ref<SizeAndPosManager | null>();
// let sizeAndPositionManager: SizeAndPosManager;
let offset = 0;
let lastOffset = 0;

const start = ref<number>(0);
const stop = ref<number>(8);
const rootNode = ref<HTMLElement | null>(null);
const innerStyle = ref<CSSProperties>({});
const wrapStyle = ref<CSSProperties>({});

// Computed properties
const dataCount = computed(() => props.data?.length || 0);
const estimatedItemSize = computed(() => props.estimatedSize || 50);
const visibleData = computed(() =>
  props.data
    ? props.data.slice(start.value, Math.min(props.data.length, stop.value + 1))
    : [],
);
const scrollProperty = computed(() =>
  props.direction === "horizontal" ? "scrollLeft" : "scrollTop",
);

let sizeAndPositionManager = new SizeAndPosManager({
  itemCount: dataCount.value,
  itemSizeGetter: (index: number) => {
    const { itemSize } = props;
    if (typeof itemSize === "function") return itemSize(index);
    if (Array.isArray(itemSize))
      return Number(itemSize[index]) || estimatedItemSize.value;
    if (typeof itemSize === "number") return itemSize;
    return estimatedItemSize.value;
  },
  estimatedItemSize: estimatedItemSize.value,
});

// Methods
const getWrapStyle = () => {
  return {
    ...SCROLL_WRAP_STYLE,
    width: toSizeUnit(props.width),
    height: toSizeUnit(props.height),
  };
};

const getInnerStyle = () => {
  const style: CSSProperties = {
    ...SCROLL_INNER_STYLE,
  };

  const size = toSizeUnit(sizeAndPositionManager.getTotalSize());

  if (props.direction === "horizontal") {
    style.width = size;
    return style;
  }

  style.height = size;
  return style;
};

const getItemStyle = (idx: number) => {
  const index = idx + start.value;
  const style = cachedStyles[index];
  if (style) {
    return style;
  }

  if (!sizeAndPositionManager) {
    return SCROLL_ITEM_STYLE;
  }

  const sizeAndPos = sizeAndPositionManager.getSizeAndPositionForIndex(index);
  if (!sizeAndPos) {
    return SCROLL_ITEM_STYLE;
  }
  const { size, offset } = sizeAndPos;

  return (cachedStyles[index] = {
    ...SCROLL_ITEM_STYLE,
    [SIZE[props.direction]]: toSizeUnit(size),
    [POSITION[props.direction]]: toSizeUnit(offset),
  });
};

const init = () => {
  createSizeAndPosManager();

  rootNode.value!.addEventListener("scroll", handleScroll);

  offset =
    props.scrollToOffset ||
    (props.scrollToIndex != null &&
      getOffsetFromIdxAndAlign(props.scrollToIndex, props.scrollToAlignment)) ||
    0;

  setTimeout(() => {
    if (props.scrollToOffset != null) {
      scrollTo(props.scrollToOffset);
    } else if (props.scrollToIndex != null) {
      scrollTo(
        getOffsetFromIdxAndAlign(props.scrollToIndex, props.scrollToAlignment),
      );
    }
  }, 0);

  wrapStyle.value = getWrapStyle();
  innerStyle.value = getInnerStyle();
};

const createSizeAndPosManager = () => {
  if (!sizeAndPositionManager) {
    sizeAndPositionManager = new SizeAndPosManager({
      itemCount: dataCount.value,
      estimatedItemSize: estimatedItemSize.value,
      itemSizeGetter: (idx) => getSizeFromIdx(idx),
    });
  }

  return sizeAndPositionManager;
};

const handleScroll = (e: Event) => {
  const rootNodeOffset =
    props.direction === "vertical"
      ? rootNode.value!.scrollTop
      : rootNode.value!.scrollLeft;

  if (
    rootNodeOffset < 0 ||
    offset === rootNodeOffset ||
    e.target !== rootNode.value
  ) {
    return;
  }

  offset = rootNodeOffset;

  processScroll();
};

const processScroll = () => {
  const { width, height, direction, overscanCount } = props;
  const data = sizeAndPositionManager.getVisibleRange({
    containerSize: (direction === "horizontal" ? width : height) as number,
    offset: offset || 0,
    overscanCount: overscanCount,
  });

  if (data.start != null && data.stop != null) {
    start.value = data.start;
    stop.value = data.stop;
  }

  innerStyle.value = getInnerStyle();

  if (offset !== lastOffset) {
    scrollTo(offset);
  }
};

const scrollTo = (offset: number) => {
  if (rootNode.value) {
    rootNode.value[scrollProperty.value] = offset;
    lastOffset = offset;
  }
};

const getSizeFromIdx = (idx: number): number => {
  const itemSize = props.itemSize;

  if (typeof itemSize === "function") {
    return itemSize(idx);
  }

  if (Array.isArray(itemSize)) {
    return itemSize[idx] ?? estimatedItemSize.value;
  }

  return itemSize || estimatedItemSize.value;
};

const getOffsetFromIdxAndAlign = (idx: number, align: ScrollToAlignment) => {
  if (idx < 0 || idx >= dataCount.value) {
    idx = 0;
  }

  const { width, height, direction } = props;

  return sizeAndPositionManager.getUpdatedOffsetForIndex({
    align,
    containerSize: (direction === "horizontal" ? width : height) as number,
    currentOffset: offset || 0,
    targetIndex: idx,
  });
};

const clearCachedStyles = () => {
  for (let key in cachedStyles) {
    delete cachedStyles[key];
  }
};

onMounted(() => {
  setTimeout(init, 0);
});

onBeforeUnmount(() => {
  clearCachedStyles();
  sizeAndPositionManager.destroy();
  rootNode.value!.removeEventListener("scroll", handleScroll);
});

watch(
  () => props.data,
  (newData) => {
    sizeAndPositionManager.updateConfig({
      itemCount: newData?.length || 0,
      estimatedItemSize: estimatedItemSize.value,
    });

    offset = 0;
    lastOffset = 0;
    cachedStyles = {};
    sizeAndPositionManager.resetItem(0);
  },
);

watch(
  () => props.scrollToOffset,
  (newOffset) => {
    offset = newOffset;
    processScroll();
  },
);

watch(
  () => props.scrollToIndex,
  (newIdx) => {
    offset = getOffsetFromIdxAndAlign(newIdx, props.scrollToAlignment);
    processScroll();
  },
);

watch(
  () => props.scrollToAlignment,
  (newAlign) => {
    offset = getOffsetFromIdxAndAlign(props.scrollToIndex, newAlign);
    processScroll();
  },
);
</script>

<template>
  <div ref="rootNode" :style="wrapStyle">
    <div :style="innerStyle">
      <div
        v-for="(item, idx) in visibleData"
        :key="idx + start"
        :style="getItemStyle(idx)"
      >
        <slot :item="item" :index="idx + start"></slot>
      </div>
    </div>
  </div>
</template>

<style></style>
