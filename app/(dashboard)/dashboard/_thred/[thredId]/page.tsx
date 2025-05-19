// /frontend/pages/dashboard/thread/[threadId].tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ThreadPage = () => {
  const [threadStatus, setThreadStatus] = useState<string>('pending');
  const [message, setMessage] = useState<string>('');
  const [isPartOfThread, setIsPartOfThread] = useState<boolean>(false);
  const router = useRouter();
  const { threadId } = router.query;

  useEffect(() => {
    if (threadId) {
      fetch(`/api/threads/${threadId}`)
        .then((response) => response.json())
        .then((data ) => {
          if (data.status === 'approved') {
            setThreadStatus('approved');
            setMessage('Thread is approved and you are now part of it!');
            setIsPartOfThread(true);
          } else {
            setThreadStatus('pending');
            setMessage('Your request is pending approval by admin.');
            setIsPartOfThread(false);
          }
        })
        .catch((error) => setMessage('Error fetching thread status.'));
    }
  }, [threadId]);

  const handleScan = async () => {
    const response = await fetch('/api/scan-thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, status: 'pending' }),
    });

    const data = await response.json();
    if (data.success) {
      setMessage('Your scan request has been sent. Await admin approval.');
    } else {
      setMessage('There was an error.');
    }
  };

  return (
    <div>
      <h1>Thread {threadId}</h1>
      <p>{message}</p>
      {!isPartOfThread && (
        <button onClick={handleScan}>Scan QR Code</button>
      )}
      {isPartOfThread && (
        <div>
          <h2>Welcome to the Thread!</h2>
          <p>This is the content of the thread...</p>
        </div>
      )}
    </div>
  );
};

export default ThreadPage;
