
import { ViralStyle } from './types';

export const VIRAL_STYLES: { value: ViralStyle, label: string, description: string }[] = [
  {
    value: ViralStyle.Educational,
    label: 'Educational',
    description: 'Provide value and teach something new.'
  },
  {
    value: ViralStyle.BoldContrarian,
    label: 'Bold / Contrarian',
    description: 'Challenge a popular belief in your industry.'
  },
  {
    value: ViralStyle.RelatableStory,
    label: 'Relatable Story',
    description: 'Share a personal experience or struggle.'
  },
  {
    value: ViralStyle.Inspirational,
    label: 'Inspirational',
    description: 'Motivate your audience with a success story.'
  },
  {
    value: ViralStyle.DataDriven,
    label: 'Data-Driven',
    description: 'Use stats and facts to build credibility.'
  },
  {
    value: ViralStyle.QuestionBased,
    label: 'Question-Based',
    description: 'Start a conversation with a thought-provoking question.'
  }
];
