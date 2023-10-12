import React, { useEffect, useState } from 'react';
import { run } from '@/database';
import TagsListt from '@/component/tags/tagsList';

export default function TagsList({ results }) {
  const [uniqueTags, setUniqueTags] = useState([]);

  useEffect(() => {
    if (results) {
      const allTags = results.reduce((tags, recipe) => {
        return tags.concat(recipe.tags);
      }, []);

      const uniqueTags = [...new Set(allTags)]; // Remove duplicates
      setUniqueTags(uniqueTags);
    }
  }, [results]);

  return (
    <div>
      <TagsListt recipes={uniqueTags} />
    </div>
  );
}

export async function getStaticProps() {
  const results = await run();

  return {
    props: {
      results,
    },
  };
}