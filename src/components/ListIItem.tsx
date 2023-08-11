import React from "react";

import {
  StyleSheet,
  ViewToken,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type ListItemProps = {
    viewableItems?: SharedValue<ViewToken[]>;
    item?: { id: number }
}
export const ListItem: React.FC<ListItemProps> = React.memo(({ item, viewableItems }) => {
    const rStyle = useAnimatedStyle(() => {
        const isVisible = viewableItems?.value
            .filter(item => item.isViewable)
            .find(viewableItem => viewableItem.item.id === item?.id);
        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                {
                    scale: withTiming(isVisible ? 1 : 0)
                }
            ]
        }
    })
    return <Animated.View style={[styles.viewItem, rStyle]} />;

});
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewItem: {
        height: 80,
        width: "90%",
        backgroundColor: "#78CAD2",
        alignSelf: "center",
        borderRadius: 16,
        marginTop: 20,
    },
});