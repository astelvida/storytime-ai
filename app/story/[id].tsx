import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGlobalSearchParams } from 'expo-router';
import { getStoryById } from '@/Database';
import { useSQLiteContext } from 'expo-sqlite';
import FullPageLoadingOverlay from '@/components/FullPageLoadingOverlay';
import { StoryView } from '../StoryView';

export default function StoryById() {
  const db = useSQLiteContext();
  const params = useGlobalSearchParams();

  const { data, isPending } = useQuery({
    queryKey: ['story', params.id],
    queryFn: async () => {
      const result = await getStoryById(db, params.id);
      return result;
    },
  });

  if (isPending && !data) {
    return <FullPageLoadingOverlay />;
  }

  return <StoryView data={data} />;
}
