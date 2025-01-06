"use client";
import * as React from 'react';
import { useState } from "react";
import { PrismaClient } from "@prisma/client";


import Grid from '@mui/material/Grid2';

import MessageBox from './MessageBox';

import { useNotifications } from '@toolpad/core/useNotifications';

import { useRightPanel } from '../contexts/RightPanelContext';
import { useLeftPanel } from '../contexts/LeftPanelContext';
const prisma = new PrismaClient();



export default function Message({session, response, setResponse}) {
  const [query, setQuery] = useState(""); // State for the input query
  const { isNavigationExpanded, leftPanelWidth } = useLeftPanel();
  const { isDrawerOpen, setDrawerOpen } = useRightPanel();
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const notifications = useNotifications(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setLoading(true);
    setError(null);

    const sessionId = session?.user?.sessionId;
    

    console.log("Session object:", session);
    console.log("Session ID being sent:", sessionId);

    try {
        // Step 1: Sending request to Bedrock
        notifications.show("Sending request to Bedrock...", { severity: "info", autoHideDuration: 1000 });

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for the notification

        // Step 2: Retrieving sources
        notifications.show("Retrieving sources...", { severity: "info", autoHideDuration: 4000 });

        await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay for the notification

        // Make the API request
        const res = await fetch("/api/bedrock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputText: query, // Pass the query to the AWS BEDROCK API
                sessionId, // Dynamically use the sessionId or null
            }),
        });

        if (!res.ok) {
            throw new Error("Failed to fetch response from Bedrock");
        }

        // Step 3: Generating response
        notifications.show("Generating response...", { severity: "info", autoHideDuration: 1000 });

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for the notification

        const data = await res.json();
        setResponse(data); // Save the response to state

        // Final success notification
        notifications.show("Response generated!", { severity: "success", autoHideDuration: 2000 });

    } catch (err) {
        console.error("Error during session update:", err);
        setError(err.message);

        // Error notification
        notifications.show(`Error: ${err.message}`, { severity: "error", autoHideDuration: 3000 });
    } finally {
        setLoading(false);
    }
};

  return (
    <React.Fragment >
      
    <Grid container  sx={{minHeight: '100vh', flexDirection: 'column', display: 'flex'}}>
      
      

      { (
        <div>
          {/* <h2>Response:</h2>
          <p>{response.output?.text}</p> */}
          <MessageBox 
          response={response} 
          setResponse={setResponse}
          isDrawerOpen={isDrawerOpen} 
          handleSubmit={handleSubmit} 
          query={query}
          setQuery={setQuery} 
          error={error}
          loadingBedrock={loading}
          isNavigationExpanded={isNavigationExpanded}
          leftPanelWidth={leftPanelWidth}
          ></MessageBox>
          {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
        </div>
      )}
      
     
      
      {/* <Grid size={12} ><AppBottomBar isDrawerOpen={isDrawerOpen} loading={loading} error={error} handleSubmit={handleSubmit} query={query} isNavigationExpanded={isNavigationExpanded}/></Grid> */}
    </Grid>
    </React.Fragment>
  );
}



// const newThread = await prisma.thread.create({
//     data: {
//       userId: 1,
//       foundationModelId: 2,
//       sessionId: "AWS_SESSION_ID_12345", // Replace with the actual session ID
//       messages: {
//         create: {
//           text: "What is MUI?",
//           sender: "USER",
//         },
//       },
//     },
//   });
  


//   const thread = await prisma.thread.findFirst({
//     where: { sessionId: "AWS_SESSION_ID_12345" },
//     include: {
//       messages: true,
//     },
//   });
  



// (older sesssion id worked hehe )

const anotherResponse = {
    "$metadata": {
      "httpStatusCode": 200,
      "requestId": "8bc4aed0-9f39-4452-ad91-8c54bf580f7d",
      "attempts": 1,
      "totalRetryDelay": 0
    },
    "citations": [
      {
        "generatedResponsePart": {
          "textResponsePart": {
            "span": {
              "end": 222,
              "start": 0
            },
            "text": "To modify the default light theme in Toolpad, you can adjust the colorSchemes light property in the createTheme function. The light property is an object that contains a palette with background colors for default and paper."
          }
        },
        "retrievedReferences": [
          {
            "content": {
              "text": "import * as React from 'react';\nimport PropTypes from 'prop-types';\nimport Box from '@mui/material/Box';\nimport Typography from '@mui/material/Typography';\nimport { createTheme } from '@mui/material/styles';\nimport DashboardIcon from '@mui/icons-material/Dashboard';\nimport TimelineIcon from '@mui/icons-material/Timeline';\nimport { AppProvider } from '@toolpad/core/AppProvider';\nimport { DashboardLayout } from '@toolpad/core/DashboardLayout';\nimport { useDemoRouter } from '@toolpad/core/internal';\n\nconst NAVIGATION = [\n  {\n    kind: 'header',\n    title: 'Main items',\n  },\n  {\n    segment: 'page',\n    title: 'Page',\n    icon: <DashboardIcon />,\n  },\n  {\n    segment: 'page-2',\n    title: 'Page 2',\n    icon: <TimelineIcon />,\n  },\n];\n\nconst customTheme = createTheme({\n  cssVariables: {\n    colorSchemeSelector: 'data-toolpad-color-scheme',\n  },\n  colorSchemes: {\n    light: {\n      palette: {\n        background: {\n          default: '#F9F9FE',\n          paper: '#EEEEF9',\n        },\n      },\n    },\n    dark: {\n      palette: {\n        background: {\n          default: '#2A4364',\n          paper: '#112E4D',\n        },\n      },\n    },\n  },\n  breakpoints: {\n    values: {\n      xs: 0,",
              "type": "TEXT"
            },
            "location": {
              "s3Location": {
                "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/app-provider/AppProviderTheme.js"
              },
              "type": "S3"
            },
            "metadata": {
              "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/app-provider/AppProviderTheme.js",
              "x-amz-bedrock-kb-chunk-id": "1%3A0%3ATdQ-7ZMBoTkWj_1xIPy6",
              "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
            }
          },
          {
            "content": {
              "text": "'use client';\nimport { createTheme } from '@mui/material/styles';\n\nconst theme = createTheme({\n  cssVariables: {\n    colorSchemeSelector: 'data-toolpad-color-scheme',\n  },\n  colorSchemes: {\n    light: true,\n    dark: true,\n  },\n});\n\nexport default theme;",
              "type": "TEXT"
            },
            "location": {
              "s3Location": {
                "uri": "s3://fern-ali-media/toolpad-examples/tutorial/theme.ts"
              },
              "type": "S3"
            },
            "metadata": {
              "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-examples/tutorial/theme.ts",
              "x-amz-bedrock-kb-chunk-id": "1%3A0%3AAdQ_7ZMBoTkWj_1xof5v",
              "x-amz-bedrock-kb-data-source-id": "YBWDJLK5PO"
            }
          }
        ]
      },
      {
        "generatedResponsePart": {
          "textResponsePart": {
            "span": {
              "end": 468,
              "start": 224
            },
            "text": "For example, you can change the default background color to '#FFFFFF' and the paper background color to '#CCCCCC' by setting colorSchemes light palette background default to '#FFFFFF' and colorSchemes light palette background paper to '#CCCCCC'."
          }
        },
        "retrievedReferences": [
          {
            "content": {
              "text": "import * as React from 'react';\nimport PropTypes from 'prop-types';\nimport Box from '@mui/material/Box';\nimport Typography from '@mui/material/Typography';\nimport { createTheme } from '@mui/material/styles';\nimport DashboardIcon from '@mui/icons-material/Dashboard';\nimport TimelineIcon from '@mui/icons-material/Timeline';\nimport { AppProvider } from '@toolpad/core/AppProvider';\nimport { DashboardLayout } from '@toolpad/core/DashboardLayout';\nimport { useDemoRouter } from '@toolpad/core/internal';\n\nconst NAVIGATION = [\n  {\n    kind: 'header',\n    title: 'Main items',\n  },\n  {\n    segment: 'page',\n    title: 'Page',\n    icon: <DashboardIcon />,\n  },\n  {\n    segment: 'page-2',\n    title: 'Page 2',\n    icon: <TimelineIcon />,\n  },\n];\n\nconst customTheme = createTheme({\n  cssVariables: {\n    colorSchemeSelector: 'data-toolpad-color-scheme',\n  },\n  colorSchemes: {\n    light: {\n      palette: {\n        background: {\n          default: '#F9F9FE',\n          paper: '#EEEEF9',\n        },\n      },\n    },\n    dark: {\n      palette: {\n        background: {\n          default: '#2A4364',\n          paper: '#112E4D',\n        },\n      },\n    },\n  },\n  breakpoints: {\n    values: {\n      xs: 0,",
              "type": "TEXT"
            },
            "location": {
              "s3Location": {
                "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/app-provider/AppProviderTheme.js"
              },
              "type": "S3"
            },
            "metadata": {
              "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/app-provider/AppProviderTheme.js",
              "x-amz-bedrock-kb-chunk-id": "1%3A0%3ATdQ-7ZMBoTkWj_1xIPy6",
              "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
            }
          },
          {
            "content": {
              "text": "import * as React from 'react';\nimport Box from '@mui/material/Box';\nimport Typography from '@mui/material/Typography';\nimport { createTheme } from '@mui/material/styles';\nimport DashboardIcon from '@mui/icons-material/Dashboard';\nimport TimelineIcon from '@mui/icons-material/Timeline';\nimport { AppProvider, type Navigation } from '@toolpad/core/AppProvider';\nimport { DashboardLayout } from '@toolpad/core/DashboardLayout';\nimport { useDemoRouter } from '@toolpad/core/internal';\n\nconst NAVIGATION: Navigation = [\n  {\n    kind: 'header',\n    title: 'Main items',\n  },\n  {\n    segment: 'page',\n    title: 'Page',\n    icon: <DashboardIcon />,\n  },\n  {\n    segment: 'page-2',\n    title: 'Page 2',\n    icon: <TimelineIcon />,\n  },\n];\n\nconst customTheme = createTheme({\n  cssVariables: {\n    colorSchemeSelector: 'data-toolpad-color-scheme',\n  },\n  colorSchemes: {\n    light: {\n      palette: {\n        background: {\n          default: '#F9F9FE',\n          paper: '#EEEEF9',\n        },\n      },\n    },\n    dark: {\n      palette: {\n        background: {\n          default: '#2A4364',\n          paper: '#112E4D',\n        },\n      },\n    },\n  },\n  breakpoints: {\n    values: {\n      xs: 0,\n      sm:",
              "type": "TEXT"
            },
            "location": {
              "s3Location": {
                "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/app-provider/AppProviderTheme.tsx"
              },
              "type": "S3"
            },
            "metadata": {
              "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/app-provider/AppProviderTheme.tsx",
              "x-amz-bedrock-kb-chunk-id": "1%3A0%3AcNQ-7ZMBoTkWj_1xJ_ye",
              "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
            }
          }
        ]
      }
    ],
    "output": {
      "text": "To modify the default light theme in Toolpad, you can adjust the colorSchemes light property in the createTheme function. The light property is an object that contains a palette with background colors for default and paper. For example, you can change the default background color to '#FFFFFF' and the paper background color to '#CCCCCC' by setting colorSchemes light palette background default to '#FFFFFF' and colorSchemes light palette background paper to '#CCCCCC'."
    },
    "sessionId": "d1c0c2d6-31dd-47b6-ab6b-bc772d2ebc0e"
  }