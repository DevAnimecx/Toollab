import './IndependenceDayOverlay.css';

const colors = ['#FF9933', '#FFFFFF', '#138808'];

export const IndependenceDayOverlay = () => {
  return (
    <div className="independence-overlay">
      <div className="particles">
        {Array.from({ length: 50 }).map((_, i) => {
          const style = {
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 25}s`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            opacity: Math.random() * 0.5 + 0.2,
          };
          return <div key={i} className="particle" style={style}></div>;
        })}
      </div>
    </div>
  );
};