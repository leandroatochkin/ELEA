import { useEffect, useState } from "react"
import { useGetData } from "../../hooks/Hooks"
import { useParams } from "react-router-dom"
import ProgressBar from "../../components/ProgressBar"
import { BounceLoader } from "react-spinners"

type TrackResponse = {
  results: {
    estado: number
  }
}

export default function Home() {
  const [currentStage, setCurrentStage] = useState<number>(0)

  const {itemId} = useParams()


  const {data, loading} = useGetData<TrackResponse>(`${import.meta.env.VITE_API_URL}/track/${itemId}`)

  console.log(import.meta.env.VITE_API_URL)

  const stages = ["Ingreso", "Lavado", "Secado", "Doblado", "Listo para la entrega", "Entregado"]

//   const nextStage = () => {
//     setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1))
//   }

//   const prevStage = () => {
//     setCurrentStage((prev) => Math.max(prev - 1, 0))
//   }

//   const resetProgress = () => {
//     setCurrentStage(0)
//   }

useEffect(()=>{
    if(!data) return
    setCurrentStage(Number(data.results.estado))
},[data])

if(loading) return <div
                    style={{
                        height: '100dvh',
                        width: '100vw',
                        backgroundColor: "#faf9f7",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <BounceLoader />
                    </div>

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
          height: '100%',
          display: "flex",
          flexDirection: "column",
          alignItems: 'center',
          justifyContent: 'center',
          gap: "40px"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "2rem",
            fontWeight: "600",
            margin: "0",
          }}
        >
          Progress Tracker
        </h1>

        <ProgressBar stages={stages} currentStage={currentStage} />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {/* <button
            onClick={prevStage}
            disabled={currentStage === 0}
            style={{
              padding: "12px 24px",
              backgroundColor: currentStage === 0 ? "#e5e7eb" : "#10b981",
              color: currentStage === 0 ? "#9ca3af" : "white",
              border: "none",
              borderRadius: "8px",
              cursor: currentStage === 0 ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            Anterior
          </button>

          <button
            onClick={nextStage}
            disabled={currentStage === stages.length - 1}
            style={{
              padding: "12px 24px",
              backgroundColor: currentStage === stages.length - 1 ? "#e5e7eb" : "#10b981",
              color: currentStage === stages.length - 1 ? "#9ca3af" : "white",
              border: "none",
              borderRadius: "8px",
              cursor: currentStage === stages.length - 1 ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            Siguiente
          </button>

          <button
            onClick={resetProgress}
            style={{
              padding: "12px 24px",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            Reiniciar
          </button> */}
        </div>
      </div>
    </div>
  )
}
