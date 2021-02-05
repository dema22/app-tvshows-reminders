import { User } from "./User";

export interface UserTvShowEntity {
  //idTvShowCreatedByUser?: number;
  user: User;
  nameTvShow: string;
  genre?: string;
  productionCompany?: string;
}
