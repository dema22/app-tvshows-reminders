import { BasicTvShowInfo } from "./BasicTvShowInfo";
import { User } from "./User";
import { UserTvShow } from "./UserTvShow";

export interface TvShowReminderEntity {
    user: User;
    basicTvShowInfo?: BasicTvShowInfo;
    userTvShow?: UserTvShow;
    completed: boolean;
    currentSeason: number;
    currentEpisode: number;
    personalRating: number;
  }