import useAuth from 'hooks/useAuth';
import React from 'react'

function Dashboard() {
   const { user, isLoggedIn } = useAuth();
   console.log('Dashboard token:', user);
  return (
    <div>
        {isLoggedIn ? `Welcome, ${user?.username || user?.userid}` : 'Not logged in'}
      </div>
  )
}

export default Dashboard