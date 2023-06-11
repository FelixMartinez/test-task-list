import { useEffect } from 'react';
import { useAuth } from '8base-react-sdk';
import { Loading } from '@/src/components/ui/Loading';

export default function Home() {
  const { authClient } = useAuth();

  useEffect(() => {
    authClient.authorize();
  }, [authClient]);

  return <Loading />;
}
