import { TvShowDetails } from './TvShowDetails';
import { UserTvShow } from './UserTvShow';

export interface TvShowReminder {
  idTvShowReminder: number;
  userTvShowDTO: UserTvShow;
  tvShowDetailsResponseDTO: TvShowDetails;
  completed: boolean;
  currentSeason: number;
  currentEpisode: number; 
  personalRating: number;
}
