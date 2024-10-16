import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  Dropdown,
  Button,
} from "reactstrap";
import smalllogo from "../assets/images/logos/logo.PNG";
import adanilogo from "../assets/images/logos/adani.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const location = useLocation(); // To get the current route

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navigation = [
    { href: "/starter", title: "Starter", icon: "bi bi-house" },
    { href: "/about", title: "About", icon: "bi bi-info-circle" },
    // Add more links here as needed
  ];

  return (
    <>
      <Navbar color="black" dark expand="md">
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Sidebar toggle button */}
          <Button color="primary" className="me-3" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </Button>
          <NavbarBrand href="/" className="d-lg-none">
            <img src={adanilogo} alt="not found" height={35} width={40} />
          </NavbarBrand>
        </div>
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            {/* <NavItem>
              <Link to="/starter" className="nav-link">
                Starter
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </NavItem> */}
          </Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle color="white">
              <img
                src={adanilogo}
                alt="profile"
                // className="rounded-circle"
                width="80"
              />
            </DropdownToggle>
          </Dropdown>
        </Collapse>
      </Navbar>

      {/* Sidebar Drawer */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="p-3">
          <div className="d-flex align-items-center">
            <img src={smalllogo} alt="Logo" style={{ height: "5rem", width: "100%" }} />
            <span className="ms-auto d-lg-none">
              <Button close size="sm" onClick={closeSidebar}></Button>
            </span>
          </div>
          <div className="pt-4 mt-0">
            <Nav vertical className="sidebarNav">
              {navigation.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                    onClick={closeSidebar}
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))}
            </Nav>
          </div>
        </div>
      </div>

      {/* CSS for Sidebar */}
      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100%;
          background-color: white; /* Set background color to white */
          color: black; /* Set text color to black */
          padding: 20px;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
          z-index: 1000;
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .sidebar-header {
          display: flex;
          justify-content: flex-end;
        }
        .sidebar-content {
          margin-top: 20px;
        }
        .sidebar-content .nav-link {
          color: black; /* Set nav link color to black */
          padding: 10px 0;
        }
        .sidebar-content .nav-link:hover {
          background-color: #f8f9fa; /* Light hover effect */
          border-radius: 5px;
        }
        .sidebar-content .nav-link.text-primary {
          color: #007bff; /* Primary color for active links */
        }
        .sidebar-content .nav-link.text-secondary {
          color: black; /* Secondary color for inactive links */
        }
      `}</style>
    </>
  );
};

export default Header;
