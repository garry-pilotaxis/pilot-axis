import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ui/chat-widget";
import { MeshBlobs } from "@/components/ui/mesh-blobs";
import { RobotCharacter } from "@/components/ui/robot-character";

// Pages
import Home from "@/pages/Home";
import Solutions from "@/pages/Solutions";
import UseCases from "@/pages/UseCases";
import Process from "@/pages/Process";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

/** Fixed full-screen background: white base + subtle purple glow + light grid lines */
function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none" style={{ zIndex: -2 }}>
      {/* 1 — white base */}
      <div className="absolute inset-0" style={{ background: "#ffffff" }} />

      {/* 2 — subtle purple/indigo radial glow — top-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 82% 0%, rgba(99,83,235,0.08) 0%, transparent 68%)",
        }}
      />

      {/* 3 — secondary subtle glow — bottom-left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 10% 100%, rgba(80,60,200,0.05) 0%, transparent 70%)",
        }}
      />

      {/* 4 — grid lines (dark on white) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />
    </div>
  );
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Background />
      <MeshBlobs />
      <RobotCharacter />
<Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/use-cases" component={UseCases} />
          <Route path="/process" component={Process} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
