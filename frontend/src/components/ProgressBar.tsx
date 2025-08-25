
import type React from "react"
import { useMobile } from "../hooks/Hooks"

interface ProgressBarProps {
  stages: string[]
  currentStage: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ stages, currentStage }) => {
  const progressPercentage = (currentStage / (stages.length - 1)) * 100

  const isMobile = useMobile()

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: isMobile ? "start" : "center",
        marginLeft: isMobile ? "100px" : "0",
        padding: "20px 0",
      }}
    >
      {/* Mobile Layout (Vertical) */}
      <div
        className="mobile-progress"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          height: "400px",
         
        }}
      >
        {/* Background Track */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "0",
            transform: "translateX(-50%)",
            width: "4px",
            height: "100%",
            backgroundColor: "#e5e7eb",
            borderRadius: "2px",
          }}
        />

        {/* Progress Fill */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "0",
            transform: "translateX(-50%)",
            width: "4px",
            height: `${progressPercentage}%`,
            backgroundColor: "#10b981",
            borderRadius: "2px",
            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
            transition: "height 0.5s ease-in-out",
          }}
        />

        {/* Stage Circles and Labels */}
        {stages.map((stage, index) => {
          const isActive = index <= currentStage
          const isCurrent = index === currentStage
          const yPosition = (index / (stages.length - 1)) * 100

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: `${yPosition}%`,
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: isCurrent ? "24px" : "20px",
                  height: isCurrent ? "24px" : "20px",
                  minWidth: isCurrent ? "24px" : "20px",
                  minHeight: isCurrent ? "24px" : "20px",
                  borderRadius: "50%",
                  backgroundColor: isActive ? "#10b981" : "#e5e7eb",
                  border: isCurrent ? "3px solid #065f46" : "2px solid transparent",
                  boxShadow: isCurrent
                    ? "0 4px 12px rgba(16, 185, 129, 0.4), 0 0 0 4px rgba(16, 185, 129, 0.1)"
                    : isActive
                      ? "0 2px 6px rgba(16, 185, 129, 0.2)"
                      : "none",
                  transition: "all 0.3s ease",
                  zIndex: 2,
                  position: "relative",
                  flexShrink: 0,
                }}
              />

              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  left: "40px",
                  fontSize: "14px",
                  fontWeight: isCurrent ? "600" : "500",
                  color: isActive ? "#065f46" : "#6b7280",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                {stage}
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop Layout (Horizontal) */}
      <div
        className="desktop-progress"
        style={{
          display: "none",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {/* Background Track */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            width: "100%",
            height: "4px",
            backgroundColor: "#e5e7eb",
            borderRadius: "2px",
          }}
        />

        {/* Progress Fill */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            width: `${progressPercentage}%`,
            height: "4px",
            backgroundColor: "#10b981",
            borderRadius: "2px",
            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
            transition: "width 0.5s ease-in-out",
          }}
        />

        {/* Stage Circles and Labels */}
        {stages.map((stage, index) => {
          const isActive = index <= currentStage
          const isCurrent = index === currentStage
          const xPosition = (index / (stages.length - 1)) * 100

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${xPosition}%`,
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: isCurrent ? "20px" : "16px",
                  height: isCurrent ? "20px" : "16px",
                  borderRadius: "50%",
                  backgroundColor: isActive ? "#10b981" : "#e5e7eb",
                  border: isCurrent ? "3px solid #065f46" : "2px solid transparent",
                  boxShadow: isCurrent
                    ? "0 4px 12px rgba(16, 185, 129, 0.4), 0 0 0 4px rgba(16, 185, 129, 0.1)"
                    : isActive
                      ? "0 2px 6px rgba(16, 185, 129, 0.2)"
                      : "none",
                  transition: "all 0.3s ease",
                  zIndex: 2,
                  position: "relative",
                }}
              />

              {/* Label */}
              <div
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  fontWeight: isCurrent ? "600" : "500",
                  color: isActive ? "#065f46" : "#6b7280",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
              >
                {stage}
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-progress {
            display: none !important;
          }
          .desktop-progress {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ProgressBar
