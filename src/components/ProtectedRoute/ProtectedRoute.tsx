import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/StoreContext';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = observer(({ children }) => {
  const { auth } = useStores();
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
});

export default ProtectedRoute;
