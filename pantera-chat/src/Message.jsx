import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function Message({ msg }) {
  const base =
    "max-w-md rounded-2xl px-4 py-3 shadow prose prose-invert break-words";
  const cls = msg.from === "bot" ? "bg-neutral-800" : "bg-neutral-700";
  return (
    <div className={`${base} ${cls}`}>
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
        {msg.text}
      </ReactMarkdown>
    </div>
  );
}
