import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { colors } from '../../../../styles';

const PaymentBadge = () => {
  return (
    <View style={styles.container}>
      <Image
        // eslint-disable-next-line no-undef
        source={require('../../../../../assets/images/applepay.png')}
        style={styles.image}
      />
      <Image
        // eslint-disable-next-line no-undef
        source={require('../../../../../assets/images/googlepay.png')}
        style={styles.image}
      />
      <Image
        // eslint-disable-next-line no-undef
        source={require('../../../../../assets/images/klarna.png')}
        style={styles.image}
      />
      <Image
        // eslint-disable-next-line no-undef
        source={require('../../../../../assets/images/mastercard.png')}
        style={styles.image}
      />
      <Image
        // eslint-disable-next-line no-undef
        source={require('../../../../../assets/images/visa.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
    backgroundColor: colors.lightBlue,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  image: {
    width: 50, // Set your width
    height: 50, // Set your height
    resizeMode: 'contain',
  },
});

export default PaymentBadge;
