'use client';

import Form from '@/components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export interface IPost {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>({ prompt: '', tag: '' });
  const { data: session }: { data: any } = useSession();
  const router = useRouter();

  const createPrompt = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
