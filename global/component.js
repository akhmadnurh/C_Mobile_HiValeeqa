import React from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {useIsFocused} from '@react-navigation/core';

export function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

export let deviceWidth = Dimensions.get('window').width;
export let deviceHeight = Dimensions.get('window').height;
