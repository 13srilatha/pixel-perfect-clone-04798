/** Floating WhatsApp button — for the 4th-standard client who won't fill a form. */
const WA_NUMBER = "916305707859";
const WA_MSG = encodeURIComponent(
  "Hi Terra Space Studio, I'd like to discuss a project.",
);

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        right: "1.25rem",
        bottom: "1.25rem",
        zIndex: 80,
        background: "#25D366",
        color: "#fff",
        width: 56,
        height: 56,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 30px -8px rgba(37,211,102,0.55)",
        transition: "transform 0.25s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)")}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87a11.8 11.8 0 0 0 1.6 5.94L0 24l6.34-1.66a11.86 11.86 0 0 0 5.7 1.45h.01c6.55 0 11.87-5.32 11.87-11.87a11.8 11.8 0 0 0-3.4-8.44ZM12.05 21.5h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.76.98 1-3.67-.23-.38a9.63 9.63 0 0 1-1.47-5.11c0-5.31 4.33-9.64 9.66-9.64a9.6 9.6 0 0 1 6.83 2.83 9.6 9.6 0 0 1 2.82 6.82c0 5.32-4.33 9.64-9.65 9.64Zm5.29-7.21c-.29-.14-1.72-.85-1.99-.95-.27-.1-.46-.14-.66.14-.19.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.14-1.23-.45-2.34-1.44a8.84 8.84 0 0 1-1.63-2.02c-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51l-.56-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.03 2.77 1.18 2.96c.14.19 2.03 3.1 4.92 4.35.69.3 1.22.47 1.64.6.69.22 1.31.19 1.81.12.55-.08 1.72-.7 1.96-1.38.24-.67.24-1.25.17-1.38-.07-.13-.26-.19-.55-.34Z" />
      </svg>
    </a>
  );
}
