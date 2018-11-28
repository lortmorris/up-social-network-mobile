import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import { compose, setStatic, lifecycle, withState } from 'recompose';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  carImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});


const fetchFeed = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5000/services/feed?limit=50&page=1')
      .then(response => response.json())
      .then(body => resolve(body.docs.map(d => ({ ...d, key: d._id }))));
  });
};

const renderItem = ({ item }) => (
  <View>
    <Text>{moment(item.added).startOf('hour').fromNow()}</Text>
    {item.photo && (
      <Image
        source={{uri: `http://localhost:5000/${item.photo}`}}
        style={styles.carImage}
        />
      )
    }
  </View>
);

const HomeScreen = ({ feed }) => (
  <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.welcomeContainer}>
        <FlatList
          data={feed}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  </View>
);


export default (
  setStatic({
    navigationOptions: {
      header: null,
    },
  }),
  withState('feed', [], 'setFeed'),
  lifecycle({
  componentDidMount() {
    fetchFeed().then(feed => {
      this.setState({ feed });
    });
  },
})
)(HomeScreen);
