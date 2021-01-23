import { TvShowDetails } from './TvShowDetails';
import { UserTvShow } from './UserTvShow';

export interface TvShowReminders {
  idTvShowReminder: number;
  userTvShow: UserTvShow;
  tvShowDetails: TvShowDetails;
  completed: boolean;
  currentSeason: number;
  currentEpisode: number;
  personalRating: number;
}
