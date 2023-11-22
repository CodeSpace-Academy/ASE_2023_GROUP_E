import { useEffect, useState } from 'react';
import path from 'path';
import { Spinner } from 'flowbite-react';
import HomeWithBackground from '../component/home-page/HomeWithBackground';
import ErrorMessage from '../component/Error/ErrorMessage';

const fs = require('fs');

export default function Home({ hasEnvFile, hasKey }) {
  const [checksPath, setCheckPath] = useState(null);
  useEffect(() => {
    setCheckPath(window.location.href.includes('localhost:'));
  }, []);
  /**
   * The first statement is used so that the error is not triggered
   * when on production.
   * There error handler is specifically made for localhost
   *
   * There error was triggered because it specifically check for the
   * .env file, whick cannot be read.
   */

  if (checksPath) {
    if (!hasKey || !hasEnvFile) {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner />
          <ErrorMessage message=".env file is missing or has no values" />
        </div>
      );
    }
  }

  return (
    <main>
      <HomeWithBackground />
      {' '}
      {/* Render the HomeWithBackground component. */}
    </main>
  );
}

export async function getServerSideProps() {
  const envFilePath = path.resolve('.env');

  let hasEnvFile = false;
  let hasKey = false;
  try {
    await fs.promises.access(envFilePath);
    hasEnvFile = true;

    if (hasEnvFile) {
      const envContent = await fs.promises.readFile(envFilePath, 'utf8');
      hasKey = envContent.includes('MONGODB_URI');
    }
  } catch (error) {
    hasEnvFile = false;
  }

  return {
    props: {
      hasEnvFile,
      hasKey,
    },
  };
}
