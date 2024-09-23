import Link from "next/link";

function Home() {
  return (
    <>
      <h1 className="text-3xl">Building our Project</h1>
      <p className="text-lg">
        Watch my project and make contributions to make that community.
      </p>
      <Link
        href="https://github.com/matheusRodrigues73/book-reviewer"
        target="_blank"
        className="text-teal-600"
      >
        Book reviewer repository
      </Link>
    </>
  );
}
export default Home;
