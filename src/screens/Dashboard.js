import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image,FlatList } from 'react-native';
import { Icon, Drawer, Button, Card, CardItem, Spinner } from "native-base";
import Header from '../components/Header';
import TitleText from '../components/TitleText';
import Colors from '../components/Colors';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '6083b1a53a29de5ea4ebef38';

class Dashboard extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          loading: true,
          data:[]
      }
    }
    componentDidMount() {
      axios.get(`${BASE_URL}/user/0F8JIqi4zwvb77FGz6Wt/post?limit=10`, { headers: { 'app-id': APP_ID } })
      .then(({ data }) => {
        this.setState({ 
          data: data.data,
          loading:false
        });
      })
      .catch(error => {
        alert(error.message);
        console.error('There was an error!', error);
      });
      
  }
  listView = () => {
       const { loading, data } = this.state;
        if (this.state.loading) {
            // return true;
            return <Spinner color='black' />;
        }
        return (
          <FlatList
            data={this.state.data}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: "60%" }}
            renderItem={({ item, index }) => (
              <View key={index} style={[styles.container]}>
                <View style={styles.child}>
            
              <View style={styles.profile}>
                <Image style={styles.avatar}
                  source={{uri: item.owner.picture}}/>
                <View style={styles.nameEmailView}>
                  <Text style={styles.name}> {item.owner.firstName} {item.owner.lastName}</Text>
                  <Text style={styles.email}>{item.owner.email}</Text>
                </View>
              </View>
              <View
                  style={{
                    margin: 10,
                    borderBottomColor: '#e6e9ec',
                    borderBottomWidth: 1,
                  }}
                />
              <View style={{ marginLeft: 20, marginRight: 20,  }}>
                
                <Card>
                  <CardItem cardBody>
                    <Image source={{uri: item.image}} style={{ height: 200, width: null, flex: 1 }} />
                  </CardItem>
                </Card>
              
              </View>
              <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row', }}>
                {item.tags != null && item.tags.map((tag, tagI) =>
                  <View key={tagI}>
                    <Text style={{ paddingStart: 10, paddingEnd: 10, marginLeft:3, color: Colors.white, backgroundColor: Colors.animal, borderRadius:20, fontWeight: 'bold', fontSize: 14, alignSelf: 'flex-start',}} >{tag}</Text>                    
                  </View>
                )}
              </View>
              <View style={{ marginLeft: 20, marginRight: 20, marginTop:10  }}>
                <Text style={styles.email}>{item.text}</Text>
              </View>
              <View
                  style={{
                    margin: 10,
                    borderBottomColor: '#e6e9ec',
                    borderBottomWidth: 1,
                  }}
                />
                <View style={{ padding: 10, marginLeft:20, marginRight:20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{item.likes} Liks</Text>
                    <Text>{moment(item.publishDate).format('lll') }</Text>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    borderBottomColor: '#e6e9ec',
                    borderBottomWidth: 1,
                  }}
                />
                <View style={{ padding: 10, marginBottom:20, marginLeft:20, marginRight:20, textDecorationLine: 'underline',}}>
                    <Text style={{ textDecorationLine: 'underline'}}>Get Post Comments</Text>
                    <Text style={{ textDecorationLine: 'underline'}}>Get Post Comments</Text>
                </View>
            </View>
              </View>
            )}
          />
        );
  }
  render() {

    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, }}>
        <Header />
        <TitleText style={{ marginTop: 25, fontWeight: 'bold', fontSize: 20, }} >MyGlu</TitleText>
        <ScrollView style={{ marginTop: 10 }}>
          {this.listView()}
        </ScrollView>
      </View >
    );

  }
}
const styles = StyleSheet.create({
  imageContainer: {
    height: 160,
    width: 160,
    marginBottom: 20,
    alignSelf: 'center'
  },
  imageButton: {
    position: 'absolute',
    bottom: -7,
    alignSelf: "flex-end"
  },
  imageView: {
    height: "100%",
    width: "100%",
    position: 'relative',
    marginTop: 20,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    alignSelf: 'center',
    borderRadius: 100
  },
  textArea: {
    margin: 20,
    paddingTop: 10
  },
  checkbox: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingEnd: 10,
    flexDirection: 'row',
  },
  checkboxItem: {
    flex: 1,
    marginStart: 20,
    marginEnd: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1, padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 5,
  },
  child: {
    borderRadius: 15,
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0,
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 3
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  profile:{
    flexDirection: 'row',
    marginTop:20,
    marginLeft:10,
  },
  name:{
    fontSize:22,
    fontWeight:'600',
    alignSelf:'flex-start',
    marginLeft:10
  },
  email:{
    fontSize:16,
    fontWeight:'400',
    alignSelf:'flex-start',
    marginLeft:10
  },
  nameEmailView:{
    marginLeft:10,
    alignItems: 'center',
  },
});


export default Dashboard