export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="p-4 sm:p-6 lg:p-8 bg-light min-h-screen text-on-dark flex flex-col gap-8  mx-auto w-full max-w-[1440px]">
            <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-2xl font-bold uppercase leading-none tracking-tight text-on-dark">
                    <h2 className="text-2xl font-bold leading-none tracking-tight text-on-dark">
                        Dashboard
                    </h2>
                    </a>
            </div>
            <nav className="flex gap-4" aria-label="Sections">
                <a href="/dashboard/profile" className="text-sm font-medium text-muted hover:text-on-dark">
                    Profile
                </a>
                <a href="/dashboard/password" className="text-sm font-medium text-muted hover:text-on-dark">
                    Password
                </a>
            </nav>

            <main className="flex-1">
                {children}
            </main>
            {/* Footer */}
            <footer className="text-center text-sm text-muted">
                &copy; {new Date().getFullYear()} My App. All rights reserved.
            </footer>
        </section>
    );
}