// Providers.tsx (or wherever you setup your global providers)
'use client';

import { store, persistor } from '@/redux/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Toaster } from 'sonner';
import SocialLoginModal from './_components/modal/SocialLogin';
import { FirebaseAuthProvider, useFirebaseAuth } from '@/context/AuthContext';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useFirebaseAuth();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {!user && <SocialLoginModal isOpen={!user} onClose={() => {}} />}
      {children}
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FirebaseAuthProvider>
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
            onLoad={() => console.log('Maps API has loaded.')}
          >
            <AuthGate>{children}</AuthGate>
          </APIProvider>
        </FirebaseAuthProvider>
      </PersistGate>
      <Toaster />
    </Provider>
  );
}
