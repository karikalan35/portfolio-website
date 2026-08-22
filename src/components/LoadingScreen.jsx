export default function LoadingScreen({ isExiting }) {
  return (
    <div
      className={`site-loader${isExiting ? " site-loader--exiting" : ""}`}
      aria-hidden={isExiting}
    >
      <div className="site-loader__grid" />
      <div className="site-loader__content">
        <div className="site-loader__mark">K</div>
        <p className="site-loader__name">KARIKALAN.DEV</p>
        <div className="site-loader__track" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}