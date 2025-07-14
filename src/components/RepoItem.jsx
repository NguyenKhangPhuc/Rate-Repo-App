import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import themes from "../themes/themes"
import MyText from "./MyText"
import { useNavigate } from "react-router-native"
const RepoItem = ({ item, children }) => {
    const navigate = useNavigate()
    const styles = StyleSheet.create({
        container1: {
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
        },
        container2: {
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        textContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        image: {
            width: 60,
            height: 60,
            borderRadius: 30
        },
        language: {
            backgroundColor: themes.backgroundColors.primary,
            alignSelf: 'flex-start',
            padding: 3,
            color: 'white'
        }
    })
    const handleConvertNumber = (number) => {
        if (number > 1000) {
            const newNumber = (number / 1000).toFixed(1)
            return newNumber + 'k'
        }
        return number

    }

    return (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>

            <View style={{ backgroundColor: 'white', borderRadius: 10 }} testID="repositoryItem" >
                <View style={styles.container1}>
                    <Image src={item.ownerAvatarUrl} style={styles.image} />
                    <View>
                        <MyText fontWeight={'bold'} fontSize={'subheading'}>{item.fullName}</MyText>
                        <MyText fontSize={'small'} style={{ flexWrap: 'wrap', maxWidth: 300 }}>{item.description}</MyText>
                        <Text style={styles.language}>{item.language}</Text>
                    </View>
                </View>

                <View style={styles.container2}>
                    <View style={styles.textContainer}><MyText fontWeight={'bold'}>{handleConvertNumber(item.forksCount)}</MyText><MyText>Forks</MyText></View>
                    <View style={styles.textContainer}><MyText fontWeight={'bold'}>{handleConvertNumber(item.stargazersCount)}</MyText><MyText>Stars</MyText></View>
                    <View style={styles.textContainer}><MyText fontWeight={'bold'}>{handleConvertNumber(item.ratingAverage)}</MyText><MyText>Rating</MyText></View>
                    <View style={styles.textContainer}><MyText fontWeight={'bold'}>{handleConvertNumber(item.reviewCount)}</MyText><MyText>Reviews</MyText></View>
                </View>
                {children}
            </View>
        </Pressable>
    )
}
export default RepoItem