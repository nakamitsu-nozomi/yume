import {createLazyFileRoute} from '@tanstack/react-router';
import {useCallback} from 'react';
import {PrefectureList} from '../features/prefecture/components/PrefectureList';
import type {AggregatePrefecture} from '../features/prefecture/utils/prefecture.ts';

const Index = () => {
  const handleChecked = useCallback((aggregatePrefecture: AggregatePrefecture) => {
    console.log('aggregatePrefecture', aggregatePrefecture);
  }, []);

  return <PrefectureList onChecked={handleChecked} />;
};

export const Route = createLazyFileRoute('/')({
  component: Index,
});
