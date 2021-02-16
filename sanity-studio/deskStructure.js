import React from "react"
import S from "@sanity/desk-tool/structure-builder"
import { PersonPreview, GiftPreview, Icon } from "./components"

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (schemaType === "gift") {
    return S.document().views([
      S.view.form(),
      S.view.component(GiftPreview).title("Preview"),
    ])
  }

  if (schemaType === "person") {
    return S.document().views([
      S.view.component(PersonPreview).title("Summary"),
      S.view.form(),
    ])
  }

  return S.document().views([S.view.form()])
}

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Website")
        .icon(() => <Icon emoji="🌿" />)
        .child(S.document().schemaType("website").documentId("websiteContent")),
      S.listItem()
        .title("Gifts")
        .icon(() => <Icon emoji="🎁" />)
        .child(
          S.list()
            .title("Gifts")
            .items([
              S.listItem()
                .title("Available")
                .icon(() => <Icon emoji="✨" />)
                .child((giftId) =>
                  S.documentList()
                    .title("Available gifts")
                    .filter("!isReserved")
                ),
              S.listItem()
                .title("Reserved")
                .icon(() => <Icon emoji="✔️" />)
                .child((giftId) =>
                  S.documentList().title("Reserved gifts").filter("isReserved")
                ),
              ,
              S.listItem()
                .title("All gifts")
                .icon(() => <Icon emoji="🎁" />)
                .child(S.documentTypeList("gift").title("All gifts")),
            ])
        ),
      S.listItem()
        .title("Persons")
        .icon(() => <Icon emoji="🐱" />)
        .child(S.documentTypeList("person").title("Persons")),
    ])
