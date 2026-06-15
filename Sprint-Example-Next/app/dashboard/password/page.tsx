import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1 className="mb-8 text-4xl font-bold uppercase leading-none text-on-dark">Change password</h1>
            <p className="text-lg text-body">This is a placeholder page for changing password. You can implement the password change functionality here.</p>
             <Link href="/dashboard/profile" className="mt-4 inline-block text-sm font-medium text-muted hover:text-on-dark">
                Back to Profile
            </Link>
        </div>
    );
}