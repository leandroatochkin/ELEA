import { useEffect, useState } from "react";
import { useGetData } from "../../hooks/Hooks";
import { useParams } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import { BounceLoader } from "react-spinners";

type TrackResponse = {
  results: {
    estado: number;
  };
};

export default function Home() {
  const [currentStage, setCurrentStage] = useState<number>(0);

  const { itemId } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL;

  // Guard: do not call hook if itemId or apiUrl is missing
  const { data, loading, error } = useGetData<TrackResponse>(
    itemId && apiUrl ? `${apiUrl}/track/${itemId}` : ""
  );

  const stages = [
    "Ingreso",
    "Lavado",
    "Secado",
    "Doblado",
    "Listo para la entrega",
    "Entregado",
  ];

  useEffect(() => {
    if (data && data.results) {
      setCurrentStage(Number(data.results.estado));
    }
  }, [data]);

  if (!itemId) return <div>Invalid item</div>;

  if (loading)
    return (
      <div
        style={{
          height: "100dvh",
          width: "100vw",
          backgroundColor: "#faf9f7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BounceLoader />
      </div>
    );

  if (error)
    return (
      <div
        style={{
          height: "100dvh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
        }}
      >
        Error fetching data: {error}
      </div>
    );

  return (
    <div
      style={{
        height: "100dvh",
        backgroundColor: "#faf9f7",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "2rem",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Progress Tracker
        </h1>

        <ProgressBar stages={stages} currentStage={currentStage} />
      </div>
    </div>
  );
}
