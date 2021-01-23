import { PageDescription } from "./PageDescription";
import { TvShowReminders } from "./TvShowReminders";

export interface PageResponseReminder {
    reminders: TvShowReminders[];
    pageDescription: PageDescription;
}