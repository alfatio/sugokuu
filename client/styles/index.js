import {StyleSheet,Dimensions} from 'react-native'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  board: {
    flexDirection: 'column',
    maxHeight: windowWidth,
    width: windowWidth,
    marginTop: windowHeight*0.01,
    padding: 3,
    backgroundColor: '#000',
    justifyContent:'center'
  },
  kotak: {
    backgroundColor: '#FF99CC',
    height: 150,
    width: '100%',
    borderStyle: "solid",
    borderWidth: 2,
    flexDirection: 'row'
  },
  kotakKecil: {
    backgroundColor: '#FFFF33',
    height: '33.33%',
    width: '33.33%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  kotakKecil2: {
    backgroundColor: '#FF6666',
    height: '33%',
    width: '33%'
  },
  input: {
    borderWidth: 2,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    width: windowWidth*0.5,
    paddingHorizontal: 7
  },
  "p-1":{
    paddingHorizontal: windowWidth*0.05,
    paddingVertical: windowHeight*0.01
  }
})

export default styles