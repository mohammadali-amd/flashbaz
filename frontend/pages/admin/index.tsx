import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@/store/store';

import Loader from '@/components/Loader';

const AdminPage = () => {
   const dispatch = useDispatch()
   const router = useRouter()

   const [isLoading, setIsLoading] = useState(true);

   const { userInfo } = useSelector((state: RootState) => state.auth)

   useEffect(() => {
      if (!userInfo?.isAdmin) {
         router.push('/login');
      } else {
         setIsLoading(false);
      }
   }, [userInfo, router]);


   if (isLoading) {
      return <Loader />
   }

   return (
      <div>
         Admin Page
      </div>
   )
}

export default AdminPage
