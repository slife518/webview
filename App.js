
import React, { useEffect, useState, useRef } from "react";

import {
  Platform,
  BackHandler,
  Dimensions,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { WebView } from "react-native-webview";
const BACKGROUND_COLOR = "#FFFFFF";

export default function App() {
    
  const WEBVIEW = useRef()
    
  const [backButtonEnabled, setBackButtonEnabled] = useState(false)
  const [loading, setLoading] = useState(false)

  // Webview content loaded
  function webViewLoaded() {
    setLoading(false)
    setBackButtonEnabled(true);
  };
 
  // Webview navigation state change
  function onNavigationStateChange(navState) {
    setBackButtonEnabled(navState.canGoBack)
  
  };
 
  useEffect(() => {
    // Handle back event
    function backHandler() {
      if (backButtonEnabled) {
        WEBVIEW.current.goBack();
        return true;
      }
    };
    // Subscribe to back state vent
    BackHandler.addEventListener("hardwareBackPress", backHandler);
 
    // Unsubscribe
    return () => BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, [backButtonEnabled])

 
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      <StatusBar style="auoto" />

        <WebView
          // style ={{marginTop :30,}}
          onLoad={webViewLoaded}
          ref={WEBVIEW}
          // javaScriptEnabled={true}
          onNavigationStateChange={onNavigationStateChange}
          // onLoad ={(a)=>setWebViewStack(webViewStack+1)}
          onLoadStart={(e) => {
          }}
          onLoadEnd={(e) => {
          }}
          renderError={(e) => {
          }}
          source={{ uri: "http://172.24.137.25:3000" }}
        />
      
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
