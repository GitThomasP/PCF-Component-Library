import CursorFollower from "./cursor-follower"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <CursorFollower />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 p-8">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
            Move Your Cursor
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-md mx-auto">
            Watch the cute avatar follow you around! Try moving your mouse in different directions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-6 space-y-2 hover:scale-105 transition-transform">
            <div className="text-4xl">✨</div>
            <h3 className="font-semibold text-card-foreground">Smooth Motion</h3>
            <p className="text-sm text-muted-foreground">Fluid animations that feel natural and responsive</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-6 space-y-2 hover:scale-105 transition-transform">
            <div className="text-4xl">🎨</div>
            <h3 className="font-semibold text-card-foreground">Playful Design</h3>
            <p className="text-sm text-muted-foreground">Adorable character with personality and charm</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-6 space-y-2 hover:scale-105 transition-transform">
            <div className="text-4xl">🎯</div>
            <h3 className="font-semibold text-card-foreground">Interactive</h3>
            <p className="text-sm text-muted-foreground">Responds to your every move in real-time</p>
          </div>
        </div>
      </div>
    </main>
  )
}
