import { useEffect, useState } from 'react';
import path from 'path';
import { Spinner } from 'flowbite-react';
import HomeWithBackground from '../component/home-page/HomeWithBackground';
import ErrorMessage from '../component/Error/ErrorMessage';
// Import the 'fs' module for file system operations.
const fs = require('fs');
/**
 * Home component representing the landing page.
 * @param {boolean} hasEnvFile - Indicates whether the .env file is present.
 * @param {boolean} hasKey - Indicates whether the .env file contains the 'MONGODB_URI' key.
 * @returns {JSX.Element} - The home component.
 */
export default function Home({ hasEnvFile, hasKey }) {
  // State to check if the application is running on localhost.
  const [checksPath, setCheckPath] = useState(null);

  // useEffect hook to set the checkPath state based on the window location.
  useEffect(() => {
    setCheckPath(window.location.href.includes('localhost:'));
  }, []);
  /**
   * The following conditional checks are specific to localhost.
   * If running on localhost and the .env file or 'MONGODB_URI' key is missing,
   * it renders a loading spinner and an error message.
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

  // Render the main content, including the HomeWithBackground component.
  return (
    <main>
      <HomeWithBackground />
      {' '}
      {/* Render the HomeWithBackground component. */}
    </main>
  );
}

/**
 * Server-side function to get props for the Home component.
 * Checks if the .env file is present and if it contains the 'MONGODB_URI' key.
 * @returns {Object} - Props for the Home component.
 */
export async function getServerSideProps() {
  // Resolve the path to the .env file.
  const envFilePath = path.resolve('.env');

  // Initialize variables to track the presence of the .env file and the 'MONGODB_URI' key.
  let hasEnvFile = false;
  let hasKey = false;

  try {
    // Attempt to access the .env file.
    await fs.promises.access(envFilePath);
    hasEnvFile = true;

    // If the .env file is present, read its content to check for the 'MONGODB_URI' key.
    if (hasEnvFile) {
      const envContent = await fs.promises.readFile(envFilePath, 'utf8');
      hasKey = envContent.includes('MONGODB_URI');
    }
  } catch (error) {
    // Catch any errors and set hasEnvFile to false if the file is not accessible.
    hasEnvFile = false;
  }
  // Return props for the Home component based on the checks.
  return {
    props: {
      hasEnvFile,
      hasKey,
    },
  };
}
