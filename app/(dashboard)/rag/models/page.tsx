import * as React from 'react';
import Typography from '@mui/material/Typography';
import RagResponse from '../../components/RagResponse'




export default async function OrdersPage() {
  

  return (
    // <Typography>
    //   Welcome to the Toolpad orders!
    // </Typography>
    <RagResponse response={response}></RagResponse>
  );
}
const response = {
  'ResponseMetadata': {
      'RequestId': '4ac348b0-e87d-4cdd-835a-039ea661acd7', 
      'HTTPStatusCode': 200, 
      'HTTPHeaders': {
          'date': 'Mon, 23 Dec 2024 02:41:25 GMT', 
          'content-type': 'application/json', 
          'content-length': '4915', 
          'connection': 'keep-alive', 
          'x-amzn-requestid': '4ac348b0-e87d-4cdd-835a-039ea661acd7'
          }, 
      'RetryAttempts': 0
  }, 
  'citations': [
      {
          'generatedResponsePart': {
              'textResponsePart': {
                  'span': {
                      'end': 349, 
                      'start': 0
                      }, 
                  'text': 'The useNotifications API in Toolpad provides imperative APIs to show and interact with application notifications. It offers a set of abstractions that make it easier to interact with notifications, which are used to give short updates to the user about things that are happening during the application lifetime and appear at the bottom of the screen.'
                  }
              }, 
              'retrievedReferences': [
                      {
                          'content': {
                              'text': '---\nproductId: toolpad-core\ntitle: useNotifications\ncomponents: NotificationsProvider\n---\n# useNotifications\n<p class="description">Imperative APIs to show and interact with application notifications.</p>\n:::info\nIf this is your first time using Toolpad Core, it\'s recommended to read about the [basic concepts](/toolpad/core/introduction/base-concepts/) first.\n:::\nToolpad Core offers a set of abstractions that make it easier to interact with notifications. Notifications are used to give short updates to the user about things that are happening during the application lifetime. They appear at the bottom of the screen.', 'type': 'TEXT'
                              }, 
                          'location': {
                              's3Location': {
                                  'uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/use-notifications.md'
                                  }, 
                              'type': 'S3'
                              }, 
                              'metadata': {
                                  'x-amz-bedrock-kb-source-uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/use-notifications.md', 
                                  'x-amz-bedrock-kb-chunk-id': '1%3A0%3A_9Q-7ZMBoTkWj_1xC_st', 
                                  'x-amz-bedrock-kb-data-source-id': 'ESFAEI3EIO'
                                  }
                      }
                  ]
      }, 
      {
          'generatedResponsePart': {
              'textResponsePart': {
                  'span': {
                      'end': 776, 
                      'start': 351
                      }, 
                  'text': 'To use the useNotifications API, you can import it from @toolpad/core/useNotifications and then call the show method on the notifications object, passing in the notification message and any options, such as autoHideDuration. For example, you can use it in a React component by calling notifications.show with a message and an options object that sets autoHideDuration to 3000, which will hide the notification after 3 seconds.'
                  }
              }, 'retrievedReferences': [
                  {
                      'content': {
                          'text': "import * as React from 'react';\nimport { useNotifications } from '@toolpad/core/useNotifications';\nimport Button from '@mui/material/Button';\n\nexport default function BasicNotification() {\n  const notifications = useNotifications();\n  return (\n    <div>\n      <Button\n        onClick={() => {\n          // preview-start\n          notifications.show('Consider yourself notified!', {\n            autoHideDuration: 3000,\n          });\n          // preview-end\n        }}\n      >\n        Notify me\n      </Button>\n    </div>\n  );\n}", 'type': 'TEXT'
                          }, 
                      'location': {
                          's3Location': {
                              'uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/BasicNotification.tsx'
                              }, 
                          'type': 'S3'
                          }, 
                      'metadata': {
                          'x-amz-bedrock-kb-source-uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/BasicNotification.tsx', 
                          'x-amz-bedrock-kb-chunk-id': '1%3A0%3AgVo-7ZMBj-OJkFFfchTD', 'x-amz-bedrock-kb-data-source-id': 'ESFAEI3EIO'
                          }
                  }, 
                  {
                      'content': {
                          'text': "import * as React from 'react';\nimport { useNotifications } from '@toolpad/core/useNotifications';\nimport Button from '@mui/material/Button';\n\nexport default function BasicNotification() {\n  const notifications = useNotifications();\n  return (\n    <div>\n      <Button\n        onClick={() => {\n          // preview-start\n          notifications.show('Consider yourself notified!', {\n            autoHideDuration: 3000,\n          });\n          // preview-end\n        }}\n      >\n        Notify me\n      </Button>\n    </div>\n  );\n}", 'type': 'TEXT'
                          }, 
                          'location': {
                              's3Location': {
                                  'uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/BasicNotification.js'
                                  }, 
                              'type': 'S3'
                              }, 
                              'metadata': {
                                  'x-amz-bedrock-kb-source-uri': 's3://fern-ali-media/toolpad-docs/data/toolpad/core/components/use-notifications/BasicNotification.js', 
                                  'x-amz-bedrock-kb-chunk-id': '1%3A0%3AkFo-7ZMBj-OJkFFfeBT5', 
                                  'x-amz-bedrock-kb-data-source-id': 'ESFAEI3EIO'
                                  }
                  }
                      ]
          }
          ], 
      'output': {
          'text': 'The useNotifications API in Toolpad provides imperative APIs to show and interact with application notifications. It offers a set of abstractions that make it easier to interact with notifications, which are used to give short updates to the user about things that are happening during the application lifetime and appear at the bottom of the screen. To use the useNotifications API, you can import it from @toolpad/core/useNotifications and then call the show method on the notifications object, passing in the notification message and any options, such as autoHideDuration. For example, you can use it in a React component by calling notifications.show with a message and an options object that sets autoHideDuration to 3000, which will hide the notification after 3 seconds.'
          }, 
          'sessionId': '14b3495a-93bc-4eef-a68e-296882f4983b'
          }

