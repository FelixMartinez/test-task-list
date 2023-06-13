import { useEffect } from 'react';
import { useAuth } from '8base-react-sdk';
import { Loading } from '@/src/components/ui/Loading';

/**
 * Main page of the application.
 *
 * This page shows a loading screen while authorizing the user
 * using the 8base authentication client.
 *
 * @returns {ReactElement} El componente Home.
 */
export default function Home() {
  const { authClient } = useAuth();

  useEffect(() => {
    // Authorizes the user using the 8base authentication client
    authClient.authorize();
  }, [authClient]);

  return <Loading />;
}
