export function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("En-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}