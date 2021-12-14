import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, TextInput, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const App = () => {

	const data = [
		{ id: 1,	title: 'milk'},
		{ id: 2, title: 'bread'},
		{ id: 3, title: 'egges'},
		{ id: 4,	title: 'spices'},
		{ id: 5, title: 'cheese'},
	]

	const [initalElements, setinitalElements] = useState(data)
	const [search, setSearch] = useState('')
	const [filteredData, setfilteredData] = useState([])
	
	useEffect(() => {
		setfilteredData(initalElements)
	}, [])

	const randomItems = ['vegetables', 'butter', 'ketchup', 'plates', 'bottles', 'flour', 'ice-cream']

	const Item = ({title}) => (
		<View style={styles.itemCont}>
			<Text style={styles.itemTitle}>{title}</Text>
		</View>
	)

	const renderItem = ({item}) => (
		<Item title={item.title}/>
	)

	const handleSearch = text => {
		console.log(text)
		if(text){
			const formattedText = text.toLowerCase()
			const newData = initalElements.filter(item => {
				if (item.title.includes(formattedText)) {
					return item
				}
			})
			console.log(newData)
			setinitalElements(newData)
			setSearch(text)
		} else {
			setinitalElements(filteredData)
			setSearch(text)
		}
	}

	const createItem = title => {
		const lastId = initalElements[initalElements.length - 1].id
		const newId = lastId + 1
		const newItem = {id: newId, title: title}
		// console.log(newItem)
		return newItem
	}

	const handleAdd = () => {
		const randIndex = Math.floor(Math.random() * randomItems.length)
		const randItem = createItem(randomItems[randIndex])
		const newData = [...initalElements, randItem]
		setfilteredData(newData)
		setinitalElements(newData)
	}

	return (
		<View style={styles.container}>
			{/* searchbar container */}
			<View style={styles.srchBarCont}>
				<TextInput 
					value={search}
					onChangeText={text => handleSearch(text)}
					style={styles.srchBar}
					placeholder="'spices'"
				/>
				<TouchableOpacity style={styles.addBtn} onPress={()=>{handleAdd()}}>
					<Icon name='plus' size={20} color={'#09169c'}/>
				</TouchableOpacity>
				
			</View>
			{/* searchbar container ends here */}
			<View style={styles.seperator}/>
			{/* list view */}
			<FlatList
				data={initalElements}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>
			{/* list view ends here */}
		</View>
	)
}

export default App

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		marginTop: StatusBar.currentHeight,
	},
	srchBarCont: {
		marginTop: 20,
		flexDirection: 'row',
	},
	srchBar: {
		borderWidth: 1,
		borderRadius: 7,
		borderColor: '#09169c',
		padding: 7,
		flexGrow: 1,
		color: '#09169c'
	},
	addBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#bac0ff',
		marginLeft: 10,
		paddingHorizontal: 10,
		borderRadius: 7
	},
	seperator: {
		borderBottomColor: '#000',
		borderBottomWidth: 1,
		marginVertical: 10
	}, 
	itemCont: {
		paddingVertical: 6,
		marginBottom: 5,
		backgroundColor: '#d4d7ff',
		borderRadius: 6
	},
	itemTitle: {
		fontSize: 17,
		fontStyle: 'italic',
		fontWeight: 'bold',
		textAlign: 'center'
	}
})
