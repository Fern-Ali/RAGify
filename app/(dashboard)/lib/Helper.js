export function convertS3UriToGithubUrl(s3Uri) {
    // Define the mappings for the base paths
    const basePaths = {
      "s3://fern-ali-media/toolpad-docs/": "https://github.com/mui/toolpad/blob/master/docs/",
      "s3://fern-ali-media/toolpad-examples/": "https://github.com/mui/toolpad/blob/master/examples/",
    };
  
    // Find the matching base path
    for (const [s3Base, githubBase] of Object.entries(basePaths)) {
      if (s3Uri.startsWith(s3Base)) {
        // Replace the S3 base path with the GitHub base path
        return s3Uri.replace(s3Base, githubBase);
      }
    }
  
    // If no match is found, return the original URI or throw an error
    return s3Uri; // or throw new Error("Unknown S3 URI format");
  }
  
  // Example usage
  const s3UriDocs =
    "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/use-notifications.md";
  const s3UriExamples =
    "s3://fern-ali-media/toolpad-examples/core/tutorial/app/layout.tsx";
  
  console.log(convertS3UriToGithubUrl(s3UriDocs));
  // Output: https://github.com/mui/toolpad/blob/master/docs/data/toolpad/core/components/use-notifications/use-notifications.md
  
  console.log(convertS3UriToGithubUrl(s3UriExamples));
  // Output: https://github.com/mui/toolpad/blob/master/examples/core/tutorial/app/layout.tsx
  

export function getGithubRawLink(s3Uri) {
    const basePaths = {
      "s3://fern-ali-media/toolpad-docs/": "https://raw.githubusercontent.com/mui/toolpad/master/docs/",
      "s3://fern-ali-media/toolpad-examples/": "https://raw.githubusercontent.com/mui/toolpad/master/examples/core/",
    };
  
    for (const [s3Base, githubBase] of Object.entries(basePaths)) {
      if (s3Uri.startsWith(s3Base)) {
        return s3Uri.replace(s3Base, githubBase);
      }
    }
  
    throw new Error("Unknown S3 URI format");
  }