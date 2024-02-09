import { Link } from "react-router-dom";

export default function ErrorPage() {
	return (
		<div className="min-h-screen w-full">
			<span className="text-8xl">
				<ion-icon name="alert-circle-outline"></ion-icon>
			</span>
			<h1 className="text-xl font-extrabold mb-2">Oops! Page Not Found</h1>
			<p className="text-sm">
				Sorry, the requested page is not found. Please check the URL again.
			</p>

			<p className="text-sm mt-4">
				<Link href="/" className="text-blue-500 underline">
					Go to Home Page
				</Link>
			</p>
		</div>
	);
}
