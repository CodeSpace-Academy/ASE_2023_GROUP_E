import path from 'path';
import { Spinner } from 'flowbite-react';
import HomeWithBackground from '../component/home-page/HomeWithBackground';
import ErrorMessage from '../component/Error/ErrorMessage';

const fs = require('fs');

export default function Home({ hasEnvFile, hasKey }) {
  if (window.location.href.includes('localhost:')) {
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
