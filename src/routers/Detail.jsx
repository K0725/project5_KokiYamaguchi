import { useParams, useLocation } from "react-router-dom";

function Detail({}) {
  const id = useParams();
  const { name, address, website, phone,  } =
    useLocation().state;
  const call = `tel:${phone}`;

  return (
    <div className="Bio">
      <h1><strong>{name}</strong></h1>
      <p>{address}</p>

      <button>
        <a href={website} target="_blank">
          Website
        </a>
      </button>
      <button>
        <a href={call}>Phone</a>
      </button>
    </div>
  );
}

export default Detail;