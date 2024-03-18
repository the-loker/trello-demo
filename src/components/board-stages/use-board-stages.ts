import { useStagesStore } from '@store/stages';

export const useBoardStages = () => {
  const { stages } = useStagesStore();

  return { stages };
};
