import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { COLOR, ThemeContext, getTheme, ListItem } from 'react-native-material-ui';
import Button from '../components/Button';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
       <ThemeContext.Provider value={getTheme(uiTheme)}>
          <ScrollView>
            <Text>{'Hola Mundo'}</Text>

              <ListItem
                divider
                dense
                numberOfLines='dynamic'
                leftElement={(<Text>Pepe luis</Text>)}

                rightElement={(<Text>22 minutes ago</Text>)}
                children={(<Text>Image</Text>)}
                onPress={() => {}}
              />
              <ListItem
                divider
                dense
                numberOfLines='dynamic'
                leftElement={(<Text>Pepe luis</Text>)}

                rightElement={(<Text>22 minutes ago</Text>)}
                children={(<Text>Image</Text>)}
                onPress={() => {}}
              />
              <ListItem
                divider
                dense
                numberOfLines='dynamic'
                leftElement={(<Text>Pepe luis</Text>)}

                rightElement={(<Text>22 minutes ago</Text>)}
                children={(<Text>Image</Text>)}
                onPress={() => {}}
              />
          </ScrollView>
       </ThemeContext.Provider>
    );
  }
}
