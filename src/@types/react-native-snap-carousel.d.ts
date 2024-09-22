declare module 'react-native-snap-carousel' {
  import * as React from 'react';
  import { FlatListProps, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';

  export interface CarouselProps<T> extends FlatListProps<T> {
    data: T[];
    renderItem: (info: { item: T; index: number }) => React.ReactNode;
    sliderWidth: number;
    itemWidth: number;
    inactiveSlideScale?: number;
    inactiveSlideOpacity?: number;
    loop?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    autoplayInterval?: number;
    containerCustomStyle?: StyleProp<ViewStyle>;
    contentContainerCustomStyle?: StyleProp<ViewStyle>;
    onSnapToItem?: (index: number) => void;
  }

  export default class Carousel<T> extends React.Component<CarouselProps<T>> {}
}
