import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, stickerSource }) {
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
            scaleImage.value = scaleImage.value * 2;
            } else {
              scaleImage.value = imageSize;
            }
        });
    
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    const drag = Gesture.Pan()
        .onChange((event) => {
          // Lock the sticker X and Y position to the parent view
          if (translateX.value + event.changeX < 0 ) {
            translateX.value = 0;
          } else if (translateX.value + event.changeX >  320 - scaleImage.value) {
            translateX.value = 320 - scaleImage.value;
          }
          else {
            translateX.value += event.changeX;
          }

          if (translateY.value + event.changeY < -88) {
            translateY.value = -88;
          } else if (translateY.value + event.changeY > 350 - scaleImage.value) {
            translateY.value = 350 - scaleImage.value;
          }
          else {
            translateY.value += event.changeY;
          }
        });


    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
            {
                translateX: translateX.value,
            },
            {
                translateY: translateY.value,
            },
            ],
        };
    });
          
          
          

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
