import { Participant } from './participant.model';

export interface Meetup {
  id: string;
  title: string;
  description: string;
  formattedDate: string;
  participants: Array<Participant>
  date?: number;
}