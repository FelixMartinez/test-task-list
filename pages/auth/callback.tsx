import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import { useAuth } from '8base-react-sdk';
import ERROR_CODES from '@8base/error-codes';
import { useApolloClient, useQuery } from '@apollo/client';

import { AUTH_PROFILE_ID } from '@/src/shared/constants';
import { USER_SIGN_UP_MUTATION, CURRENT_USER_QUERY } from '@/src/shared/graphql';
import { Loading } from '@/src/components/ui/Loading';
import { httpLink, setAuthToken } from '@/src/apollo';

const authorizeUser = async ({ authClient, apolloClient, router, data }: any) => {
  /* Get authResult from auth client after redirect */
  const { idToken, email, firstName, lastName } = await authClient.getAuthorizedData();
  /* Add the idToken to the auth state */
  authClient.setState({ token: idToken });

  const singUpUser = () =>
    apolloClient.mutate({
      mutation: USER_SIGN_UP_MUTATION,
      variables: {
        user: {
          email,
          firstName,
          lastName,
        },
        authProfileId: AUTH_PROFILE_ID,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
  }).then((datas: any) => {
    console.log('datas: ', datas);
    return true;
  }).catch((err: any) => {
    console.log('err: ', err);
    return true;
  });

  apolloClient
    .query({
      query: CURRENT_USER_QUERY,
      errorPolicy: 'all',
    })
    .then((props: any) => {
      const { errors } = props;
      console.log('props: ', props);
      /* Check user exist error */
      if (errors) {
        console.log('errors: ', errors);
        if (Array.isArray(errors)) {
          if (errors.some((err) => err?.code === ERROR_CODES.UserNotFoundErrorCode)) {
            /* If user does does not exist at 8base - create user */
            console.log('data1: ', data);
            return singUpUser();
          }
        }

        if (errors?.code === ERROR_CODES.UserNotFoundErrorCode) {
          /* If user does does not exist at 8base - create user */
          console.log('data2: ', data);
          return singUpUser();
        }
      }
    })
    .finally(() => {
      /* Redirect user to root path */
      router.replace('/task/detail');
      setTimeout(() => {
        router.reload();
      }, (1200))
    });
};

const CallbackContainer = () => {
  const { authClient, authState } = useAuth();
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, client } = useQuery(CURRENT_USER_QUERY);
  if (authState.token) {
    client.setLink(setAuthToken(authState.token).concat(httpLink));
  }

  
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      authorizeUser({ authClient, apolloClient, router, data });
      console.log('3333');
    }
  }, []);

  return <Loading />;
};

export default CallbackContainer;