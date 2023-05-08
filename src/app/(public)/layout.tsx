"use client";

import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push: navigateTo } = useRouter();
  const userIsAuthenticated = checkUserAuthenticated();
  const {
    actions: { logOut },
  } = useAuthStore();

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand onClick={() => navigateTo("/")}>
            EntregaSystem
          </Navbar.Brand>
          <Nav>
            <div className="d-flex align-itens-center justify-content-between">
              <Nav.Link onClick={() => navigateTo("/login")}>Login</Nav.Link>
              <Nav.Link onClick={() => navigateTo("/register")}>
                Register
              </Nav.Link>
              {userIsAuthenticated && (
                <Nav.Link onClick={() => navigateTo("/dashboard")}>
                  Dashboard
                </Nav.Link>
              )}
            </div>

            <div>
              {userIsAuthenticated && (
                <Nav.Link onClick={logOut}>Logout</Nav.Link>
              )}
            </div>
          </Nav>
        </Container>
      </Navbar>
      {children}
    </>
  );
}
