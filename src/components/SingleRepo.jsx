import { useQuery } from "@apollo/client"
import { useParams } from "react-router-native"
import { GET_SINGLEREPO } from "../graphql/queries"
import RepoItem from "./RepoItem"
import MyText from "./MyText"
import { View, Pressable, FlatList, Alert } from "react-native"
import { StyleSheet } from "react-native"
import * as Linking from 'expo-linking';
import useSingleRepo from "../hooks/useSingleRepo"
import { format } from "date-fns"
import { useContext } from "react"
import { AuthenticationContext } from "./Main"
import useDeleteReview from "../hooks/useDeleteReview"

const styles = StyleSheet.create({
    separator: {
        height: 20,
    },
    list: {
        padding: 10,
    },
    button: {
        width: '90%',           // 👈 nhỏ hơn width cha một chút
        alignSelf: 'center',    // 👈 căn giữa trong cha
        backgroundColor: '#007AFF',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    reviewContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        display: "flex",
        flexDirection: 'row',
        gap: 20

    },
    rating: {
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'blue'
    }
});
const ItemSeparator = () => <View style={styles.separator} />;
const RepoInfo = ({ repository }) => {
    return (

        <View style={{ marginBottom: 16 }}>
            <RepoItem item={repository}>
                <Pressable style={styles.button} onPress={() => Linking.openURL(repository.url)}>
                    <MyText fontWeight={'bold'} fontSize={'subheading'} style={styles.buttonText}>Open in Github</MyText>
                </Pressable>
            </RepoItem>
        </View>

    )
}

export const ReviewItem = ({ item }) => {
    const data = useContext(AuthenticationContext)
    const [handleDeleteReview] = useDeleteReview()
    const id = data.me.id
    const handleFormatDate = (dateToFormat) => {
        const date = new Date(dateToFormat)
        const formattedDate = format(date, "dd/MM/yyyy")
        return formattedDate
    }
    const onDelete = (id) => {
        console.log('this is id', id)
        Alert.alert('Delete review confirmation', 'Do you want to delete this review?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: async () => {
                    try {
                        await handleDeleteReview(id)
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
        ])
    }
    return (
        <View style={styles.reviewContainer} >
            <View>
                <View style={styles.rating}>
                    <MyText style={{ color: 'blue' }}>{item.rating}</MyText>
                </View>
            </View>
            <View>
                <MyText fontWeight={'bold'} fontSize={'subheading'}>{item.user.username}</MyText>
                <MyText fontSize={'small'}>{handleFormatDate(item.createdAt)}</MyText>
                <MyText style={{ flexWrap: 'wrap', maxWidth: 300 }}>{item.text}</MyText>
                {item.user.id == id &&
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 5 }}>
                        <Pressable style={{ width: '40%', backgroundColor: 'blue', padding: 10, borderRadius: 10 }} onPress={() => Linking.openURL(item.repository.url)}>
                            <MyText fontWeight={'bold'} fontSize={'body'} style={{ color: 'white', textAlign: 'center' }}>Open repository</MyText>
                        </Pressable>
                        <Pressable style={{ width: '40%', backgroundColor: 'red', padding: 10, borderRadius: 10 }} onPress={() => onDelete(item.id)}>
                            <MyText fontWeight={'bold'} fontSize={'body'} style={{ color: 'white', textAlign: 'center' }}>Delete review</MyText>
                        </Pressable>
                    </View>
                }
            </View>

        </View>
    )
}

const SingleRepo = () => {
    const { id } = useParams()
    const { repository, reviews, loading, fetchMore } = useSingleRepo({ first: 4, id })
    console.log(repository)
    if (loading) {
        return <MyText>Loading...</MyText>
    }
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
            ListHeaderComponent={() => <RepoInfo repository={repository} />}
            onEndReached={() => fetchMore()}

        />

    )
}

export default SingleRepo