import React, { useEffect, useState } from 'react';
import { run } from '@/database/fetchtdatalength';
import TagsListt from '@/component/tags/tagsList';

export default function TagsList({ documents }) {
  const [uniqueTags, setUniqueTags] = useState([]);

  useEffect(() => {
    if (documents) {
      const allTags = documents.reduce((tags, recipe) => {
        return tags.concat(recipe.tags);
      }, []);

      const uniqueTags = [...new Set(allTags)]; // Remove duplicates
      setUniqueTags(uniqueTags);
    }
  }, [documents]);

  return (
    <div>
      <TagsListt recipes={uniqueTags} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const {documents} = await run();

    return {
      props: {
        documents,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch data. Please check your network connection.',
      },
    };
  }
}
