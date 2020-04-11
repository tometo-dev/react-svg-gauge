import React from "react"
import { arc } from "d3-shape"
import { scaleLinear } from "d3-scale"

const Gauge = ({ min = 0, max = 100, value = 50, label, units }) => {
  const backgroundArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(1)

  const arcPath = backgroundArc()

  const percentScale = scaleLinear().domain([min, max]).range([0, 1])

  const percent = percentScale(value)

  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true)

  const angle = angleScale(percent)

  const filledArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(1)()

  const colorScale = scaleLinear().domain([0, 1]).range(["#dbdbe7", "#4834d4"])

  const gradientSteps = colorScale.ticks(10).map((value) => colorScale(value))

  return (
    <div>
      <svg
        width="9em"
        viewBox={[-1, -1, 2, 1].join(" ")}
        style={{ border: "1px solid blue" }}
      >
        <defs>
          <linearGradient
            id="Gauge__gradient"
            gradientUnits="userSpaceOnUse"
            x1="-1"
            y1="0"
            x2="1"
            y2="0"
          >
            {gradientSteps.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${index / (gradientSteps.length - 1)}`}
              />
            ))}
          </linearGradient>
        </defs>
        <path
          fill="#dbdbe7"
          d={arcPath}
          // style={{ transform: "translate(50%, 50%)" }}
        />
        <path fill="url(#Gauge__gradient)" d={filledArc} />
      </svg>
    </div>
  )
}

export default Gauge
