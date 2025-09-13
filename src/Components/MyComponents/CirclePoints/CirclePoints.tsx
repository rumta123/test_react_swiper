import { useState, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import styles from "./CirclePoints.module.scss";
import type { RootState } from "../../../store/store";
import { selectPoint } from "../../../store/pointSlice";

interface Item {
  id: number;
  label: string;
}

interface CirclePointsProps {
  className?: string;
  r?: number;
  viewBoxSize?: number;
}

const N = 6;
const angleStep = 360 / N;
const rotationOffset = -60;

export const CirclePoints = ({ className, r = 140, viewBoxSize = 210 }: CirclePointsProps) => {
  const R = r;
  const initialItems: Item[] = [6, 5, 4, 3, 2, 1].map((n) => ({
    id: n,
    label: `${n}`,
  }));

  const [items, setItems] = useState<Item[]>(initialItems);
  const [animating, setAnimating] = useState(false);
  const groupRef = useRef<SVGGElement>(null);
  const pointRefs = useRef<(SVGGElement | null)[]>([]);
  const dispatch = useDispatch();
  const selectedPoint = useSelector((state: RootState) => state.point.selectedPoint);

  // 🔄 Вращение круга при изменении выбранной точки из слайдера
  useEffect(() => {
    if (selectedPoint && groupRef.current && !animating) {
      // Находим индекс точки в текущем массиве items
      const currentIndex = items.findIndex(item => item.id === selectedPoint.id);
      
      if (currentIndex !== -1 && currentIndex !== 0) {
        setAnimating(true);
        
        let targetDeg = -currentIndex * angleStep;
        targetDeg = ((targetDeg % 360) + 360) % 360;
        if (targetDeg > 180) targetDeg -= 360;

        const duration = Math.abs(targetDeg) / 400;

        gsap.to(groupRef.current, {
          rotation: targetDeg,
          transformOrigin: "50% 50%",
          duration,
          ease: "power2.inOut",
          onComplete: () => {
            // Переупорядочиваем массив чтобы выбранная точка была наверху
            const newItems = items.slice(currentIndex).concat(items.slice(0, currentIndex));
            setItems(newItems);
            gsap.set(groupRef.current, { rotation: 0 });
            setAnimating(false);
          },
        });
      }
    }
  }, [selectedPoint, items, animating]);

  const setPointRef = useCallback((index: number) => (el: SVGGElement | null) => {
    pointRefs.current[index] = el;
  }, []);

  const handleMouseEnter = (index: number) => {
    if (animating || index === 0) return;
    const point = pointRefs.current[index];
    if (!point) return;

    const circle = point.querySelector('circle');
    const text = point.querySelector('text');

    if (circle) {
      gsap.to(circle, {
        r: 24,
        fill: '#f4f5f9',
        stroke: '#ccc',
        strokeWidth: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
    if (text) {
      gsap.to(text, {
        opacity: 1,
        fill: '#000',
        fontSize: 16,
        fontWeight: 500,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (animating || index === 0) return;
    const point = pointRefs.current[index];
    if (!point) return;

    const circle = point.querySelector('circle');
    const text = point.querySelector('text');

    if (circle) {
      gsap.to(circle, {
        r: 1,
        fill: '#fff',
        stroke: '#000',
        strokeWidth: 2,
        duration: 0.2,
        ease: "power2.out"
      });
    }
    if (text) {
      gsap.to(text, {
        opacity: 0,
        fill: '#000',
        fontSize: 12,
        fontWeight: 'normal',
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleClick = (idx: number, el: SVGGElement | null) => {
    if (animating || idx === 0 || !groupRef.current || !el) return;

    setAnimating(true);
    gsap.to(el, { opacity: 0, duration: 0.1 });

    let targetDeg = -idx * angleStep;
    targetDeg = ((targetDeg % 360) + 360) % 360;
    if (targetDeg > 180) targetDeg -= 360;

    const duration = Math.abs(targetDeg) / 400;

    gsap.to(groupRef.current, {
      rotation: targetDeg,
      transformOrigin: "50% 50%",
      duration,
      ease: "power2.inOut",
      onComplete: () => {
        const newItems = items.slice(idx).concat(items.slice(0, idx));
        setItems(newItems);
        gsap.set(groupRef.current, { rotation: 0 });
        setAnimating(false);

        // Отправляем выбранную точку в Redux
        dispatch(selectPoint(newItems[0]));
      },
    });
  };

  return (
    <div className={`${styles.wrap} ${className}`}>
      <svg viewBox={`-${viewBoxSize} -${viewBoxSize} ${viewBoxSize * 2} ${viewBoxSize * 2}`}>
        <defs>
          <pattern
            id="circleBackground"
            patternUnits="userSpaceOnUse"
            width="100%"
            height="100%"
          >
            <image
              href="https://c.animaapp.com/E93a9PUr/img/group-3048.png"
              x="-60"
              y="-60"
              width="120"
              height="120"
              preserveAspectRatio="xMidYMid meet"
            />
          </pattern>
        </defs>

        <circle cx="0" cy="0" r={R} fill="url(#circleBackground)" stroke="#ccc" strokeWidth="1" />

        <g ref={groupRef}>
          {items.map((it, i) => {
            const ang = ((i * angleStep + rotationOffset) * Math.PI) / 180;
            const x = Math.cos(ang) * R;
            const y = Math.sin(ang) * R;

            return (
              <g
                key={`${it.id}-${i}`}
                ref={setPointRef(i)}
                className={`point ${i === 0 ? "fixed-point" : ""}`}
                transform={`translate(${x},${y})`}
                onClick={(e) => handleClick(i, e.currentTarget)}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                style={{ opacity: 1, cursor: i === 0 ? "default" : "pointer" }}
              >
                <circle r="1" fill="#fff" stroke="#000" strokeWidth="2" />
                <text
                  dy="0.35em"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#000"
                  fontWeight="normal"
                  style={{ opacity: 0 }}
                >
                  {it.label}
                </text>
                <title>{it.label}</title>
              </g>
            );
          })}
        </g>

        <line
          x1={Math.cos((rotationOffset) * Math.PI / 180) * R * 0.84}
          y1={Math.sin((rotationOffset) * Math.PI / 180) * R * 0.84}
          x2={Math.cos((rotationOffset) * Math.PI / 180) * R * 0.79}
          y2={Math.sin((rotationOffset) * Math.PI / 180) * R * 0.79}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default CirclePoints;