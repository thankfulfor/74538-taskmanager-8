export default function (hashtags) {
  const tags = Array.from(hashtags);
  const getHashtag = (tag) => {
    return (
      `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="${tag}"
            class="card__hashtag-hidden-input"
          />
          <button type="button" class="card__hashtag-name">
            #${tag}
          </button>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>`);
  };
  return tags.map(getHashtag).join(``);
}
