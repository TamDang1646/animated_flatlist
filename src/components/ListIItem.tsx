import React from "react";

import {
  Image,
  Text,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface People {
    id: number,
    image: string,
    name: string,
    jobTitle: string,
    email: string,
}
type ListItemProps = {
    viewableItems: SharedValue<ViewToken[]>;
    item: People
}
const SPACING = 20;
const AVATAR_SIZE = 70;


export const ListItem: React.FC<ListItemProps> = React.memo(({ item, viewableItems }) => {
    
    const rStyle = useAnimatedStyle(() => {
        const isVisible = viewableItems?.value
            .filter(item => item.isViewable)
            .find(viewableItem => viewableItem.item.id === item?.id);
        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                {
                    scale: withTiming(isVisible ? 1 : 0.5)
                }
            ]
        }
    })

    return <Animated.View style={[{
        flex: 1,
        flexDirection: "row",
        padding: SPACING,
        backgroundColor: "rgba(255,255,255,1)",
        marginBottom: SPACING,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 9,
    },rStyle]}>
        <Image source={{ uri: item.image }}
            style={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                marginRight: SPACING / 2,
                borderRadius: AVATAR_SIZE / 2,
                overflow: "hidden"
            }}
        />
        <View style={{ flex: 1, backgroundColor: "tranperent" }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.name}</Text>
            <Text style={{ fontSize: 18, opacity: .7, flex: 1 }} numberOfLines={1} ellipsizeMode="tail">{item.jobTitle}</Text>
            <Text style={{ fontSize: 14, opacity: .8, color: "#0099cc" }}>{item.email}</Text>
        </View>
    </Animated.View>;

});
