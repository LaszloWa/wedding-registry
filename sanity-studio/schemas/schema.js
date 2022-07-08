import gift from "./gift"
import website from "./website"
import person from "./person"
import rsvp from "./rsvp"
import page from "./page"
import info from "./info"
import hotel from "./hotel"

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [gift, website, person, page, rsvp, info, hotel]
