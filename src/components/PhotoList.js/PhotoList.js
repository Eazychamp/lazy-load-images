import { useEffect, useRef, useState } from "react";

function Image({ pic }) {
  const [isInView, setIsInView] = useState(false);
  const root = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, { threshold: 0 });
    observer.observe(root.current);

    function onIntersection(entries) {
      const { isIntersecting } = entries[0];

      if (isIntersecting) {
        observer.disconnect();
      }

      setIsInView(isIntersecting);
    }
  }, []);


  return (
    <div className="card border-0"  ref={root}>
      <img
        className="card-img"
        src={pic.urls.small}
        alt={pic.alt_description}
      />
      <div className="card-img-overlay" style={{ color: "white" }}>
        <div className="img-header">
          <img
            className="rounded-circle profile-img"
            alt={pic.user.username}
            src={isInView ? pic.user.profile_image.small : null}
          />
          <h6 className="card-title">{pic.user.name}</h6>
        </div>
      </div>
    </div>
  );
}

const PhotoList = ({ photoList }) => {
  return (
    <div className="container">
      <div className="card-columns">
        {photoList.map((pic) => {
          return (
            <Image key={pic.id} pic={pic} />
          );
        })}
      </div>
    </div>
  );
};

export default PhotoList;
