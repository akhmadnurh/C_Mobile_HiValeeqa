import React from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import NumberFormat from 'react-number-format';

export function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

export function Prices(props) {
  return (
    <NumberFormat
      decimalSeparator=","
      displayType={'text'}
      thousandSeparator="."
      fixedDecimalScale={2}
      prefix={'Rp '}
      suffix={',00'}
      {...props}
    />
  );
}

export let deviceWidth = Dimensions.get('window').width;
export let deviceHeight = Dimensions.get('window').height;
