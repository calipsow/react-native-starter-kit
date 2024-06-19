import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  appThemeColor,
  screenPadding,
  smallCaptionTextGray,
  smallTextGray,
} from '../../../styles/partials';
import { colors } from '../../../styles';
import Tag from '../../../components/Tag';
import { Dropdown } from '../../../components';
import { bundeslaenderDeutschland } from '../../../constants/constants';
import getFontSize from '../../../functions/ui/resolve-relative-font-size';

export const LocationForm = ({ onChangeLocation = locationState => {} }) => {
  const [location, setLocation] = useState({
    city: '',
    street: '',
    province: bundeslaenderDeutschland[0],
    postCode: '',
    country: 'Deutschland',
  });
  useEffect(() => {
    onChangeLocation(location);
  }, [location]);

  return (
    <React.Fragment>
      <TextInput
        style={[styles.input]}
        placeholder="Strasse und Hausnummer"
        onChangeText={text => setLocation(prev => ({ ...prev, street: text }))}
        placeholderTextColor="#9b9b9b"
      />
      <TextInput
        style={styles.input}
        placeholder="Stadt"
        onChangeText={text => setLocation(prev => ({ ...prev, city: text }))}
        placeholderTextColor="#9b9b9b"
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="Postleitzahl"
          keyboardType="numeric"
          onChangeText={text =>
            setLocation(prev => ({
              ...prev,
              postCode:
                typeof text === 'number' && text
                  ? text
                  : !parseInt(text)
                  ? ''
                  : parseInt(text),
            }))
          }
          placeholderTextColor="#9b9b9b"
        />
        <TextInput
          editable={false}
          style={[styles.input, styles.flex]}
          placeholder="Deutschland"
          onChangeText={text =>
            setLocation(prev => ({ ...prev, country: text }))
          }
          placeholderTextColor="#9b9b9b"
        />
      </View>
      <Dropdown
        selectedIndex={bundeslaenderDeutschland.indexOf(location.province)}
        items={bundeslaenderDeutschland}
        color="#9b9b9b"
        onSelect={(idx, _) =>
          setLocation(prev => ({
            ...prev,
            province: bundeslaenderDeutschland[idx],
          }))
        }
        style={[styles.input, { height: 40, marginBottom: 0, lineHeight: 16 }]}
        borderColor={colors.primaryDark}
      />
    </React.Fragment>
  );
};

const CustomerDataForm = () => {
  return (
    <React.Fragment>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="First Name"
          placeholderTextColor="#9b9b9b"
        />
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="Last Name"
          placeholderTextColor="#9b9b9b"
        />
      </View>
      <TextInput style={styles.input} placeholder="Address" />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="Post Code"
          placeholderTextColor="#9b9b9b"
          keyboardType="numeric"
        />
        <TextInput style={[styles.input, styles.flex]} placeholder="City" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Telephone"
        keyboardType="numeric"
        placeholderTextColor="#9b9b9b"
      />
    </React.Fragment>
  );
};

const PaymentForm = () => {
  return (
    <React.Fragment>
      {/* Payment methods */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pay With Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pay With PayPal</Text>
        </TouchableOpacity>
      </View>
      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#9b9b9b"
      />
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        placeholderTextColor="#9b9b9b"
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="Expiry Date"
          keyboardType="numeric"
          placeholderTextColor="#9b9b9b"
        />
        <TextInput
          style={[styles.input, styles.flex]}
          placeholder="CVC"
          keyboardType="numeric"
          placeholderTextColor="#9b9b9b"
        />
      </View>
      <TextInput style={styles.input} placeholder="Cardholder Name" />

      <TextInput style={styles.input} placeholder="VAT Number (optional)" />
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payText}>Pay - $24.560</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

const CheckoutScreen = ({ navigation, route }) => {
  // You would manage state and add functionality as needed

  return (
    <View style={styles.container}>
      {/* Product  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Image
            source={{
              uri: 'https://callipson.com/cdn/shop/products/enlarge_b00628ef-e501-4ee4-8c0d-7f5ee8a7e1cf.jpg?v=1679520835&width=493',
            }}
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />
          <View style={{ maxWidth: 200 }}>
            <Text
              style={[
                smallCaptionTextGray,
                { fontSize: getFontSize(16), color: colors.bluish },
              ]}
            >
              LED Lamp with Music Induction
            </Text>
            <Text
              style={[
                smallTextGray,
                { fontSize: getFontSize(15), color: colors.bluish },
              ]}
            >
              Photo Color / 6 inches / USB
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexWrap: 'wrap',
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={[
              smallTextGray,
              { fontSize: getFontSize(18), color: colors.bluish },
            ]}
          >
            $66.98
          </Text>
        </View>
      </View>
      {/* Discount */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Discount Code"
          placeholderTextColor="#9b9b9b"
        />
        <TouchableOpacity
          style={[styles.button, { height: 40, padding: 0, maxWidth: 100 }]}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <CustomerDataForm />
      <PaymentForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    backgroundColor: appThemeColor.darkBlue,
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary, // change as needed
    borderRadius: 4,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  buttonText: {
    color: colors.bluish,
  },
  input: {
    backgroundColor: colors.primary,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 4,
    color: colors.bluish,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  flex: {
    flex: 1,
  },
  payButton: {
    backgroundColor: colors.primaryDark, // or the blue color you prefer
    padding: 15,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
