# Tag Input Field: Requirements

A reusable field for entering a list of short text values as chips. Component name is a proposal: `TagInput`.

## 1. Scope

| In scope                                                        | Out of scope                               |
| --------------------------------------------------------------- | ------------------------------------------ |
| Add and remove text tags, keyboard and mouse                    | Tags with colors, icons or categories      |
| Suggestions from a list, with free text still allowed           | Server-side search of suggestions          |
| Controlled value (`string[]`), React Hook Form via `Controller` | Drag to reorder                            |
| Light and dark theme, desktop and mobile                        | Editing a tag in place (remove and re-add) |

## 2. Behavior

| ID    | Requirement                                                                                                                                              |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TI-1  | Typing then pressing Enter adds the text as a tag and clears the input. Focus stays in the input                                                         |
| TI-2  | A comma also adds the typed text. The comma itself is not inserted                                                                                       |
| TI-3  | Text is trimmed and inner whitespace is collapsed to single spaces. Empty text adds nothing                                                              |
| TI-4  | Duplicates are ignored, compared without regard to case. The existing tag flashes briefly instead, and the input is cleared. The original casing is kept |
| TI-5  | Pasting text containing commas or line breaks adds one tag per piece, applying TI-3 and TI-4 to each                                                     |
| TI-6  | On blur, any typed text is added as a tag. Nothing typed is silently lost                                                                                |
| TI-7  | Each tag has a remove button. Clicking it removes the tag and returns focus to the input                                                                 |
| TI-8  | Backspace in an empty input moves focus to the last tag (selected). A second Backspace removes it                                                        |
| TI-9  | A tag is at most 60 characters. Typing stops at 60. A paste over 60 is cut and the field shows a message                                                 |
| TI-10 | At most 20 tags. At 20 the input is disabled and says "Limit reached"                                                                                    |
| TI-11 | The value is an array of strings in the order added. The component never mutates the array it was given                                                  |
| TI-12 | Tags wrap onto several lines. The input shares the last line and keeps a minimum width of 160px                                                          |

## 3. Suggestions

| ID    | Requirement                                                                                                                                     |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| TI-20 | Props accept a `suggestions` list of strings. The component does not fetch anything itself                                                      |
| TI-21 | The list opens while typing and shows suggestions that contain the typed text, case-insensitive, excluding tags already added. Maximum 8 shown  |
| TI-22 | With nothing typed, focusing the input does not open the list. Arrow Down opens it with the first 8                                             |
| TI-23 | Arrow Up and Down move the highlight. Enter picks the highlighted suggestion. With no highlight, Enter adds the typed text (TI-1)               |
| TI-24 | Escape closes the list and keeps the typed text. Clicking outside closes it                                                                     |
| TI-25 | When the typed text has no exact match in the suggestions, the list ends with an `Add "text"` row, same pattern as the creatable combobox guide |
| TI-26 | Free text is always allowed. A suggestion never has to be chosen                                                                                |
| TI-27 | An empty suggestions list means no dropdown is shown at all                                                                                     |

Where suggestions come from is an open decision (section 8).

## 4. States and props

| State     | Behavior                                                                                                                          |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Empty     | Placeholder shown in the input, e.g. "Type a test, press Enter"                                                                   |
| Filled    | Tags, then the input. Placeholder is hidden                                                                                       |
| Focused   | Accent border and focus ring on the whole field, not just the input                                                               |
| Disabled  | Tags stay visible, no remove buttons, input disabled, muted colors                                                                |
| Read-only | Tags visible, no remove buttons, no input. Used by a detail page                                                                  |
| Error     | Red border, message under the field, `aria-invalid` set. The message is passed in, the component does not validate business rules |

| Prop                      | Type                       | Required | Notes                                                                                         |
| ------------------------- | -------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `value`                   | `string[]`                 | yes      | Controlled                                                                                    |
| `onChange`                | `(next: string[]) => void` | yes      | Called once per add or remove, including a multi-tag paste                                    |
| `suggestions`             | `string[]`                 | no       | See section 3                                                                                 |
| `id`                      | `string`                   | yes      | Ties the label to the input                                                                   |
| `label`                   | `string`                   | yes      | Rendered by the field wrapper, or passed as `aria-label` when the form supplies its own label |
| `placeholder`             | `string`                   | no       |                                                                                               |
| `maxTags`, `maxTagLength` | `number`                   | no       | Defaults 20 and 60                                                                            |
| `disabled`, `readOnly`    | `boolean`                  | no       |                                                                                               |
| `error`                   | `string`                   | no       | Message text. Sets the error state                                                            |
| `onBlur`                  | `() => void`               | no       | Needed so React Hook Form can mark the field touched                                          |

With React Hook Form: wire through `Controller`, store only the string array, the same way the creatable combobox guide wires its field.

## 5. Accessibility

| ID    | Requirement                                                                                                                                                            |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TI-30 | The input has a visible label tied by `htmlFor`. The label is not replaced by the placeholder                                                                          |
| TI-31 | The tags form a list. Each remove button is a real `button` with the name "Remove {tag}"                                                                               |
| TI-32 | Remove buttons are at least 24 by 24px (WCAG 2.2 minimum), and 44px on touch screens.                                                                                  |
| TI-33 | Adding, removing and "Limit reached" are announced through a polite live region, e.g. "HbA1c added. 3 tags"                                                            |
| TI-34 | The suggestion list uses the combobox pattern: `role="combobox"` on the input, `aria-expanded`, `aria-controls`, `aria-activedescendant`, options with `role="option"` |
| TI-35 | Everything works with the keyboard alone. Tab order: tags' remove buttons, then input. The remove buttons do not trap focus                                            |
| TI-36 | Error text is tied to the input with `aria-describedby`. Hints too                                                                                                     |
| TI-37 | Text and borders keep 4.5:1 and 3:1 contrast in light and dark. Use the tokens in the prescription wireframe doc, never raw hex                                        |
| TI-38 | Do not rely on color alone. The duplicate flash also announces "Already added"                                                                                         |

## 6. Visual

| Item    | Rule                                                                                                              |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| Tag     | Outlined chip, 12px text, remove button inside on the right. Same look as the wireframe's "Next visit" chips      |
| Field   | One bordered box holding tags and input, 44px minimum height, 8px radius                                          |
| Spacing | 6px between tags. 8px padding inside the box                                                                      |
| Theme   | Colors from the shared tokens (surface, line-input, accent, accent-tint, danger) so dark mode needs no extra work |
| Mobile  | Same layout. Suggestion list is full width of the field. Remove buttons 44px                                      |

## 7. Test plan (Jest and React Testing Library)

Pure logic goes in a small helper that is tested without rendering (normalize text, split pasted text, dedupe). The component tests then cover wiring and keyboard behavior. This is a good fit for TDD.

| Group         | Cases                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Normalizing   | Trim and collapse spaces. Empty and whitespace-only give nothing. Over 60 characters is cut                                                     |
| Dedupe        | Same text in different case is ignored. Original casing kept. Existing tag flagged                                                              |
| Splitting     | Commas and line breaks split. Blank pieces dropped. Duplicates inside one paste collapse                                                        |
| Adding        | Enter adds. Comma adds. Blur adds. Input clears. Focus stays                                                                                    |
| Removing      | Click removes and focuses the input. Backspace on empty selects the last tag, second Backspace removes it                                       |
| Limits        | Cannot exceed 20 tags. Message shown at the limit                                                                                               |
| Suggestions   | Filtering, exclusion of added tags, arrow navigation, Enter on highlight, Enter with no highlight, Escape, `Add "text"` row, no list when empty |
| States        | Disabled and read-only show no remove buttons. Error sets `aria-invalid` and links the message                                                  |
| Accessibility | Label tied to input. Remove buttons named "Remove {tag}". Live region text for add, remove and limit                                            |
| Form wiring   | Works inside `Controller`. `onBlur` marks touched. A multi-tag paste calls `onChange` once                                                      |
| Immutability  | The `value` array passed in is never modified                                                                                                   |

Test names should describe behavior ("adds a tag when Enter is pressed"), not implementation.
