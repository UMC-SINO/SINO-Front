import { Afraid, Boredom, Happy, Joyful, Sad, Shameful, Unrest, Worried } from '@/assets';
import type { Emoji } from '@/types/emoji';
import { Angry, Smile } from 'lucide-react';

export const emojis: Emoji[] = [
  { key: 'Happy', label: 'Happy', Comp: Happy },
  { key: 'Afraid', label: 'Afraid', Comp: Afraid },
  { key: 'Angry', label: 'Angry', Comp: Angry },
  { key: 'Boredom', label: 'Boredom', Comp: Boredom },
  { key: 'Joyful', label: 'Joyful', Comp: Joyful },
  { key: 'Sad', label: 'Sad', Comp: Sad },
  { key: 'Shameful', label: 'Shameful', Comp: Shameful },
  { key: 'Smile', label: 'Smile', Comp: Smile },
  { key: 'Unrest', label: 'Unrest', Comp: Unrest },
  { key: 'Worried', label: 'Worried', Comp: Worried },
];
