import EncryptedStorage from 'react-native-encrypted-storage';

class SecureStoreClass {
  constructor() {
    this.keysMap = new Map();
  }

  // Methode zum Speichern eines Wertes
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
      this.keysMap.set(key, true); // Schlüssel zur Map hinzufügen
    } catch (error) {
      console.log('Fehler beim Speichern:', error);
    }
  }

  // Methode zum Aktualisieren eines Wertes
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
        console.log('Fehler beim Aktualisieren:', error);
      }
    } else {
      console.log('Schlüssel existiert nicht.');
    }
  }

  async get(key) {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (error) {
      console.log('Fehler beim Abrufen des Schlüssels:', error);
    }
  }

  // Methode zum Löschen eines Wertes
  async remove(key) {
    if (this.keysMap.has(key)) {
      try {
        await EncryptedStorage.removeItem(key);
        this.keysMap.delete(key); // Schlüssel aus der Map entfernen
      } catch (error) {
        console.log('Fehler beim Entfernen:', error);
      }
    } else {
      console.log('Schlüssel existiert nicht.');
    }
  }

  // Methode zum Entfernen aller Schlüssel und Werte
  async clear() {
    try {
      const keys = await EncryptedStorage.getAllKeys();
      if (keys) {
        for (const key of keys) {
          await EncryptedStorage.removeItem(key);
        }
      }
      this.keysMap.clear(); // Map leeren
    } catch (error) {
      console.log('Fehler beim Leeren des Speichers:', error);
    }
  }
}
const SecureStorage = new SecureStoreClass();
export { SecureStoreClass };
export default SecureStorage;
