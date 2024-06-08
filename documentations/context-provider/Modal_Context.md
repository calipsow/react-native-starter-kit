# Modal Context

The `ModalProvider` wraps the React application or specific components to provide an easy way to manage and display modals based on different triggers such as user actions or application events.

## Features

- **Centralized Modal Management**: Manages all modal dialogs from a single provider at the top level of your application.
- **Flexible Triggering**: Modals can be triggered from anywhere in the component tree using the context.
- **Customizable**: Easily customize modal titles, messages, and buttons. Supports both alert and confirmation modals.
- **Styling**: Modals are styled and can be further customized to match the application's design language.

## Implementation

The Modal Provider Wraps the entire application at `./App.js` and can be used everywhere within the app

```jsx
function App() {
  const [firebase, setFirebase] = useState({});

  useEffect(() => {
    // init firebase resources
    if (firebase.auth && firebase.db && firebase.storage) return;
    // prettier-ignore
    setFirebase({auth, db, app, storage});
  }, [auth, db]);

  return (
    <ModalProvider>
      <Firebase.Provider value={{ ...firebase }}>
        <Provider store={store}>
          <PersistGate
            loading={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <View style={styles.container}>
                <ActivityIndicator color={colors.red} />
              </View>
            }
            persistor={persistor}
          >
            <AppView />
          </PersistGate>
        </Provider>
      </Firebase.Provider>
    </ModalProvider>
  );
}
```

## Using Context to Trigger Modals

Access `ModalContext` in any component to trigger modals:

```jsx
import React, { useContext } from "react";
import { ModalContext } from "./path/to/ModalContext";

const YourComponent = () => {
  const { showModalAlert, showModalConfirmation } = useContext(ModalContext);

  return (
    <View>
      <Button
        title="Show Alert"
        onPress={() => showModalAlert("Alert", "This is an alert modal")}
      />
      <Button
        title="Show Confirm"
        onPress={() =>
          showModalConfirmation(
            "Confirm",
            "Are you sure?",
            () => console.log("Confirmed!"),
            () => console.log("Cancelled!")
          )
        }
      />
    </View>
  );
};
```

## Functionality

- **`showModalAlert`**: Displays an alert modal with a single "OK" button.

  - `title`: String, title of the modal.
  - `captionText`: String, descriptive text shown in the modal.
  - `onSubmit`: Function (optional), called when the user clicks "OK".

- **`showModalConfirmation`**: Displays a confirmation modal with "Confirm" and "Cancel" buttons.
  - `title`: String, title of the modal.
  - `captionText`: String, text displayed in the modal.
  - `onCustomEvent`: Function, called when the user clicks "Confirm".
  - `onCancel`: Function (optional), called when the user clicks "Cancel".

## Conclusion

The `ModalProvider` and `ModalContext` offer a powerful, reusable, and centralized way to handle modal dialogs in React Native applications, enhancing user interaction and reducing boilerplate code across components. Their integration allows for managing complex user interactions through modals in a clean and efficient manner.
