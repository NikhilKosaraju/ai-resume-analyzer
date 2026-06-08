import { Menu } from "antd";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link to="/upload">Upload Resume</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to="/results">Results</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;