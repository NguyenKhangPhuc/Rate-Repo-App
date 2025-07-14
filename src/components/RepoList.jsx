import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepoItem from './RepoItem'
import useRepositories from '../hooks/useRepositories';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import React, { useState } from 'react';
import themes from '../themes/themes';
import { useDebouncedCallback } from 'use-debounce';
const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    list: {
        padding: 10
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        height: 60,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 15,
        fontSize: themes.fontSizes.subheading
    }
});


const ItemSeparator = () => <View style={styles.separator} />;

const FilterContainer = ({ setOrderBy, setOrderDirection, setSearchKeyWord }) => {
    const [visible, setVisible] = useState(false);
    const debounced = useDebouncedCallback((value) => {
        setSearchKeyWord(value)
        console.log(value)
    }, 500)

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const handleFiltering = (orderBy, orderDir) => {
        setOrderBy(orderBy)
        setOrderDirection(orderDir)
    }
    return (
        <View
            style={{

                flexDirection: 'column',

                alignItems: 'flex-end'
            }}>
            <TextInput style={styles.input} placeholder='Searching for repository' onChangeText={text => debounced(text)} />
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Button onPress={openMenu}>Show menu</Button>}>
                <Menu.Item onPress={() => handleFiltering('CREATED_AT', 'DESC')} title="Latest repositories" />
                <Divider />
                <Menu.Item onPress={() => handleFiltering('RATING_AVERAGE', 'DESC')} title="Highest rated repositories" />
                <Divider />
                <Menu.Item onPress={() => handleFiltering('RATING_AVERAGE', 'ASC')} title="Lowest rated repositories" />
            </Menu>
        </View>
    );

}

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const { setOrderBy, setOrderDirection, setSearchKeyWord } = this.props
        return <FilterContainer setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} setSearchKeyWord={setSearchKeyWord} />
    }
    render() {
        const { repositories, fetchMore } = this.props
        return (
            <FlatList
                data={repositories}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => {
                    return (
                        <RepoItem item={item} key={item.id} />
                    )
                }}
                style={styles.list}
                ListHeaderComponent={this.renderHeader()}
                onEndReached={() => fetchMore()}
            />
        );
    }
}

const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState('CREATED_AT')
    const [orderDirection, setOrderDirection] = useState('DESC')
    const [searchKeyword, setSearchKeyWord] = useState('')

    const { repositories, fetchMore } = useRepositories({ first: 5, orderBy, orderDirection, searchKeyword })
    return <RepositoryListContainer repositories={repositories} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} setSearchKeyWord={setSearchKeyWord} fetchMore={fetchMore} />
};

export default RepositoryList;