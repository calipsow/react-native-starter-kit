import React, { createContext, useState } from 'react';
import useAuthContextListener from '../hooks/auth/use-auth-listener';
import useSyncAccountChanges from '../hooks/context/use-change-listener';
import Navigator from './navigation/Navigator';
import ToastProviderWrapper from './provider/ToastProvider';

export const AccountContext = createContext([]);

export default function AppView() {
  const [accountContext, setAccountContext] = useState(null);
  // syncs automatic the user data in the accountCtx state with the database, see more about in the app-context docs it in the docs
  useSyncAccountChanges(accountContext); 
  // it creates an new account entry in the databse if no entry is found
  // syncs the firebase_auth_data property in the accountCtx state if the auth state changes
  // more about this in the app-context docs
  useAuthContextListener(accountContext, setAccountContext); 
  

  return (
    <AccountContext.Provider value={[accountContext, setAccountContext]}>
      <ToastProviderWrapper>
        <Navigator onNavigationStateChange={() => {}} />
      </ToastProviderWrapper>
    </AccountContext.Provider>
  );
}
