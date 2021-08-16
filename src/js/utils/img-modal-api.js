export default function createsDownloadModalList(list) {
  const listUrl = list.images.filter(img =>
    String(img.url).includes('_RETINA_LANDSCAPE_16_9'),
  );
  const listsMiniUrl = list.images.filter(img =>
    String(img.url).includes('_CUSTOM'),
  );

  const modalList = {
    bigImg: listUrl[0].url,
    miniImg: listsMiniUrl[0].url,
    events: list,
  };
  return modalList;
}
