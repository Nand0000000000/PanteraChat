import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function Message({ msg }) {
  const base = "max-w-2xl rounded-2xl px-4 py-3 shadow-lg message-animation";
  const cls = msg.from === "bot" 
    ? "bg-neutral-800 border border-neutral-700" 
    : "bg-primary text-white";
  
  return (
    <div className={`${base} ${cls}`}>
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        className="prose prose-invert break-words"
        components={{
          p: (props) => <p className="my-2" {...props} />,
          a: (props) => <a className="text-blue-400 hover:text-blue-300" {...props} />,
          code: (props) => <code className="bg-neutral-700 px-1 py-0.5 rounded" {...props} />,
          pre: (props) => <pre className="bg-neutral-700 p-4 rounded-lg my-4 overflow-x-auto" {...props} />
        }}
      >
        {msg.text}
      </ReactMarkdown>
    </div>
  );
}
