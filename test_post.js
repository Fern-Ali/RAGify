fetch('http://localhost:3000/api/bedrock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inputText: "How can I create a dynamic form in Toolpad using MUI TextField components, and how do I handle the form's validation?",
      sessionId: null,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(JSON.stringify(data, null, 2))) // Pretty print the JSON response
    .catch((err) => console.error(err));
  

const example_response = {
    "$metadata": {
      "httpStatusCode": 200,
      "requestId": "da83030b-081a-440f-b147-8486d94b4eb4",
      "attempts": 1,
      "totalRetryDelay": 0
    },
    "citations": [
      {
        "generatedResponsePart": {
          "textResponsePart": {
            "span": {
              "end": 517,
              "start": 0
            },
            "text": "To create a dynamic form in Toolpad using MUI TextField components, you can utilize the Form component from Toolpad Studio and combine it with MUI TextField components. The Form component has properties such as 'value', 'onSubmit', and 'children' that can be used to control the form's behavior and content. You can pass an object as the 'value' property to store the form data, and use the 'onSubmit' property to handle form submission. The 'children' property can be used to add MUI TextField components to the form."
          }
        },
        "retrievedReferences": [
          {
            "content": {
              "text": "<!-- ATTENTION: DO NOT EDIT! This file has been auto-generated using `pnpm docs:build:api`. -->\n# Form\n<p class=\"description\">API docs for the Toolpad Studio Form component.</p>\nA form component.\n## Properties\n| Name | Type | Default | Description |\n| :- | :- | :- | :- |\n| <span class=\"prop-name\">children</span> | <span class=\"prop-type\">element</span> | | The form content. |\n| <span class=\"prop-name\">value</span> | <span class=\"prop-type\">object</span> | <span class=\"prop-default\">{}</span> | The value that is controlled by this form. |\n| <span class=\"prop-name\">onSubmit</span> | <span class=\"prop-type\">event</span> | | Add logic to be executed when the user submits the form. |\n| <span class=\"prop-name\">formControlsAlign</span> | <span class=\"prop-type\">string</span> | <span class=\"prop-default\">\"end\"</span> | Form controls alignment. |\n| <span class=\"prop-name\">formControlsFullWidth</span> | <span class=\"prop-type\">boolean</span> | <span class=\"prop-default\">false</span> | Whether the form controls should occupy all available horizontal space. |\n| <span class=\"prop-name\">submitButtonText</span> | <span class=\"prop-type\">string</span> | <span class=\"prop-default\">\"Submit\"</span> | Submit button text. |\n| <span class=\"prop-name\">hasResetButton</span> | <span class=\"prop-type\">boolean</span> | <span class=\"prop-default\">false</span> | Show button to reset form values. |\n| <span class=\"prop-name\">sx</span> | <span class=\"prop-type\">object</span> | | The [`sx` prop](https://mui.com/toolpad/studio/concepts/theming/#overrides) is used for defining custom styles that have access to the theme. All MUI System properties are available via the `sx` prop. In addition, the `sx` prop allows you to specify any other CSS rules you may need. |\n",
              "type": "TEXT"
            },
            "location": {
              "s3Location": {
                "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/studio/reference/components/form.md"
              },
              "type": "S3"
            },
            "metadata": {
              "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/studio/reference/components/form.md",
              "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
            }
          }
        ]
      },
      {
        "generatedResponsePart": {
          "textResponsePart": {
            "span": {
              "end": 926,
              "start": 519
            },
            "text": "For handling the form's validation, you can use the 'isRequired', 'minLength', and 'maxLength' properties provided by the TextField component. The 'isRequired' property can be used to make a field mandatory, while 'minLength' and 'maxLength' can be used to specify the minimum and maximum length of the input. Additionally, you can use the 'name' property to identify the field and display validation errors."
          }
        },
        "retrievedReferences": [
          {
            "content": {
              "text": "<!-- ATTENTION: DO NOT EDIT! This file has been auto-generated using `pnpm docs:build:api`. -->\n# TextField\n<p class=\"description\">API docs for the Toolpad Studio TextField component.</p>\nThe Material UI [TextField](https://mui.com/toolpad/studio/components/text-field/) component lets you input a text value.\n## Properties\n| Name | Type | Default | Description |\n| :- | :- | :- | :- |\n| <span class=\"prop-name\">value</span> | <span class=\"prop-type\">string</span> | <span class=\"prop-default\">\"\"</span> | The value that is controlled by this text input. |\n| <span class=\"prop-name\">defaultValue</span> | <span class=\"prop-type\">string</span> | <span class=\"prop-default\">\"\"</span> | A default value for when the input is still empty. |\n| <span class=\"prop-name\">label</span> | <span class=\"prop-type\">string</span> | | A label that describes the content of the text field, for example \"First name\". |\n| <span class=\"prop-name\">variant</span> | <span class=\"prop-type\">string</span> | <span class=\"prop-default\">\"outlined\"</span> | One of the available Material UI TextField [variants](https://mui.com/material-ui/react-button/#basic-button). Possible values are `outlined`, `filled` or `standard` |\n| <span class=\"prop-name\">size</span> | <span class=\"prop-type\">string</span> | <span class=\"prop-default\">\"small\"</span> | The size of the input. One of `small`, or `medium`. |\n| <span class=\"prop-name\">fullWidth</span> | <span class=\"prop-type\">boolean</span> | | Whether the input should occupy all available horizontal space. |\n| <span class=\"prop-name\">password</span> | <span class=\"prop-type\">boolean</span> | | Masks the input to hide what's being typed. |\n| <span class=\"prop-name\">placeholder</span> | <span class=\"prop-type\">string</span> | | The short hint displayed in the `input` before the user enters a value. |\n| <span class=\"prop-name\">disabled</span> | <span class=\"prop-type\">boolean</span> | | Whether the input is disabled. |\n| <span class=\"prop-name\">name</span> | <span class=\"prop-type\">string</span> | | Name of this input. Used as a reference in form data. |\n| <span class=\"prop-name\">isRequired</span> | <span class=\"prop-type\">boolean</span> | <span class=\"prop-default\">false</span> | Whether the input is required to have a value. |\n| <span class=\"prop-name\">minLength</span> | <span class=\"prop-type\">number</span> | <span class=\"prop-default\">0</span> | Minimum value length. |\n| <span class=\"prop-name\">maxLength</span> | <span class=\"prop-type\">number</span> | <span class=\"prop-default\">0</span> | Maximum value length. |\n| <span class=\"prop-name\">sx</span> | <span class=\"prop-type\">object</span> | | The [`sx` prop](https://mui.com/toolpad/studio/concepts/theming/#overrides) is used for defining custom styles that have access to the theme. All MUI System properties are available via the `sx` prop. In addition, the `sx` prop allows you to specify any other CSS rules you may need. |\n",
              "type": "TEXT"
            },
            "location": {
              "s3Location": {
                "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/studio/reference/components/text-field.md"
              },
              "type": "S3"
            },
            "metadata": {
              "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/studio/reference/components/text-field.md",
              "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
            }
          },
          {
            "content": {
              "text": "# Text Field\n<p class=\"description\">Learn about the textfield component and its usage in Toolpad Studio.</p>\n## Demo\nTextField is a text input component. It takes user input and provides the value for further usage on the page.\n{{\"demo\": \"TextFieldBasic.js\", \"hideToolbar\": true}}\n## Usage\nIt is one of the most used input component. The video below uses some props to demonstrate its usage.\n<video controls width=\"100%\" height=\"auto\" alt=\"textfield\">\n<source src=\"/static/toolpad/docs/studio/components/textfield/textfield.mp4\" type=\"video/mp4\">\nYour browser does not support the video tag.\n</video>\n### value\nThe current value.\n### defaultValue\nAllows setting a default value. In case user enters nothing, default value is used.\n### password\nPassword prop masks the user input. It is used to hide sensitive data.\n### name\nA name is needed when a textfield is part of a form component. It is used to show validation errors.\n## Appearance\nThe TextField component supports below mentioned appearance related props in Toolpad Studio:\n### label\nA label that describes the content of the textfield, for example \"Enter name\".\n### variant\nThe variant property supports three different options: outlined (default), filled, and standard. Outlined is for low-emphasis while filled is a high-emphasis input.",
              "type": "TEXT"
            },
            "location": {
              "s3Location": {
                "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/studio/components/text-field/text-field.md"
              },
              "type": "S3"
            },
            "metadata": {
              "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/studio/components/text-field/text-field.md",
              "x-amz-bedrock-kb-chunk-id": "1%3A0%3AFdQ-7ZMBoTkWj_1xFPy-",
              "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
            }
          }
        ]
      },
      {
        "generatedResponsePart": {
          "textResponsePart": {
            "span": {
              "end": 1148,
              "start": 928
            },
            "text": "You can also use the 'onSubmit' property of the Form component to handle form submission and perform custom validation logic. This can include checking the form data for validity and displaying error messages to the user."
          }
        },
        "retrievedReferences": [
          {
            "content": {
              "text": "<!-- ATTENTION: DO NOT EDIT! This file has been auto-generated using `pnpm docs:build:api`. -->\n# Form\n<p class=\"description\">API docs for the Toolpad Studio Form component.</p>\nA form component.\n## Properties\n| Name | Type | Default | Description |\n| :- | :- | :- | :- |\n| <span class=\"prop-name\">children</span> | <span class=\"prop-type\">element</span> | | The form content. |\n| <span class=\"prop-name\">value</span> | <span class=\"prop-type\">object</span> | <span class=\"prop-default\">{}</span> | The value that is controlled by this form. |\n| <span class=\"prop-name\">onSubmit</span> | <span class=\"prop-type\">event</span> | | Add logic to be executed when the user submits the form. |\n| <span class=\"prop-name\">formControlsAlign</span> | <span class=\"prop-type\">string</span> | <span class=\"prop-default\">\"end\"</span> | Form controls alignment. |\n| <span class=\"prop-name\">formControlsFullWidth</span> | <span class=\"prop-type\">boolean</span> | <span class=\"prop-default\">false</span> | Whether the form controls should occupy all available horizontal space. |\n| <span class=\"prop-name\">submitButtonText</span> | <span class=\"prop-type\">string</span> | <span class=\"prop-default\">\"Submit\"</span> | Submit button text. |\n| <span class=\"prop-name\">hasResetButton</span> | <span class=\"prop-type\">boolean</span> | <span class=\"prop-default\">false</span> | Show button to reset form values. |\n| <span class=\"prop-name\">sx</span> | <span class=\"prop-type\">object</span> | | The [`sx` prop](https://mui.com/toolpad/studio/concepts/theming/#overrides) is used for defining custom styles that have access to the theme. All MUI System properties are available via the `sx` prop. In addition, the `sx` prop allows you to specify any other CSS rules you may need. |\n",
              "type": "TEXT"
            },
            "location": {
              "s3Location": {
                "uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/studio/reference/components/form.md"
              },
              "type": "S3"
            },
            "metadata": {
              "x-amz-bedrock-kb-source-uri": "s3://fern-ali-media/toolpad-docs/data/toolpad/studio/reference/components/form.md",
              "x-amz-bedrock-kb-data-source-id": "ESFAEI3EIO"
            }
          }
        ]
      }
    ],
    "output": {
      "text": "To create a dynamic form in Toolpad using MUI TextField components, you can utilize the Form component from Toolpad Studio and combine it with MUI TextField components. The Form component has properties such as 'value', 'onSubmit', and 'children' that can be used to control the form's behavior and content. You can pass an object as the 'value' property to store the form data, and use the 'onSubmit' property to handle form submission. The 'children' property can be used to add MUI TextField components to the form. For handling the form's validation, you can use the 'isRequired', 'minLength', and 'maxLength' properties provided by the TextField component. The 'isRequired' property can be used to make a field mandatory, while 'minLength' and 'maxLength' can be used to specify the minimum and maximum length of the input. Additionally, you can use the 'name' property to identify the field and display validation errors. You can also use the 'onSubmit' property of the Form component to handle form submission and perform custom validation logic. This can include checking the form data for validity and displaying error messages to the user."
    },
    "sessionId": "e9e681b4-0d40-45c9-a507-e3851b372f46"
  }