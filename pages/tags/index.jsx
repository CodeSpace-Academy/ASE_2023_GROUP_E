import React, { useEffect, useState } from 'react';
import TagsListt from '@/component/tags/tagsList';

export default function TagsList() {
  const [uniqueTags, setUniqueTags] = useState([]);
  const [ tagsState, setTagsState] = useState(null)

  useEffect(() => {

    fetch(`/api/recipes/preview?skip=${50}&limit=${25}`)
      .then(res => res.json())
      .then(data => setTagsState(data.recipes))
  })

  useEffect(() => {
    if (tagsState) {
      const allTags = tagsState.reduce((tags, recipe) => {
        return tags.concat(recipe.tags);
      }, []);

      const uniqueTags = [...new Set(allTags)]; // Remove duplicates
      setUniqueTags(uniqueTags);
    }
  }, [tagsState]);

  return (
    <div>
      <TagsListt recipes={uniqueTags} />
    </div>
  );
}
