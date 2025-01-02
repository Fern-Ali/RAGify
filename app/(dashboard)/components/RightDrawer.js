
"use client";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import RagResponse from '../components/RagResponse';
import Message from '../components/Message';

export default function RightDrawer({response, setResponse, session}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);  
  
  const drawerWidth = 600;
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };



  return (
    <React.Fragment>
      <div 
      style={{
          marginRight: drawerWidth, // Add margin to prevent overlap
          transition: "margin-right 0.3s ease",
          border: "4px solid orange"
        }}>
        <Message  response={response} setResponse={setResponse} session={session}></Message>
      </div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          display: { xs: ' none', md: 'none' }
        }}
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
      { response ? <RagResponse response={response}></RagResponse> : null}
      </Drawer>
      <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        display: { xs: 'none', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      { response ? <RagResponse response={response}></RagResponse> : null}
    </Drawer>
    </React.Fragment>
  );
}



// example responses:

// const response2 = {
//   'ResponseMetadata': {
//       'RequestId': '4ac348b0-e87d-4cdd-835a-039ea661acd7', 
//       'HTTPStatusCode': 200, 
//       'HTTPHeaders': {
//           'date': 'Mon, 23 Dec 2024 02:41:25 GMT', 
//           'content-type': 'application/json', 
//           'content-length': '4915', 
//           'connection': 'keep-alive', 
//           'x-amzn-requestid': '4ac348b0-e87d-4cdd-835a-039ea661acd7'
//           }, 
//       'RetryAttempts': 0
//   }, 
//   'citations': [
//       {
//           'generatedResponsePart': {
//               'textResponsePart': {
//                   'span': {
//                       'end': 349, 
//                       'start': 0
//                       }, 
//                   'text': 'The useNotifications API in Toolpad provides imperative APIs to show and interact with application notifications. It offers a set of abstractions that make it easier to interact with notifications, which are used to give short updates to the user about things that are happening during the application lifetime and appear at the bottom of the screen.'
//                   }
//               }, 
//               'retrievedReferences': [
//                       {
//                           'content': {
//                               'text': '---\nproductId: toolpad-core\ntitle: useNotifications\ncomponents: NotificationsProvider\n---\n# useNotifications\n<p class="description">Imperative APIs to show and interact with application notifications.</p>\n:::info\nIf this is your first time using Toolpad Core, it\'s recommended to read about the [basic concepts](/toolpad/core/introduction/base-concepts/) first.\n:::\nToolpad Core offers a set of abstractions that make it easier to interact with notifications. Notifications are used to give short updates to the user about things that are happening during the application lifetime. They appear at the bottom of the screen.', 'type': 'TEXT'
//                               }, 
//                           'location': {
//                               's3Location': {
//                                   'uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/use-notifications.md'
//                                   }, 
//                               'type': 'S3'
//                               }, 
//                               'metadata': {
//                                   'x-amz-bedrock-kb-source-uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/use-notifications.md', 
//                                   'x-amz-bedrock-kb-chunk-id': '1%3A0%3A_9Q-7ZMBoTkWj_1xC_st', 
//                                   'x-amz-bedrock-kb-data-source-id': 'ESFAEI3EIO'
//                                   }
//                       }
//                   ]
//       }, 
//       {
//           'generatedResponsePart': {
//               'textResponsePart': {
//                   'span': {
//                       'end': 776, 
//                       'start': 351
//                       }, 
//                   'text': 'To use the useNotifications API, you can import it from @toolpad/core/useNotifications and then call the show method on the notifications object, passing in the notification message and any options, such as autoHideDuration. For example, you can use it in a React component by calling notifications.show with a message and an options object that sets autoHideDuration to 3000, which will hide the notification after 3 seconds.'
//                   }
//               }, 'retrievedReferences': [
//                   {
//                       'content': {
//                           'text': "import * as React from 'react';\nimport { useNotifications } from '@toolpad/core/useNotifications';\nimport Button from '@mui/material/Button';\n\nexport default function BasicNotification() {\n  const notifications = useNotifications();\n  return (\n    <div>\n      <Button\n        onClick={() => {\n          // preview-start\n          notifications.show('Consider yourself notified!', {\n            autoHideDuration: 3000,\n          });\n          // preview-end\n        }}\n      >\n        Notify me\n      </Button>\n    </div>\n  );\n}", 'type': 'TEXT'
//                           }, 
//                       'location': {
//                           's3Location': {
//                               'uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/BasicNotification.tsx'
//                               }, 
//                           'type': 'S3'
//                           }, 
//                       'metadata': {
//                           'x-amz-bedrock-kb-source-uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/BasicNotification.tsx', 
//                           'x-amz-bedrock-kb-chunk-id': '1%3A0%3AgVo-7ZMBj-OJkFFfchTD', 'x-amz-bedrock-kb-data-source-id': 'ESFAEI3EIO'
//                           }
//                   }, 
//                   {
//                       'content': {
//                           'text': "import * as React from 'react';\nimport { useNotifications } from '@toolpad/core/useNotifications';\nimport Button from '@mui/material/Button';\n\nexport default function BasicNotification() {\n  const notifications = useNotifications();\n  return (\n    <div>\n      <Button\n        onClick={() => {\n          // preview-start\n          notifications.show('Consider yourself notified!', {\n            autoHideDuration: 3000,\n          });\n          // preview-end\n        }}\n      >\n        Notify me\n      </Button>\n    </div>\n  );\n}", 'type': 'TEXT'
//                           }, 
//                           'location': {
//                               's3Location': {
//                                   'uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/BasicNotification.js'
//                                   }, 
//                               'type': 'S3'
//                               }, 
//                               'metadata': {
//                                   'x-amz-bedrock-kb-source-uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/BasicNotification.js', 
//                                   'x-amz-bedrock-kb-chunk-id': '1%3A0%3AkFo-7ZMBj-OJkFFfeBT5', 
//                                   'x-amz-bedrock-kb-data-source-id': 'ESFAEI3EIO'
//                                   }
//                   }
//                       ]
//           }
//           ], 
//       'output': {
//           'text': 'The useNotifications API in Toolpad provides imperative APIs to show and interact with application notifications. It offers a set of abstractions that make it easier to interact with notifications, which are used to give short updates to the user about things that are happening during the application lifetime and appear at the bottom of the screen. To use the useNotifications API, you can import it from @toolpad/core/useNotifications and then call the show method on the notifications object, passing in the notification message and any options, such as autoHideDuration. For example, you can use it in a React component by calling notifications.show with a message and an options object that sets autoHideDuration to 3000, which will hide the notification after 3 seconds.'
//           }, 
//           'sessionId': '14b3495a-93bc-4eef-a68e-296882f4983b'
//           }




// const response1 = {
//   "$metadata": {
//     "httpStatusCode": 200,
//     "requestId": "1163533f-df87-4122-8d4b-db32a1761107",
//     "attempts": 1,
//     "totalRetryDelay": 0
//   },
//   "citations": [
//     {
//       "generatedResponsePart": {
//         "textResponsePart": {
//           "span": {
//             "end": 374,
//             "start": 0
//           },
//           "text": "To add a username field to the SignIn component in your Toolpad app, you can modify the signIn function to accept the additional field. However, the default implementation of the SignInPage component in Toolpad Core does not support custom fields out of the box. You would need to create a custom SignInPage component or modify the existing one to include the username field."
//         }
//       },
//       "retrievedReferences": [
//         {
//           "content": {
//             "text": "'use client';\nimport * as React from 'react';\nimport Link from '@mui/material/Link';\nimport Alert from '@mui/material/Alert';\nimport { SignInPage } from '@toolpad/core/SignInPage';\nimport { providerMap } from '../../../auth';\nimport signIn from './actions';\n\nfunction ForgotPasswordLink() {\n  return (\n    <span>\n      <Link fontSize=\"0.75rem\" href=\"/auth/forgot-password\">\n        Forgot password?\n      </Link>\n    </span>\n  );\n}\n\nfunction SignUpLink() {\n  return (\n    <span style={{ fontSize: '0.8rem' }}>\n      Don&apos;t have an account?&nbsp;<Link href=\"/auth/signup\">Sign up</Link>\n    </span>\n  );\n}\n\nfunction DemoInfo() {\n  return (\n    <Alert severity=\"info\">\n      You can use <strong>toolpad-demo@mui.com</strong> with the password <strong>@demo1</strong> to\n      test\n    </Alert>\n  );\n}\n\nexport default function SignIn() {\n  return (\n    <SignInPage\n      providers={providerMap}\n      signIn={signIn}\n      slots={{\n        forgotPasswordLink: ForgotPasswordLink,\n        signUpLink: SignUpLink,\n        subtitle: DemoInfo,\n      }}\n    />\n  );\n}",
//             "type": "TEXT"
//           },
//           "location": {
//             "s3Location": {
//               "uri": "s3://fern-ali-media/toolpad-examples/auth-nextjs-themed/app/auth/signin/page.tsx"
//             },
//             "type": "S3"
//           },
//           "metadata": {
//             "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-examples/auth-nextjs-themed/app/auth/signin/page.tsx",
//             "x-amz-bedrock-kb-chunk-id": "1%3A0%3AeNQ_7ZMBoTkWj_1xff3q",
//             "x-amz-bedrock-kb-data-source-id": "YBWDJLK5PO"
//           }
//         },
//         {
//           "content": {
//             "text": "with Toolpad Core Sign-in page\", \"zoom\": true,  \"aspectRatio\": \"1.428\" }}\n## Credentials\n:::warning\nThe Credentials provider is not the most secure way to authenticate users. It's recommended to use any of the other providers for a more robust solution.\n:::\nTo render a username password form, pass in a provider with `credentials` as the `id` property. The `signIn` function accepts a `formData` parameter in this case.\n{{\"demo\": \"CredentialsSignInPage.js\", \"iframe\": true, \"height\": 600}}\n### Alerts\nThe `signIn` prop takes a function which can either return `void` or a `Promise` which resolves with an `AuthResponse` object of the form:\n```ts\ninterface AuthResponse {\nerror?: string;\ntype?: string;\n}\n```\nThis renders an alert with the `error` string as the message.\n{{\"demo\": \"NotificationsSignInPageError.js\", \"iframe\": true, \"height\": 600}}\n## Usage with authentication libraries\n### Auth.js\n#### Next.js App Directory and GitHub\nThe component is composable with any authentication library you might want to use. The following is a `SignInPage` with [Auth.js](https://authjs.dev/) using GitHub, Next.js App router and server actions.",
//             "type": "TEXT"
//           },
//           "location": {
//             "s3Location": {
//               "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/sign-in-page/sign-in-page.md"
//             },
//             "type": "S3"
//           },
//           "metadata": {
//             "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/sign-in-page/sign-in-page.md",
//             "x-amz-bedrock-kb-chunk-id": "1%3A0%3A79Q97ZMBoTkWj_1x3fof",
//             "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
//           }
//         },
//         {
//           "content": {
//             "text": "---\nproductId: toolpad-core\ntitle: Sign-in Page\ncomponents: SignInPage, Account, NotificationsProvider\n---\n# Sign-in Page\n<p class=\"description\">A customizable sign-in UI component that abstracts away the pain needed to wire together a secure authentication page for your application.</p>\n:::info\nIf this is your first time using Toolpad Core, it's recommended to read about the [basic concepts](/toolpad/core/introduction/base-concepts/) first.\n:::\nThe `SignInPage` component is a quick way to generate a ready-to-use authentication page with multiple OAuth providers, or a credentials form.\n## OAuth\nThe `SignInPage` component can be set up with an OAuth provider by passing in a list of providers in the `providers` prop, along with a `signIn` function that accepts the `provider` as a parameter.",
//             "type": "TEXT"
//           },
//           "location": {
//             "s3Location": {
//               "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/sign-in-page/sign-in-page.md"
//             },
//             "type": "S3"
//           },
//           "metadata": {
//             "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/sign-in-page/sign-in-page.md",
//             "x-amz-bedrock-kb-chunk-id": "1%3A0%3A7NQ97ZMBoTkWj_1x3fof",
//             "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
//           }
//         }
//       ]
//     },
//     {
//       "generatedResponsePart": {
//         "textResponsePart": {
//           "span": {
//             "end": 603,
//             "start": 376
//           },
//           "text": "You can start by looking at the example code for the CredentialsSignInPage, which shows how to use the SignInPage component with a credentials provider. You can then modify this code to include a username field in the form data."
//         }
//       },
//       "retrievedReferences": [
//         {
//           "content": {
//             "text": "import * as React from 'react';\nimport { AppProvider } from '@toolpad/core/AppProvider';\nimport { SignInPage } from '@toolpad/core/SignInPage';\nimport { useTheme } from '@mui/material/styles';\n\n// preview-start\nconst providers = [{ id: 'credentials', name: 'Email and Password' }];\n// preview-end\n\nconst signIn = async (provider, formData) => {\n  const promise = new Promise((resolve) => {\n    setTimeout(() => {\n      alert(\n        `Signing in with \"${provider.name}\" and credentials: ${formData.get('email')}, ${formData.get('password')}`,\n      );\n      resolve();\n    }, 300);\n  });\n  return promise;\n};\n\nexport default function CredentialsSignInPage() {\n  const theme = useTheme();\n  return (\n    // preview-start\n    <AppProvider theme={theme}>\n      <SignInPage\n        signIn={signIn}\n        providers={providers}\n        slotProps={{ emailField: { autoFocus: false } }}\n      />\n    </AppProvider>\n    // preview-end\n  );\n}",
//             "type": "TEXT"
//           },
//           "location": {
//             "s3Location": {
//               "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/sign-in-page/CredentialsSignInPage.js"
//             },
//             "type": "S3"
//           },
//           "metadata": {
//             "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/sign-in-page/CredentialsSignInPage.js",
//             "x-amz-bedrock-kb-chunk-id": "1%3A0%3AR1o-7ZMBj-OJkFFfShSx",
//             "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
//           }
//         },
//         {
//           "content": {
//             "text": "import * as React from 'react';\nimport { AppProvider } from '@toolpad/core/AppProvider';\nimport { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';\nimport { useTheme } from '@mui/material/styles';\n\n// preview-start\nconst providers = [{ id: 'credentials', name: 'Email and Password' }];\n// preview-end\n\nconst signIn: (provider: AuthProvider, formData: FormData) => void = async (\n  provider,\n  formData,\n) => {\n  const promise = new Promise<void>((resolve) => {\n    setTimeout(() => {\n      alert(\n        `Signing in with \"${provider.name}\" and credentials: ${formData.get('email')}, ${formData.get('password')}`,\n      );\n      resolve();\n    }, 300);\n  });\n  return promise;\n};\n\nexport default function CredentialsSignInPage() {\n  const theme = useTheme();\n  return (\n    // preview-start\n    <AppProvider theme={theme}>\n      <SignInPage\n        signIn={signIn}\n        providers={providers}\n        slotProps={{ emailField: { autoFocus: false } }}\n      />\n    </AppProvider>\n    // preview-end\n  );\n}",
//             "type": "TEXT"
//           },
//           "location": {
//             "s3Location": {
//               "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/sign-in-page/CredentialsSignInPage.tsx"
//             },
//             "type": "S3"
//           },
//           "metadata": {
//             "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/core/components/sign-in-page/CredentialsSignInPage.tsx",
//             "x-amz-bedrock-kb-chunk-id": "1%3A0%3AV1o-7ZMBj-OJkFFfTxTT",
//             "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
//           }
//         }
//       ]
//     }
//   ],
//   "output": {
//     "text": "To add a username field to the SignIn component in your Toolpad app, you can modify the signIn function to accept the additional field. However, the default implementation of the SignInPage component in Toolpad Core does not support custom fields out of the box. You would need to create a custom SignInPage component or modify the existing one to include the username field. You can start by looking at the example code for the CredentialsSignInPage, which shows how to use the SignInPage component with a credentials provider. You can then modify this code to include a username field in the form data."
//   },
//   "sessionId": "d1c0c2d6-31dd-47b6-ab6b-bc772d2ebc0e"
// }