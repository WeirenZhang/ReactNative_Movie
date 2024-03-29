import { RouteProp } from '@react-navigation/native';
import { RootNavigation, RootStackParamList } from '@/navigator/Router';

import { BackPressComponent } from '@/utils/BackPressComponent';
import { goBack } from '@/utils/Utils';
import React, { RefObject } from 'react';

import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';

interface IProps {
  route: RouteProp<RootStackParamList, 'WebViewPage'>;
}

class WebViewPage extends React.Component<IProps> {
  webview: RefObject<WebView> = React.createRef();
  canGoBack = false;
  backPress?: BackPressComponent;

  constructor(props: IProps) {
    super(props);
    this.backPress = new BackPressComponent({
      handler: this.onBackPress,
    });
  }

  componentDidMount() {
    this.backPress?.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress?.componentWillUnmount();
  }

  handleWebViewNavigationStateChange = (newNavState: WebViewNavigation) => {
    this.canGoBack = newNavState.canGoBack;
  };

  onBackPress = () => {
    this.onPress();
    return true;
  };

  onPress = () => {
    if (this.canGoBack) {
      this.webview?.current?.goBack();
    } else {
      goBack();
    }
  };

  refWebView = (ref: RefObject<WebView>) => {
    this.webview = ref;
  };

  render() {
    const runFirst =
      'document.getElementsByClassName("share-bar-container")[0].style.display=\'none\';' +
      'document.getElementsByClassName("footer-container j-footer-container")[0].style.display=\'none\';' +
      'document.getElementsByClassName("kyt-promotion-bar-positioner")[0].style.display=\'none\';';
    const { route } = this.props;
    return (
      <WebView
        ref={this.webview}
        source={{
          uri: route.params.url,
        }}
        mixedContentMode={'always'}
        startInLoadingState
        showsVerticalScrollIndicator={false}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
        onMessage={(e: WebViewMessageEvent) => {
          const data = JSON.parse(e.nativeEvent.data);
          const { error, evaluation } = data;
          if (error === null) {
            // The JS evaluation succeeded!
            console.log(`The expression evaluated as: ${evaluation}`);
          } else {
            // The JS evaluation failed
            console.log(
              `The expression evaluation failed, with message: ${error}`,
            );
          }
        }}
        injectedJavaScriptForMainFrameOnly={true}
        injectedJavaScript={runFirst}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
  },
  back: {
    paddingHorizontal: 15,
  },
  titleContainer: {
    position: 'absolute',
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WebViewPage;