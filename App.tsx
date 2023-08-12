/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";

import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {faker} from "@faker-js/faker";

interface People {
  id: number,
  image: string,
  name: string,
  jobTitle: string,
  email: string,
}
const DATA: People[] = [...Array(30).keys()].map((_, i) => {
  return {
    id: i,
    image: faker.image.avatar(),
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
  };
});
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const App = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  // const viewableItems = useSharedValue<ViewToken[]>([]);
  //! First Animated FlatList
  // return (
  //   <SafeAreaView style={styles.container}>
  //     <Image source={require("./assets/images/bg.jpg")}
  //       style={StyleSheet.absoluteFillObject} />
  //     <FlatList
  //       data={DATA}
  //       onViewableItemsChanged={({viewableItems: vItems}) => {
  //         // console.log(viewableItems);
  //         viewableItems.value = vItems;
  //       }}
  //       keyExtractor={item => `index-${item.id}`}
  //       contentContainerStyle={{
  //         padding: SPACING,
  //         paddingTop: StatusBar.currentHeight || 42,
  //       }}
  //       renderItem={({item}) => {
  //         return <ListItem item={item} viewableItems={viewableItems} />;
  //       }}
  //     />
  //   </SafeAreaView>
  // );

  // //! Second Animated FlatList

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./assets/images/bg.jpg")}
        style={StyleSheet.absoluteFillObject} />
        <Animated.FlatList
          data={DATA}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={item => `index-${item.id}`}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: StatusBar.currentHeight || 42,
          }}
          renderItem={({ item, index }) => {

            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 10)
            ]

            const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2)
            ]

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0]
            })

            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0]
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
              transform: [{ scale }],
              opacity
            }]}>
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
          }}
        />
    </SafeAreaView>
  )
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
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
