---
title: forms
sidebar_label: forms
---

# forms

Helpers for serializing, resetting, and populating HTML forms, plus native
validation and submit handling.

**Import:** `@rtorcato/browser-common/forms`

📖 [MDN: HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)

## Example

```ts
import { serializeForm, isFormValid, onFormSubmit } from '@rtorcato/browser-common/forms'

const off = onFormSubmit(myForm, (event) => {
  if (!isFormValid(myForm)) return
  const data = serializeForm(myForm)
  console.log(data)
})

off()
```

## Exports

- `serializeForm(form)` — returns form field values as `Record<string, string>`
- `resetForm(form)` — resets the form to its initial values
- `setFormValues(form, values)` — writes values onto matching named fields
- `isFormValid(form)` — runs the browser's built-in `checkValidity()`
- `onFormSubmit(form, callback)` — listens for submit, calls `preventDefault()` first; returns an unsubscribe function

See the [API reference](/docs/api/forms) for full signatures.
