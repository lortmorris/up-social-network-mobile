import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import { compose, setStatic, lifecycle, withState } from 'recompose';
import { MonoText } from '../components/StyledText';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  itemContainer: {
    flex: 1,
    height: 180,
    width: 300,
    borderColor: 'rgba(200,200,200, 1)',
    borderWidth: 1,
    marginTop: 4,
    padding: 2
  },
  itemContainerHeader: {
    flexDirection: 'column',
  },
  carImage: {
    width: 100,
    height: 80,
    marginTop: 3,
  },
  usernameText: {
    fontSize: 14,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(96,100,109, 0.5)',
    lineHeight: 24,
    textAlign: 'right',
  },
  ratingText: {
    fontSize: 20,
    color: 'rgba(0,200,0, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  itemTotalLikesText: {
    fontSize: 12,
    color: 'rgba(80,80,80, 1)',
    textAlign: 'left',
  },
  itemTotalCommentsText: {
    fontSize: 12,
    color: 'rgba(80,80,80, 1)',
    textAlign: 'left',
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
  <View style={styles.itemContainer}>
    <View style={styles.itemContainerHeader}>
      <Text style={styles.usernameText}>{`${item.user.firstname} ${item.user.lastname}`}</Text>
      <Text style={styles.timeText}>{moment(item.added).startOf('hour').fromNow()}</Text>
    </View>
    {item.photo && (
      <Image
        source={{uri: `http://localhost:5000/${item.photo}`}}
        style={styles.carImage}
        />
      )
    }
    {item.comment && (
      <MonoText>{item.comment}</MonoText>
      )
    }
    {item.rating && (
      <Text style={styles.ratingText}>{item.rating}</Text>
      )
    }

    <View>
      <Text style={styles.itemTotalLikesText}>Likes: {item.totalLikes}</Text>
      <Text style={styles.itemTotalCommentsText}>Comments: {item.totalComments}</Text>
    </View>
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
