import { PageDescription } from "./PageDescription";
import { TvShowReminders } from "./TvShowReminders";

export interface PageResponseReminder {
    items: TvShowReminders[];
    pageDescriptionDTO: PageDescription;
}