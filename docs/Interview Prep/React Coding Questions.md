Here’s a list of **senior-level React coding questions** commonly asked in interviews. These test understanding of core concepts, patterns, and performance.

---

### 🧠 **Component Design & Reusability**

1. **Build a `Tabs` component**

   - Accepts tab list and content
   - Keyboard navigation support
   - Controlled + uncontrolled version

2. **Create a `Modal` component**

   - With portal, focus trap, and ESC to close
   - Animations with React Transition or Framer Motion

3. **Build a `Dropdown` with search and multi-select**

   - Virtualize long lists
   - Use keyboard navigation
   - Custom hook or compound pattern

---

### ⚙️ **Hooks and Patterns**

4. **Implement `useDebounce` and use it in a Search Input**

5. **Create a custom `useUndoRedo` hook**

   - Supports `undo`, `redo`, `reset`
   - Can be used for form state

6. **Build a `usePrevious` hook and explain use cases**

7. **Create a `useEventListener` hook**

   - Works for window, DOM node, or ref

---

### 🧱 **Performance Optimization**

8. **Given a large list, optimize rendering**

   - Use `React.memo`, `useMemo`, `useCallback`, and list virtualization
   - Spot performance bottlenecks

9. **Avoid unnecessary re-renders in a deeply nested component tree**

10. **Lazy load components and code-split a React app using `React.lazy` and `Suspense`**

---

### 🔄 **State Management**

11. **Build a `useForm` hook**

- Handles field updates, validation, and submission

12. **Manage global state using `useReducer` + Context API**

13. **Migrate a component from `Redux` to `Recoil` or `Zustand`**

---

### 🧪 **Testing**

14. **Write unit tests for a controlled input component using React Testing Library**

15. **Test custom hooks with `@testing-library/react-hooks` or `vitest`**

---

### 🔄 **Code Review/Debug Style**

16. **Review a given React component and identify issues:**

- Uncontrolled inputs
- Re-render issues
- Poor separation of concerns
- Missing key props or accessibility issues

17. **Given a bug like: form not updating or stale state in closure, fix the issue**
