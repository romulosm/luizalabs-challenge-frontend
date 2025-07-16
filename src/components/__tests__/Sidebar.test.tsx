import "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import Sidebar from "../Sidebar";

const installAppSpy = vi.fn();

vi.mock("../../hooks/usePWAInstall", () => ({
  usePWAInstall: () => ({
    canInstall: true,
    installApp: installAppSpy,
  }),
}));

describe("Sidebar", () => {
  const onClose = vi.fn();
  const setActiveTab = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
    installAppSpy.mockClear();
  });

  it("renders navigation buttons and handles clicks", async () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={onClose}
        setActiveTab={setActiveTab}
        activeTab="home"
        isMobile={false}
      />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Artistas")).toBeInTheDocument();
    expect(screen.getByText("Playlists")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Artistas"));
    expect(setActiveTab).toHaveBeenCalledWith("artists");

    await userEvent.click(screen.getByText("Playlists"));
    expect(setActiveTab).toHaveBeenCalledWith("playlists");
  });

  it("calls onClose when close button is clicked on mobile", async () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={onClose}
        setActiveTab={setActiveTab}
        activeTab="home"
        isMobile={true}
      />
    );

    const closeButton = screen.getByRole("button", { name: "✕" });
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it("renders install button when canInstall is true and calls installApp", async () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={onClose}
        setActiveTab={setActiveTab}
        activeTab="home"
        isMobile={false}
      />
    );

    expect(screen.getByText("Instalar PWA")).toBeInTheDocument();

    const installButton = screen.getByText("Instalar PWA");
    await userEvent.click(installButton);

    expect(installAppSpy).toHaveBeenCalled();
  });
});
