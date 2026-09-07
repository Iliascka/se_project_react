import "./ToggleSwitch.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__text toggle-switch__text_F">F</span>
      <span className="toggle-switch__text toggle-switch__text_C">C</span>
    </label>
  );
}

export default ToggleSwitch;
