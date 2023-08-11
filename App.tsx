/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ViewToken,
} from "react-native";
import {useSharedValue} from "react-native-reanimated";

import {ListItem} from "./src/components/ListIItem";

const data = new Array(50).fill(0).map((_, index)=> ({ id: index }));

const App = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingTop: 40 }}
        onViewableItemsChanged={({viewableItems: vItems}) => {
          // console.log(viewableItems);
          viewableItems.value = vItems;
        }}
        renderItem={({item}) => {
          return <ListItem item= {item} viewableItems={viewableItems} />;
        }}
      />
    </SafeAreaView>
  );
};
export default App;
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
