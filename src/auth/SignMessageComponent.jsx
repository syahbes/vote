import React from 'react';
import { useSignMessage } from 'wagmi';

function SignMessageComponent() {
  const { data, error, isLoading, signMessage } = useSignMessage();

  const handleSignMessage = async () => {
    try {
      const message = 'Sign this message to authenticate';
      await signMessage({ message });
      // The signature will be available in the `data` variable after this completes
    } catch (err) {
      console.error('Error signing message:', err);
    }
  };

  React.useEffect(() => {
    if (data) {
      console.log('Message signed:', data);
      // Here you would typically send this signature to your backend
    }
  }, [data]);

  return (
    <div>
      <button onClick={handleSignMessage} disabled={isLoading}>
        {isLoading ? 'Signing...' : 'Sign Message'}
      </button>
      {error && <div>Error: {error.message}</div>}
      {data && <div>Signature: {data}</div>}
    </div>
  );
}

export default SignMessageComponent;