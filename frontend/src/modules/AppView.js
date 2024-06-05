import { ShopifyCheckoutSheetProvider } from '@shopify/checkout-sheet-kit';
import React, { createContext, useState } from 'react';
import useAuthListener from '../hooks/auth/use-auth-listener';
import useSyncAccountChanges from '../hooks/context/use-change-listener';
import Navigator from './navigation/Navigator';
import ToastProviderWrapper from './provider/ToastProvider';

export const AccountContext = createContext([]);

export default function AppView() {
  const [accountContext, setAccountContext] = useState(null);
  useSyncAccountChanges(accountContext); // syncs automatic the accountCtx state with the user data in the firestore db
  useAuthListener(accountContext, setAccountContext); // syncs the accountCtx with the firebase auth state if the auth state changes
  // it creates also a new account if no one is found

  return (
    <AccountContext.Provider value={[accountContext, setAccountContext]}>
      <ToastProviderWrapper>
        <ShopifyCheckoutSheetProvider>
          <Navigator onNavigationStateChange={() => {}} />
        </ShopifyCheckoutSheetProvider>
      </ToastProviderWrapper>
    </AccountContext.Provider>
  );
}
