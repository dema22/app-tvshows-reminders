import { PageDescription } from "./PageDescription";
import { TvShowReminder } from "./TvShowReminder";

export interface PageResponseReminder {
    items: TvShowReminder[];
    pageDescriptionDTO: PageDescription;
}