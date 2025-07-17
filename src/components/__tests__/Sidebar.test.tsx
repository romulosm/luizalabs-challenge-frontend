import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import Sidebar from "../Sidebar";
import { usePWAInstall } from "../../hooks/usePWAInstall";

vi.mock("../../hooks/usePWAInstall");
const mockedUsePWAInstall = vi.mocked(usePWAInstall);

describe("Sidebar", () => {
  const onClose = vi.fn();
  const setActiveTab = vi.fn();
  const installAppSpy = vi.fn();

  beforeEach(() => {
    mockedUsePWAInstall.mockReturnValue({
      isCompatible: true,
      installApp: installAppSpy,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders navigation buttons and handles tab changes", async () => {
    render(
      <Sidebar
        isOpen
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
        isOpen
        onClose={onClose}
        setActiveTab={setActiveTab}
        activeTab="home"
        isMobile
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "✕" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls installApp when install button is clicked", async () => {
    render(
      <Sidebar
        isOpen
        onClose={onClose}
        setActiveTab={setActiveTab}
        activeTab="home"
        isMobile={false}
      />
    );

    const installButton = screen.getByText("Instalar PWA");
    expect(installButton).toBeInTheDocument();

    await userEvent.click(installButton);
    expect(installAppSpy).toHaveBeenCalled();
  });

  it("shows warning if PWA is not supported", () => {
    mockedUsePWAInstall.mockReturnValue({
      isCompatible: false,
      installApp: installAppSpy,
    });

    render(
      <Sidebar
        isOpen
        onClose={onClose}
        setActiveTab={setActiveTab}
        activeTab="home"
        isMobile={false}
      />
    );

    expect(
      screen.getByText("Este navegador não suporta instalação")
    ).toBeInTheDocument();
  });
});
