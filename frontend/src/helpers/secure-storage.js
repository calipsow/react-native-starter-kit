import EncryptedStorage from 'react-native-encrypted-storage';

class SecureStoreClass {
  constructor() {
    this.keysMap = new Map();
  }

  async save(key, value) {
    try {
      if (!value)
        return console.warn(
          'Can not store falsy value to store for key',
          key,
          'value:',
          value,
        );

      await EncryptedStorage.setItem(
        key,
        typeof value !== 'string' ? JSON.stringify(value) : value,
      );
      this.keysMap.set(key, true); 
    } catch (error) {
      console.log('Error saving:', error);
    }
  }


  async update(key, newValue) {
    if (this.keysMap.has(key)) {
      if (!newValue)
        return console.warn(
          'Can not store falsy value to store for key',
          key,
          'value:',
          newValue,
        );
      try {
        await EncryptedStorage.setItem(
          key,
          typeof newValue !== 'string' ? JSON.stringify(newValue) : newValue,
        );
      } catch (error) {
        console.log('Error when updating:', error);
      }
    } else {
      console.log('Key does not exist.');
    }
  }

  async get(key) {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (error) {
      console.log('Error when retrieving the key:', error);
    }
  }


  async remove(key) {
    if (this.keysMap.has(key)) {
      try {
        await EncryptedStorage.removeItem(key);
        this.keysMap.delete(key); 
      } catch (error) {
        console.log('Error during removal:', error);
      }
    } else {
      console.log('Key does not exist.');
    }
  }


  async clear() {
    try {
      const keys = await EncryptedStorage.getAllKeys();
      if (keys) {
        for (const key of keys) {
          await EncryptedStorage.removeItem(key);
        }
      }
      this.keysMap.clear(); // Map clear
    } catch (error) {
      console.log('Error when emptying the memory:', error);
    }
  }
}
const SecureStorage = new SecureStoreClass();
export { SecureStoreClass };
export default SecureStorage;
