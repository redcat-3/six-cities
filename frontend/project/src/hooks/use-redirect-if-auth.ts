import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationStatus } from '../store/user-process/selectors';
import { useAppSelector } from '.';
import { AuthorizationStatus } from '../const';

export function useRedirectingIfAuth(link: string): void {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authorizationStatus === AuthorizationStatus.Auth &&
      link &&
      navigate &&
      true
    ) {
      navigate(link);
    }
  }, [authorizationStatus, link, navigate]);
}
