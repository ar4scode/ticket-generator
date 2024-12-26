import icon from "../assets/logo-mark.svg"

const App = () => {
  return (
    <header>
      <div className="web-title">
        <img src={icon} alt="logo icon" />
        <span>Coding Conf</span>
      </div>

      <p className="main-text">Your Journey to Coding Conf 2025 Starts Here!</p>
      <p className="secondary-text">Secure your spot at next year`s biggest coding conference</p>
    </header>
  )
}

export default App;