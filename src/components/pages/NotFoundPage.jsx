import { Link } from "wouter";

function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Link href="/" className="btn-primary">
        Return to studio
      </Link>
    </div>
  );
}

export default NotFoundPage;
