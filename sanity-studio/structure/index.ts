// import React from "react"
// import { Icon } from "../components"

export const structure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Website")
        // .icon(() => <Icon emoji="🌿" />)
        .child(S.documentTypeList("page").title("Website")),
      S.listItem()
        .title("Gifts")
        // .icon(() => <Icon emoji="🎁" />)
        .child(
          S.list()
            .title("Gifts")
            .items([
              S.listItem()
                .title("Available")
                // .icon(() => <Icon emoji="✨" />)
                .child((giftId) =>
                  S.documentList()
                    .title("Available gifts")
                    .filter("!isReserved")
                ),
              S.listItem()
                .title("Reserved")
                // .icon(() => <Icon emoji="✔️" />)
                .child((giftId) =>
                  S.documentList().title("Reserved gifts").filter("isReserved")
                ),
              ,
              S.listItem()
                .title("All gifts")
                // .icon(() => <Icon emoji="🎁" />)
                .child(S.documentTypeList("gift").title("All gifts")),
            ])
        ),
      S.listItem()
        .title("Persons")
        // .icon(() => <Icon emoji="🐱" />)
        .child(S.documentTypeList("person").title("Persons")),
      S.listItem()
        .title("RSVPs")
        // .icon(() => <Icon emoji="📬" />)
        .child(S.documentTypeList("rsvp").title("RSVPs")),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["website", "page", "person", "gift", "rsvp"].includes(
            listItem.getId()
          )
      ),
    ])
