interface RichTextProps {
  content: any;
  className?: string;
}

export default function RichTextRenderer({ content, className = "" }: RichTextProps) {
  if (!content) return null;

  // Case 1: Structured JSON object
  if (typeof content === "object") {
    // Post format with sections array
    if (Array.isArray(content.sections)) {
      return (
        <div className={`space-y-8 text-prime-gray text-base sm:text-lg leading-relaxed ${className}`}>
          {content.sections.map((section: any, idx: number) => (
            <div key={idx} className="space-y-3">
              {section.heading && (
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {section.heading}
                </h3>
              )}
              {section.content && <p className="whitespace-pre-line">{section.content}</p>}
            </div>
          ))}
        </div>
      );
    }

    // Case study format with summary and bulletPoints
    if (content.summary || content.bulletPoints) {
      return (
        <div className={`space-y-4 text-prime-gray text-base leading-relaxed ${className}`}>
          {content.summary && <p className="whitespace-pre-line">{content.summary}</p>}
          {Array.isArray(content.bulletPoints) && content.bulletPoints.length > 0 && (
            <ul className="space-y-2 pt-2">
              {content.bulletPoints.map((bp: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-prime-accent mt-2 shrink-0" />
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
  }

  // Case 2: String content (try parsing as JSON if stringified, otherwise render as paragraph)
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      return <RichTextRenderer content={parsed} className={className} />;
    } catch {
      return (
        <div className={`text-prime-gray text-base leading-relaxed whitespace-pre-line ${className}`}>
          {content}
        </div>
      );
    }
  }

  return null;
}
