'use client';

import { store, persistor } from '@/redux/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Toaster } from 'sonner';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
          onLoad={() => console.log('Maps API has loaded.')}
        >
          {children}
        </APIProvider>
      </PersistGate>
      <Toaster />
    </Provider>
  );
}
