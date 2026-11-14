import { NavLink, useNavigate } from "react-router-dom";
import { getStoredUser, logoutUser } from "../utils/auth";
import "../styles/workspace-sidebar.css";

function WorkspaceSidebar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: "bi-grid-1x2-fill" },
    { to: "/history", label: "Results", icon: "bi-bar-chart-line-fill" },
    { to: "/membership", label: "Membership", icon: "bi-gem" },
    { to: "/profile", label: "Settings", icon: "bi-gear-fill" },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <aside className="workspace-sidebar">
      <NavLink to="/" className="workspace-brand">
        <span className="workspace-brand-mark">E</span>
        <span>EXAMORA</span>
      </NavLink>

      <div className="workspace-sidebar-label">Workspace</div>
      <nav className="workspace-nav" aria-label="Student workspace">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `workspace-nav-link ${isActive ? "is-active" : ""}`}
          >
            <i className={`bi ${link.icon}`} aria-hidden="true" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="workspace-sidebar-bottom">
        <div className="workspace-user-mini">
          <span>{(user?.name || "A").charAt(0).toUpperCase()}</span>
          <div>
            <strong>{user?.name || "Student"}</strong>
            <small>Student account</small>
          </div>
        </div>
        <button className="workspace-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right" />
          Log out
        </button>
      </div>
    </aside>
  );
}

export default WorkspaceSidebar;
