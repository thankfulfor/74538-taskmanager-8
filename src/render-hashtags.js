export default function (data) {
  const hashtags = Array.from(data.tags);
  const getHashtag = (tag) => {
    return (
      `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="repeat"
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
  return hashtags.map(getHashtag).join(``);
};
