import { useContext } from "react"
import { AuthenticationContext } from "./Main"
import { FlatList, StyleSheet, View } from "react-native";
import { ReviewItem } from "./SingleRepo";
const styles = StyleSheet.create({
    separator: {
        height: 20,
    },
    list: {
        padding: 10,
    },
});
const ItemSeparator = () => <View style={styles.separator} />;
const MyReviews = () => {
    const data = useContext(AuthenticationContext)
    const reviews = data.me.reviews.edges.map(e => e.node)
    console.log(reviews)
    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => {
                return (
                    <ReviewItem item={item} key={item.id} />
                )
            }}
            style={styles.list}


        />

    )
}

export default MyReviews