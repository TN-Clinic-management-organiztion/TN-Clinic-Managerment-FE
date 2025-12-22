"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { usePushNotification } from '../hooks/usePushNotification';

export default function Home() {
  // const { data: session } = useSession();
  // const { token, notification } = usePushNotification();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.replace("/auth/signIn");
  //   }
  // }, [session, router]);

  return (
    <div className="min-h-screen bg-bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl-regular text-primary-600">Coffee Shop Management</h1>
      {/* {token && <p>FCM Token: {token}</p>}
      {notification && <p>Notification: {notification.title}</p>} */}
    </div>
  );
}
