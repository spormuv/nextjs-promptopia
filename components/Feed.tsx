'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import PromptCard from './PromptCard';

type Post = {
  creator?: {
    email: string;
    username: string;
    _id: string;
  };
  _id: string;
  prompt: string;
  tag: string;
};

type PromptCardListProps = {
  data: Post[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post: Post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
