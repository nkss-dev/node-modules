import ImageWithFallback from './fallback-image';

export default function ClubsPageCard() {
  return (
    <figure>
      <ImageWithFallback src="" width={85} height={85} alt="" />
      <figcaption>
        <hgroup>
          <h1>Clubs</h1>
          <p>Huh? What are clubs?? Never heard of them :(</p>
        </hgroup>
      </figcaption>
    </figure>
  );
}
