export function Footer() {
  return (
    <footer className="py-6 border-t bg-background">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Quiz Master. All rights reserved.</p>
      </div>
    </footer>
  )
}
