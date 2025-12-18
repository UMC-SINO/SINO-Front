import Happy from '../assets/emojis/center/Happy.svg?react';
import Afraid from '../assets/emojis/center/Afraid.svg?react';
import Angry from '../assets/emojis/center/Angry.svg?react';
import Boredom from '../assets/emojis/center/Boredom.svg?react';
import Joyful from '../assets/emojis/center/Joyful.svg?react';
import Sad from '../assets/emojis/center/Sad.svg?react';
import Shameful from '../assets/emojis/center/Shameful.svg?react';
import Smile from '../assets/emojis/center/Smile.svg?react';
import Unrest from '../assets/emojis/center/Unrest.svg?react';
import Worried from '../assets/emojis/center/Worried.svg?react';
import type { Emoji } from '@/types/emoji';

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
