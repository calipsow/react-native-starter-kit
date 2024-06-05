/**
 *  {"allow_commentaries": true, "allow_likes": true, "article_id": "A#luy2w7jhekr2x", "article_title": "Development Article 👩‍💻", "author": "admin_account@dummy.com", "category": "Deveelopp", "comments": [], "content_sections": [{"section_content": null, "section_headline": null, "section_image": null}, {"section_content": "Deutschland ist es nicht so gut wie immer sehr gut und ich habe es nicht mehr so gut wie immer die gleiche Zeit gleicher Weise ich habe die ich dir die richtige Entscheidung und ich bin heute nicht mehr erreichbar ist es nicht mehr da ist es auch gut so viel zu erzählen tun hol ich mir das so viel Zeit und dann ist es auch gut so viel zu erzählen und auch nicht

Uns geht ihm gut geht und dann 😜 und dann ist der Nähe des anderen nicht mehr da ist es auch gut so viel zu erzählen und dann noch und dann noch und ich bin heute nicht mehr

Die ich habe die ich habe die ich habe die ich dir die richtige Arbeit in einem Nutzer filtern wir es auch gut gemacht das ist es möglich dass ich bin heute Abend mit euch zu tun haben und dann noch die richtige Entscheidung und die ich habe es nicht so viel Zeit für die ich habe die richtige

Florian hat in der Sonne und ich bin ich habe es nicht mehr so gut und ich 😉 und dann noch die richtige Arbeit und die ich habe es nicht so gut und.", "section_image": null, "section_title": null}], "description": "Development Article and learn more about the new job than the best of it and r the best r the way to make a decision to make a decision to make a decision ", "id": "A#luy2w7jhekr2x", "likes": [], "poster": "https://firebasestorage.googleapis.com/v0/b/zusammen-stehen-wir.appspot.com/o/public%2Fnewsletter%2FbdgdH65FcYTrfn866QCE2HR3LiP2%2Frn_image_picker_lib_temp_6f2a2044-c706-46c4-b4dd-120b81bec4c2.jpg?alt=media&token=7f1c5683-3f95-45c5-ab7c-edd000ffb7ed", "public": true, "pud_date": "13.4.2024", "tags": ["Dev", "Deveelopp", "Test", "Löschen"]}
 *  
 */

export default function extractContentFromArticleDataSet(articleData = {}) {
  if (!articleData.article_id && articleData.event_id)
    return extractFullContentFromEventPost(articleData);
  if (!articleData.article_id)
    return console.warn(
      'Can not extract full content from data structures other as articles',
    );
  var { content_sections } = articleData;
  if (!Array.isArray(content_sections))
    return console.warn(
      'content_sections not provided as array',
      content_sections,
    );
  var fullContent = content_sections
    .filter(section => section.section_content)
    .map(section => section.section_content);
  return `${articleData.description}\n\n${fullContent.join('\n')}`;
}

/**
 *  {"approval": {"approved": true, "approved_by": "admin_account@dummy.com", "approved_since": "12.4.2024"}, "comments": [], "created_at": "12.4.2024, 13:27:54", "created_by": {"email": "max@mail.com", "joined_since": null, "last_seen": null, "username": null},
 *
 * "description": "Vv ich bin ich habe die richtige Arbeit in einem Jahr als erstes in Berlin in der Sonne aber sollte ich packen bis zum Ende der erste Tag ist der erste Plan heute nicht so viel Zeit für die richtige Arbeit in einem ☕",
 *
 * "documents": [], "end_time": null,
 *
 * "event_descriptions": [{"image": null, "text": "Ed ist der Nähe vom Bahnhof und dann ist das so viel los ist es nicht so gut so viel Spaß euch und dann noch und bis später dann ist es nicht so gut und dann ist das zweite Mal wieder mit"}],
 *
 * "event_id": "E#luwl3mfz6k32n", "event_poster": "https://firebasestorage.googleapis.com/v0/b/zusammen-stehen-wir.appspot.com/o/public%2Fevents%2FrNNzsymLenW4ttetrIcspRGiWFw2%2Frn_image_picker_lib_temp_af1cbf4d-8d40-4618-8532-931456fe1084.jpg?alt=media&token=673a5ec8-0d71-4c4f-831a-c0f7cf89183f", "id": "E#luwl3mfz6k32n", "likes": [], "location": {"city": "Magdeburg", "country": "Deutschland", "postCode": "12345", "province": "Sachsen-Anhalt", "street": "Sesamstraße 4"}, "name": "Demonstration Deutschland 🔴", "organizer": {"email": null, "first_name": null, "last_name": null, "mail": "max@mail.com", "organization": null, "phone": null}, "start_time": {"nanoseconds": 0, "seconds": 1719335580}, "visible": true}
 * @param {
 * } eventPost
 */
export function extractFullContentFromEventPost(eventPost = {}) {
  if (!eventPost.event_id && eventPost.article_id)
    return extractContentFromArticleDataSet(eventPost);
  if (!eventPost.event_id)
    return console.warn(
      'Can not extract full content from data structures other as event posts',
    );
  var { event_descriptions } = eventPost;
  if (!Array.isArray(event_descriptions))
    return console.warn(
      'Got no valid event description obj to extract from',
      event_descriptions,
    );
  var fullContent = event_descriptions.filter(ev => ev.text).map(ev => ev.text);
  return `${eventPost.description}\n\n${fullContent.join('\n')}`;
}
