import React from 'react';
import { useMutationState } from '@tanstack/react-query';
import { useNarrateStory } from '@/hooks/useNarrateStory';
import { StoryView } from './StoryView';
import { Text } from 'react-native';

export default function NewStory() {
  const data = useMutationState({
    filters: { mutationKey: ['createStory'] },
    select: (mutation) => mutation.state.data,
  });

  const last = data[data.length - 1];

  if (!last) {
    return <Text>OOPS! NO NEW STORY DATA</Text>;
  }

  return <StoryView data={last} />;
}
