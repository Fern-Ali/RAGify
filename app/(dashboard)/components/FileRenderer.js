import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getGithubRawLink } from "../lib/Helper"
function FileRenderer({ s3Uri }) {
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMarkdown = s3Uri.endsWith(".md");
  useEffect(() => {
    const githubRawLink = getGithubRawLink(s3Uri);

    async function fetchFileContent() {
      try {
        const response = await fetch(githubRawLink);
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const content = await response.text();
        setFileContent(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFileContent();
  }, [s3Uri]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <SyntaxHighlighter 
    language={isMarkdown ? "markdown" : "javascript"} 
    style={github}
    customStyle={{
        maxHeight: "400px", // Adjust height as needed
        // maxWidth: "500px",
        // overflow: "auto",
        // padding: "1rem",    // Add padding for better readability
      }}
    >
      {fileContent}
    </SyntaxHighlighter>
  );
}

export default FileRenderer;
