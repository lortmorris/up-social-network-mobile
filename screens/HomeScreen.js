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

import { ListItem } from 'react-native-material-ui';
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
  carImage: {
    width: 100,
    height: 80,
    marginTop: 3,
  },
  ratingText: {
    fontSize: 20,
    color: 'rgba(0,200,0, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  itemTotalLikesText: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(80,80,80, 1)',
    textAlign: 'left',
  },
  itemTotalCommentsText: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(80,80,80, 1)',
    textAlign: 'right',
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

    <ListItem
      divider

      numberOfLines='dynamic'
      leftElement={(<Text>{`${item.user.firstname} ${item.user.lastname}`}</Text>)}
      rightElement={(<Text style={styles.timeText}>{moment(item.added).startOf('hour').fromNow()}</Text>)}
      children={(<Text>Image</Text>)}
      onPress={() => {}}
      centerElement={(
        <View>
            {item.photo && (
              <View>
                <Image
                  source={{uri: `http://localhost:5000/${item.photo}`}}
                  style={styles.carImage}
                  />
              </View>
              )
            }
            {item.comment && (
              <View>
                <MonoText>{item.comment}</MonoText>
              </View>
              )
            }
            {item.rating && (
              <View>
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              )
            }

          <View>
            <Text style={styles.itemTotalLikesText}>Likes: {item.totalLikes}</Text>
            <Text style={styles.itemTotalCommentsText}>Comments: {item.totalComments}</Text>
          </View>
        </View>
      )}
    />

);

const HomeScreen = ({ feed }) => (
  <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={feed}
          renderItem={renderItem}
        />
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
